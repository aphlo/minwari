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

  @override
  String get appearance => '外观';

  @override
  String get themeLight => '浅色';

  @override
  String get themeDark => '深色';

  @override
  String get themeSystem => '跟随系统';

  @override
  String get groupName => '群组名称';

  @override
  String get groupNameHint => '例如：冲绳旅行2026';

  @override
  String get groupNameRequired => '请输入群组名称';

  @override
  String get currency => '货币';

  @override
  String get members => '成员';

  @override
  String get memberNameHint => '成员名称';

  @override
  String get noMembersYet => '暂无成员';

  @override
  String get memberAlreadyExists => '成员已存在';

  @override
  String get create => '创建';

  @override
  String get createGroupError => '创建群组失败';

  @override
  String get groupDetail => '群组详情';

  @override
  String get groupNotFound => '群组未找到';

  @override
  String get goBack => '返回';

  @override
  String get settlement => '结算';

  @override
  String get noSettlementsNeeded => '已结清！';

  @override
  String get everyoneEven => '大家都结清了';

  @override
  String get expenses => '支出';

  @override
  String get noExpenses => '暂无支出';

  @override
  String get noDescription => '无描述';

  @override
  String get paidBy => '支付者';

  @override
  String get inquiry => '咨询';

  @override
  String get editGroup => '编辑群组';

  @override
  String get save => '保存';

  @override
  String get search => '搜索';

  @override
  String get addMember => '添加成员';

  @override
  String get addExpense => '添加支出';

  @override
  String get records => '记录列表';

  @override
  String get noRecordsYet => '暂无记录';

  @override
  String get noRecordsSubtitle => '从「添加支出」添加记录。';

  @override
  String get settlementNoExpenses => '添加支出后将显示结算内容';

  @override
  String get noMembersWarning => '暂无成员';

  @override
  String get noMembersWarningDescription => '请从“编辑群组”添加成员。';

  @override
  String get currencyJPY => '日元 (JPY)';

  @override
  String get currencyUSD => '美元 (USD)';

  @override
  String get currencyEUR => '欧元 (EUR)';

  @override
  String get currencyCNY => '人民币 (CNY)';

  @override
  String get currencyKRW => '韩元 (KRW)';

  @override
  String get currencyTWD => '新台币 (TWD)';

  @override
  String get editExpense => '编辑支出';

  @override
  String get expenseAmount => '金额';

  @override
  String get expenseAmountRequired => '请输入金额';

  @override
  String get expenseAmountInvalid => '请输入有效金额';

  @override
  String get expenseDescription => '描述';

  @override
  String get expenseDescriptionHint => '例如：晚餐';

  @override
  String get expenseDescriptionRequired => '请输入描述';

  @override
  String get expensePaidBy => '支付者';

  @override
  String get expensePaidByRequired => '请选择支付者';

  @override
  String get expenseSplitWith => '分摊成员';

  @override
  String get expenseSplitWithRequired => '请选择分摊成员';

  @override
  String get expenseSplitWithHint => '选择分担此费用的成员';

  @override
  String get expenseCreateError => '添加支出失败';

  @override
  String get expenseUpdateError => '更新支出失败';

  @override
  String get settlementViewDetail => '查看结算详情';

  @override
  String get settlementDetailTitle => '结算详情';

  @override
  String get settlementDetailSubtitle => '查看每位成员的支付和负担金额';

  @override
  String get settlementDetailEmpty => '暂无需要结算的支出';

  @override
  String get settlementTotalSpending => '群组总支出';

  @override
  String get settlementPaid => '已支付';

  @override
  String get settlementOwed => '应付';

  @override
  String get settlementNetReceive => '应收';

  @override
  String get settlementNetPay => '应付';

  @override
  String get settlementNetEven => '已结清';

  @override
  String get reviewEnjoyTitle => '你喜欢 OurSplit 吗？';

  @override
  String get reviewYes => '是';

  @override
  String get reviewNo => '否';

  @override
  String get reviewFeedbackTitle => '介意给我们一些反馈吗？';

  @override
  String get reviewFeedbackContent => '你的反馈将帮助我们改进应用。';

  @override
  String get reviewSendFeedback => '发送反馈';

  @override
  String get reviewNotNow => '暂不';

  @override
  String get feedbackTitle => '反馈';

  @override
  String shareMessage(String groupName, String groupId, String url) {
    return '在 OurSplit 上查看我的群组“$groupName”！\nID: $groupId\n链接: $url\n';
  }
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

  @override
  String get appearance => '外观';

  @override
  String get themeLight => '浅色';

  @override
  String get themeDark => '深色';

  @override
  String get themeSystem => '跟随系统';

  @override
  String get groupName => '群组名称';

  @override
  String get groupNameHint => '例如：冲绳旅行2026';

  @override
  String get groupNameRequired => '请输入群组名称';

  @override
  String get currency => '货币';

  @override
  String get members => '成员';

  @override
  String get memberNameHint => '成员名称';

  @override
  String get noMembersYet => '暂无成员';

  @override
  String get memberAlreadyExists => '成员已存在';

  @override
  String get create => '创建';

  @override
  String get createGroupError => '创建群组失败';

  @override
  String get groupDetail => '群组详情';

  @override
  String get groupNotFound => '群组未找到';

  @override
  String get goBack => '返回';

  @override
  String get settlement => '结算';

  @override
  String get noSettlementsNeeded => '已结清！';

  @override
  String get everyoneEven => '大家都结清了';

  @override
  String get expenses => '支出';

  @override
  String get noExpenses => '暂无支出';

  @override
  String get noDescription => '无描述';

  @override
  String get paidBy => '支付者';

  @override
  String get inquiry => '咨询';

  @override
  String get editGroup => '编辑群组';

  @override
  String get save => '保存';

  @override
  String get search => '搜索';

  @override
  String get addMember => '添加成员';

  @override
  String get addExpense => '添加支出';

  @override
  String get records => '记录列表';

  @override
  String get noRecordsYet => '暂无记录';

  @override
  String get noRecordsSubtitle => '从「添加支出」添加记录。';

  @override
  String get settlementNoExpenses => '添加支出后将显示结算内容';

  @override
  String get noMembersWarning => '暂无成员';

  @override
  String get noMembersWarningDescription => '请从「编辑群组」添加成员。';

  @override
  String get currencyJPY => '日元 (JPY)';

  @override
  String get currencyUSD => '美元 (USD)';

  @override
  String get currencyEUR => '欧元 (EUR)';

  @override
  String get currencyCNY => '人民币 (CNY)';

  @override
  String get currencyKRW => '韩元 (KRW)';

  @override
  String get currencyTWD => '新台币 (TWD)';

  @override
  String get editExpense => '编辑支出';

  @override
  String get expenseAmount => '金额';

  @override
  String get expenseAmountRequired => '请输入金额';

  @override
  String get expenseAmountInvalid => '请输入有效金额';

  @override
  String get expenseDescription => '描述';

  @override
  String get expenseDescriptionHint => '例如：晚餐';

  @override
  String get expenseDescriptionRequired => '请输入描述';

  @override
  String get expensePaidBy => '支付者';

  @override
  String get expensePaidByRequired => '请选择支付者';

  @override
  String get expenseSplitWith => '分摊成员';

  @override
  String get expenseSplitWithRequired => '请选择分摊成员';

  @override
  String get expenseSplitWithHint => '选择分担此费用的成员';

  @override
  String get expenseCreateError => '添加支出失败';

  @override
  String get expenseUpdateError => '更新支出失败';

  @override
  String get settlementViewDetail => '查看结算详情';

  @override
  String get settlementDetailTitle => '结算详情';

  @override
  String get settlementDetailSubtitle => '查看每位成员的支付和负担金额';

  @override
  String get settlementDetailEmpty => '暂无需要结算的支出';

  @override
  String get settlementTotalSpending => '群组总支出';

  @override
  String get settlementPaid => '已支付';

  @override
  String get settlementOwed => '应付';

  @override
  String get settlementNetReceive => '应收';

  @override
  String get settlementNetPay => '应付';

  @override
  String get settlementNetEven => '已结清';

  @override
  String get reviewEnjoyTitle => '你喜欢 OurSplit 吗？';

  @override
  String get reviewYes => '是';

  @override
  String get reviewNo => '否';

  @override
  String get reviewFeedbackTitle => '介意给我们一些反馈吗？';

  @override
  String get reviewFeedbackContent => '你的反馈将帮助我们改进应用。';

  @override
  String get reviewSendFeedback => '发送反馈';

  @override
  String get reviewNotNow => '暂不';

  @override
  String get feedbackTitle => '反馈';

  @override
  String shareMessage(String groupName, String groupId, String url) {
    return '在 OurSplit 上查看我的群组“$groupName”！\nID: $groupId\n链接: $url\n';
  }
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

  @override
  String get appearance => '外觀';

  @override
  String get themeLight => '淺色';

  @override
  String get themeDark => '深色';

  @override
  String get themeSystem => '跟隨系統';

  @override
  String get groupName => '群組名稱';

  @override
  String get groupNameHint => '例如：沖繩旅行2026';

  @override
  String get groupNameRequired => '請輸入群組名稱';

  @override
  String get currency => '貨幣';

  @override
  String get members => '成員';

  @override
  String get memberNameHint => '成員名稱';

  @override
  String get noMembersYet => '暫無成員';

  @override
  String get memberAlreadyExists => '成員已存在';

  @override
  String get create => '建立';

  @override
  String get createGroupError => '建立群組失敗';

  @override
  String get groupDetail => '群組詳情';

  @override
  String get groupNotFound => '群組未找到';

  @override
  String get goBack => '返回';

  @override
  String get settlement => '結算';

  @override
  String get noSettlementsNeeded => '已結清！';

  @override
  String get everyoneEven => '大家都結清了';

  @override
  String get expenses => '支出';

  @override
  String get noExpenses => '暫無支出';

  @override
  String get noDescription => '無描述';

  @override
  String get paidBy => '支付者';

  @override
  String get inquiry => '諮詢';

  @override
  String get editGroup => '編輯群組';

  @override
  String get save => '儲存';

  @override
  String get search => '搜尋';

  @override
  String get addMember => '新增成員';

  @override
  String get addExpense => '新增支出';

  @override
  String get records => '記錄列表';

  @override
  String get noRecordsYet => '暫無記錄';

  @override
  String get noRecordsSubtitle => '從「新增支出」新增記錄。';

  @override
  String get settlementNoExpenses => '新增支出後將顯示結算內容';

  @override
  String get noMembersWarning => '暫無成員';

  @override
  String get noMembersWarningDescription => '請從「編輯群組」新增成員。';

  @override
  String get currencyJPY => '日圓 (JPY)';

  @override
  String get currencyUSD => '美元 (USD)';

  @override
  String get currencyEUR => '歐元 (EUR)';

  @override
  String get currencyCNY => '人民幣 (CNY)';

  @override
  String get currencyKRW => '韓元 (KRW)';

  @override
  String get currencyTWD => '新台幣 (TWD)';

  @override
  String get editExpense => '編輯支出';

  @override
  String get expenseAmount => '金額';

  @override
  String get expenseAmountRequired => '請輸入金額';

  @override
  String get expenseAmountInvalid => '請輸入有效金額';

  @override
  String get expenseDescription => '描述';

  @override
  String get expenseDescriptionHint => '例如：晚餐';

  @override
  String get expenseDescriptionRequired => '請輸入描述';

  @override
  String get expensePaidBy => '支付者';

  @override
  String get expensePaidByRequired => '請選擇支付者';

  @override
  String get expenseSplitWith => '分攤成員';

  @override
  String get expenseSplitWithRequired => '請選擇分攤成員';

  @override
  String get expenseSplitWithHint => '選擇分擔此費用的成員';

  @override
  String get expenseCreateError => '新增支出失敗';

  @override
  String get expenseUpdateError => '更新支出失敗';

  @override
  String get settlementViewDetail => '查看結算詳情';

  @override
  String get settlementDetailTitle => '結算詳情';

  @override
  String get settlementDetailSubtitle => '查看每位成員的支付和負擔金額';

  @override
  String get settlementDetailEmpty => '暫無需要結算的支出';

  @override
  String get settlementTotalSpending => '群組總支出';

  @override
  String get settlementPaid => '已支付';

  @override
  String get settlementOwed => '應付';

  @override
  String get settlementNetReceive => '應收';

  @override
  String get settlementNetPay => '應付';

  @override
  String get settlementNetEven => '已結清';

  @override
  String get reviewEnjoyTitle => '您喜歡 OurSplit 嗎？';

  @override
  String get reviewYes => '是';

  @override
  String get reviewNo => '否';

  @override
  String get reviewFeedbackTitle => '介意給我們一些回饋嗎？';

  @override
  String get reviewFeedbackContent => '您的回饋將幫助我們改進應用程式。';

  @override
  String get reviewSendFeedback => '發送回饋';

  @override
  String get reviewNotNow => '暫不';

  @override
  String get feedbackTitle => '回饋';

  @override
  String shareMessage(String groupName, String groupId, String url) {
    return '在 OurSplit 上查看我的群組「$groupName」！\nID: $groupId\n連結: $url\n';
  }
}
