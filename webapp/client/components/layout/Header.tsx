"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "../ui/ThemeToggle";

export function Header() {
  const t = useTranslations("app");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-semibold text-foreground">
              {t("name")}
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
