import assert from "node:assert/strict";
import test from "node:test";
import type { Expense } from "../../../shared/types/group";
import { buildMemberOrder, calculateExpenseShares } from "../settlementUtils";

const createExpense = (
  partial: Partial<Expense> & Pick<Expense, "amount" | "paidBy" | "splitWith">
): Expense => ({
  id: partial.id ?? "expense",
  groupId: partial.groupId ?? "group",
  description: partial.description ?? "expense",
  amount: partial.amount,
  paidBy: partial.paidBy,
  splitWith: partial.splitWith,
  createdAt: partial.createdAt ?? new Date(0),
  updatedAt: partial.updatedAt ?? new Date(0),
});

test("buildMemberOrder appends participants not in group list", () => {
  const expenses = [
    createExpense({ amount: 10, paidBy: "D", splitWith: ["A", "D"] }),
    createExpense({ amount: 5, paidBy: "B", splitWith: ["B", "E"] }),
  ];

  const order = buildMemberOrder(["A", "B", "C"], expenses);

  assert.deepEqual(order, ["A", "B", "C", "D", "E"]);
});

test("calculateExpenseShares assigns rounding difference to payer", () => {
  const expense = createExpense({
    amount: 101,
    paidBy: "A",
    splitWith: ["A", "B", "C"],
  });

  const shares = calculateExpenseShares(expense, ["A", "B", "C"]);

  assert.deepEqual(shares, [
    { member: "A", share: 35 },
    { member: "B", share: 33 },
    { member: "C", share: 33 },
  ]);
});

test("calculateExpenseShares handles payer not in participants", () => {
  const expense = createExpense({
    amount: 50,
    paidBy: "C",
    splitWith: ["A"],
  });

  const shares = calculateExpenseShares(expense, ["A", "B", "C"]);

  assert.deepEqual(shares, [{ member: "A", share: 50 }]);
});
