import assert from "node:assert/strict";
import test from "node:test";
import type { Expense } from "../../../shared/types/group";
import { calculateMemberBalances } from "../calculateMemberBalances";

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

test("returns paid, owed, and net per member", () => {
  const expenses = [
    createExpense({ amount: 121, paidBy: "A", splitWith: ["A", "B", "C"] }),
    createExpense({ amount: 98, paidBy: "B", splitWith: ["A", "B", "C"] }),
    createExpense({ amount: 10, paidBy: "C", splitWith: ["A", "B", "C"] }),
    createExpense({ amount: 10, paidBy: "C", splitWith: ["A", "B"] }),
    createExpense({ amount: 50, paidBy: "C", splitWith: ["A"] }),
  ];

  const balances = calculateMemberBalances(expenses, ["A", "B", "C"], "JPY");

  // Rounding remainders are assigned to non-payers, so payers get more back
  assert.deepEqual(balances, [
    { name: "A", paid: 121, owed: 131, net: -10 },
    { name: "B", paid: 98, owed: 81, net: 17 },
    { name: "C", paid: 70, owed: 77, net: -7 },
  ]);
});

test("includes members appearing only in expenses", () => {
  const expenses = [
    createExpense({ amount: 30, paidBy: "D", splitWith: ["A", "D"] }),
  ];

  const balances = calculateMemberBalances(expenses, ["A", "B"], "JPY");

  assert.deepEqual(balances, [
    { name: "A", paid: 0, owed: 15, net: -15 },
    { name: "B", paid: 0, owed: 0, net: 0 },
    { name: "D", paid: 30, owed: 15, net: 15 },
  ]);
});
