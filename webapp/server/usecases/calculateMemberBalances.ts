import {
  type CurrencyCode,
  fromMinorUnits,
  getCurrencyFractionDigits,
  toMinorUnits,
} from "@/shared/lib/currency";
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
  members: string[],
  currency: CurrencyCode
): MemberBalance[] {
  const memberOrder = buildMemberOrder(members, expenses);
  const balances: BalanceMap = new Map();
  const fractionDigits = getCurrencyFractionDigits(currency);

  for (const member of memberOrder) {
    balances.set(member, { paid: 0, owed: 0 });
  }

  for (const expense of expenses) {
    const amountMinor = toMinorUnits(expense.amount, fractionDigits);
    ensureBalance(balances, expense.paidBy);
    balances.get(expense.paidBy)!.paid += amountMinor;

    const shares = calculateExpenseShares(expense, memberOrder, fractionDigits);
    for (const { member, shareMinor } of shares) {
      ensureBalance(balances, member);
      balances.get(member)!.owed += shareMinor;
    }
  }

  return memberOrder.map((member) => {
    const balance = balances.get(member) ?? { paid: 0, owed: 0 };
    return {
      name: member,
      paid: fromMinorUnits(balance.paid, fractionDigits),
      owed: fromMinorUnits(balance.owed, fractionDigits),
      net: fromMinorUnits(balance.paid - balance.owed, fractionDigits),
    };
  });
}
