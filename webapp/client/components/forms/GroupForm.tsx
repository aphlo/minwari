"use client";

import { Button } from "@heroui/button";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { CurrencySelect } from "@/client/components/forms/CurrencySelect";

import { useRouter } from "@/i18n/navigation";
import type { CurrencyCode } from "@/shared/lib/currency";
import { getDefaultCurrencyForLocale } from "@/shared/lib/localeCurrency";
import type { CreateGroupResponse } from "@/shared/types/group";
import { Input } from "./Input";
import { MemberListInput } from "./MemberListInput";

type Props = {
  mode: "create" | "edit";
  groupId?: string;
  initialName?: string;
  initialMembers?: string[];
  initialCurrency?: CurrencyCode;
  namespace: "forms.newGroup" | "forms.editGroup";
};

export function GroupForm({
  mode,
  groupId,
  initialName = "",
  initialMembers = [],
  initialCurrency,
  namespace,
}: Props) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations(namespace);
  const resolvedInitialCurrency =
    initialCurrency ?? getDefaultCurrencyForLocale(locale);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [groupName, setGroupName] = useState(initialName);
  const [currency, setCurrency] = useState<CurrencyCode>(
    resolvedInitialCurrency
  );
  const [members, setMembers] = useState<{ id: string; name: string }[]>(
    initialMembers.length > 0
      ? initialMembers.map((name, index) => ({
          id: `initial-member-${index}`,
          name,
        }))
      : [{ id: "initial-member-0", name: "" }]
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

    const newErrors: Record<string, string> = {};
    if (!groupName.trim()) {
      newErrors.groupName = t("errors.groupNameRequired");
    }

    // Filter out empty member names and check for duplicates
    const cleanedMembers = members
      .map((member) => member.name.trim())
      .filter((name) => name !== "");
    const uniqueMembers = new Set(cleanedMembers);
    if (uniqueMembers.size !== cleanedMembers.length) {
      newErrors.members = t("errors.memberDuplicate");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const url = mode === "edit" ? `/api/groups/${groupId}` : "/api/groups";
      const method = mode === "edit" ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupName,
          members: cleanedMembers,
          currency,
        }),
      });

      if (!response.ok) {
        throw new Error("group_submit_failed");
      }

      if (mode === "edit" && groupId) {
        router.push(`/groups/${groupId}`);
        router.refresh();
      } else {
        const result = (await response.json()) as CreateGroupResponse;
        router.push(`/groups/${result.id}`);
      }
    } catch (error) {
      console.error("Failed to submit group:", error);
      setErrors({
        groupName: t("errors.submitFailed"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-9">
        <Input
          name="groupName"
          label={t("fields.groupName.label")}
          labelPlacement="outside"
          placeholder={t("fields.groupName.placeholder")}
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          isRequired
          isInvalid={!!errors.groupName}
          errorMessage={errors.groupName}
          variant="bordered"
          radius="lg"
        />
      </div>

      <div className="mb-3">
        <CurrencySelect
          value={currency}
          onChange={setCurrency}
          isInvalid={!!errors.currency}
          errorMessage={errors.currency}
        />
      </div>

      <div className="mb-8">
        <MemberListInput
          members={members}
          errors={errors}
          onAdd={addMember}
          onRemove={removeMember}
          onUpdate={updateMember}
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
          color="primary"
          size="lg"
          radius="full"
          className="w-full font-medium"
        >
          {isSubmitting ? t("actions.submitting") : t("actions.submit")}
        </Button>
        {mode === "edit" && groupId ? (
          <div className="mt-3">
            <Button
              type="button"
              variant="bordered"
              size="lg"
              radius="full"
              onPress={() => router.push(`/groups/${groupId}`)}
              className="w-full font-medium"
            >
              {t("actions.back")}
            </Button>
          </div>
        ) : null}
      </div>
    </form>
  );
}
