import 'dart:io';
import 'package:flutter/material.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import 'package:minwari/utils/ad_helper.dart';

class NativeAdWidget extends StatefulWidget {
  final double height;
  final double width;

  const NativeAdWidget({
    super.key,
    required this.height,
    required this.width,
  });

  @override
  State<NativeAdWidget> createState() => _NativeAdWidgetState();
}

class _NativeAdWidgetState extends State<NativeAdWidget> {
  NativeAd? _nativeAd;
  bool _isAdLoaded = false;

  @override
  void initState() {
    super.initState();
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
          setState(() {
            _isAdLoaded = true;
          });
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
