"use client";

import { Select, SelectItem } from "@heroui/select";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("locales");
  const orderedLocales = [
    "en",
    ...routing.locales.filter((supportedLocale) => supportedLocale !== "en"),
  ];

  return (
    <Select
      aria-label={t("label")}
      selectedKeys={[locale]}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        if (selected) {
          router.replace(pathname, { locale: String(selected) });
        }
      }}
      radius="full"
      size="sm"
      className="w-auto"
      classNames={{
        base: "w-auto max-w-[180px]",
        trigger:
          "h-8 w-auto min-w-[120px] max-w-[180px] border border-border bg-bg-secondary text-xs font-medium text-foreground shadow-none",
        value: "text-xs truncate",
        popoverContent: "min-w-[200px]",
      }}
    >
      {orderedLocales.map((supportedLocale) => (
        <SelectItem key={supportedLocale}>{t(supportedLocale)}</SelectItem>
      ))}
    </Select>
  );
}
