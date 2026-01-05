"use client";

import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Select, SelectItem } from "@heroui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "./Input";

type Props = {
  groupId: string;
  members: string[];
};

export function AddExpenseForm({ groupId, members }: Props) {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(members[0] || "");
  const [splitWith, setSplitWith] = useState<string[]>(members);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

    const amountNum = Number(amount);
    if (!amount || Number.isNaN(amountNum) || amountNum <= 0) {
      newErrors.amount = "正しい金額を入力してください";
    }

    if (!description.trim()) {
      newErrors.description = "用途を入力してください";
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

      router.push(`/g/${groupId}`);
      router.refresh();
    } catch {
      alert("登録に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Amount - first field */}
      <Input
        name="amount"
        type="number"
        label="金額"
        labelPlacement="outside"
        placeholder="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        isRequired
        isInvalid={!!errors.amount}
        errorMessage={errors.amount}
        variant="bordered"
        radius="lg"
        className="mb-8"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">¥</span>
          </div>
        }
      />

      {/* Description */}
      <Input
        name="description"
        label="用途"
        labelPlacement="outside"
        placeholder="例：ランチ代"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        isRequired
        isInvalid={!!errors.description}
        errorMessage={errors.description}
        variant="bordered"
        radius="lg"
        className="mb-8"
      />

      {/* Paid By */}
      <Select
        label="支払者"
        labelPlacement="outside"
        placeholder="選択してください"
        selectedKeys={paidBy ? [paidBy] : []}
        onSelectionChange={(keys) => {
          const selected = Array.from(keys)[0];
          if (selected) setPaidBy(String(selected));
        }}
        isRequired
        isInvalid={!!errors.paidBy}
        errorMessage={errors.paidBy}
        variant="bordered"
        radius="lg"
        className="mb-2"
      >
        {members.map((member) => (
          <SelectItem key={member}>{member}</SelectItem>
        ))}
      </Select>

      {/* Split With - checkboxes */}
      <div className="mb-8">
        <span className="block text-sm font-medium text-foreground mb-4">
          割り勘メンバー
          <span className="text-danger ml-1">*</span>
        </span>
        <div className="grid grid-cols-2 gap-3">
          {members.map((member) => (
            <Checkbox
              key={member}
              isSelected={splitWith.includes(member)}
              onValueChange={() => toggleSplitMember(member)}
              size="lg"
              classNames={{
                base: "max-w-full",
                label: "truncate min-w-0 flex-shrink text-sm",
              }}
            >
              {member}
            </Checkbox>
          ))}
        </div>
        {errors.splitWith && (
          <p className="mt-2 text-sm text-danger">{errors.splitWith}</p>
        )}
        <p className="mt-4 text-xs text-muted">
          選択したメンバーで均等に割り勘します
        </p>
      </div>

      <div className="space-y-3">
        <Button
          type="submit"
          color="primary"
          size="lg"
          radius="full"
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
          className="w-full font-medium"
        >
          {isSubmitting ? "追加中..." : "追加する"}
        </Button>
        <Button
          type="button"
          variant="bordered"
          size="lg"
          radius="full"
          onPress={() => router.push(`/g/${groupId}`)}
          className="w-full font-medium"
        >
          キャンセル
        </Button>
      </div>
    </form>
  );
}
