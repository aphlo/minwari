import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import 'package:minwari/models/group.dart';
import 'package:minwari/theme/app_theme_extension.dart';
import 'package:minwari/extensions/currency_extension.dart';

/// Group info card showing members and currency
class GroupInfoCard extends StatelessWidget {
  final Group group;
  final VoidCallback? onEdit;

  const GroupInfoCard({super.key, required this.group, this.onEdit});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: context.cardBackground,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Title with edit button
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Text(
                  group.name,
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                    color: context.textPrimary,
                  ),
                ),
              ),
              if (onEdit != null)
                GestureDetector(
                  onTap: onEdit,
                  child: Icon(
                    CupertinoIcons.square_pencil,
                    size: 22,
                    color: context.textSecondary,
                  ),
                ),
            ],
          ),
          const SizedBox(height: 16),

          // Members
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: group.members.map((member) {
              return Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 6,
                ),
                decoration: BoxDecoration(
                  color: context.primaryColor.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  member,
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w500,
                    color: context.primaryColor,
                  ),
                ),
              );
            }).toList(),
          ),

          const SizedBox(height: 20),
          Divider(
            color: context.dividerColor,
          ),
          const SizedBox(height: 16),

          // Currency
          Row(
            children: [
              Icon(
                CupertinoIcons.money_dollar_circle,
                size: 20,
                color: context.primaryColor,
              ),
              const SizedBox(width: 8),
              Text(
                context.l10n.currency,
                style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w600,
                  color: context.textSecondary,
                ),
              ),
              const Spacer(),
              Text(
                context.getLocalizedCurrencyName(group.currency),
                style: TextStyle(
                  fontSize: 17,
                  fontWeight: FontWeight.w600,
                  color: context.textPrimary,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
