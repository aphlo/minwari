"use client";

import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Select, SelectItem } from "@heroui/select";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { appCheckFetch } from "@/client/lib/appCheckFetch";
import { useRouter } from "@/i18n/navigation";
import type { CurrencyCode } from "@/shared/lib/currency";
import {
  getCurrencyFractionDigits,
  getCurrencySymbol,
  normalizeCurrencyAmount,
} from "@/shared/lib/currency";
import { Input } from "./Input";

type ExpenseData = {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitWith: string[];
};

type Props = {
  groupId: string;
  members: string[];
  currency: CurrencyCode;
  expense?: ExpenseData;
};

export function ExpenseForm({ groupId, members, currency, expense }: Props) {
  const router = useRouter();
  const t = useTranslations("forms.expense");
  const isEditing = !!expense;

  const [description, setDescription] = useState(expense?.description ?? "");
  const [amount, setAmount] = useState(
    expense?.amount ? String(expense.amount) : ""
  );
  const [paidBy, setPaidBy] = useState(expense?.paidBy ?? members[0] ?? "");
  const [splitWith, setSplitWith] = useState<string[]>(
    expense?.splitWith ?? members
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleSplitMember = (member: string) => {
    setSplitWith((prev) =>
      prev.includes(member)
        ? prev.filter((m) => m !== member)
        : [...prev, member]
    );
  };

  const fractionDigits = getCurrencyFractionDigits(currency);
  const amountStep = Number((1 / 10 ** fractionDigits).toFixed(fractionDigits));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    const amountNum = Number(amount);
    if (!amount || Number.isNaN(amountNum) || amountNum <= 0) {
      newErrors.amount = t("errors.amount");
    }

    if (!description.trim()) {
      newErrors.description = t("errors.description");
    }

    if (!paidBy) {
      newErrors.paidBy = t("errors.paidBy");
    }

    if (splitWith.length === 0) {
      newErrors.splitWith = t("errors.splitWith");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const url = isEditing
        ? `/api/groups/${groupId}/expenses/${expense.id}`
        : `/api/groups/${groupId}/expenses`;

      const res = await appCheckFetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: description.trim(),
          amount: normalizeCurrencyAmount(amountNum, fractionDigits),
          paidBy,
          splitWith,
        }),
      });

      if (!res.ok) {
        throw new Error(
          isEditing ? "Failed to update expense" : "Failed to create expense"
        );
      }

      router.push(`/groups/${groupId}`);
      router.refresh();
    } catch {
      alert(isEditing ? t("errors.updateFailed") : t("errors.createFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitLabel = isEditing
    ? isSubmitting
      ? t("actions.updating")
      : t("actions.update")
    : isSubmitting
      ? t("actions.creating")
      : t("actions.create");

  return (
    <form onSubmit={handleSubmit}>
      {/* Amount - first field */}
      <Input
        name="amount"
        type="number"
        label={t("fields.amount.label")}
        labelPlacement="outside"
        placeholder={t("fields.amount.placeholder")}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        isRequired
        isInvalid={!!errors.amount}
        errorMessage={errors.amount}
        variant="bordered"
        radius="lg"
        className="mb-8"
        min={amountStep}
        step={amountStep}
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">
              {getCurrencySymbol(currency)}
            </span>
          </div>
        }
      />

      {/* Description */}
      <Input
        name="description"
        label={t("fields.description.label")}
        labelPlacement="outside"
        placeholder={t("fields.description.placeholder")}
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
        label={t("fields.paidBy.label")}
        labelPlacement="outside"
        placeholder={t("fields.paidBy.placeholder")}
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
          {t("fields.splitWith.label")}
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
          {t("fields.splitWith.helper")}
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
          {submitLabel}
        </Button>
        <Button
          type="button"
          variant="bordered"
          size="lg"
          radius="full"
          onPress={() => router.push(`/groups/${groupId}`)}
          className="w-full font-medium"
        >
          {t("actions.cancel")}
        </Button>
      </div>
    </form>
  );
}
