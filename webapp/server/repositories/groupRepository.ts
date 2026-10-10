import type { Timestamp } from "firebase-admin/firestore";
import { defaultCurrency, isSupportedCurrency } from "@/shared/lib/currency";
import type { Group } from "@/shared/types/group";
import { getAdminFirestore } from "../lib/firebaseAdmin";

export async function getGroup(groupId: string): Promise<Group | null> {
  const db = getAdminFirestore();
  const docRef = await db.collection("groups").doc(groupId).get();

  if (!docRef.exists) {
    return null;
  }

  const data = docRef.data();
  if (!data) {
    return null;
  }

  return {
    id: docRef.id,
    name: data.name,
    members: data.members,
    currency: isSupportedCurrency(data.currency)
      ? data.currency
      : defaultCurrency,
    createdAt: (data.createdAt as Timestamp).toDate(),
    updatedAt: (data.updatedAt as Timestamp).toDate(),
  };
}
