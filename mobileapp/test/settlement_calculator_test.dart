import 'package:flutter_test/flutter_test.dart';
import 'package:mobileapp/lib/settlement_calculator.dart';

void main() {
  group('Settlement calculator', () {
    test('calculates settlements for simple case', () {
      final expenses = [
        const ExpenseForSettlement(
          amount: 300,
          paidBy: 'A',
          splitWith: ['A', 'B', 'C'],
        ),
      ];
      final settlements =
          calculateSettlements(expenses, ['A', 'B', 'C'], 'JPY');

      expect(settlements.length, 2);
      // A paid 300, owes 100. Net: +200
      // B paid 0, owes 100. Net: -100
      // C paid 0, owes 100. Net: -100
      // Settlements: B->A 100, C->A 100
      expect(
        settlements.any((s) => s.from == 'B' && s.to == 'A' && s.amount == 100),
        true,
      );
      expect(
        settlements.any((s) => s.from == 'C' && s.to == 'A' && s.amount == 100),
        true,
      );
    });

    test('returns empty list when no expenses', () {
      final settlements = calculateSettlements([], ['A', 'B'], 'JPY');
      expect(settlements, isEmpty);
    });

    test('returns empty list when everyone is even', () {
      final expenses = [
        const ExpenseForSettlement(amount: 100, paidBy: 'A', splitWith: ['A']),
        const ExpenseForSettlement(amount: 100, paidBy: 'B', splitWith: ['B']),
      ];
      final settlements = calculateSettlements(expenses, ['A', 'B'], 'JPY');
      expect(settlements, isEmpty);
    });

    test('handles USD with fractions correctly', () {
      final expenses = [
        const ExpenseForSettlement(
          amount: 100.50,
          paidBy: 'A',
          splitWith: ['A', 'B'],
        ),
      ];
      final settlements = calculateSettlements(expenses, ['A', 'B'], 'USD');

      expect(settlements.length, 1);
      expect(settlements[0].from, 'B');
      expect(settlements[0].to, 'A');
      expect(settlements[0].amount, 50.25);
    });
  });
}
