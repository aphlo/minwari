import { getExpenses } from "@/server/repositories/expenseRepository";
import { getGroup } from "@/server/repositories/groupRepository";
import { calculateMemberBalances } from "@/server/usecases/calculateMemberBalances";
import {
  fromMinorUnits,
  getCurrencyFractionDigits,
  toMinorUnits,
} from "@/shared/lib/currency";

export async function loadSettlementDetail(groupId: string) {
  const group = await getGroup(groupId);
  if (!group) {
    return null;
  }

  const expenses = await getExpenses(groupId);
  const balances = calculateMemberBalances(
    expenses,
    group.members,
    group.currency
  );
  const fractionDigits = getCurrencyFractionDigits(group.currency);
  const totalMinor = expenses.reduce(
    (sum, expense) => sum + toMinorUnits(expense.amount, fractionDigits),
    0
  );
  const totalAmount = fromMinorUnits(totalMinor, fractionDigits);

  return {
    group,
    expenses,
    balances,
    totalAmount,
  };
}
