import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:minwari/models/group.dart';
import 'package:minwari/theme/app_theme_extension.dart';

class GroupList extends StatelessWidget {
  final List<Group> groups;
  final Function(Group) onGroupTap;

  const GroupList({
    super.key,
    required this.groups,
    required this.onGroupTap,
  });

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: groups.length,
      itemBuilder: (context, index) {
        final group = groups[index];
        final isLast = index == groups.length - 1;

        return Padding(
          padding: EdgeInsets.only(bottom: isLast ? 0 : 12),
          child: Material(
            color: context.cardBackground,
            borderRadius: BorderRadius.circular(16),
            child: InkWell(
              onTap: () => onGroupTap(group),
              borderRadius: BorderRadius.circular(16),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  children: [
                    Container(
                      width: 48,
                      height: 48,
                      decoration: BoxDecoration(
                        color: context.primaryColor.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Icon(
                        CupertinoIcons.person_2_fill,
                        color: context.primaryColor,
                        size: 24,
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            group.name,
                            style: TextStyle(
                              fontSize: 17,
                              fontWeight: FontWeight.w600,
                              color: context.textPrimary,
                            ),
                          ),
                          if (group.members.isNotEmpty) ...[
                            const SizedBox(height: 4),
                            Text(
                              group.members.join(', '),
                              style: TextStyle(
                                fontSize: 14,
                                color: context.textSecondary,
                              ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                          const SizedBox(height: 4),
                          Text(
                            DateFormat.yMMMd(
                                    Localizations.localeOf(context).toString())
                                .format(group.createdAt),
                            style: TextStyle(
                              fontSize: 12,
                              color:
                                  context.textSecondary.withValues(alpha: 0.7),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Icon(
                      CupertinoIcons.chevron_right,
                      size: 20,
                      color: context.textSecondary.withValues(alpha: 0.3),
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
