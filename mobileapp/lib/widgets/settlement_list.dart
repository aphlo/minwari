import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:minwari/lib/currency.dart';
import 'package:minwari/lib/settlement_calculator.dart';
import 'package:minwari/models/expense.dart';
import 'package:minwari/screens/settlement_detail_screen.dart';
import 'package:minwari/theme/app_theme_extension.dart';
import 'package:minwari/utils/currency_formatter.dart';
import 'package:minwari/widgets/section_header.dart';

class SettlementList extends StatelessWidget {
  final List<Settlement> settlements;
  final String currency;
  final bool hasExpenses;
  final String? groupName;
  final List<Expense>? expenses;
  final List<String>? members;

  const SettlementList({
    super.key,
    required this.settlements,
    required this.currency,
    this.hasExpenses = true,
    this.groupName,
    this.expenses,
    this.members,
  });

  void _navigateToDetail(BuildContext context) {
    if (groupName == null || expenses == null || members == null) return;

    final expensesForSettlement =
        expenses!.map((e) => e.toExpenseForSettlement()).toList();
    final balances = calculateMemberBalances(
      expensesForSettlement,
      members!,
      currency,
    );

    final fractionDigits = getCurrencyFractionDigits(currency);
    final totalMinor = expenses!.fold<int>(
      0,
      (sum, expense) => sum + toMinorUnits(expense.amount, fractionDigits),
    );
    final totalAmount = fromMinorUnits(totalMinor, fractionDigits);

    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => SettlementDetailScreen(
          groupName: groupName!,
          balances: balances,
          totalAmount: totalAmount,
          currency: currency,
        ),
      ),
    );
  }

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
              color: context.primaryColor,
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

  bool _canNavigateToDetail() {
    return groupName != null && expenses != null && members != null;
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
    final canNavigate = _canNavigateToDetail();

    return Container(
      decoration: BoxDecoration(
        color: context.cardBackground,
        borderRadius: BorderRadius.circular(16),
      ),
      child: ListView.separated(
        shrinkWrap: true,
        padding: EdgeInsets.zero,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: settlements.length,
        separatorBuilder: (context, index) => Divider(
          height: 1,
          indent: 16,
          color: context.dividerColor,
        ),
        itemBuilder: (context, index) {
          final settlement = settlements[index];
          return InkWell(
            onTap: canNavigate ? () => _navigateToDetail(context) : null,
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  Expanded(
                    child: Wrap(
                      crossAxisAlignment: WrapCrossAlignment.center,
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
                  const SizedBox(width: 8),
                  Text(
                    formatCurrency(settlement.amount, currency),
                    style: TextStyle(
                      fontSize: 17,
                      fontWeight: FontWeight.w600,
                      color: context
                          .textPrimary, // Changed to textPrimary to match ExpensesList style if navigation is main action, but keeping primaryColor as it denotes money
                    ),
                  ),
                  if (canNavigate) ...[
                    const SizedBox(width: 8),
                    Icon(
                      CupertinoIcons.chevron_right,
                      size: 16,
                      color: context.textSecondary.withValues(alpha: 0.5),
                    ),
                  ],
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
