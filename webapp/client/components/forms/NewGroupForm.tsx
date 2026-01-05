"use client";

import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CreateGroupResponse } from "@/shared/types/group";
import { Input } from "./Input";
import { MemberListInput } from "./MemberListInput";

export function NewGroupForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [members, setMembers] = useState<{ id: string; name: string }[]>([
    { id: Math.random().toString(36).substring(7), name: "" },
  ]);
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

    const formData = new FormData(e.currentTarget);
    const groupName = formData.get("groupName") as string;

    // Validation
    const newErrors: typeof errors = {};
    if (!groupName.trim()) {
      newErrors.groupName = "グループ名を入力してください";
    }

    // Member validation
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
      const response = await fetch("/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupName,
          members: members.map((member) => member.name),
        }),
      });

      if (!response.ok) {
        throw new Error("create_group_failed");
      }

      const result = (await response.json()) as CreateGroupResponse;
      router.push(`/groups/${result.id}`);
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
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <Input
          name="groupName"
          label="グループ名"
          labelPlacement="outside"
          placeholder="例：沖縄旅行2024"
          isRequired
          isInvalid={!!errors.groupName}
          errorMessage={errors.groupName}
          variant="bordered"
          radius="lg"
        />
      </div>

      <MemberListInput
        members={members}
        errors={errors}
        onAdd={addMember}
        onRemove={removeMember}
        onUpdate={updateMember}
      />

      <div className="pt-4">
        <Button
          type="submit"
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
          color="primary"
          size="lg"
          radius="full"
          className="w-full font-medium"
        >
          {isSubmitting ? "作成中..." : "グループを作成"}
        </Button>
      </div>
    </form>
  );
}
