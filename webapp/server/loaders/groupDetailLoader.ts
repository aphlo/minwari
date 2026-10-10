import { getExpenses } from "@/server/repositories/expenseRepository";
import { getGroup } from "@/server/repositories/groupRepository";
import { calculateMemberBalances } from "@/server/usecases/calculateMemberBalances";
import { calculateSettlements } from "@/server/usecases/calculateSettlements";
import {
  fromMinorUnits,
  getCurrencyFractionDigits,
  toMinorUnits,
} from "@/shared/lib/currency";
import type { GroupDetail } from "@/shared/types/groupDetail";

export async function loadGroupDetail(
  groupId: string
): Promise<GroupDetail | null> {
  const group = await getGroup(groupId);
  if (!group) return null;
  const expenses = await getExpenses(groupId);
  const fractionDigits = getCurrencyFractionDigits(group.currency);
  return {
    group: {
      ...group,
      createdAt: group.createdAt.toISOString(),
      updatedAt: group.updatedAt.toISOString(),
    },
    expenses: expenses.map((expense) => ({
      ...expense,
      createdAt: expense.createdAt.toISOString(),
      updatedAt: expense.updatedAt.toISOString(),
    })),
    settlements: calculateSettlements(expenses, group.members, group.currency),
    balances: calculateMemberBalances(expenses, group.members, group.currency),
    totalAmount: fromMinorUnits(
      expenses.reduce(
        (sum, expense) => sum + toMinorUnits(expense.amount, fractionDigits),
        0
      ),
      fractionDigits
    ),
  };
}
