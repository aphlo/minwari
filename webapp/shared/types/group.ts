import type { CurrencyCode } from "@/shared/lib/currency";

export type CreateGroupRequest = {
  groupName: string;
  members: string[];
  currency?: CurrencyCode;
};

export type CreateGroupResponse = {
  id: string;
};

export type Group = {
  id: string;
  name: string;
  members: string[];
  currency: CurrencyCode;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateGroupRequest = {
  groupName: string;
  members: string[];
  currency?: CurrencyCode;
};

export type Expense = {
  id: string;
  groupId: string;
  description: string;
  amount: number;
  paidBy: string;
  splitWith: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type CreateExpenseRequest = {
  description: string;
  amount: number;
  paidBy: string;
  splitWith: string[];
};

export type CreateExpenseResponse = {
  id: string;
};

export type Settlement = {
  from: string;
  to: string;
  amount: number;
};
