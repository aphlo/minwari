import 'package:intl/intl.dart';
import 'package:minwari/lib/currency.dart';

/// Format currency amount with symbol and commas
/// e.g. "¥1,000", "$1,000.00"
String formatCurrency(double amount, String currencyCode) {
  final symbol = getCurrencySymbol(currencyCode);
  final fractionDigits = getCurrencyFractionDigits(currencyCode);

  return NumberFormat.currency(
    symbol: symbol,
    decimalDigits: fractionDigits,
  ).format(amount);
}
