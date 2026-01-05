import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ExpenseForm } from "@/client/components/forms/ExpenseForm";
import { Header } from "@/client/components/layout/Header";
import { loadExpenseEdit } from "@/server/loaders/expenseEditLoader";

type Props = {
  params: Promise<{ locale: string; groupId: string; expenseId: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { groupId, expenseId, locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const detail = await loadExpenseEdit(groupId, expenseId);

  if (!detail) {
    return { title: t("expenseNotFound") };
  }

  return {
    title: t("expenseEditTitle", {
      description: detail.expense.description,
      name: detail.group.name,
    }),
  };
}

export default async function EditExpensePage({ params }: Props) {
  const { groupId, expenseId } = await params;
  const t = await getTranslations("expenses");
  const detail = await loadExpenseEdit(groupId, expenseId);

  if (!detail) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-16 px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="animate-fade-in-up opacity-0 bg-card rounded-2xl border border-border p-6 shadow-sm">
            <h1 className="text-xl font-bold text-foreground mb-8">
              {t("edit.title")}
            </h1>
            <ExpenseForm
              groupId={groupId}
              members={detail.group.members}
              currency={detail.group.currency}
              expense={{
                id: detail.expense.id,
                description: detail.expense.description,
                amount: detail.expense.amount,
                paidBy: detail.expense.paidBy,
                splitWith: detail.expense.splitWith,
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
