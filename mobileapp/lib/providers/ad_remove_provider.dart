import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'shared_preferences_provider.dart';

part 'ad_remove_provider.g.dart';

@riverpod
class AdRemoveNotifier extends _$AdRemoveNotifier {
  static const _key = 'ad_remove_until';

  @override
  DateTime? build() {
    final prefs = ref.watch(sharedPreferencesProvider);
    final savedMs = prefs.getInt(_key);
    if (savedMs != null) {
      final until = DateTime.fromMillisecondsSinceEpoch(savedMs);
      if (until.isAfter(DateTime.now())) {
        return until;
      }
    }
    return null;
  }

  Future<void> removeAdsFor24Hours() async {
    final newUntil = DateTime.now().add(const Duration(hours: 24));
    state = newUntil;
    final prefs = ref.read(sharedPreferencesProvider);
    await prefs.setInt(_key, newUntil.millisecondsSinceEpoch);
  }
}

@riverpod
bool isAdRemoved(Ref ref) {
  final adRemoveUntil = ref.watch(adRemoveProvider);
  if (adRemoveUntil == null) return false;
  return adRemoveUntil.isAfter(DateTime.now());
}
