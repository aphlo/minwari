"use client";

import Link from "next/link";
import { useState } from "react";
import { AddExpenseModal } from "./AddExpenseModal";
import { Button } from "./Button";
import { ExpenseList } from "./ExpenseList";
import { Header } from "./Header";
import { SettlementSection } from "./SettlementSection";

type SerializedGroup = {
  id: string;
  name: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
};

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
  group: SerializedGroup;
  initialExpenses: SerializedExpense[];
};

export function GroupDetailClient({ group, initialExpenses }: Props) {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleExpenseAdded = (newExpense: SerializedExpense) => {
    setExpenses((prev) => [newExpense, ...prev]);
    setIsAddModalOpen(false);
  };

  const handleExpenseDeleted = (expenseId: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== expenseId));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="pt-20 pb-16 px-6 lg:px-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Group Summary */}
          <div className="animate-fade-in-up opacity-0 bg-card rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-foreground truncate">
                  {group.name}
                </h1>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.members.map((member) => (
                    <span
                      key={member}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-bg-secondary text-foreground"
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href={`/g/${group.id}/edit`}
                className="flex-shrink-0 ml-4 p-2 rounded-full hover:bg-bg-secondary transition-colors"
                aria-label="グループを編集"
              >
                <svg
                  className="w-5 h-5 text-muted"
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

          {/* Add Expense Button */}
          <div className="animate-fade-in-up delay-100 opacity-0">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsAddModalOpen(true)}
              className="w-full"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              立て替えを追加
            </Button>
          </div>

          {/* Expense List */}
          <div className="animate-fade-in-up delay-200 opacity-0">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              記録一覧
            </h2>
            <ExpenseList
              groupId={group.id}
              expenses={expenses}
              onExpenseDeleted={handleExpenseDeleted}
            />
          </div>

          {/* Settlement Section */}
          <div className="animate-fade-in-up delay-300 opacity-0">
            <SettlementSection expenses={expenses} members={group.members} />
          </div>
        </div>
      </main>

      {/* Add Expense Modal */}
      <AddExpenseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        groupId={group.id}
        members={group.members}
        onExpenseAdded={handleExpenseAdded}
      />
    </div>
  );
}
