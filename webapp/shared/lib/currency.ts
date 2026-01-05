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

export const currencyFractionDigits: Record<CurrencyCode, number> = {
  JPY: 0,
  USD: 2,
  EUR: 2,
  CNY: 2,
  KRW: 0,
  TWD: 2,
};

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

export const getCurrencyFractionDigits = (code: CurrencyCode) =>
  currencyFractionDigits[code] ?? 2;

export const toMinorUnits = (amount: number, fractionDigits: number) => {
  const factor = 10 ** fractionDigits;
  return Math.round(amount * factor);
};

export const fromMinorUnits = (amountMinor: number, fractionDigits: number) => {
  const factor = 10 ** fractionDigits;
  return amountMinor / factor;
};

export const normalizeCurrencyAmount = (
  amount: number,
  fractionDigits: number
) => fromMinorUnits(toMinorUnits(amount, fractionDigits), fractionDigits);
