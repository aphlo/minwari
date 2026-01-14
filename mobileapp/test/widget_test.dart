import 'package:flutter_test/flutter_test.dart';

import 'package:minwari/lib/currency.dart';

void main() {
  group('Currency utilities', () {
    test('getCurrencySymbol returns correct symbols', () {
      expect(getCurrencySymbol('JPY'), '¥');
      expect(getCurrencySymbol('USD'), '\$');
      expect(getCurrencySymbol('EUR'), '€');
      expect(getCurrencySymbol('KRW'), '₩');
    });

    test('getCurrencyFractionDigits returns correct values', () {
      expect(getCurrencyFractionDigits('JPY'), 0);
      expect(getCurrencyFractionDigits('USD'), 2);
      expect(getCurrencyFractionDigits('KRW'), 0);
    });

    test('toMinorUnits and fromMinorUnits are inverse', () {
      expect(toMinorUnits(100.0, 0), 100);
      expect(toMinorUnits(100.50, 2), 10050);
      expect(fromMinorUnits(10050, 2), 100.50);
    });
  });
}
