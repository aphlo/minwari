import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import 'package:minwari/providers/ad_remove_provider.dart';
import 'package:minwari/theme/app_theme_extension.dart';
import 'package:minwari/utils/ad_helper.dart';

class RewardAdService {
  static Future<void> showRewardAd(BuildContext context, WidgetRef ref) async {
    // Show loading dialog
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (dialogContext) => Dialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              const CircularProgressIndicator(),
              const SizedBox(width: 20),
              Expanded(
                child: Text(
                  context.l10n.rewardAdLoading,
                  style: const TextStyle(fontSize: 15),
                ),
              ),
            ],
          ),
        ),
      ),
    );

    RewardedAd.load(
      adUnitId: AdHelper.rewardedAdUnitId,
      request: const AdRequest(),
      rewardedAdLoadCallback: RewardedAdLoadCallback(
        onAdLoaded: (RewardedAd ad) {
          // Dismiss loading dialog
          if (context.mounted) {
            Navigator.of(context, rootNavigator: true).pop();
          }

          ad.fullScreenContentCallback = FullScreenContentCallback(
            onAdDismissedFullScreenContent: (RewardedAd ad) {
              ad.dispose();
            },
            onAdFailedToShowFullScreenContent: (RewardedAd ad, AdError error) {
              ad.dispose();
              if (context.mounted) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text(context.l10n.rewardAdFailed)),
                );
              }
            },
          );

          ad.show(
            onUserEarnedReward: (AdWithoutView ad, RewardItem rewardItem) async {
              await ref.read(adRemoveProvider.notifier).removeAdsFor24Hours();
              if (context.mounted) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text(context.l10n.rewardAdSuccess)),
                );
              }
            },
          );
        },
        onAdFailedToLoad: (LoadAdError error) {
          // Dismiss loading dialog
          if (context.mounted) {
            Navigator.of(context, rootNavigator: true).pop();
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text(context.l10n.rewardAdFailed)),
            );
          }
        },
      ),
    );
  }
}
