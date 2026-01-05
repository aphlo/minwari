import { notFound } from "next/navigation";
import { ExpenseForm } from "@/client/components/forms/ExpenseForm";
import { Header } from "@/client/components/layout/Header";
import { getGroup } from "@/server/repositories/groupRepository";

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
    title: `立て替えを追加 | ${group.name} | みんなの割り勘`,
  };
}

export default async function AddExpensePage({ params }: Props) {
  const { groupId } = await params;
  const group = await getGroup(groupId);

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
              立て替えを追加
            </h1>
            <ExpenseForm groupId={groupId} members={group.members} />
          </div>
        </div>
      </main>
    </div>
  );
}
