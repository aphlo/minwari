"use client";

import { Chip } from "@heroui/chip";
import Link from "next/link";
import { getMemberChipColor } from "@/client/lib/memberColor";

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
};

export function ExpenseList({ groupId, expenses }: Props) {
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
              <h3 className="font-medium text-foreground truncate">
                {expense.description}
              </h3>
              <p className="text-sm text-muted mt-1">
                <span className="text-primary font-medium">
                  {expense.paidBy}
                </span>
                が支払い
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {expense.splitWith.map((member) => (
                  <Chip
                    key={member}
                    color={getMemberChipColor(member)}
                    variant="flat"
                    size="sm"
                  >
                    {member}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 ml-4 flex flex-col items-end gap-2">
              <span className="text-lg font-semibold text-foreground">
                {formatAmount(expense.amount)}
              </span>
              <Link
                href={`/g/${groupId}/expenses/${expense.id}/edit`}
                className="p-1 rounded-full text-muted hover:bg-bg-secondary transition-colors"
                aria-label="編集"
              >
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
