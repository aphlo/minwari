/// Settlement calculation logic.
///
/// Ported from webapp/server/usecases/calculateSettlements.ts
/// and webapp/server/usecases/settlementUtils.ts
library;

import 'currency.dart';

/// Represents a settlement transfer between two members
class Settlement {
  final String from;
  final String to;
  final double amount;

  const Settlement({
    required this.from,
    required this.to,
    required this.amount,
  });

  @override
  String toString() => 'Settlement(from: $from, to: $to, amount: $amount)';

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is Settlement &&
          runtimeType == other.runtimeType &&
          from == other.from &&
          to == other.to &&
          amount == other.amount;

  @override
  int get hashCode => from.hashCode ^ to.hashCode ^ amount.hashCode;
}

/// Expense data for settlement calculation
class ExpenseForSettlement {
  final double amount;
  final String paidBy;
  final List<String> splitWith;

  const ExpenseForSettlement({
    required this.amount,
    required this.paidBy,
    required this.splitWith,
  });
}

/// Build ordered list of members (group members + extras from expenses)
List<String> buildMemberOrder(
  List<String> members,
  List<ExpenseForSettlement> expenses,
) {
  final extras = <String>{};
  for (final expense in expenses) {
    if (!members.contains(expense.paidBy)) {
      extras.add(expense.paidBy);
    }
    for (final member in expense.splitWith) {
      if (!members.contains(member)) {
        extras.add(member);
      }
    }
  }
  final extrasList = extras.toList()..sort((a, b) => a.compareTo(b));
  return [...members, ...extrasList];
}

/// Calculate expense shares for each participant
List<({String member, int shareMinor})> calculateExpenseShares(
  ExpenseForSettlement expense,
  List<String> fallbackMembers,
  int fractionDigits,
) {
  final participants =
      expense.splitWith.isNotEmpty ? expense.splitWith : fallbackMembers;
  final count = participants.length;
  if (count == 0) {
    return [];
  }

  final amountMinor = toMinorUnits(expense.amount, fractionDigits);
  final perPerson = amountMinor ~/ count;

  // Order participants with payer first
  final orderedParticipants = participants.contains(expense.paidBy)
      ? [
          expense.paidBy,
          ...participants.where((member) => member != expense.paidBy),
        ]
      : [...participants];

  final shares = List<int>.filled(orderedParticipants.length, perPerson);

  // Distribute remainder to non-payers (from the end) so payer gets more back
  final remainder = amountMinor - perPerson * count;
  for (int i = 0; i < remainder; i++) {
    final targetIndex = shares.length - 1 - i;
    if (targetIndex > 0) {
      // Assign to non-payer participants
      shares[targetIndex] += 1;
    } else {
      // If only payer is participating, assign to payer
      shares[0] += 1;
    }
  }

  return [
    for (int i = 0; i < orderedParticipants.length; i++)
      (member: orderedParticipants[i], shareMinor: shares[i]),
  ];
}

/// Calculate settlements from expenses
///
/// Algorithm:
/// 1. Calculate net balance for each member (paid - owed)
/// 2. Sort members by balance (creditors first)
/// 3. Match creditors with debtors greedily
List<Settlement> calculateSettlements(
  List<ExpenseForSettlement> expenses,
  List<String> members,
  String currency,
) {
  final net = <String, int>{};
  final memberOrder = buildMemberOrder(members, expenses);
  final fractionDigits = getCurrencyFractionDigits(currency);

  // Initialize balances
  for (final member in memberOrder) {
    net[member] = 0;
  }

  // Calculate net balances
  for (final expense in expenses) {
    final amountMinor = toMinorUnits(expense.amount, fractionDigits);

    // Add to payer's balance
    net.putIfAbsent(expense.paidBy, () => 0);
    net[expense.paidBy] = net[expense.paidBy]! + amountMinor;

    // Subtract shares from each participant
    final shares = calculateExpenseShares(expense, memberOrder, fractionDigits);
    for (final share in shares) {
      net.putIfAbsent(share.member, () => 0);
      net[share.member] = net[share.member]! - share.shareMinor;
    }
  }

  // Create order index for stable sorting
  final orderIndex = {
    for (int i = 0; i < memberOrder.length; i++) memberOrder[i]: i,
  };

  // Create balance list
  final balances = memberOrder
      .map((member) => _MemberBalance(member, net[member] ?? 0))
      .toList();

  final settlements = <Settlement>[];

  if (balances.isEmpty) {
    return [];
  }

  // Match creditors with debtors
  while (true) {
    balances.sort((a, b) {
      if (b.balance != a.balance) {
        return b.balance.compareTo(a.balance);
      }
      return (orderIndex[a.name] ?? 0).compareTo(orderIndex[b.name] ?? 0);
    });

    final creditor = balances.first;
    final debtor = balances.last;
    final amount = creditor.balance < debtor.balance.abs()
        ? creditor.balance
        : debtor.balance.abs();

    if (amount == 0) {
      break;
    }

    creditor.balance -= amount;
    debtor.balance += amount;
    settlements.add(
      Settlement(
        from: debtor.name,
        to: creditor.name,
        amount: fromMinorUnits(amount, fractionDigits),
      ),
    );
  }

  return settlements;
}

/// Helper class for mutable balance tracking
class _MemberBalance {
  final String name;
  int balance;

  _MemberBalance(this.name, this.balance);
}

/// Represents a member's balance (paid, owed, net)
class MemberBalance {
  final String name;
  final double paid;
  final double owed;
  final double net;

  const MemberBalance({
    required this.name,
    required this.paid,
    required this.owed,
    required this.net,
  });

  @override
  String toString() =>
      'MemberBalance(name: $name, paid: $paid, owed: $owed, net: $net)';
}

/// Calculate each member's paid and owed balances
List<MemberBalance> calculateMemberBalances(
  List<ExpenseForSettlement> expenses,
  List<String> members,
  String currency,
) {
  final memberOrder = buildMemberOrder(members, expenses);
  final fractionDigits = getCurrencyFractionDigits(currency);
  final balances = <String, ({int paid, int owed})>{};

  // Initialize balances
  for (final member in memberOrder) {
    balances[member] = (paid: 0, owed: 0);
  }

  // Calculate paid and owed for each expense
  for (final expense in expenses) {
    final amountMinor = toMinorUnits(expense.amount, fractionDigits);

    // Add to payer's paid amount
    final payerBalance = balances[expense.paidBy] ?? (paid: 0, owed: 0);
    balances[expense.paidBy] = (
      paid: payerBalance.paid + amountMinor,
      owed: payerBalance.owed,
    );

    // Add shares to each participant's owed amount
    final shares = calculateExpenseShares(expense, memberOrder, fractionDigits);
    for (final share in shares) {
      final memberBalance = balances[share.member] ?? (paid: 0, owed: 0);
      balances[share.member] = (
        paid: memberBalance.paid,
        owed: memberBalance.owed + share.shareMinor,
      );
    }
  }

  // Convert to MemberBalance list
  return memberOrder.map((member) {
    final balance = balances[member] ?? (paid: 0, owed: 0);
    return MemberBalance(
      name: member,
      paid: fromMinorUnits(balance.paid, fractionDigits),
      owed: fromMinorUnits(balance.owed, fractionDigits),
      net: fromMinorUnits(balance.paid - balance.owed, fractionDigits),
    );
  }).toList();
}
