"use client";

import type { CurrencyCode } from "@/shared/lib/currency";
import { GroupForm } from "./GroupForm";

type Props = {
  groupId: string;
  initialName: string;
  initialMembers: string[];
  initialCurrency: CurrencyCode;
};

export function EditGroupForm({
  groupId,
  initialName,
  initialMembers,
  initialCurrency,
}: Props) {
  return (
    <GroupForm
      mode="edit"
      groupId={groupId}
      initialName={initialName}
      initialMembers={initialMembers}
      initialCurrency={initialCurrency}
      namespace="forms.editGroup"
    />
  );
}
