import { defaultCurrency, isSupportedCurrency } from "@/shared/lib/currency";
import { createGroup } from "../repositories/groupRepository";

export type CreateGroupInput = {
  groupName: string;
  members: string[];
  currency?: string;
};

export async function createGroupUsecase(input: CreateGroupInput) {
  const groupName = input.groupName.trim();
  if (!groupName) {
    throw new Error("groupName_required");
  }

  const members = input.members
    .map((member) => member.trim())
    .filter((member) => member.length > 0);

  const candidateCurrency = input.currency ?? "";
  const currency = isSupportedCurrency(candidateCurrency)
    ? candidateCurrency
    : defaultCurrency;

  return createGroup({
    name: groupName,
    members,
    currency,
  });
}
