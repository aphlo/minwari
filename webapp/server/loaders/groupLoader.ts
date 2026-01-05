import { getGroup } from "@/server/repositories/groupRepository";

export async function loadGroup(groupId: string) {
  return getGroup(groupId);
}
