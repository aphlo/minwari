import { FieldValue, type Timestamp } from "firebase-admin/firestore";
import type { CurrencyCode } from "@/shared/lib/currency";
import { defaultCurrency, isSupportedCurrency } from "@/shared/lib/currency";
import type { Group } from "@/shared/types/group";
import { getAdminFirestore } from "../lib/firebaseAdmin";

export type GroupRecord = {
  name: string;
  members: string[];
  currency: CurrencyCode;
};

export async function createGroup(record: GroupRecord) {
  const db = getAdminFirestore();
  const docRef = await db.collection("groups").add({
    name: record.name,
    members: record.members,
    currency: record.currency,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  return { id: docRef.id };
}

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

export async function updateGroup(
  groupId: string,
  data: { name: string; members: string[]; currency: CurrencyCode }
): Promise<void> {
  const db = getAdminFirestore();
  await db.collection("groups").doc(groupId).update({
    name: data.name,
    members: data.members,
    currency: data.currency,
    updatedAt: FieldValue.serverTimestamp(),
  });
}
