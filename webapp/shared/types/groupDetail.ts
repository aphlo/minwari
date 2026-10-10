import type { CurrencyCode } from "@/shared/lib/currency";

export type GroupDetail = {
  group: {
    id: string;
    name: string;
    members: string[];
    currency: CurrencyCode;
    createdAt: string;
    updatedAt: string;
  };
  expenses: {
    id: string;
    groupId: string;
    description: string;
    amount: number;
    paidBy: string;
    splitWith: string[];
    createdAt: string;
    updatedAt: string;
  }[];
  settlements: { from: string; to: string; amount: number }[];
  balances: { name: string; paid: number; owed: number; net: number }[];
  totalAmount: number;
};
