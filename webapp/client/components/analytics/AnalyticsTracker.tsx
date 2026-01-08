"use client";

import { logEvent } from "firebase/analytics";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getAnalyticsSafe } from "@/client/lib/firebaseAnalytics";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    const track = async () => {
      const analytics = await getAnalyticsSafe();
      if (!analytics) {
        return;
      }

      const pagePath = search ? `${pathname}?${search}` : pathname;
      logEvent(analytics, "page_view", {
        page_location: window.location.href,
        page_path: pagePath,
        page_title: document.title,
      });
    };

    void track();
  }, [pathname, search]);

  return null;
}
