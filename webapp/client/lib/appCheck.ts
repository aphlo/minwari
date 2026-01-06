"use client";

import {
  type AppCheck,
  getToken,
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "firebase/app-check";
import { getFirebaseApp } from "./firebaseApp";

const appCheckSiteKey = process.env.NEXT_PUBLIC_FIREBASE_APP_CHECK_SITE_KEY;

function assertAppCheckSiteKey(
  value: string | undefined
): asserts value is string {
  if (!value) {
    throw new Error("app_check_site_key_missing");
  }
}

let appCheckInstance: AppCheck | null = null;

function initAppCheck() {
  if (appCheckInstance) {
    return appCheckInstance;
  }

  if (
    process.env.NEXT_PUBLIC_APP_CHECK_DEBUG === "true" &&
    typeof window !== "undefined"
  ) {
    (
      window as Window & { FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean }
    ).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }

  assertAppCheckSiteKey(appCheckSiteKey);
  appCheckInstance = initializeAppCheck(getFirebaseApp(), {
    provider: new ReCaptchaV3Provider(appCheckSiteKey),
    isTokenAutoRefreshEnabled: true,
  });

  return appCheckInstance;
}

export async function getAppCheckToken() {
  const appCheck = initAppCheck();
  const { token } = await getToken(appCheck, false);
  return token;
}
