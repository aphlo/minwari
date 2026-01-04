import { FieldValue, type Timestamp } from "firebase-admin/firestore";
import type { Expense } from "@/shared/types/group";
import { getAdminFirestore } from "../lib/firebaseAdmin";

export type ExpenseRecord = {
  groupId: string;
  description: string;
  amount: number;
  paidBy: string;
  splitWith: string[];
};

export async function createExpense(
  record: ExpenseRecord
): Promise<{ id: string }> {
  const db = getAdminFirestore();
  const docRef = await db
    .collection("groups")
    .doc(record.groupId)
    .collection("expenses")
    .add({
      description: record.description,
      amount: record.amount,
      paidBy: record.paidBy,
      splitWith: record.splitWith,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
  return { id: docRef.id };
}

export async function getExpenses(groupId: string): Promise<Expense[]> {
  const db = getAdminFirestore();
  const snapshot = await db
    .collection("groups")
    .doc(groupId)
    .collection("expenses")
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      groupId,
      description: data.description,
      amount: data.amount,
      paidBy: data.paidBy,
      splitWith: data.splitWith,
      createdAt: (data.createdAt as Timestamp).toDate(),
      updatedAt: (data.updatedAt as Timestamp).toDate(),
    };
  });
}

export async function deleteExpense(
  groupId: string,
  expenseId: string
): Promise<void> {
  const db = getAdminFirestore();
  await db
    .collection("groups")
    .doc(groupId)
    .collection("expenses")
    .doc(expenseId)
    .delete();
}
