import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:minwari/providers/theme_provider.dart';
import 'package:minwari/theme/app_theme_extension.dart';

class SettingsScreen extends ConsumerWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeMode = ref.watch(themeProvider);
    final notifier = ref.read(themeProvider.notifier);

    return Scaffold(
      backgroundColor: context.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          context.l10n.settings,
          style: TextStyle(color: context.textPrimary),
        ),
        backgroundColor: context.appBarBackgroundColor,
        elevation: 0,
        iconTheme: IconThemeData(color: context.textPrimary),
        leading: IconButton(
          icon: const Icon(CupertinoIcons.xmark),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: ListView(
        children: [
          _buildSectionHeader(context.l10n.appearance, context),
          _buildThemeOption(
            context,
            title: context.l10n.themeLight,
            icon: CupertinoIcons.sun_max,
            isSelected: themeMode == ThemeMode.light,
            onTap: () => notifier.setMode(ThemeMode.light),
          ),
          _buildDivider(context),
          _buildThemeOption(
            context,
            title: context.l10n.themeDark,
            icon: CupertinoIcons.moon,
            isSelected: themeMode == ThemeMode.dark,
            onTap: () => notifier.setMode(ThemeMode.dark),
          ),
          _buildDivider(context),
          _buildThemeOption(
            context,
            title: context.l10n.themeSystem,
            icon: CupertinoIcons.device_phone_portrait,
            isSelected: themeMode == ThemeMode.system,
            onTap: () => notifier.setMode(ThemeMode.system),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title, BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 24, 16, 8),
      child: Text(
        title,
        style: TextStyle(
          fontSize: 13,
          fontWeight: FontWeight.w600,
          color: context.textSecondary,
        ),
      ),
    );
  }

  Widget _buildThemeOption(
    BuildContext context, {
    required String title,
    required IconData icon,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return Material(
      color: context.cardBackground,
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: Row(
            children: [
              Icon(icon, color: context.textPrimary, size: 24),
              const SizedBox(width: 16),
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(
                    fontSize: 17,
                    color: context.textPrimary,
                  ),
                ),
              ),
              if (isSelected)
                Icon(
                  CupertinoIcons.checkmark,
                  color: context.primaryColor,
                  size: 20,
                ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDivider(BuildContext context) {
    return Divider(height: 1, indent: 56, color: context.dividerColor);
  }
}
