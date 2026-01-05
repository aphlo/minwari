import { getExpenses } from "@/server/repositories/expenseRepository";
import { getGroup } from "@/server/repositories/groupRepository";
import { calculateSettlements } from "@/server/usecases/calculateSettlements";
import type { CurrencyCode } from "@/shared/lib/currency";

export type SerializedGroup = {
  id: string;
  name: string;
  members: string[];
  currency: CurrencyCode;
  createdAt: string;
  updatedAt: string;
};

export type SerializedExpense = {
  id: string;
  groupId: string;
  description: string;
  amount: number;
  paidBy: string;
  splitWith: string[];
  createdAt: string;
  updatedAt: string;
};

export type SerializedSettlement = {
  from: string;
  to: string;
  amount: number;
};

export async function loadGroupDetail(groupId: string) {
  const group = await getGroup(groupId);
  if (!group) {
    return null;
  }

  const expenses = await getExpenses(groupId);
  const settlements = calculateSettlements(expenses, group.members);

  const serializedGroup: SerializedGroup = {
    ...group,
    currency: group.currency,
    createdAt: group.createdAt.toISOString(),
    updatedAt: group.updatedAt.toISOString(),
  };

  const serializedExpenses: SerializedExpense[] = expenses.map((expense) => ({
    ...expense,
    createdAt: expense.createdAt.toISOString(),
    updatedAt: expense.updatedAt.toISOString(),
  }));

  return {
    group,
    serializedGroup,
    serializedExpenses,
    settlements,
  };
}
