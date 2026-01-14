import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import '../l10n/generated/app_localizations.dart';
import '../main.dart';

class EmptyState extends StatelessWidget {
  final VoidCallback onCreateGroup;

  const EmptyState({super.key, required this.onCreateGroup});

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;

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
                color: MinwariApp.primaryColor.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(20),
              ),
              child: const Icon(
                CupertinoIcons.person_3_fill,
                size: 40,
                color: MinwariApp.primaryColor,
              ),
            ),
            const SizedBox(height: 24),
            // Title
            Text(
              l10n.noGroups,
              style: const TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w600,
                color: MinwariApp.textPrimary,
                letterSpacing: -0.3,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            // Subtitle
            Text(
              l10n.emptyStateDescription,
              style: const TextStyle(
                fontSize: 15,
                color: MinwariApp.textSecondary,
                height: 1.4,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            // Apple-style button
            SizedBox(
              width: double.infinity,
              child: CupertinoButton(
                color: MinwariApp.primaryColor,
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
