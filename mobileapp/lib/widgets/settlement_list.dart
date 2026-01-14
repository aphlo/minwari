import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobileapp/l10n/generated/app_localizations.dart';
import 'package:mobileapp/lib/currency.dart';
import 'package:mobileapp/lib/settlement_calculator.dart';
import 'package:mobileapp/theme/app_colors.dart';
import 'package:mobileapp/widgets/section_header.dart';

/// Settlement list widget showing who pays whom
class SettlementList extends StatelessWidget {
  final List<Settlement> settlements;
  final String currency;

  const SettlementList({
    super.key,
    required this.settlements,
    required this.currency,
  });

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final cardBackground =
        isDark ? AppColors.darkCardBackground : AppColors.lightCardBackground;
    final textSecondary =
        isDark ? AppColors.darkTextSecondary : AppColors.lightTextSecondary;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        LargeSectionHeader(title: l10n?.settlement ?? 'Settlement'),
        const SizedBox(height: 12),
        Container(
          decoration: BoxDecoration(
            color: cardBackground,
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.04),
                blurRadius: 12,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: settlements.isEmpty
              ? _buildEmptyState(l10n, textSecondary)
              : _buildSettlementsList(isDark, textSecondary),
        ),
      ],
    );
  }

  Widget _buildEmptyState(AppLocalizations? l10n, Color textSecondary) {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Center(
        child: Column(
          children: [
            const Icon(
              CupertinoIcons.checkmark_circle,
              size: 40,
              color: Colors.green,
            ),
            const SizedBox(height: 12),
            Text(
              l10n?.noSettlementsNeeded ?? 'All settled!',
              style: const TextStyle(
                fontSize: 17,
                fontWeight: FontWeight.w600,
                color: Colors.green,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              l10n?.everyoneEven ?? 'Everyone is even',
              style: TextStyle(fontSize: 15, color: textSecondary),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSettlementsList(bool isDark, Color textSecondary) {
    final symbol = getCurrencySymbol(currency);
    final fractionDigits = getCurrencyFractionDigits(currency);

    return Column(
      children: settlements.asMap().entries.map((entry) {
        final index = entry.key;
        final settlement = entry.value;
        final isLast = index == settlements.length - 1;

        return Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
              child: Row(
                children: [
                  _buildMemberAvatar(settlement.from),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          settlement.from,
                          style: const TextStyle(
                            fontSize: 17,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(height: 2),
                        Row(
                          children: [
                            Icon(
                              CupertinoIcons.arrow_right,
                              size: 14,
                              color: textSecondary,
                            ),
                            const SizedBox(width: 4),
                            Text(
                              settlement.to,
                              style:
                                  TextStyle(fontSize: 15, color: textSecondary),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: AppColors.primaryColor.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      '$symbol${settlement.amount.toStringAsFixed(fractionDigits)}',
                      style: const TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.w700,
                        color: AppColors.primaryColor,
                      ),
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
                color: isDark ? AppColors.darkDivider : AppColors.lightDivider,
              ),
          ],
        );
      }).toList(),
    );
  }

  Widget _buildMemberAvatar(String name) {
    return Container(
      width: 44,
      height: 44,
      decoration: BoxDecoration(
        color: AppColors.primaryColor.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(22),
      ),
      child: Center(
        child: Text(
          name.isNotEmpty ? name[0].toUpperCase() : '?',
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.w700,
            color: AppColors.primaryColor,
          ),
        ),
      ),
    );
  }
}
