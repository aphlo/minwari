import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobileapp/l10n/generated/app_localizations.dart';
import 'package:mobileapp/theme/app_colors.dart';

/// Members list editor widget for group forms
/// Used in both group creation and editing
class MembersEditor extends StatelessWidget {
  final List<String> members;
  final TextEditingController controller;
  final VoidCallback onAddMember;
  final ValueChanged<String> onRemoveMember;

  const MembersEditor({
    super.key,
    required this.members,
    required this.controller,
    required this.onAddMember,
    required this.onRemoveMember,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final inputFillColor =
        isDark ? AppColors.darkSurface : AppColors.lightBackground;
    final cardBackground =
        isDark ? AppColors.darkCardBackground : AppColors.lightCardBackground;

    return Column(
      children: [
        _buildMemberInput(context, inputFillColor),
        const SizedBox(height: 12),
        _buildMembersList(context, cardBackground, isDark),
      ],
    );
  }

  Widget _buildMemberInput(BuildContext context, Color fillColor) {
    final l10n = AppLocalizations.of(context);

    return Row(
      children: [
        Expanded(
          child: TextFormField(
            controller: controller,
            onEditingComplete: onAddMember,
            style: const TextStyle(fontSize: 17),
            decoration: InputDecoration(
              hintText: l10n?.memberNameHint ?? 'Member name',
              filled: true,
              fillColor: fillColor,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide.none,
              ),
              contentPadding: const EdgeInsets.symmetric(
                horizontal: 16,
                vertical: 14,
              ),
            ),
          ),
        ),
        const SizedBox(width: 12),
        SizedBox(
          height: 50,
          child: ElevatedButton(
            onPressed: onAddMember,
            style: ElevatedButton.styleFrom(
              padding: const EdgeInsets.symmetric(horizontal: 16),
            ),
            child: const Icon(CupertinoIcons.add, size: 22),
          ),
        ),
      ],
    );
  }

  Widget _buildMembersList(
    BuildContext context,
    Color backgroundColor,
    bool isDark,
  ) {
    if (members.isEmpty) {
      return Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: backgroundColor,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Center(
          child: Text(
            AppLocalizations.of(context)?.noMembersYet ?? 'No members yet',
            style: TextStyle(
              fontSize: 15,
              color: isDark
                  ? AppColors.darkTextSecondary
                  : AppColors.lightTextSecondary,
            ),
          ),
        ),
      );
    }

    return Container(
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: members.asMap().entries.map((entry) {
          final index = entry.key;
          final member = entry.value;
          final isLast = index == members.length - 1;

          return Column(
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 12,
                ),
                child: Row(
                  children: [
                    Container(
                      width: 36,
                      height: 36,
                      decoration: BoxDecoration(
                        color: AppColors.primaryColor.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(18),
                      ),
                      child: const Icon(
                        CupertinoIcons.person_fill,
                        size: 18,
                        color: AppColors.primaryColor,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(member, style: const TextStyle(fontSize: 17)),
                    ),
                    IconButton(
                      icon: Icon(
                        CupertinoIcons.xmark_circle_fill,
                        color: isDark
                            ? AppColors.darkTextSecondary
                            : AppColors.lightTextSecondary,
                        size: 22,
                      ),
                      onPressed: () => onRemoveMember(member),
                      padding: EdgeInsets.zero,
                      constraints: const BoxConstraints(),
                    ),
                  ],
                ),
              ),
              if (!isLast)
                Divider(
                  height: 0.5,
                  thickness: 0.5,
                  indent: 64,
                  color:
                      isDark ? AppColors.darkDivider : AppColors.lightDivider,
                ),
            ],
          );
        }).toList(),
      ),
    );
  }
}
