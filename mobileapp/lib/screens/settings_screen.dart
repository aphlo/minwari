import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../l10n/generated/app_localizations.dart';
import '../providers/theme_provider.dart';
import '../theme/app_colors.dart';

class SettingsScreen extends StatelessWidget {
  final ThemeProvider themeProvider;

  const SettingsScreen({super.key, required this.themeProvider});

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.settings),
        leading: IconButton(
          icon: const Icon(CupertinoIcons.back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        children: [
          // Section header
          Padding(
            padding: const EdgeInsets.only(left: 16, bottom: 8),
            child: Text(
              l10n.appearance.toUpperCase(),
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w500,
                color: isDark
                    ? AppColors.darkTextSecondary
                    : AppColors.lightTextSecondary,
                letterSpacing: 0.5,
              ),
            ),
          ),
          // Theme options
          Container(
            decoration: BoxDecoration(
              color: isDark
                  ? AppColors.darkCardBackground
                  : AppColors.lightCardBackground,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Column(
              children: [
                _buildThemeOption(
                  context,
                  title: l10n.themeLight,
                  icon: CupertinoIcons.sun_max_fill,
                  mode: AppThemeMode.light,
                  isFirst: true,
                  isDark: isDark,
                ),
                _buildDivider(isDark),
                _buildThemeOption(
                  context,
                  title: l10n.themeDark,
                  icon: CupertinoIcons.moon_fill,
                  mode: AppThemeMode.dark,
                  isDark: isDark,
                ),
                _buildDivider(isDark),
                _buildThemeOption(
                  context,
                  title: l10n.themeSystem,
                  icon: CupertinoIcons.device_phone_portrait,
                  mode: AppThemeMode.system,
                  isLast: true,
                  isDark: isDark,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildThemeOption(
    BuildContext context, {
    required String title,
    required IconData icon,
    required AppThemeMode mode,
    required bool isDark,
    bool isFirst = false,
    bool isLast = false,
  }) {
    final isSelected = themeProvider.themeMode == mode;
    final primaryColor =
        isDark ? AppColors.primaryColor : AppColors.primaryColor;
    final textColor =
        isDark ? AppColors.darkTextPrimary : AppColors.lightTextPrimary;
    final secondaryColor =
        isDark ? AppColors.darkTextSecondary : AppColors.lightTextSecondary;

    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () => themeProvider.setThemeMode(mode),
        borderRadius: BorderRadius.vertical(
          top: isFirst ? const Radius.circular(12) : Radius.zero,
          bottom: isLast ? const Radius.circular(12) : Radius.zero,
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          child: Row(
            children: [
              Container(
                width: 32,
                height: 32,
                decoration: BoxDecoration(
                  color: isSelected
                      ? primaryColor.withValues(alpha: 0.15)
                      : secondaryColor.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(
                  icon,
                  size: 18,
                  color: isSelected ? primaryColor : secondaryColor,
                ),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(
                    fontSize: 17,
                    color: textColor,
                  ),
                ),
              ),
              if (isSelected)
                Icon(
                  CupertinoIcons.checkmark,
                  size: 20,
                  color: primaryColor,
                ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDivider(bool isDark) {
    return Padding(
      padding: const EdgeInsets.only(left: 62),
      child: Divider(
        height: 0.5,
        thickness: 0.5,
        color: isDark ? AppColors.darkDivider : AppColors.lightDivider,
      ),
    );
  }
}
