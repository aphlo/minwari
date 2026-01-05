"use client";

type SerializedExpense = {
  id: string;
  groupId: string;
  description: string;
  amount: number;
  paidBy: string;
  splitWith: string[];
  createdAt: string;
  updatedAt: string;
};

type SerializedSettlement = {
  from: string;
  to: string;
  amount: number;
};

type Props = {
  expenses: SerializedExpense[];
  members: string[];
  settlements: SerializedSettlement[];
};

export function SettlementSection({ expenses, members, settlements }: Props) {
  // 合計金額を計算
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(amount);
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
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
        精算
      </h2>

      {/* 合計金額 */}
      <div className="mb-4 p-4 bg-bg-secondary rounded-xl">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">合計金額</span>
          <span className="text-xl font-bold text-foreground">
            {formatAmount(totalAmount)}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-muted">メンバー数</span>
          <span className="text-sm font-medium text-foreground">
            {members.length}人
          </span>
        </div>
      </div>

      {/* 精算内容（サーバー実装後に表示） */}
      {expenses.length === 0 ? (
        <div className="text-center py-6">
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
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="mt-3 text-muted text-sm">
            立て替えを記録すると精算内容が表示されます
          </p>
        </div>
      ) : settlements.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-border rounded-xl">
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
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p className="mt-3 text-muted text-sm">全員の精算が完了しています</p>
        </div>
      ) : (
        <div className="space-y-3">
          {settlements.map((settlement) => (
            <div
              key={`${settlement.from}-${settlement.to}-${settlement.amount}`}
              className="flex items-center justify-between rounded-xl border border-border bg-bg-secondary px-4 py-3"
            >
              <div className="flex items-center gap-2 text-sm text-foreground">
                <span className="font-semibold">{settlement.from}</span>
                <span className="text-muted">→</span>
                <span className="font-semibold">{settlement.to}</span>
              </div>
              <div className="text-sm font-semibold text-foreground">
                {formatAmount(settlement.amount)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
