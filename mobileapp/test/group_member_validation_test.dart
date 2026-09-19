import 'package:flutter_test/flutter_test.dart';
import 'package:minwari/models/expense.dart';

void main() {
  group('Member deletion validation in group expenses', () {
    final expenses = [
      Expense(
        id: 'e1',
        groupId: 'g1',
        description: 'Dinner',
        amount: 3000,
        paidBy: 'Alice',
        splitWith: ['Alice', 'Bob'],
        createdAt: DateTime.now(),
      ),
      Expense(
        id: 'e2',
        groupId: 'g1',
        description: 'Taxi',
        amount: 1500,
        paidBy: 'Bob',
        splitWith: ['Alice', 'Bob', 'Charlie'],
        createdAt: DateTime.now(),
      ),
    ];

    bool isMemberUsedInExpenses(String member, List<Expense> expenseList) {
      final trimmed = member.trim();
      if (trimmed.isEmpty) return false;
      return expenseList.any((e) =>
          e.paidBy == trimmed || e.splitWith.contains(trimmed));
    }

    test('Alice is paidBy in e1, so cannot be deleted', () {
      expect(isMemberUsedInExpenses('Alice', expenses), isTrue);
    });

    test('Charlie is in splitWith in e2, so cannot be deleted', () {
      expect(isMemberUsedInExpenses('Charlie', expenses), isTrue);
    });

    test('Dave is not in any expenses, so can be deleted', () {
      expect(isMemberUsedInExpenses('Dave', expenses), isFalse);
    });

    test('Empty name or whitespace is not treated as used', () {
      expect(isMemberUsedInExpenses('   ', expenses), isFalse);
    });
  });
}
