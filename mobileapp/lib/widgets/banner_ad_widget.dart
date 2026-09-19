import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import 'package:minwari/providers/ad_remove_provider.dart';
import 'package:minwari/utils/ad_helper.dart';

class BannerAdWidget extends ConsumerStatefulWidget {
  final AdSize? size;

  const BannerAdWidget({super.key, this.size});

  @override
  ConsumerState<BannerAdWidget> createState() => _BannerAdWidgetState();
}

class _BannerAdWidgetState extends ConsumerState<BannerAdWidget> {
  BannerAd? _bannerAd;
  bool _isLoaded = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _checkAndLoadAd();
  }

  @override
  void dispose() {
    _bannerAd?.dispose();
    super.dispose();
  }

  Future<void> _checkAndLoadAd() async {
    final isRemoved = ref.read(isAdRemovedProvider);
    if (isRemoved) {
      if (_bannerAd != null) {
        _bannerAd?.dispose();
        _bannerAd = null;
        if (mounted) {
          setState(() {
            _isLoaded = false;
          });
        }
      }
      return;
    }

    _loadAd();
  }

  Future<void> _loadAd() async {
    // If a specific size is provided (e.g. Medium Rectangle), use it.
    // Otherwise, calculate adaptive size.
    final AdSize adSize;
    if (widget.size != null) {
      adSize = widget.size!;
    } else {
      // Get the width of the screen in logical pixels.
      final width = MediaQuery.of(context).size.width.truncate();
      final adaptiveSize =
          await AdSize.getCurrentOrientationAnchoredAdaptiveBannerAdSize(width);
      if (adaptiveSize == null) {
        // Fallback if sizing fails
        adSize = AdSize.banner;
      } else {
        adSize = adaptiveSize;
      }
    }

    // Dispose previous ad if it exists
    _bannerAd?.dispose();

    _bannerAd = BannerAd(
      adUnitId: AdHelper.bannerAdUnitId,
      request: const AdRequest(),
      size: adSize,
      listener: BannerAdListener(
        onAdLoaded: (ad) {
          debugPrint('$ad loaded.');
          if (mounted) {
            setState(() {
              _isLoaded = true;
            });
          }
        },
        onAdFailedToLoad: (ad, err) {
          debugPrint('BannerAd failed to load: $err');
          ad.dispose();
        },
      ),
    )..load();
  }

  @override
  Widget build(BuildContext context) {
    final isAdRemoved = ref.watch(isAdRemovedProvider);
    if (isAdRemoved) {
      return const SizedBox.shrink();
    }

    if (_bannerAd != null && _isLoaded) {
      return SafeArea(
        top: false,
        child: SizedBox(
          width: _bannerAd!.size.width.toDouble(),
          height: _bannerAd!.size.height.toDouble(),
          child: AdWidget(ad: _bannerAd!),
        ),
      );
    }
    return const SizedBox.shrink();
  }
}
