import 'dart:async';
import 'package:app_links/app_links.dart';
import 'package:flutter/material.dart';
import 'package:minwari/screens/group_detail_screen.dart';

class DeepLinkService {
  static final AppLinks _appLinks = AppLinks();
  static StreamSubscription<Uri>? _subscription;

  static Future<void> initialize(GlobalKey<NavigatorState> navigatorKey) async {
    // Handle cold start (app opened via deep link)
    final initialUri = await _appLinks.getInitialLink();
    if (initialUri != null) {
      // Delay to ensure navigator is ready
      WidgetsBinding.instance.addPostFrameCallback((_) {
        _handleUri(initialUri, navigatorKey);
      });
    }

    // Handle warm start (app already running, receives deep link)
    _subscription = _appLinks.uriLinkStream.listen((uri) {
      _handleUri(uri, navigatorKey);
    });
  }

  static void _handleUri(Uri uri, GlobalKey<NavigatorState> navigatorKey) {
    // Expected format: oursplit://groups/{groupId}
    if (uri.scheme != 'oursplit') return;
    if (uri.host != 'groups') return;

    final pathSegments = uri.pathSegments;
    if (pathSegments.isEmpty) return;

    final groupId = pathSegments.first;
    if (groupId.isEmpty) return;

    final navigator = navigatorKey.currentState;
    if (navigator == null) return;

    navigator.push(
      MaterialPageRoute(
        builder: (context) => GroupDetailScreen(groupId: groupId),
      ),
    );
  }

  static void dispose() {
    _subscription?.cancel();
    _subscription = null;
  }
}
