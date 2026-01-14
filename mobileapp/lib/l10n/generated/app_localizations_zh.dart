// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Chinese (`zh`).
class AppLocalizationsZh extends AppLocalizations {
  AppLocalizationsZh([String locale = 'zh']) : super(locale);

  @override
  String get appTitle => 'OurSplit';

  @override
  String get termsOfService => '服务条款';

  @override
  String get privacyPolicy => '隐私政策';

  @override
  String get version => '版本';

  @override
  String get license => '许可';

  @override
  String get settings => '设置';

  @override
  String get theme => '主题';

  @override
  String get language => '语言';

  @override
  String get noGroups => '暂无群组';

  @override
  String get emptyStateDescription => '创建群组，与朋友开始分账';

  @override
  String get createGroup => '创建群组';

  @override
  String get groupListTitle => '群组';
}

/// The translations for Chinese, as used in China (`zh_CN`).
class AppLocalizationsZhCn extends AppLocalizationsZh {
  AppLocalizationsZhCn() : super('zh_CN');

  @override
  String get appTitle => 'OurSplit';

  @override
  String get termsOfService => '服务条款';

  @override
  String get privacyPolicy => '隐私政策';

  @override
  String get version => '版本';

  @override
  String get license => '许可';

  @override
  String get settings => '设置';

  @override
  String get theme => '主题';

  @override
  String get language => '语言';

  @override
  String get noGroups => '暂无群组';

  @override
  String get emptyStateDescription => '创建群组，与朋友开始分账';

  @override
  String get createGroup => '创建群组';

  @override
  String get groupListTitle => '群组';
}

/// The translations for Chinese, as used in Taiwan (`zh_TW`).
class AppLocalizationsZhTw extends AppLocalizationsZh {
  AppLocalizationsZhTw() : super('zh_TW');

  @override
  String get appTitle => 'OurSplit';

  @override
  String get termsOfService => '服務條款';

  @override
  String get privacyPolicy => '隱私政策';

  @override
  String get version => '版本';

  @override
  String get license => '授權';

  @override
  String get settings => '設定';

  @override
  String get theme => '主題';

  @override
  String get language => '語言';

  @override
  String get noGroups => '暫無群組';

  @override
  String get emptyStateDescription => '建立群組，與朋友開始分帳';

  @override
  String get createGroup => '建立群組';

  @override
  String get groupListTitle => '群組';
}
