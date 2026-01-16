import 'dart:io';

class AdHelper {
  static String get bannerAdUnitId {
    if (Platform.isAndroid) {
      return 'ca-app-pub-6548153014267210/5561238770';
    } else if (Platform.isIOS) {
      return 'ca-app-pub-6548153014267210/4907450894';
    }
    throw UnsupportedError('Unsupported platform');
  }

  static String get nativeAdvancedAdUnitId {
    if (Platform.isAndroid) {
      return 'ca-app-pub-6548153014267210/7043687314';
    } else if (Platform.isIOS) {
      return 'ca-app-pub-6548153014267210/3259327306';
    }
    throw UnsupportedError('Unsupported platform');
  }
}
