import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:minwari/lib/settlement_calculator.dart';
import 'package:minwari/theme/app_theme_extension.dart';
import 'package:minwari/utils/currency_formatter.dart';
import 'package:minwari/widgets/banner_ad_widget.dart';

/// Screen showing detailed settlement information for each member
class SettlementDetailScreen extends StatelessWidget {
  final String groupName;
  final List<MemberBalance> balances;
  final double totalAmount;
  final String currency;

  const SettlementDetailScreen({
    super.key,
    required this.groupName,
    required this.balances,
    required this.totalAmount,
    required this.currency,
  });

  @override
  Widget build(BuildContext context) {
    String formatAmount(double amount) {
      return formatCurrency(amount, currency);
    }

    return Scaffold(
      backgroundColor: context.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          context.l10n.settlementDetailTitle,
          style: TextStyle(color: context.textPrimary),
        ),
        backgroundColor: context.appBarBackgroundColor,
        elevation: 0,
        iconTheme: IconThemeData(color: context.textPrimary),
        leading: const BackButton(),
      ),
      body: Column(
        children: [
          Expanded(
            child: CustomScrollView(
              physics: const AlwaysScrollableScrollPhysics(),
              slivers: [
                SliverPadding(
                  padding: const EdgeInsets.all(16),
                  sliver: SliverList(
                    delegate: SliverChildListDelegate([
                      // Header
                      Row(
                        children: [
                          Icon(
                            CupertinoIcons.square_stack_3d_up,
                            size: 20,
                            color: context.primaryColor,
                          ),
                          const SizedBox(width: 8),
                          Text(
                            context.l10n.settlementDetailTitle,
                            style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                              color: context.textPrimary,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      Text(
                        context.l10n.settlementDetailSubtitle,
                        style: TextStyle(
                          fontSize: 14,
                          color: context.textSecondary,
                        ),
                      ),
                      const SizedBox(height: 20),

                      // Total amount card
                      if (balances.isNotEmpty) ...[
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 16,
                            vertical: 12,
                          ),
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
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                context.l10n.settlementTotalSpending,
                                style: TextStyle(
                                  fontSize: 14,
                                  color: context.textSecondary,
                                ),
                              ),
                              Text(
                                formatAmount(totalAmount),
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: context.textPrimary,
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 16),
                      ],

                      // Member balance cards
                      if (balances.isEmpty)
                        _buildEmptyState(context)
                      else
                        ...balances.map((balance) => Padding(
                              padding: const EdgeInsets.only(bottom: 12),
                              child: _buildMemberCard(
                                context,
                                balance,
                                formatAmount,
                              ),
                            )),

                      // Bottom padding
                      SizedBox(
                          height: MediaQuery.of(context).padding.bottom + 16),
                    ]),
                  ),
                ),
              ],
            ),
          ),
          const BannerAdWidget(),
        ],
      ),
    );
  }

  Widget _buildEmptyState(BuildContext context) {
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
              CupertinoIcons.info_circle,
              size: 48,
              color: context.textSecondary.withValues(alpha: 0.5),
            ),
            const SizedBox(height: 16),
            Text(
              context.l10n.settlementDetailEmpty,
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

  Widget _buildMemberCard(
    BuildContext context,
    MemberBalance balance,
    String Function(double) formatAmount,
  ) {
    final netAmount = balance.net.abs();
    final String netLabel;
    final Color netColor;

    if (balance.net > 0) {
      netLabel = context.l10n.settlementNetReceive;
      netColor = context.primaryColor;
    } else if (balance.net < 0) {
      netLabel = context.l10n.settlementNetPay;
      netColor = Colors.red;
    } else {
      netLabel = context.l10n.settlementNetEven;
      netColor = context.textSecondary;
    }

    return Container(
      padding: const EdgeInsets.all(16),
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
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Member name and net status
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                balance.name,
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: context.textPrimary,
                ),
              ),
              Text(
                balance.net != 0
                    ? '$netLabel ${formatAmount(netAmount)}'
                    : netLabel,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: netColor,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),

          // Paid and Owed
          Row(
            children: [
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: context.scaffoldBackgroundColor,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        context.l10n.settlementPaid,
                        style: TextStyle(
                          fontSize: 12,
                          color: context.textSecondary,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        formatAmount(balance.paid),
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w600,
                          color: context.textPrimary,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: context.scaffoldBackgroundColor,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        context.l10n.settlementOwed,
                        style: TextStyle(
                          fontSize: 12,
                          color: context.textSecondary,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        formatAmount(balance.owed),
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w600,
                          color: context.textPrimary,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
