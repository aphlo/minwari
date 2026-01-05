import { notFound } from "next/navigation";
import { ExpenseForm } from "@/client/components/forms/ExpenseForm";
import { Header } from "@/client/components/layout/Header";
import { getExpense } from "@/server/repositories/expenseRepository";
import { getGroup } from "@/server/repositories/groupRepository";

type Props = {
  params: Promise<{ groupId: string; expenseId: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { groupId, expenseId } = await params;
  const group = await getGroup(groupId);
  const expense = await getExpense(groupId, expenseId);

  if (!group || !expense) {
    return { title: "記録が見つかりません" };
  }

  return {
    title: `${expense.description}を編集 | ${group.name} | みんなの割り勘`,
  };
}

export default async function EditExpensePage({ params }: Props) {
  const { groupId, expenseId } = await params;
  const group = await getGroup(groupId);

  if (!group) {
    notFound();
  }

  const expense = await getExpense(groupId, expenseId);

  if (!expense) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-16 px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="animate-fade-in-up opacity-0 bg-card rounded-2xl border border-border p-6 shadow-sm">
            <h1 className="text-xl font-bold text-foreground mb-8">
              立て替えを編集
            </h1>
            <ExpenseForm
              groupId={groupId}
              members={group.members}
              expense={{
                id: expense.id,
                description: expense.description,
                amount: expense.amount,
                paidBy: expense.paidBy,
                splitWith: expense.splitWith,
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
