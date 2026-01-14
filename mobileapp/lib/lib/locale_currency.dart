/// Locale-based default currency mapping.
///
/// Ported from webapp/shared/lib/localeCurrency.ts
library;

import 'currency.dart';

/// Mapping from locale to default currency
const localeCurrencyMap = <String, String>{
  'ja': 'JPY',
  'en': 'USD',
  'zh-CN': 'CNY',
  'ko': 'KRW',
  'zh-TW': 'TWD',
  'es': 'EUR',
  'pt-BR': 'USD',
};

/// Get the default currency for a given locale
String getDefaultCurrencyForLocale(String? locale) {
  if (locale == null) return defaultCurrency;
  return localeCurrencyMap[locale] ?? defaultCurrency;
}
