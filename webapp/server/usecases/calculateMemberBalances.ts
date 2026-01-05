import type { Expense } from "@/shared/types/group";
import { buildMemberOrder, calculateExpenseShares } from "./settlementUtils";

type MemberBalance = {
  name: string;
  paid: number;
  owed: number;
  net: number;
};

type BalanceMap = Map<string, { paid: number; owed: number }>;

const ensureBalance = (balances: BalanceMap, name: string) => {
  if (!balances.has(name)) {
    balances.set(name, { paid: 0, owed: 0 });
  }
};

export function calculateMemberBalances(
  expenses: Expense[],
  members: string[]
): MemberBalance[] {
  const memberOrder = buildMemberOrder(members, expenses);
  const balances: BalanceMap = new Map();

  for (const member of memberOrder) {
    balances.set(member, { paid: 0, owed: 0 });
  }

  for (const expense of expenses) {
    ensureBalance(balances, expense.paidBy);
    balances.get(expense.paidBy)!.paid += expense.amount;

    const shares = calculateExpenseShares(expense, memberOrder);
    for (const { member, share } of shares) {
      ensureBalance(balances, member);
      balances.get(member)!.owed += share;
    }
  }

  return memberOrder.map((member) => {
    const balance = balances.get(member) ?? { paid: 0, owed: 0 };
    return {
      name: member,
      paid: balance.paid,
      owed: balance.owed,
      net: balance.paid - balance.owed,
    };
  });
}
