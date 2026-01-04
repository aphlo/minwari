export type CreateGroupRequest = {
  groupName: string;
  members: string[];
};

export type CreateGroupResponse = {
  id: string;
};
