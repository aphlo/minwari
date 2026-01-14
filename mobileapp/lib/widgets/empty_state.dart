import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import '../l10n/generated/app_localizations.dart';
import '../theme/app_colors.dart';

class EmptyState extends StatelessWidget {
  final VoidCallback onCreateGroup;

  const EmptyState({super.key, required this.onCreateGroup});

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final primaryColor =
        isDark ? AppColors.primaryColor : AppColors.primaryColor;
    final textPrimary =
        isDark ? AppColors.darkTextPrimary : AppColors.lightTextPrimary;
    final textSecondary =
        isDark ? AppColors.darkTextSecondary : AppColors.lightTextSecondary;

    return Center(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 40),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Apple-style icon container
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                color: primaryColor.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Icon(
                CupertinoIcons.person_3_fill,
                size: 40,
                color: primaryColor,
              ),
            ),
            const SizedBox(height: 24),
            // Title
            Text(
              l10n.noGroups,
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w600,
                color: textPrimary,
                letterSpacing: -0.3,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            // Subtitle
            Text(
              l10n.emptyStateDescription,
              style: TextStyle(fontSize: 15, color: textSecondary, height: 1.4),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            // Apple-style button
            SizedBox(
              width: double.infinity,
              child: CupertinoButton(
                color: primaryColor,
                borderRadius: BorderRadius.circular(12),
                padding: const EdgeInsets.symmetric(vertical: 16),
                onPressed: onCreateGroup,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(
                      CupertinoIcons.plus,
                      size: 20,
                      color: Colors.white,
                    ),
                    const SizedBox(width: 8),
                    Text(
                      l10n.createGroup,
                      style: const TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.w600,
                        color: Colors.white,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
