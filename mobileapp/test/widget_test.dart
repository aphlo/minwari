import 'package:flutter_test/flutter_test.dart';

import 'package:mobileapp/main.dart';
import 'package:mobileapp/providers/theme_provider.dart';

void main() {
  testWidgets('App smoke test', (WidgetTester tester) async {
    // Create a ThemeProvider for testing
    final themeProvider = ThemeProvider();

    // Build our app and trigger a frame.
    await tester.pumpWidget(MinwariApp(themeProvider: themeProvider));

    // Pump a few frames to allow initial build
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 100));

    // Verify the app renders without errors
    expect(find.byType(MinwariApp), findsOneWidget);
  });
}
