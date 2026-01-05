import { type CurrencyCode, defaultCurrency } from "./currency";

const localeCurrencyMap: Record<string, CurrencyCode> = {
  ja: "JPY",
  en: "USD",
  "zh-CN": "CNY",
  ko: "KRW",
  "zh-TW": "TWD",
  es: "EUR",
  "pt-BR": "USD",
};

export const getDefaultCurrencyForLocale = (
  locale: string | undefined
): CurrencyCode => localeCurrencyMap[locale ?? ""] ?? defaultCurrency;
