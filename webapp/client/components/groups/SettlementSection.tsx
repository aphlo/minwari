"use client";

import Link from "next/link";

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
  settlements: SerializedSettlement[];
  groupId: string;
};

export function SettlementSection({ expenses, settlements, groupId }: Props) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(amount);
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-4 shadow-sm">
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
              className="flex items-center justify-between rounded-xl bg-bg-secondary px-4 py-2"
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

      {expenses.length > 0 && (
        <Link
          href={`/groups/${groupId}/settlement`}
          className="mt-4 flex items-center justify-center rounded-full border border-border bg-primary/10 px-4 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/15"
        >
          精算の詳細を確認
        </Link>
      )}
    </div>
  );
}
