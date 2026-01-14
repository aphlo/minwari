import 'package:flutter/material.dart';
import 'package:minwari/l10n/generated/app_localizations.dart';
import 'package:minwari/theme/app_colors.dart';

/// Extension to provide easy access to theme colors, status, and l10n
extension AppContextExtension on BuildContext {
  /// Easy access to AppLocalizations
  AppLocalizations get l10n => AppLocalizations.of(this)!;

  /// Whether the current theme is dark mode
  bool get isDark => Theme.of(this).brightness == Brightness.dark;

  /// Primary brand color
  Color get primaryColor => AppColors.primaryColor;

  /// Main text color adaptable to theme
  Color get textPrimary =>
      isDark ? AppColors.darkTextPrimary : AppColors.lightTextPrimary;

  /// Secondary text color adaptable to theme
  Color get textSecondary =>
      isDark ? AppColors.darkTextSecondary : AppColors.lightTextSecondary;

  /// Divider color adaptable to theme
  Color get dividerColor =>
      isDark ? AppColors.darkDivider : AppColors.lightDivider;

  /// Card background color adaptable to theme
  Color get cardBackground =>
      isDark ? AppColors.darkCardBackground : AppColors.lightCardBackground;

  /// Input field background color adaptable to theme
  Color get inputFillColor =>
      isDark ? AppColors.darkInputFill : AppColors.lightInputFill;

  /// Scaffold background color adaptable to theme
  Color get scaffoldBackgroundColor =>
      isDark ? AppColors.darkSurface : AppColors.lightBackground;

  /// AppBar background color adaptable to theme
  Color get appBarBackgroundColor =>
      isDark ? AppColors.darkBackground : AppColors.lightSurface;
}
