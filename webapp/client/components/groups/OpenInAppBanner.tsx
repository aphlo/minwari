"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

const IOS_STORE_URL = "https://apps.apple.com/us/app/oursplit/id6758257890";
const ANDROID_PACKAGE = "com.aphlo.minwari";
const ANDROID_STORE_URL = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`;

type Platform = "ios" | "android" | null;

function detectMobilePlatform(): Platform {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  return null;
}

type Props = {
  groupId: string;
  onVisibilityChange?: (visible: boolean) => void;
};

export function OpenInAppBanner({ groupId, onVisibilityChange }: Props) {
  const t = useTranslations("group");
  const [platform, setPlatform] = useState<Platform>(null);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const detected = detectMobilePlatform();
    setPlatform(detected);
    if (detected) {
      const wasDismissed =
        sessionStorage.getItem("openInAppBannerDismissed") === "true";
      setDismissed(wasDismissed);
    }
  }, []);

  const visible = !!platform && !dismissed;

  useEffect(() => {
    onVisibilityChange?.(visible);
  }, [visible, onVisibilityChange]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    sessionStorage.setItem("openInAppBannerDismissed", "true");
  }, []);

  const handleOpen = useCallback(() => {
    const deepLink = `oursplit://groups/${groupId}`;

    if (platform === "android") {
      // Android intent URL with fallback to Play Store
      const intentUrl = `intent://groups/${groupId}#Intent;scheme=oursplit;package=${ANDROID_PACKAGE};S.browser_fallback_url=${encodeURIComponent(ANDROID_STORE_URL)};end`;
      window.location.href = intentUrl;
      return;
    }

    if (platform === "ios") {
      // Try custom scheme, fallback to App Store after timeout
      const timeout = setTimeout(() => {
        window.location.href = IOS_STORE_URL;
      }, 1500);

      const handleVisibilityChange = () => {
        if (document.hidden) {
          clearTimeout(timeout);
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange, {
        once: true,
      });

      window.location.href = deepLink;

      // Clean up listener after timeout period
      setTimeout(() => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      }, 2000);
    }
  }, [groupId, platform]);

  if (!visible) return null;

  return (
    <div className="fixed top-14 left-0 right-0 z-40 bg-primary/10 backdrop-blur-sm border-b border-primary/20 px-4 py-2.5 flex items-center gap-3 md:hidden">
      <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
        <svg
          className="w-4 h-4 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      </div>
      <p className="flex-1 text-sm text-foreground">{t("openInApp.banner")}</p>
      <button
        type="button"
        onClick={handleOpen}
        className="flex-shrink-0 px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-full hover:opacity-90 transition-opacity"
      >
        {t("openInApp.button")}
      </button>
      <button
        type="button"
        onClick={handleDismiss}
        className="flex-shrink-0 p-1 text-muted hover:text-foreground transition-colors"
        aria-label={t("openInApp.dismiss")}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
