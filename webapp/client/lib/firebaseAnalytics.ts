import { type Analytics, getAnalytics, isSupported } from "firebase/analytics";
import { getFirebaseApp } from "@/client/lib/firebaseApp";

let analytics: Analytics | null = null;

export async function getAnalyticsSafe(): Promise<Analytics | null> {
  if (analytics) {
    return analytics;
  }

  if (typeof window === "undefined") {
    return null;
  }

  const firebaseApp = getFirebaseApp();
  if (!firebaseApp.options.measurementId) {
    return null;
  }

  const supported = await isSupported();
  if (!supported) {
    return null;
  }

  analytics = getAnalytics(firebaseApp);
  return analytics;
}
