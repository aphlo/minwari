import type { Timestamp } from "firebase-admin/firestore";
import type { Expense } from "@/shared/types/group";
import { getAdminFirestore } from "../lib/firebaseAdmin";

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
