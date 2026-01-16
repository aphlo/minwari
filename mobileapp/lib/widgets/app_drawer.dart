import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:minwari/providers/package_info_provider.dart';
import 'package:minwari/screens/license_screen.dart';
import 'package:minwari/screens/settings_screen.dart';
import 'package:minwari/screens/webview_screen.dart';
import 'package:minwari/theme/app_theme_extension.dart';
import 'package:minwari/widgets/banner_ad_widget.dart';
import 'package:minwari/widgets/native_ad_widget.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';

class AppDrawer extends ConsumerWidget {
  const AppDrawer({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final packageInfoAsync = ref.watch(packageInfoProvider);

    final locale = Localizations.localeOf(context);
    final lang = locale.languageCode == 'ja' ? 'ja' : 'en';

    return Drawer(
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.zero),
      backgroundColor: context.scaffoldBackgroundColor,
      child: SafeArea(
        child: Column(
          children: [
            const SizedBox(height: 24),
            _buildMenuItem(
              context,
              icon: CupertinoIcons.settings,
              title: context.l10n.settings,
              onTap: () => _navigateTo(context, const SettingsScreen()),
            ),
            _buildDivider(context),
            _buildMenuItem(
              context,
              icon: CupertinoIcons.doc_text,
              title: context.l10n.termsOfService,
              onTap: () => _navigateTo(
                context,
                WebViewScreen(
                  url: 'https://oursplit.us/$lang/terms',
                  title: context.l10n.termsOfService,
                ),
              ),
            ),
            _buildDivider(context),
            _buildMenuItem(
              context,
              icon: CupertinoIcons.hand_raised,
              title: context.l10n.privacyPolicy,
              onTap: () => _navigateTo(
                context,
                WebViewScreen(
                  url: 'https://oursplit.us/$lang/privacy',
                  title: context.l10n.privacyPolicy,
                ),
              ),
            ),
            _buildDivider(context),
            _buildMenuItem(
              context,
              icon: CupertinoIcons.info,
              title: context.l10n.license,
              onTap: () => _navigateTo(
                context,
                LicenseScreen(
                  applicationName: context.l10n.appTitle,
                  applicationVersion: packageInfoAsync.asData?.value.version,
                ),
              ),
            ),
            const Spacer(),
            Padding(
              padding: const EdgeInsets.all(24.0),
              child: packageInfoAsync.when(
                data: (info) => Text(
                  '${context.l10n.version} ${info.version} (${info.buildNumber})',
                  style: TextStyle(color: context.textSecondary, fontSize: 13),
                ),
                loading: () => const SizedBox.shrink(),
                error: (_, __) => const SizedBox.shrink(),
              ),
            ),
            // Native Ad for Android, Medium Rectangle Banner as fallback for iOS
            if (Theme.of(context).platform == TargetPlatform.android)
              const NativeAdWidget(height: 300, width: double.infinity)
            else
              const BannerAdWidget(size: AdSize.mediumRectangle),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  Widget _buildMenuItem(
    BuildContext context, {
    required IconData icon,
    required String title,
    required VoidCallback onTap,
  }) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          child: Row(
            children: [
              Icon(icon, color: context.textPrimary, size: 22),
              const SizedBox(width: 16),
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(
                    fontSize: 17,
                    fontWeight: FontWeight.w400,
                    color: context.textPrimary,
                  ),
                ),
              ),
              Icon(
                CupertinoIcons.chevron_right,
                size: 16,
                color: context.textSecondary.withValues(alpha: 0.5),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDivider(BuildContext context) {
    return Divider(height: 1, indent: 62, color: context.dividerColor);
  }

  void _navigateTo(BuildContext context, Widget screen) {
    Navigator.of(context, rootNavigator: true).push(
      MaterialPageRoute(
        builder: (context) => screen,
        fullscreenDialog: true,
      ),
    );
  }
}
