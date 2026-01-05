import { getExpense } from "@/server/repositories/expenseRepository";
import { getGroup } from "@/server/repositories/groupRepository";

export async function loadExpenseEdit(groupId: string, expenseId: string) {
  const group = await getGroup(groupId);
  if (!group) {
    return null;
  }

  const expense = await getExpense(groupId, expenseId);
  if (!expense) {
    return null;
  }

  return { group, expense };
}
