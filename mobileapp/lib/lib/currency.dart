/// Currency utilities for handling different currency types.
///
/// Ported from webapp/shared/lib/currency.ts
library;

/// Supported currency information
class CurrencyInfo {
  final String code;
  final String symbol;

  const CurrencyInfo(this.code, this.symbol);
}

/// List of supported currencies
const supportedCurrencies = [
  CurrencyInfo('JPY', '¥'),
  CurrencyInfo('USD', '\$'),
  CurrencyInfo('EUR', '€'),
  CurrencyInfo('CNY', '¥'),
  CurrencyInfo('KRW', '₩'),
  CurrencyInfo('TWD', 'NT\$'),
];

/// Supported currency codes
const supportedCurrencyCodes = ['JPY', 'USD', 'EUR', 'CNY', 'KRW', 'TWD'];

/// Default currency
const defaultCurrency = 'JPY';

/// Fraction digits for each currency
const currencyFractionDigits = <String, int>{
  'JPY': 0,
  'USD': 2,
  'EUR': 2,
  'CNY': 2,
  'KRW': 0,
  'TWD': 2,
};

/// Currency symbol map
final currencySymbolMap = {
  for (final currency in supportedCurrencies) currency.code: currency.symbol,
};

/// Check if a currency code is supported
bool isSupportedCurrency(String value) {
  return supportedCurrencyCodes.contains(value);
}

/// Get the symbol for a currency code
String getCurrencySymbol(String code) {
  return currencySymbolMap[code] ?? code;
}

/// Get the fraction digits for a currency code
int getCurrencyFractionDigits(String code) {
  return currencyFractionDigits[code] ?? 2;
}

/// Convert amount to minor units (e.g., dollars to cents)
int toMinorUnits(double amount, int fractionDigits) {
  final factor = _pow10(fractionDigits);
  return (amount * factor).round();
}

/// Convert amount from minor units (e.g., cents to dollars)
double fromMinorUnits(int amountMinor, int fractionDigits) {
  final factor = _pow10(fractionDigits);
  return amountMinor / factor;
}

/// Normalize currency amount to proper precision
double normalizeCurrencyAmount(double amount, int fractionDigits) {
  return fromMinorUnits(toMinorUnits(amount, fractionDigits), fractionDigits);
}

/// Helper function for power of 10
int _pow10(int exponent) {
  int result = 1;
  for (int i = 0; i < exponent; i++) {
    result *= 10;
  }
  return result;
}
