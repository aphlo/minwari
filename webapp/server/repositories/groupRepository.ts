import { FieldValue } from "firebase-admin/firestore";
import { getAdminFirestore } from "../lib/firebaseAdmin";

export type GroupRecord = {
  name: string;
  members: string[];
  createdByUid: string;
};

export async function createGroup(record: GroupRecord) {
  const db = getAdminFirestore();
  const docRef = await db.collection("groups").add({
    name: record.name,
    members: record.members,
    createdByUid: record.createdByUid,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  return { id: docRef.id };
}
