import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import 'package:minwari/providers/ad_remove_provider.dart';
import 'package:minwari/utils/ad_helper.dart';

class NativeAdWidget extends ConsumerStatefulWidget {
  final double height;
  final double width;

  const NativeAdWidget({
    super.key,
    required this.height,
    required this.width,
  });

  @override
  ConsumerState<NativeAdWidget> createState() => _NativeAdWidgetState();
}

class _NativeAdWidgetState extends ConsumerState<NativeAdWidget> {
  NativeAd? _nativeAd;
  bool _isAdLoaded = false;

  @override
  void initState() {
    super.initState();
    _checkAndLoadNativeAd();
  }

  void _checkAndLoadNativeAd() {
    final isRemoved = ref.read(isAdRemovedProvider);
    if (isRemoved) return;
    _loadNativeAd();
  }

  void _loadNativeAd() {
    // Only load native ads on Android for now as iOS native implementation is pending
    if (!Platform.isAndroid) return;

    _nativeAd = NativeAd(
      adUnitId: AdHelper.nativeAdvancedAdUnitId,
      factoryId:
          'gridLight', // Matches the factory ID registered in MainActivity.kt
      listener: NativeAdListener(
        onAdLoaded: (ad) {
          debugPrint('$NativeAd loaded.');
          if (mounted) {
            setState(() {
              _isAdLoaded = true;
            });
          }
        },
        onAdFailedToLoad: (ad, error) {
          debugPrint('$NativeAd failed to load: $error');
          ad.dispose();
        },
      ),
      request: const AdRequest(),
    );

    _nativeAd!.load();
  }

  @override
  void dispose() {
    _nativeAd?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isAdRemoved = ref.watch(isAdRemovedProvider);
    if (isAdRemoved) {
      return const SizedBox.shrink();
    }

    if (!_isAdLoaded || _nativeAd == null) {
      return const SizedBox.shrink();
    }

    return SizedBox(
      width: widget.width,
      height: widget.height,
      child: AdWidget(ad: _nativeAd!),
    );
  }
}
