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

  @override
  String get currencyJPY => '日本円 (JPY)';

  @override
  String get currencyUSD => '米ドル (USD)';

  @override
  String get currencyEUR => 'ユーロ (EUR)';

  @override
  String get currencyCNY => '中国人民元 (CNY)';

  @override
  String get currencyKRW => '韓国ウォン (KRW)';

  @override
  String get currencyTWD => '台湾ドル (TWD)';

  @override
  String get editExpense => '立て替えを編集';

  @override
  String get expenseAmount => '金額';

  @override
  String get expenseAmountRequired => '金額を入力してください';

  @override
  String get expenseAmountInvalid => '有効な金額を入力してください';

  @override
  String get expenseDescription => '内容';

  @override
  String get expenseDescriptionHint => '例：夕食代';

  @override
  String get expenseDescriptionRequired => '内容を入力してください';

  @override
  String get expensePaidBy => '支払った人';

  @override
  String get expensePaidByRequired => '支払った人を選択してください';

  @override
  String get expenseSplitWith => '割り勘メンバー';

  @override
  String get expenseSplitWithRequired => '割り勘メンバーを選択してください';

  @override
  String get expenseSplitWithHint => '費用を分担するメンバーを選択してください';

  @override
  String get expenseCreateError => '立て替えの追加に失敗しました';

  @override
  String get expenseUpdateError => '立て替えの更新に失敗しました';

  @override
  String get settlementViewDetail => '精算の詳細を見る';

  @override
  String get settlementDetailTitle => '精算の詳細';

  @override
  String get settlementDetailSubtitle => '各メンバーの支払い額と負担額を確認';

  @override
  String get settlementDetailEmpty => 'まだ精算する支出がありません';

  @override
  String get settlementTotalSpending => 'グループの合計支出';

  @override
  String get settlementPaid => '支払い額';

  @override
  String get settlementOwed => '負担額';

  @override
  String get settlementNetReceive => '受け取り';

  @override
  String get settlementNetPay => '支払い';

  @override
  String get settlementNetEven => '精算済み';

  @override
  String get reviewEnjoyTitle => 'みんなの割り勘を楽しんでいただけていますか？';

  @override
  String get reviewYes => 'はい';

  @override
  String get reviewNo => 'いいえ';

  @override
  String get reviewFeedbackTitle => 'フィードバックをお願いできませんか？';

  @override
  String get reviewFeedbackContent => 'いただいたご意見は今後の改善に役立てさせていただきます';

  @override
  String get reviewSendFeedback => '意見を送る';

  @override
  String get reviewNotNow => '今はしない';

  @override
  String get feedbackTitle => 'フィードバック';

  @override
  String shareMessage(String groupName, String groupId, String url) {
    return 'みんなの割り勘でグループ「$groupName」を共有します。\nID: $groupId\nリンク: $url\n';
  }
}
