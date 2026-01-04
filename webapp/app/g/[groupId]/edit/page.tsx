import Link from "next/link";
import { notFound } from "next/navigation";
import { EditGroupForm } from "@/client/components/EditGroupForm";
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
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center h-14">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted hover:text-foreground transition-colors"
            >
              <span className="text-xl font-semibold text-foreground">
                みんなの割り勘
              </span>
            </Link>
          </div>
        </div>
      </nav>

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
