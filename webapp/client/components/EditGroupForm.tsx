"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

type Props = {
  groupId: string;
  initialName: string;
  initialMembers: string[];
};

export function EditGroupForm({ groupId, initialName, initialMembers }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [groupName, setGroupName] = useState(initialName);
  const [members, setMembers] = useState<{ id: string; name: string }[]>(
    initialMembers.map((name) => ({
      id: Math.random().toString(36).substring(7),
      name,
    }))
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addMember = () => {
    setMembers([
      ...members,
      { id: Math.random().toString(36).substring(7), name: "" },
    ]);
  };

  const removeMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const updateMember = (id: string, name: string) => {
    setMembers(members.map((m) => (m.id === id ? { ...m, name } : m)));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    if (!groupName.trim()) {
      newErrors.groupName = "グループ名を入力してください";
    }

    members.forEach((member) => {
      if (!member.name.trim()) {
        newErrors[`member-${member.id}`] = "メンバー名を入力してください";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/groups/${groupId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupName,
          members: members.map((member) => member.name),
        }),
      });

      if (!response.ok) {
        throw new Error("update_group_failed");
      }

      router.push(`/g/${groupId}`);
      router.refresh();
    } catch (error) {
      console.error("Failed to update group:", error);
      setErrors({
        groupName: "グループの更新に失敗しました。もう一度お試しください。",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <Input
          id="groupName"
          name="groupName"
          label="グループ名"
          placeholder="例：沖縄旅行2024"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
          error={errors.groupName}
        />
      </div>

      <div className="space-y-4">
        <span className="block text-sm font-medium text-foreground mb-2">
          メンバー名
        </span>

        <div className="space-y-3">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="flex gap-2 items-start animate-fade-in"
            >
              <div className="flex-1">
                <Input
                  id={`member-${member.id}`}
                  name={`member-${member.id}`}
                  placeholder={`メンバー ${index + 1}`}
                  value={member.name}
                  onChange={(e) => updateMember(member.id, e.target.value)}
                  error={errors[`member-${member.id}`]}
                />
              </div>
              {members.length > 0 && (
                <button
                  type="button"
                  onClick={() => removeMember(member.id)}
                  className="mt-1 p-2 text-muted hover:text-red-500 transition-colors rounded-full hover:bg-bg-tertiary"
                  aria-label="メンバーを削除"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addMember}
          className="flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors px-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
          メンバーを追加する
        </button>
      </div>

      <div className="pt-4 space-y-3">
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
              更新中...
            </span>
          ) : (
            "変更を保存"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/g/${groupId}`)}
          className="w-full"
          size="lg"
        >
          戻る
        </Button>
      </div>
    </form>
  );
}
