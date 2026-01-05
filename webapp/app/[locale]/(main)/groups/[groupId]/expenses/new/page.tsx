import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ExpenseForm } from "@/client/components/forms/ExpenseForm";
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
    title: t("expenseAddTitle", { name: group.name }),
  };
}

export default async function AddExpensePage({ params }: Props) {
  const { groupId } = await params;
  const t = await getTranslations("expenses");
  const group = await loadGroup(groupId);

  if (!group) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-16 px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="animate-fade-in-up opacity-0 bg-card rounded-2xl border border-border p-6 shadow-sm">
            <h1 className="text-xl font-bold text-foreground mb-8">
              {t("add.title")}
            </h1>
            <ExpenseForm
              groupId={groupId}
              members={group.members}
              currency={group.currency}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
