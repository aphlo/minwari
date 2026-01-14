import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import '../l10n/generated/app_localizations.dart';
import '../providers/theme_provider.dart';
import '../screens/settings_screen.dart';
import '../screens/webview_screen.dart';
import '../theme/app_colors.dart';

class AppDrawer extends StatefulWidget {
  final ThemeProvider themeProvider;

  const AppDrawer({super.key, required this.themeProvider});

  @override
  State<AppDrawer> createState() => _AppDrawerState();
}

class _AppDrawerState extends State<AppDrawer> {
  String _version = '';

  @override
  void initState() {
    super.initState();
    _loadVersion();
  }

  Future<void> _loadVersion() async {
    setState(() {
      _version = '1.0.0';
    });
  }

  void _openWebView(BuildContext context, String title, String url) {
    Navigator.pop(context);
    Navigator.push(
      context,
      CupertinoPageRoute(
        builder: (context) => WebViewScreen(title: title, url: url),
      ),
    );
  }

  void _openSettings(BuildContext context) {
    Navigator.pop(context);
    Navigator.push(
      context,
      CupertinoPageRoute(
        builder: (context) =>
            SettingsScreen(themeProvider: widget.themeProvider),
      ),
    );
  }

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
    final cardBackground =
        isDark ? AppColors.darkCardBackground : AppColors.lightCardBackground;

    return Drawer(
      child: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Apple-style header
            Padding(
              padding: const EdgeInsets.fromLTRB(24, 24, 24, 8),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    width: 60,
                    height: 60,
                    decoration: BoxDecoration(
                      color: primaryColor,
                      borderRadius: BorderRadius.circular(14),
                    ),
                    child: const Icon(
                      CupertinoIcons.money_dollar_circle_fill,
                      color: Colors.white,
                      size: 32,
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    l10n.appTitle,
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.w700,
                      letterSpacing: -0.5,
                      color: textPrimary,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '${l10n.version} $_version',
                    style: TextStyle(fontSize: 15, color: textSecondary),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            // Apple-style grouped list
            Expanded(
              child: ListView(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                children: [
                  // Settings section
                  _buildSection(
                    cardBackground: cardBackground,
                    children: [
                      _buildListTile(
                        icon: CupertinoIcons.gear,
                        title: l10n.settings,
                        onTap: () => _openSettings(context),
                        primaryColor: primaryColor,
                        textPrimary: textPrimary,
                        textSecondary: textSecondary,
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  // Legal section
                  _buildSection(
                    cardBackground: cardBackground,
                    children: [
                      _buildListTile(
                        icon: CupertinoIcons.doc_text,
                        title: l10n.termsOfService,
                        onTap: () => _openWebView(
                          context,
                          l10n.termsOfService,
                          'https://oursplit.us/terms',
                        ),
                        primaryColor: primaryColor,
                        textPrimary: textPrimary,
                        textSecondary: textSecondary,
                      ),
                      _buildDivider(isDark),
                      _buildListTile(
                        icon: CupertinoIcons.shield,
                        title: l10n.privacyPolicy,
                        onTap: () => _openWebView(
                          context,
                          l10n.privacyPolicy,
                          'https://oursplit.us/privacy',
                        ),
                        primaryColor: primaryColor,
                        textPrimary: textPrimary,
                        textSecondary: textSecondary,
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  // About section
                  _buildSection(
                    cardBackground: cardBackground,
                    children: [
                      _buildListTile(
                        icon: CupertinoIcons.info_circle,
                        title: l10n.license,
                        onTap: () {
                          Navigator.pop(context);
                          showLicensePage(
                            context: context,
                            applicationName: l10n.appTitle,
                            applicationVersion: _version,
                          );
                        },
                        primaryColor: primaryColor,
                        textPrimary: textPrimary,
                        textSecondary: textSecondary,
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSection({
    required Color cardBackground,
    required List<Widget> children,
  }) {
    return Container(
      decoration: BoxDecoration(
        color: cardBackground,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(children: children),
    );
  }

  Widget _buildListTile({
    required IconData icon,
    required String title,
    required VoidCallback onTap,
    required Color primaryColor,
    required Color textPrimary,
    required Color textSecondary,
  }) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          child: Row(
            children: [
              Icon(icon, size: 22, color: primaryColor),
              const SizedBox(width: 14),
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(fontSize: 17, color: textPrimary),
                ),
              ),
              Icon(
                CupertinoIcons.chevron_forward,
                size: 18,
                color: textSecondary,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDivider(bool isDark) {
    return Padding(
      padding: const EdgeInsets.only(left: 52),
      child: Divider(
        height: 0.5,
        thickness: 0.5,
        color: isDark ? AppColors.darkDivider : AppColors.lightDivider,
      ),
    );
  }
}
