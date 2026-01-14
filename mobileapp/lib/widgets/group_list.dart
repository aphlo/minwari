import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:intl/intl.dart';
import '../models/group.dart';
import '../main.dart';

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
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
      itemCount: groups.length,
      itemBuilder: (context, index) {
        final group = groups[index];
        final isFirst = index == 0;
        final isLast = index == groups.length - 1;

        return Container(
          margin: EdgeInsets.only(
            top: isFirst ? 8 : 0,
            bottom: isLast ? 0 : 0,
          ),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.vertical(
              top: isFirst ? const Radius.circular(12) : Radius.zero,
              bottom: isLast ? const Radius.circular(12) : Radius.zero,
            ),
          ),
          child: Column(
            children: [
              Material(
                color: Colors.transparent,
                child: InkWell(
                  onTap: () => onGroupTap(group),
                  borderRadius: BorderRadius.vertical(
                    top: isFirst ? const Radius.circular(12) : Radius.zero,
                    bottom: isLast ? const Radius.circular(12) : Radius.zero,
                  ),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 14,
                    ),
                    child: Row(
                      children: [
                        // Group icon with colored background
                        Container(
                          width: 44,
                          height: 44,
                          decoration: BoxDecoration(
                            color:
                                MinwariApp.primaryColor.withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: const Icon(
                            CupertinoIcons.person_3_fill,
                            size: 22,
                            color: MinwariApp.primaryColor,
                          ),
                        ),
                        const SizedBox(width: 14),
                        // Group info
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                group.name,
                                style: const TextStyle(
                                  fontSize: 17,
                                  fontWeight: FontWeight.w600,
                                  color: MinwariApp.textPrimary,
                                ),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                DateFormat.yMMMd(
                                  Localizations.localeOf(context).toString(),
                                ).format(group.createdAt),
                                style: const TextStyle(
                                  fontSize: 15,
                                  color: MinwariApp.textSecondary,
                                ),
                              ),
                            ],
                          ),
                        ),
                        // Chevron
                        const Icon(
                          CupertinoIcons.chevron_forward,
                          size: 18,
                          color: MinwariApp.textSecondary,
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              // Divider (except for last item)
              if (!isLast)
                const Padding(
                  padding: EdgeInsets.only(left: 74),
                  child: Divider(height: 0.5, thickness: 0.5),
                ),
            ],
          ),
        );
      },
    );
  }
}
