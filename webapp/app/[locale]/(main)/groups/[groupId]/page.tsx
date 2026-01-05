import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { GroupDetailClient } from "@/client/components/groups/GroupDetailClient";
import { loadGroupDetail } from "@/server/loaders/groupDetailLoader";
import { loadGroup } from "@/server/loaders/groupLoader";

type Props = {
  params: Promise<{ locale: string; groupId: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { groupId, locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const group = await loadGroup(groupId);

  if (!group) {
    return { title: t("groupNotFound") };
  }

  return {
    title: t("groupTitle", { name: group.name }),
    description: t("groupDescription", { name: group.name }),
  };
}

export default async function GroupDetailPage({ params }: Props) {
  const { groupId } = await params;
  const detail = await loadGroupDetail(groupId);

  if (!detail) {
    notFound();
  }

  return (
    <GroupDetailClient
      group={detail.serializedGroup}
      initialExpenses={detail.serializedExpenses}
      initialSettlements={detail.settlements}
    />
  );
}
