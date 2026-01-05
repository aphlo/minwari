import type { Expense, Settlement } from "@/shared/types/group";

type NetMap = Map<string, number>;

const ensureMember = (net: NetMap, name: string) => {
  if (!net.has(name)) {
    net.set(name, 0);
  }
};

const buildMemberOrder = (members: string[], expenses: Expense[]) => {
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

export function calculateSettlements(
  expenses: Expense[],
  members: string[]
): Settlement[] {
  const net = new Map<string, number>();
  const memberOrder = buildMemberOrder(members, expenses);

  for (const member of memberOrder) {
    net.set(member, 0);
  }

  for (const expense of expenses) {
    const participants =
      expense.splitWith.length > 0 ? expense.splitWith : memberOrder;
    const count = participants.length;
    if (count === 0) {
      continue;
    }
    const perPerson = Math.round(expense.amount / count);
    const orderedParticipants = participants.includes(expense.paidBy)
      ? [expense.paidBy, ...participants.filter((m) => m !== expense.paidBy)]
      : [...participants];

    ensureMember(net, expense.paidBy);
    net.set(expense.paidBy, (net.get(expense.paidBy) ?? 0) + expense.amount);

    const shares = orderedParticipants.map(() => perPerson);
    shares[0] += expense.amount - perPerson * count;

    orderedParticipants.forEach((member, index) => {
      ensureMember(net, member);
      const share = shares[index];
      net.set(member, (net.get(member) ?? 0) - share);
    });
  }

  const orderIndex = new Map(
    memberOrder.map((member, index) => [member, index])
  );
  const balances = memberOrder.map((member) => ({
    name: member,
    balance: net.get(member) ?? 0,
  }));
  const settlements: Settlement[] = [];

  while (true) {
    balances.sort((a, b) => {
      if (b.balance !== a.balance) {
        return b.balance - a.balance;
      }
      return (orderIndex.get(a.name) ?? 0) - (orderIndex.get(b.name) ?? 0);
    });

    const creditor = balances[0];
    const debtor = balances[balances.length - 1];
    const amount = Math.min(creditor.balance, Math.abs(debtor.balance));

    if (amount === 0) {
      break;
    }

    creditor.balance -= amount;
    debtor.balance += amount;
    settlements.push({ from: debtor.name, to: creditor.name, amount });
  }

  return settlements;
}
