import 'package:flutter/widgets.dart';
import 'package:minwari/lib/currency.dart';
import 'package:minwari/theme/app_theme_extension.dart';

extension CurrencyLocalization on BuildContext {
  String getLocalizedCurrencyName(String code) {
    final l10n = this.l10n;
    switch (code) {
      case 'JPY':
        return l10n.currencyJPY;
      case 'USD':
        return l10n.currencyUSD;
      case 'EUR':
        return l10n.currencyEUR;
      case 'CNY':
        return l10n.currencyCNY;
      case 'KRW':
        return l10n.currencyKRW;
      case 'TWD':
        return l10n.currencyTWD;
      default:
        return '$code (${getCurrencySymbol(code)})';
    }
  }
}
