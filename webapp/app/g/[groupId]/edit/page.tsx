import { notFound } from "next/navigation";
import { EditGroupForm } from "@/client/components/EditGroupForm";
import { Header } from "@/client/components/Header";
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
    title: `${group.name}を編集 | みんなの割り勘`,
    description: `${group.name}のグループ情報を編集`,
  };
}

export default async function EditGroupPage({ params }: Props) {
  const { groupId } = await params;
  const group = await getGroup(groupId);

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
            />
          </div>
        </div>
      </main>
    </div>
  );
}
