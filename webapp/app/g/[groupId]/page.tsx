import { notFound } from "next/navigation";
import { GroupDetailClient } from "@/client/components/groups/GroupDetailClient";
import { getExpenses } from "@/server/repositories/expenseRepository";
import { getGroup } from "@/server/repositories/groupRepository";
import { calculateSettlements } from "@/server/usecases/calculateSettlements";

type Props = {
  params: Promise<{ groupId: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { groupId } = await params;
  const group = await getGroup(groupId);

  if (!group) {
    return { title: "グループが見つかりません" };
  }

  return {
    title: `${group.name} | みんなの割り勘`,
    description: `${group.name}の割り勘を管理`,
  };
}

export default async function GroupDetailPage({ params }: Props) {
  const { groupId } = await params;
  const group = await getGroup(groupId);

  if (!group) {
    notFound();
  }

  const expenses = await getExpenses(groupId);
  const settlements = calculateSettlements(expenses, group.members);

  const serializedGroup = {
    ...group,
    createdAt: group.createdAt.toISOString(),
    updatedAt: group.updatedAt.toISOString(),
  };

  const serializedExpenses = expenses.map((e) => ({
    ...e,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  }));

  return (
    <GroupDetailClient
      group={serializedGroup}
      initialExpenses={serializedExpenses}
      initialSettlements={settlements}
    />
  );
}
