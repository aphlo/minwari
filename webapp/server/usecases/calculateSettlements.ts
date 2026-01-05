import {
  type CurrencyCode,
  fromMinorUnits,
  getCurrencyFractionDigits,
  toMinorUnits,
} from "@/shared/lib/currency";
import type { Expense, Settlement } from "@/shared/types/group";
import { buildMemberOrder, calculateExpenseShares } from "./settlementUtils";

type NetMap = Map<string, number>;

const ensureMember = (net: NetMap, name: string) => {
  if (!net.has(name)) {
    net.set(name, 0);
  }
};

export function calculateSettlements(
  expenses: Expense[],
  members: string[],
  currency: CurrencyCode
): Settlement[] {
  const net = new Map<string, number>();
  const memberOrder = buildMemberOrder(members, expenses);
  const fractionDigits = getCurrencyFractionDigits(currency);

  for (const member of memberOrder) {
    net.set(member, 0);
  }

  for (const expense of expenses) {
    const amountMinor = toMinorUnits(expense.amount, fractionDigits);
    ensureMember(net, expense.paidBy);
    net.set(expense.paidBy, (net.get(expense.paidBy) ?? 0) + amountMinor);

    const shares = calculateExpenseShares(expense, memberOrder, fractionDigits);
    shares.forEach(({ member, shareMinor }) => {
      ensureMember(net, member);
      net.set(member, (net.get(member) ?? 0) - shareMinor);
    });
  }

  const orderIndex = new Map(
    memberOrder.map((member, index) => [member, index])
  );
  const balances = memberOrder.map((member) => ({
    name: member,
    balance: net.get(member) ?? 0,
  }));
  const settlements: Settlement[] = [];

  while (true) {
    balances.sort((a, b) => {
      if (b.balance !== a.balance) {
        return b.balance - a.balance;
      }
      return (orderIndex.get(a.name) ?? 0) - (orderIndex.get(b.name) ?? 0);
    });

    const creditor = balances[0];
    const debtor = balances[balances.length - 1];
    const amount = Math.min(creditor.balance, Math.abs(debtor.balance));

    if (amount === 0) {
      break;
    }

    creditor.balance -= amount;
    debtor.balance += amount;
    settlements.push({
      from: debtor.name,
      to: creditor.name,
      amount: fromMinorUnits(amount, fractionDigits),
    });
  }

  return settlements;
}
