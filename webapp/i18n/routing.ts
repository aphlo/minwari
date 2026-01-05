import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ja", "en", "zh-CN", "ko", "zh-TW", "es", "pt-BR"],
  defaultLocale: "en",
});

export type AppLocale = (typeof routing.locales)[number];
