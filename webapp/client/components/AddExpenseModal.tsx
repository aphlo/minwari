"use client";

import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

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
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  members: string[];
  onExpenseAdded: (expense: SerializedExpense) => void;
};

export function AddExpenseModal({
  isOpen,
  onClose,
  groupId,
  members,
  onExpenseAdded,
}: Props) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(members[0] || "");
  const [splitWith, setSplitWith] = useState<string[]>(members);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isPaidByDropdownOpen, setIsPaidByDropdownOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDescription("");
      setAmount("");
      setPaidBy(members[0] || "");
      setSplitWith(members);
      setErrors({});
      setIsPaidByDropdownOpen(false);
    }
  }, [isOpen, members]);

  const toggleSplitMember = (member: string) => {
    setSplitWith((prev) =>
      prev.includes(member)
        ? prev.filter((m) => m !== member)
        : [...prev, member]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!description.trim()) {
      newErrors.description = "内容を入力してください";
    }

    const amountNum = Number(amount);
    if (!amount || Number.isNaN(amountNum) || amountNum <= 0) {
      newErrors.amount = "正しい金額を入力してください";
    }

    if (!paidBy) {
      newErrors.paidBy = "支払った人を選択してください";
    }

    if (splitWith.length === 0) {
      newErrors.splitWith = "割り勘メンバーを選択してください";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/groups/${groupId}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: description.trim(),
          amount: amountNum,
          paidBy,
          splitWith,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create expense");
      }

      const { id } = await res.json();

      const newExpense: SerializedExpense = {
        id,
        groupId,
        description: description.trim(),
        amount: amountNum,
        paidBy,
        splitWith,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      onExpenseAdded(newExpense);
    } catch {
      alert("登録に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-default"
        onClick={onClose}
        aria-label="閉じる"
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-md bg-background rounded-t-2xl sm:rounded-2xl shadow-xl animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background z-10 px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            立て替えを追加
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-bg-secondary transition-colors"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <Input
            name="description"
            label="何に使った？"
            placeholder="例：ランチ代"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={errors.description}
            required
          />

          <Input
            name="amount"
            type="number"
            label="いくら？"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            error={errors.amount}
            required
          />

          <div>
            <label
              htmlFor="paidBy"
              className="block text-sm font-medium text-foreground mb-2"
            >
              誰が払った？
              <span className="text-[#ff3b30] ml-1">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsPaidByDropdownOpen(!isPaidByDropdownOpen)}
                className={`
                  w-full px-4 py-3 text-left flex items-center justify-between
                  rounded-xl border
                  ${
                    errors.paidBy
                      ? "border-[#ff3b30]"
                      : isPaidByDropdownOpen
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-border hover:border-muted"
                  }
                  bg-background text-foreground transition-all duration-200
                `}
              >
                <span>{paidBy || "選択してください"}</span>
                <svg
                  className={`w-5 h-5 text-muted transition-transform duration-200 ${
                    isPaidByDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isPaidByDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-card border border-border rounded-xl shadow-lg max-h-60 overflow-auto animate-scale-in origin-top">
                  {members.map((member) => (
                    <button
                      key={member}
                      type="button"
                      onClick={() => {
                        setPaidBy(member);
                        setIsPaidByDropdownOpen(false);
                      }}
                      className={`
                        w-full px-4 py-3 text-left transition-colors
                        ${
                          paidBy === member
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-foreground hover:bg-bg-secondary"
                        }
                      `}
                    >
                      {member}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.paidBy && (
              <p className="mt-2 text-sm text-[#ff3b30]">{errors.paidBy}</p>
            )}
          </div>

          <div>
            <span className="block text-sm font-medium text-foreground mb-2">
              誰で割り勘？
              <span className="text-[#ff3b30] ml-1">*</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {members.map((member) => (
                <button
                  key={member}
                  type="button"
                  onClick={() => toggleSplitMember(member)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${
                      splitWith.includes(member)
                        ? "bg-primary text-white"
                        : "bg-bg-secondary text-foreground hover:bg-bg-secondary/80"
                    }
                  `}
                >
                  {member}
                </button>
              ))}
            </div>
            {errors.splitWith && (
              <p className="mt-2 text-sm text-[#ff3b30]">{errors.splitWith}</p>
            )}
            <p className="mt-2 text-xs text-muted">
              選択したメンバーで均等に割り勘します
            </p>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
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
                追加中...
              </span>
            ) : (
              "追加する"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
