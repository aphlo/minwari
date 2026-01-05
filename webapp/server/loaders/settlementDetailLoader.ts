import { getExpenses } from "@/server/repositories/expenseRepository";
import { getGroup } from "@/server/repositories/groupRepository";
import { calculateMemberBalances } from "@/server/usecases/calculateMemberBalances";

export async function loadSettlementDetail(groupId: string) {
  const group = await getGroup(groupId);
  if (!group) {
    return null;
  }

  const expenses = await getExpenses(groupId);
  const balances = calculateMemberBalances(expenses, group.members);
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return {
    group,
    expenses,
    balances,
    totalAmount,
  };
}
