import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:minwari/lib/currency.dart';
import 'package:minwari/lib/settlement_calculator.dart';
import 'package:minwari/theme/app_theme_extension.dart';
import 'package:minwari/widgets/section_header.dart';

class SettlementList extends StatelessWidget {
  final List<Settlement> settlements;
  final String currency;
  final bool hasExpenses;

  const SettlementList({
    super.key,
    required this.settlements,
    required this.currency,
    this.hasExpenses = true,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Icon(
              CupertinoIcons.square_stack_3d_up,
              size: 20,
              color: context.textPrimary,
            ),
            const SizedBox(width: 8),
            LargeSectionHeader(title: context.l10n.settlement),
          ],
        ),
        const SizedBox(height: 12),
        _buildContent(context),
      ],
    );
  }

  Widget _buildContent(BuildContext context) {
    // No expenses yet - show "add expenses" message
    if (!hasExpenses) {
      return Container(
        padding: const EdgeInsets.symmetric(vertical: 32, horizontal: 24),
        decoration: BoxDecoration(
          color: context.cardBackground,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                CupertinoIcons.creditcard,
                size: 48,
                color: context.textSecondary.withValues(alpha: 0.5),
              ),
              const SizedBox(height: 16),
              Text(
                context.l10n.settlementNoExpenses,
                style: TextStyle(
                  fontSize: 14,
                  color: context.textSecondary,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      );
    }

    // Has expenses but all settled
    if (settlements.isEmpty) {
      return Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: context.cardBackground,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: Colors.green.withValues(alpha: 0.3),
            style: BorderStyle.solid,
          ),
        ),
        child: Center(
          child: Column(
            children: [
              Icon(
                CupertinoIcons.checkmark_circle,
                size: 48,
                color: Colors.green.withValues(alpha: 0.5),
              ),
              const SizedBox(height: 16),
              Text(
                context.l10n.noSettlementsNeeded,
                style: const TextStyle(
                  fontSize: 17,
                  color: Colors.green,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                context.l10n.everyoneEven,
                style: TextStyle(
                  fontSize: 15,
                  color: context.textSecondary,
                ),
              ),
            ],
          ),
        ),
      );
    }

    // Has settlements to show
    final symbol = getCurrencySymbol(currency);
    final fractionDigits = getCurrencyFractionDigits(currency);

    return Container(
      decoration: BoxDecoration(
        color: context.cardBackground,
        borderRadius: BorderRadius.circular(16),
      ),
      child: ListView.separated(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: settlements.length,
        separatorBuilder: (context, index) => Divider(
          height: 1,
          indent: 16,
          color: context.dividerColor,
        ),
        itemBuilder: (context, index) {
          final settlement = settlements[index];
          return Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Expanded(
                  child: Row(
                    children: [
                      Text(
                        settlement.from,
                        style: TextStyle(
                          fontSize: 17,
                          fontWeight: FontWeight.w600,
                          color: context.textPrimary,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 12),
                        child: Icon(
                          CupertinoIcons.arrow_right,
                          size: 16,
                          color: context.textSecondary,
                        ),
                      ),
                      Text(
                        settlement.to,
                        style: TextStyle(
                          fontSize: 17,
                          fontWeight: FontWeight.w600,
                          color: context.textPrimary,
                        ),
                      ),
                    ],
                  ),
                ),
                Text(
                  '$symbol${settlement.amount.toStringAsFixed(fractionDigits)}',
                  style: TextStyle(
                    fontSize: 17,
                    fontWeight: FontWeight.w600,
                    color: context.primaryColor,
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
