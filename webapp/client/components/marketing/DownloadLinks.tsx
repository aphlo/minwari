"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/routing";

const appStoreBadgeWidths: Record<AppLocale, number> = {
  en: 119.66407,
  ja: 108.85157,
  "zh-CN": 108.85157,
  "zh-TW": 108.85157,
  ko: 129.70071,
  es: 119.66407,
  "pt-BR": 119.66407,
};

export function DownloadLinks() {
  const t = useTranslations("download");
  const app = useTranslations("app");
  const locale = useLocale() as AppLocale;
  return (
    <section
      id="download"
      className="scroll-mt-20 max-w-lg mx-auto px-6 py-12 text-center space-y-4"
    >
      <Image
        src="/images/app-icon.png"
        alt={app("name")}
        width={90}
        height={90}
        className="mx-auto mb-6 rounded-[20px] shadow-sm"
      />
      <h2 className="text-2xl font-bold">{t("title")}</h2>
      <p className="text-muted">{t("description")}</p>
      <div className="flex flex-wrap items-center justify-center gap-6 py-3">
        <a
          className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          href="https://apps.apple.com/app/oursplit/id6758257890"
        >
          <Image
            src={`/images/store-badges/app-store-${locale}.svg`}
            alt={t("ios")}
            width={appStoreBadgeWidths[locale]}
            height={40}
            className="h-12 w-auto"
          />
        </a>
        <a
          className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          href="https://play.google.com/store/apps/details?id=com.aphlo.minwari"
        >
          <Image
            src={`/images/store-badges/google-play-${locale}.svg`}
            alt={t("android")}
            width={locale === "ja" ? 180 : 238.96}
            height={locale === "ja" ? 53.333599 : 70.87}
            className="h-12 w-auto"
          />
        </a>
      </div>
    </section>
  );
}
