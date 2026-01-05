import assert from "node:assert/strict";
import test from "node:test";
import type { Expense } from "../../../shared/types/group";
import { calculateSettlements } from "../calculateSettlements";

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

test("calculates settlements for the sample history", () => {
  const expenses = [
    createExpense({ amount: 121, paidBy: "A", splitWith: ["A", "B", "C"] }),
    createExpense({ amount: 98, paidBy: "B", splitWith: ["A", "B", "C"] }),
    createExpense({ amount: 10, paidBy: "C", splitWith: ["A", "B", "C"] }),
    createExpense({ amount: 10, paidBy: "C", splitWith: ["A", "B"] }),
    createExpense({ amount: 50, paidBy: "C", splitWith: ["A"] }),
  ];

  const settlements = calculateSettlements(expenses, ["A", "B", "C"]);

  assert.deepEqual(settlements, [
    { from: "A", to: "B", amount: 11 },
    { from: "C", to: "B", amount: 7 },
  ]);
});

test("assigns rounding differences to the payer when included", () => {
  const expenses = [
    createExpense({ amount: 101, paidBy: "A", splitWith: ["A", "B", "C"] }),
  ];

  const settlements = calculateSettlements(expenses, ["A", "B", "C"]).sort(
    (a, b) => a.from.localeCompare(b.from)
  );

  assert.deepEqual(settlements, [
    { from: "B", to: "A", amount: 34 },
    { from: "C", to: "A", amount: 34 },
  ]);
});

test("handles a lender who is not part of the split", () => {
  const expenses = [
    createExpense({ amount: 50, paidBy: "C", splitWith: ["A"] }),
  ];

  const settlements = calculateSettlements(expenses, ["A", "B", "C"]);

  assert.deepEqual(settlements, [{ from: "A", to: "C", amount: 50 }]);
});

test("returns empty settlements when there are no expenses", () => {
  const settlements = calculateSettlements([], ["A", "B"]);

  assert.deepEqual(settlements, []);
});
