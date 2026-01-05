"use client";

import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const t = useTranslations("marketing.footer");

  return (
    <footer className="py-6 px-6 lg:px-8 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
        <div className="flex items-center justify-between gap-4">
          <LanguageSwitcher />
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
