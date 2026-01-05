export const supportedCurrencies = [
  { code: "JPY", symbol: "¥" },
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "CNY", symbol: "¥" },
  { code: "KRW", symbol: "₩" },
  { code: "TWD", symbol: "NT$" },
] as const;

export type CurrencyCode = (typeof supportedCurrencies)[number]["code"];

export const defaultCurrency: CurrencyCode = "JPY";

export const currencySymbolMap: Record<CurrencyCode, string> =
  supportedCurrencies.reduce(
    (acc, currency) => {
      acc[currency.code] = currency.symbol;
      return acc;
    },
    {} as Record<CurrencyCode, string>
  );

export const isSupportedCurrency = (value: string): value is CurrencyCode =>
  supportedCurrencies.some((currency) => currency.code === value);

export const getCurrencySymbol = (code: CurrencyCode) =>
  currencySymbolMap[code] ?? code;
