import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:in_app_review/in_app_review.dart';
import 'package:minwari/screens/webview_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';

class UserReviewService {
  static const _keyLaunchCount = 'user_review_launch_count';
  static const _keyActionCount = 'user_review_action_count';
  static const _keyLastPromptDate = 'user_review_last_prompt_date';

  static String getKoeloopUrl(BuildContext context) {
    final locale =
        Localizations.localeOf(context).languageCode == 'ja' ? 'ja' : 'en';
    final theme =
        Theme.of(context).brightness == Brightness.light ? 'light' : 'dark';
    return 'https://koeloop.dev/embed/432a30ee-13ca-426e-8924-051858d06645?theme=$theme&locale=$locale&primaryColor=%25231f44ff&showVoting=false&showFeedback=true&showFAQ=true&showEmailField=true';
  }

  /// Increment the app launch count.
  /// Should be called once during app initialization.
  static Future<void> incrementLaunchCount() async {
    final prefs = await SharedPreferences.getInstance();
    final count = prefs.getInt(_keyLaunchCount) ?? 0;
    await prefs.setInt(_keyLaunchCount, count + 1);
  }

  /// Track a significant action (creating/editing expense).
  /// Checks trigger conditions and shows the review prompt if met.
  static Future<void> trackExpenseAction(BuildContext context) async {
    final prefs = await SharedPreferences.getInstance();
    final actionCount = (prefs.getInt(_keyActionCount) ?? 0) + 1;
    await prefs.setInt(_keyActionCount, actionCount);

    if (await _shouldShowPrompt(prefs)) {
      if (!context.mounted) return;

      await _updateLastPromptDate(prefs);
      if (context.mounted) {
        await _showEnjoymentDialog(context);
      }
    }
  }

  static Future<bool> _shouldShowPrompt(SharedPreferences prefs) async {
    final launchCount = prefs.getInt(_keyLaunchCount) ?? 0;
    final actionCount = prefs.getInt(_keyActionCount) ?? 0;
    final lastPromptDateStr = prefs.getString(_keyLastPromptDate);

    // Condition 1: Launch >= 3 AND Action >= 1 (Since called after action, action is implied >= 1)
    final condition1 = launchCount >= 3;
    // Condition 2: Action >= 3
    final condition2 = actionCount >= 3;

    if (!condition1 && !condition2) {
      return false;
    }

    // Check daily limit
    if (lastPromptDateStr != null) {
      final lastPromptDate = DateTime.parse(lastPromptDateStr);
      final now = DateTime.now();
      if (lastPromptDate.year == now.year &&
          lastPromptDate.month == now.month &&
          lastPromptDate.day == now.day) {
        return false;
      }
    }

    return true;
  }

  static Future<void> _updateLastPromptDate(SharedPreferences prefs) async {
    await prefs.setString(_keyLastPromptDate, DateTime.now().toIso8601String());
  }

  static Future<void> _showEnjoymentDialog(BuildContext context) async {
    if (Platform.isIOS) {
      await showCupertinoDialog(
        context: context,
        builder: (context) => CupertinoAlertDialog(
          title: const Text('minwariを楽しんでいただけていますか？'),
          actions: [
            CupertinoDialogAction(
              onPressed: () {
                Navigator.pop(context);
                _showFeedbackDialog(context);
              },
              isDefaultAction: false,
              child: const Text('いいえ'),
            ),
            CupertinoDialogAction(
              onPressed: () {
                Navigator.pop(context);
                _requestAppReview();
              },
              isDefaultAction: true,
              child: const Text('はい'),
            ),
          ],
        ),
      );
    } else {
      await showDialog(
        context: context,
        builder: (context) => SimpleDialog(
          title: const Text('minwariを楽しんでいただけていますか？'),
          children: [
            SimpleDialogOption(
              onPressed: () {
                Navigator.pop(context);
                _requestAppReview();
              },
              child: const Text('はい',
                  style: TextStyle(color: Colors.blue, fontSize: 16)),
            ),
            SimpleDialogOption(
              onPressed: () {
                Navigator.pop(context);
                _showFeedbackDialog(context);
              },
              child: const Text('いいえ',
                  style: TextStyle(color: Colors.red, fontSize: 16)),
            ),
          ],
        ),
      );
    }
  }

  static void _showFeedbackDialog(BuildContext context) {
    const title = 'フィードバックをお願いできませんか？';
    const content = 'いただいたご意見は今後の改善に役立てさせていただきます';
    const actionSend = '意見を送る';
    const actionNotNow = '今はしない';

    if (Platform.isIOS) {
      showCupertinoDialog(
        context: context,
        builder: (context) => CupertinoAlertDialog(
          title: const Text(title),
          content: const Text(content),
          actions: [
            CupertinoDialogAction(
              onPressed: () => Navigator.pop(context),
              child: const Text(actionNotNow),
            ),
            CupertinoDialogAction(
              onPressed: () {
                Navigator.pop(context);
                _openFeedbackWebView(context);
              },
              isDefaultAction: true,
              child: const Text(actionSend),
            ),
          ],
        ),
      );
    } else {
      showDialog(
        context: context,
        builder: (context) => SimpleDialog(
          title: const Text(title),
          children: [
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 24.0),
              child: Text(content),
            ),
            const SizedBox(height: 16),
            SimpleDialogOption(
              onPressed: () {
                Navigator.pop(context);
                _openFeedbackWebView(context);
              },
              child: const Text(actionSend,
                  style: TextStyle(color: Colors.blue, fontSize: 16)),
            ),
            SimpleDialogOption(
              onPressed: () => Navigator.pop(context),
              child: const Text(actionNotNow,
                  style: TextStyle(color: Colors.grey, fontSize: 16)),
            ),
          ],
        ),
      );
    }
  }

  static Future<void> _requestAppReview() async {
    final InAppReview inAppReview = InAppReview.instance;
    if (await inAppReview.isAvailable()) {
      inAppReview.requestReview();
    }
  }

  static void _openFeedbackWebView(BuildContext context) {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => WebViewScreen(
          url: getKoeloopUrl(context),
          title: 'フィードバック',
        ),
        fullscreenDialog: true,
      ),
    );
  }
}
