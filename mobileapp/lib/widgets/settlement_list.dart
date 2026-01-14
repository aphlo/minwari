import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:minwari/theme/app_theme_extension.dart';
import 'package:minwari/widgets/section_header.dart';

class SettlementList extends StatelessWidget {
  final List<dynamic> settlements; // map with from, to, amount
  final String currency;

  const SettlementList({
    super.key,
    required this.settlements,
    required this.currency,
  });

  @override
  Widget build(BuildContext context) {
    if (settlements.isEmpty) {
      return Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: context.cardBackground,
          borderRadius: BorderRadius.circular(16),
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

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SectionHeader(title: context.l10n.settlement),
        const SizedBox(height: 12),
        Container(
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
                            settlement['from'] ?? '',
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
                            settlement['to'] ?? '',
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
                      '${settlement['amount']} $currency',
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
        ),
      ],
    );
  }
}
