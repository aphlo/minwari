import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobileapp/providers/package_info_provider.dart';
import 'package:mobileapp/screens/settings_screen.dart';
import 'package:mobileapp/screens/webview_screen.dart';
import 'package:mobileapp/theme/app_theme_extension.dart';

class AppDrawer extends ConsumerWidget {
  const AppDrawer({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final packageInfoAsync = ref.watch(packageInfoProvider);

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
                const WebViewScreen(
                  url: 'https://example.com/terms', // Replace with actual URL
                  title: 'Terms of Service',
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
                const WebViewScreen(
                  url: 'https://example.com/privacy', // Replace with actual URL
                  title: 'Privacy Policy',
                ),
              ),
            ),
            _buildDivider(context),
            _buildMenuItem(
              context,
              icon: CupertinoIcons.info,
              title: context.l10n.license,
              onTap: () {
                Navigator.pop(context);
                showLicensePage(
                  context: context,
                  applicationName: context.l10n.appTitle,
                  applicationVersion: packageInfoAsync.asData?.value.version,
                );
              },
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
    Navigator.pop(context);
    Navigator.push(
      context,
      CupertinoPageRoute(builder: (context) => screen),
    );
  }
}
