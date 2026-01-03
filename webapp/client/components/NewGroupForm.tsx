"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

export function NewGroupForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    groupName?: string;
    userName?: string;
  }>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const groupName = formData.get("groupName") as string;
    const userName = formData.get("userName") as string;

    // Validation
    const newErrors: typeof errors = {};
    if (!groupName.trim()) {
      newErrors.groupName = "グループ名を入力してください";
    }
    if (!userName.trim()) {
      newErrors.userName = "あなたの名前を入力してください";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Firebase連携してグループを作成
      // 1. 匿名認証
      // 2. Firestoreにグループを作成
      // 3. メンバーを追加
      // 4. localStorageに履歴を保存
      // 5. グループページにリダイレクト

      // 仮のグループIDを生成（後でFirestoreの自動IDに置き換え）
      const mockGroupId = Math.random().toString(36).substring(2, 15);

      // デモ用：少し待ってからリダイレクト
      await new Promise((resolve) => setTimeout(resolve, 500));

      // グループページにリダイレクト
      router.push(`/g/${mockGroupId}`);
    } catch (error) {
      console.error("Failed to create group:", error);
      setErrors({
        groupName: "グループの作成に失敗しました。もう一度お試しください。",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        id="groupName"
        name="groupName"
        label="グループ名"
        placeholder="例：沖縄旅行2024"
        required
        error={errors.groupName}
      />

      <Input
        id="userName"
        name="userName"
        label="あなたの名前"
        placeholder="例：太郎"
        required
        error={errors.userName}
      />

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
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
              作成中...
            </span>
          ) : (
            "グループを作成"
          )}
        </Button>
      </div>
    </form>
  );
}
