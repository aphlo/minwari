"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const t = useTranslations("marketing.footer");

  return (
    <footer className="py-6 px-6 lg:px-8 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            href="/terms"
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            {t("terms")}
          </Link>
          <Link
            href="/privacy"
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            {t("privacy")}
          </Link>
          <Link
            href="/contact"
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            {t("contact")}
          </Link>
        </div>
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
