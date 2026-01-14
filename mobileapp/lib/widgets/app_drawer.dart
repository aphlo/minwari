import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobileapp/screens/settings_screen.dart';
import 'package:mobileapp/theme/app_theme_extension.dart';

class AppDrawer extends ConsumerWidget {
  const AppDrawer({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Drawer(
      backgroundColor: context.scaffoldBackgroundColor,
      child: Column(
        children: [
          UserAccountsDrawerHeader(
            decoration: BoxDecoration(color: context.primaryColor),
            accountName: const Text(
              'User Name',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            accountEmail: const Text('user@example.com'),
            currentAccountPicture: const CircleAvatar(
              backgroundColor: Colors.white,
              child: Icon(CupertinoIcons.person_fill, color: Colors.grey),
            ),
          ),
          ListTile(
            leading: Icon(CupertinoIcons.settings, color: context.textPrimary),
            title: Text(
              context.l10n.settings,
              style: TextStyle(color: context.textPrimary),
            ),
            onTap: () => _openSettings(context),
          ),
          const Spacer(),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text(
              '${context.l10n.version} 1.0.0',
              style: TextStyle(color: context.textSecondary),
            ),
          ),
        ],
      ),
    );
  }

  void _openSettings(BuildContext context) {
    Navigator.pop(context); // Close drawer
    Navigator.push(
      context,
      CupertinoPageRoute(
        builder: (context) => const SettingsScreen(),
      ),
    );
  }
}
