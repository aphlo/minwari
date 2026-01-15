// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Japanese (`ja`).
class AppLocalizationsJa extends AppLocalizations {
  AppLocalizationsJa([String locale = 'ja']) : super(locale);

  @override
  String get appTitle => 'みんなの割り勘';

  @override
  String get termsOfService => '利用規約';

  @override
  String get privacyPolicy => 'プライバシーポリシー';

  @override
  String get version => 'バージョン';

  @override
  String get license => 'ライセンス';

  @override
  String get settings => '設定';

  @override
  String get theme => 'テーマ';

  @override
  String get language => '言語';

  @override
  String get noGroups => 'グループがありません';

  @override
  String get emptyStateDescription => 'グループを作成して友達と割り勘を始めましょう';

  @override
  String get createGroup => 'グループを作成';

  @override
  String get groupListTitle => 'グループ';

  @override
  String get appearance => '外観';

  @override
  String get themeLight => 'ライト';

  @override
  String get themeDark => 'ダーク';

  @override
  String get themeSystem => 'システム設定';

  @override
  String get groupName => 'グループ名';

  @override
  String get groupNameHint => '例：沖縄旅行2026';

  @override
  String get groupNameRequired => 'グループ名を入力してください';

  @override
  String get currency => '通貨';

  @override
  String get members => 'メンバー';

  @override
  String get memberNameHint => 'メンバー名';

  @override
  String get noMembersYet => 'メンバーがいません';

  @override
  String get memberAlreadyExists => '同じ名前のメンバーがいます';

  @override
  String get create => '作成';

  @override
  String get createGroupError => 'グループの作成に失敗しました';

  @override
  String get groupDetail => 'グループ詳細';

  @override
  String get groupNotFound => 'グループが見つかりません';

  @override
  String get goBack => '戻る';

  @override
  String get settlement => '精算';

  @override
  String get noSettlementsNeeded => '精算完了！';

  @override
  String get everyoneEven => '全員精算済みです';

  @override
  String get expenses => '支出';

  @override
  String get noExpenses => '支出がありません';

  @override
  String get noDescription => '説明なし';

  @override
  String get paidBy => '支払者';

  @override
  String get inquiry => 'お問い合わせ';

  @override
  String get editGroup => 'グループを編集';

  @override
  String get save => '保存';

  @override
  String get search => '検索';

  @override
  String get addMember => 'メンバーを追加する';

  @override
  String get addExpense => '立て替えを追加';

  @override
  String get records => '記録一覧';

  @override
  String get noRecordsYet => 'まだ記録がありません';

  @override
  String get noRecordsSubtitle => '「立て替えを追加」から記録を追加しましょう';

  @override
  String get settlementNoExpenses => '立て替えを記録すると精算内容が表示されます';

  @override
  String get noMembersWarning => 'メンバーがいません';

  @override
  String get noMembersWarningDescription => '「グループを編集」からメンバーを追加してください。';
}
