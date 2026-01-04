"use client";

import { useState } from "react";

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

type Props = {
  groupId: string;
  expenses: SerializedExpense[];
  onExpenseDeleted: (expenseId: string) => void;
};

export function ExpenseList({ groupId, expenses, onExpenseDeleted }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (expenseId: string) => {
    if (!confirm("この記録を削除しますか？")) {
      return;
    }

    setDeletingId(expenseId);
    try {
      const res = await fetch(`/api/groups/${groupId}/expenses/${expenseId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onExpenseDeleted(expenseId);
      }
    } catch {
      alert("削除に失敗しました");
    } finally {
      setDeletingId(null);
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-bg-secondary rounded-2xl p-8 text-center">
        <svg
          className="w-12 h-12 mx-auto text-muted/30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p className="mt-4 text-muted">まだ記録がありません</p>
        <p className="mt-1 text-sm text-muted/70">
          「立て替えを追加」から記録を追加しましょう
        </p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      month: "short",
      day: "numeric",
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(amount);
  };

  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="bg-card rounded-xl border border-border p-4 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted">
                  {formatDate(expense.createdAt)}
                </span>
              </div>
              <h3 className="font-medium text-foreground mt-1 truncate">
                {expense.description}
              </h3>
              <p className="text-sm text-muted mt-1">
                <span className="text-primary font-medium">
                  {expense.paidBy}
                </span>
                が支払い
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {expense.splitWith.map((member) => (
                  <span
                    key={member}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-bg-secondary text-muted"
                  >
                    {member}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 ml-4 flex flex-col items-end gap-2">
              <span className="text-lg font-semibold text-foreground">
                {formatAmount(expense.amount)}
              </span>
              <button
                type="button"
                onClick={() => handleDelete(expense.id)}
                disabled={deletingId === expense.id}
                className="p-1 rounded-full text-muted hover:text-[#ff3b30] hover:bg-[#ff3b30]/10 transition-colors disabled:opacity-50"
                aria-label="削除"
              >
                {deletingId === expense.id ? (
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
