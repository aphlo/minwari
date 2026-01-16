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

  // Distribute remainder to non-payers (from the end) so payer gets more back
  const remainder = amountMinor - perPerson * count;
  for (let i = 0; i < remainder; i++) {
    const targetIndex = shares.length - 1 - i;
    if (targetIndex > 0) {
      // Assign to non-payer participants
      shares[targetIndex] += 1;
    } else {
      // If only payer is participating, assign to payer
      shares[0] += 1;
    }
  }

  return orderedParticipants.map((member, index) => ({
    member,
    shareMinor: shares[index],
  }));
};
