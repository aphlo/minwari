"use client";

import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Input } from "./Input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (isOpen) {
      setDescription("");
      setAmount("");
      setPaidBy(members[0] || "");
      setSplitWith(members);
      setErrors({});
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="bottom-center"
      scrollBehavior="inside"
      classNames={{
        base: "sm:max-w-md",
        backdrop: "bg-black/50 backdrop-blur-sm",
      }}
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            立て替えを追加
          </ModalHeader>
          <ModalBody className="gap-6">
            <Input
              name="description"
              label="何に使った？"
              labelPlacement="outside"
              placeholder="例：ランチ代"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              isRequired
              isInvalid={!!errors.description}
              errorMessage={errors.description}
              variant="bordered"
              radius="lg"
            />

            <Input
              name="amount"
              type="number"
              label="いくら？"
              labelPlacement="outside"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              isRequired
              isInvalid={!!errors.amount}
              errorMessage={errors.amount}
              variant="bordered"
              radius="lg"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">¥</span>
                </div>
              }
            />

            <Select
              label="誰が払った？"
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
            >
              {members.map((member) => (
                <SelectItem key={member}>{member}</SelectItem>
              ))}
            </Select>

            <div>
              <span className="block text-sm font-medium text-foreground mb-2">
                誰で割り勘？
                <span className="text-danger ml-1">*</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {members.map((member) => (
                  <Chip
                    key={member}
                    variant={splitWith.includes(member) ? "solid" : "bordered"}
                    color={splitWith.includes(member) ? "primary" : "default"}
                    className="cursor-pointer"
                    onClick={() => toggleSplitMember(member)}
                  >
                    {member}
                  </Chip>
                ))}
              </div>
              {errors.splitWith && (
                <p className="mt-2 text-sm text-danger">{errors.splitWith}</p>
              )}
              <p className="mt-2 text-xs text-muted">
                選択したメンバーで均等に割り勘します
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              onPress={onClose}
              radius="full"
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              color="primary"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              radius="full"
            >
              {isSubmitting ? "追加中..." : "追加する"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
