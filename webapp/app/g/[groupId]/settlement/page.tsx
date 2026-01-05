import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/client/components/layout/Header";
import { getExpenses } from "@/server/repositories/expenseRepository";
import { getGroup } from "@/server/repositories/groupRepository";
import { calculateMemberBalances } from "@/server/usecases/calculateMemberBalances";

type Props = {
  params: Promise<{ groupId: string }>;
};

export async function generateMetadata() {
  return {
    title: `精算詳細 | みんなの割り勘`,
    description: `精算詳細を確認`,
  };
}

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(amount);
};

export default async function SettlementDetailPage({ params }: Props) {
  const { groupId } = await params;
  const group = await getGroup(groupId);

  if (!group) {
    notFound();
  }

  const expenses = await getExpenses(groupId);
  const balances = calculateMemberBalances(expenses, group.members);
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-16 px-6 lg:px-8">
        <div className="max-w-md mx-auto space-y-6">
          <div>
            <h1 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              精算詳細
            </h1>
            <p className="text-sm text-muted mt-1">
              メンバー別の支出と負担を確認できます
            </p>
          </div>

          {expenses.length > 0 && (
            <div className="rounded-2xl border border-border bg-card px-4 py-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">グループ合計支出</span>
                <span className="text-lg font-semibold text-foreground">
                  {formatAmount(totalAmount)}
                </span>
              </div>
            </div>
          )}

          {expenses.length === 0 ? (
            <div className="bg-card rounded-2xl border border-border p-6 text-center shadow-sm">
              <svg
                className="w-10 h-10 mx-auto text-muted/30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="mt-3 text-muted text-sm">
                まだ精算できる立て替えがありません
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {balances.map((balance) => {
                const netAmount = Math.abs(balance.net);
                const netLabel =
                  balance.net > 0
                    ? "受け取り"
                    : balance.net < 0
                      ? "支払い"
                      : "差額なし";
                const netColor =
                  balance.net > 0
                    ? "text-primary"
                    : balance.net < 0
                      ? "text-danger"
                      : "text-muted";

                return (
                  <div
                    key={balance.name}
                    className="bg-card rounded-2xl border border-border p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-foreground">
                        {balance.name}
                      </span>
                      <div className={`text-sm font-semibold ${netColor}`}>
                        {netLabel}
                        {balance.net !== 0 && ` ${formatAmount(netAmount)}`}
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-xl bg-bg-secondary px-3 py-2">
                        <p className="text-muted">支出額</p>
                        <p className="mt-1 text-sm font-semibold text-foreground">
                          {formatAmount(balance.paid)}
                        </p>
                      </div>
                      <div className="rounded-xl bg-bg-secondary px-3 py-2">
                        <p className="text-muted">負担額</p>
                        <p className="mt-1 text-sm font-semibold text-foreground">
                          {formatAmount(balance.owed)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <Link
            href={`/g/${groupId}`}
            className="flex items-center justify-center rounded-full border border-border bg-bg-secondary px-4 py-3 text-sm font-medium text-foreground transition-colors"
          >
            戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
