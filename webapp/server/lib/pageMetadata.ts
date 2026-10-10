import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const SITE_URL = "https://oursplit.aphlo.com";

export function pageMetadata(
  locale: string,
  path: string,
  title: string,
  description?: string
): Metadata {
  const url = `${SITE_URL}/${locale}/${path ? `${path}/` : ""}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries([
        ...routing.locales.map((language) => [
          language,
          `${SITE_URL}/${language}/${path ? `${path}/` : ""}`,
        ]),
        ["x-default", `${SITE_URL}/en/${path ? `${path}/` : ""}`],
      ]),
    },
    openGraph: { title, description, url, type: "website" },
  };
}
