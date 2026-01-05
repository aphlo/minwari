import { toMinorUnits } from "@/shared/lib/currency";
import type { Expense } from "@/shared/types/group";

export const buildMemberOrder = (members: string[], expenses: Expense[]) => {
  const extras = new Set<string>();
  for (const expense of expenses) {
    if (!members.includes(expense.paidBy)) {
      extras.add(expense.paidBy);
    }
    for (const member of expense.splitWith) {
      if (!members.includes(member)) {
        extras.add(member);
      }
    }
  }
  return [...members, ...Array.from(extras).sort((a, b) => a.localeCompare(b))];
};

export const calculateExpenseShares = (
  expense: Expense,
  fallbackMembers: string[],
  fractionDigits: number
) => {
  const participants =
    expense.splitWith.length > 0 ? expense.splitWith : fallbackMembers;
  const count = participants.length;
  if (count === 0) {
    return [];
  }

  const amountMinor = toMinorUnits(expense.amount, fractionDigits);
  const perPerson = Math.floor(amountMinor / count);
  const orderedParticipants = participants.includes(expense.paidBy)
    ? [
        expense.paidBy,
        ...participants.filter((member) => member !== expense.paidBy),
      ]
    : [...participants];
  const shares = orderedParticipants.map(() => perPerson);
  shares[0] += amountMinor - perPerson * count;

  return orderedParticipants.map((member, index) => ({
    member,
    shareMinor: shares[index],
  }));
};
