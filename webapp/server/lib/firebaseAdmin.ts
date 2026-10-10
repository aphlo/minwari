import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Use only the Cloud Run runtime identity (or local ADC). Never load a separate
// private key that could bypass the runtime service account's read-only IAM role.
export function getAdminFirestore() {
  const app =
    getApps()[0] ?? initializeApp({ credential: applicationDefault() });
  return getFirestore(app);
}
