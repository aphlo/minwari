import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'app_colors.dart';

/// App theme configuration with Apple-inspired design
class AppTheme {
  AppTheme._();

  /// Light theme
  static ThemeData get light {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      colorScheme: ColorScheme.fromSeed(
        seedColor: AppColors.primaryColor,
        brightness: Brightness.light,
        surface: AppColors.lightSurface,
      ),
      scaffoldBackgroundColor: AppColors.lightBackground,
      fontFamily: '.SF Pro Text',
      textTheme: _buildTextTheme(
        primaryColor: AppColors.lightTextPrimary,
        secondaryColor: AppColors.lightTextSecondary,
      ),
      appBarTheme: _buildAppBarTheme(
        backgroundColor: AppColors.lightBackground,
        foregroundColor: AppColors.lightTextPrimary,
        systemOverlayStyle: SystemUiOverlayStyle.dark,
      ),
      elevatedButtonTheme: _buildElevatedButtonTheme(AppColors.primaryColor),
      textButtonTheme: _buildTextButtonTheme(AppColors.primaryColor),
      cardTheme: _buildCardTheme(AppColors.lightCardBackground),
      listTileTheme: _buildListTileTheme(AppColors.lightTextSecondary),
      dividerTheme: _buildDividerTheme(AppColors.lightDivider),
      progressIndicatorTheme: _buildProgressIndicatorTheme(
        AppColors.primaryColor,
        AppColors.lightDivider,
      ),
      iconTheme: const IconThemeData(
        color: AppColors.lightTextSecondary,
        size: 24,
      ),
      drawerTheme: const DrawerThemeData(
        backgroundColor: AppColors.lightBackground,
      ),
    );
  }

  /// Dark theme
  static ThemeData get dark {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: ColorScheme.fromSeed(
        seedColor: AppColors.primaryColor,
        brightness: Brightness.dark,
        surface: AppColors.darkSurface,
      ),
      scaffoldBackgroundColor: AppColors.darkBackground,
      fontFamily: '.SF Pro Text',
      textTheme: _buildTextTheme(
        primaryColor: AppColors.darkTextPrimary,
        secondaryColor: AppColors.darkTextSecondary,
      ),
      appBarTheme: _buildAppBarTheme(
        backgroundColor: AppColors.darkBackground,
        foregroundColor: AppColors.darkTextPrimary,
        systemOverlayStyle: SystemUiOverlayStyle.light,
      ),
      elevatedButtonTheme: _buildElevatedButtonTheme(AppColors.primaryColor),
      textButtonTheme: _buildTextButtonTheme(AppColors.primaryColor),
      cardTheme: _buildCardTheme(AppColors.darkCardBackground),
      listTileTheme: _buildListTileTheme(AppColors.darkTextSecondary),
      dividerTheme: _buildDividerTheme(AppColors.darkDivider),
      progressIndicatorTheme: _buildProgressIndicatorTheme(
        AppColors.primaryColor,
        AppColors.darkDivider,
      ),
      iconTheme: const IconThemeData(
        color: AppColors.darkTextSecondary,
        size: 24,
      ),
      drawerTheme: const DrawerThemeData(
        backgroundColor: AppColors.darkBackground,
      ),
    );
  }

  static TextTheme _buildTextTheme({
    required Color primaryColor,
    required Color secondaryColor,
  }) {
    return TextTheme(
      headlineLarge: TextStyle(
        fontSize: 34,
        fontWeight: FontWeight.w700,
        letterSpacing: -0.5,
        color: primaryColor,
      ),
      headlineMedium: TextStyle(
        fontSize: 28,
        fontWeight: FontWeight.w600,
        letterSpacing: -0.3,
        color: primaryColor,
      ),
      titleLarge: TextStyle(
        fontSize: 20,
        fontWeight: FontWeight.w600,
        letterSpacing: -0.2,
        color: primaryColor,
      ),
      titleMedium: TextStyle(
        fontSize: 17,
        fontWeight: FontWeight.w600,
        color: primaryColor,
      ),
      bodyLarge: TextStyle(
        fontSize: 17,
        fontWeight: FontWeight.w400,
        color: primaryColor,
      ),
      bodyMedium: TextStyle(
        fontSize: 15,
        fontWeight: FontWeight.w400,
        color: secondaryColor,
      ),
      labelLarge: const TextStyle(
        fontSize: 17,
        fontWeight: FontWeight.w600,
        color: Colors.white,
      ),
    );
  }

  static AppBarTheme _buildAppBarTheme({
    required Color backgroundColor,
    required Color foregroundColor,
    required SystemUiOverlayStyle systemOverlayStyle,
  }) {
    return AppBarTheme(
      centerTitle: true,
      elevation: 0,
      scrolledUnderElevation: 0,
      backgroundColor: backgroundColor,
      surfaceTintColor: Colors.transparent,
      systemOverlayStyle: systemOverlayStyle,
      titleTextStyle: TextStyle(
        fontSize: 17,
        fontWeight: FontWeight.w600,
        color: foregroundColor,
        letterSpacing: -0.2,
      ),
      iconTheme: const IconThemeData(color: AppColors.primaryColor),
    );
  }

  static ElevatedButtonThemeData _buildElevatedButtonTheme(Color primaryColor) {
    return ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: primaryColor,
        foregroundColor: Colors.white,
        elevation: 0,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        textStyle: const TextStyle(
          fontSize: 17,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  static TextButtonThemeData _buildTextButtonTheme(Color primaryColor) {
    return TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: primaryColor,
        textStyle: const TextStyle(
          fontSize: 17,
          fontWeight: FontWeight.w400,
        ),
      ),
    );
  }

  static CardThemeData _buildCardTheme(Color backgroundColor) {
    return CardThemeData(
      elevation: 0,
      color: backgroundColor,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
    );
  }

  static ListTileThemeData _buildListTileTheme(Color iconColor) {
    return ListTileThemeData(
      contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 4),
      minLeadingWidth: 24,
      iconColor: iconColor,
    );
  }

  static DividerThemeData _buildDividerTheme(Color color) {
    return DividerThemeData(
      color: color,
      thickness: 0.5,
      space: 0,
    );
  }

  static ProgressIndicatorThemeData _buildProgressIndicatorTheme(
    Color primaryColor,
    Color trackColor,
  ) {
    return ProgressIndicatorThemeData(
      color: primaryColor,
      linearTrackColor: trackColor,
    );
  }
}
