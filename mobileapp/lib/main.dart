import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'l10n/generated/app_localizations.dart';
import 'providers/theme_provider.dart';
import 'screens/home_screen.dart';
import 'theme/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  final themeProvider = ThemeProvider();
  await themeProvider.init();

  runApp(MinwariApp(themeProvider: themeProvider));
}

class MinwariApp extends StatefulWidget {
  final ThemeProvider themeProvider;

  const MinwariApp({super.key, required this.themeProvider});

  @override
  State<MinwariApp> createState() => _MinwariAppState();
}

class _MinwariAppState extends State<MinwariApp> {
  @override
  void initState() {
    super.initState();
    widget.themeProvider.addListener(_onThemeChanged);
  }

  @override
  void dispose() {
    widget.themeProvider.removeListener(_onThemeChanged);
    super.dispose();
  }

  void _onThemeChanged() {
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'OurSplit',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      darkTheme: AppTheme.dark,
      themeMode: widget.themeProvider.materialThemeMode,
      localizationsDelegates: const [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: const [
        Locale('en'),
        Locale('ja'),
        Locale('zh', 'CN'),
        Locale('ko'),
        Locale('es'),
        Locale('pt', 'BR'),
        Locale('zh', 'TW'),
      ],
      home: HomeScreen(themeProvider: widget.themeProvider),
    );
  }
}
