import { createGroup } from "../repositories/groupRepository";

export type CreateGroupInput = {
  groupName: string;
  members: string[];
  createdByUid: string;
};

export async function createGroupUsecase(input: CreateGroupInput) {
  const groupName = input.groupName.trim();
  if (!groupName) {
    throw new Error("groupName_required");
  }

  const members = input.members
    .map((member) => member.trim())
    .filter((member) => member.length > 0);

  return createGroup({
    name: groupName,
    members,
    createdByUid: input.createdByUid,
  });
}
