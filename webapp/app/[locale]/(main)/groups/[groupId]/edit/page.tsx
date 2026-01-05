import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { EditGroupForm } from "@/client/components/forms/EditGroupForm";
import { Header } from "@/client/components/layout/Header";
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
    title: t("groupEditTitle", { name: group.name }),
    description: t("groupEditDescription", { name: group.name }),
  };
}

export default async function EditGroupPage({ params }: Props) {
  const { groupId } = await params;
  const group = await loadGroup(groupId);

  if (!group) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="pt-20 pb-16 px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="animate-fade-in-up delay-100 opacity-0 bg-card rounded-2xl border border-border p-8 shadow-sm">
            <EditGroupForm
              groupId={group.id}
              initialName={group.name}
              initialMembers={group.members}
              initialCurrency={group.currency}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
