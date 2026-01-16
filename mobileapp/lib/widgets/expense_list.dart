import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:minwari/l10n/generated/app_localizations.dart';
import 'package:minwari/lib/currency.dart';
import 'package:minwari/models/expense.dart';
import 'package:minwari/theme/app_theme_extension.dart';

/// Expense list widget showing group expenses
class ExpenseList extends StatelessWidget {
  final List<Expense> expenses;
  final String currency;

  const ExpenseList({
    super.key,
    required this.expenses,
    required this.currency,
  });

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);

    return Container(
      decoration: BoxDecoration(
        color: context.cardBackground,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: expenses.isEmpty
          ? _buildEmptyState(context)
          : _buildExpensesList(l10n, context),
    );
  }

  Widget _buildEmptyState(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 32, horizontal: 24),
      child: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              CupertinoIcons.doc_on_clipboard,
              size: 48,
              color: context.textSecondary.withValues(alpha: 0.5),
            ),
            const SizedBox(height: 16),
            Text(
              context.l10n.noRecordsYet,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
                color: context.textSecondary,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              context.l10n.noRecordsSubtitle,
              style: TextStyle(
                fontSize: 14,
                color: context.textSecondary.withValues(alpha: 0.7),
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildExpensesList(
    AppLocalizations? l10n,
    BuildContext context,
  ) {
    final symbol = getCurrencySymbol(currency);
    final fractionDigits = getCurrencyFractionDigits(currency);

    return Column(
      children: expenses.asMap().entries.map((entry) {
        final index = entry.key;
        final expense = entry.value;
        final isLast = index == expenses.length - 1;

        return Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          expense.description.isEmpty
                              ? context.l10n.noDescription
                              : expense.description,
                          style: const TextStyle(
                            fontSize: 17,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          '${context.l10n.paidBy} ${expense.paidBy}',
                          style: TextStyle(
                            fontSize: 15,
                            color: context.textSecondary,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Text(
                    '$symbol${expense.amount.toStringAsFixed(fractionDigits)}',
                    style: const TextStyle(
                      fontSize: 17,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
            if (!isLast)
              Divider(
                height: 0.5,
                thickness: 0.5,
                indent: 20,
                endIndent: 20,
                color: context.dividerColor,
              ),
          ],
        );
      }).toList(),
    );
  }
}
