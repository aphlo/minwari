// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Korean (`ko`).
class AppLocalizationsKo extends AppLocalizations {
  AppLocalizationsKo([String locale = 'ko']) : super(locale);

  @override
  String get appTitle => 'OurSplit';

  @override
  String get termsOfService => '이용 약관';

  @override
  String get privacyPolicy => '개인정보 처리방침';

  @override
  String get version => '버전';

  @override
  String get license => '라이선스';

  @override
  String get settings => '설정';

  @override
  String get theme => '테마';

  @override
  String get language => '언어';

  @override
  String get noGroups => '그룹 없음';

  @override
  String get emptyStateDescription => '그룹을 만들어 친구들과 비용을 나눠보세요';

  @override
  String get createGroup => '그룹 만들기';

  @override
  String get groupListTitle => '그룹';

  @override
  String get appearance => '외관';

  @override
  String get themeLight => '라이트';

  @override
  String get themeDark => '다크';

  @override
  String get themeSystem => '시스템';

  @override
  String get groupName => '그룹 이름';

  @override
  String get groupNameHint => '예: 오키나와 여행 2026';

  @override
  String get groupNameRequired => '그룹 이름을 입력하세요';

  @override
  String get currency => '통화';

  @override
  String get members => '멤버';

  @override
  String get memberNameHint => '멤버 이름';

  @override
  String get noMembersYet => '멤버가 없습니다';

  @override
  String get memberAlreadyExists => '이미 존재하는 멤버입니다';

  @override
  String get create => '만들기';

  @override
  String get createGroupError => '그룹 생성 실패';

  @override
  String get groupDetail => '그룹 상세';

  @override
  String get groupNotFound => '그룹을 찾을 수 없습니다';

  @override
  String get goBack => '뒤로';

  @override
  String get settlement => '정산';

  @override
  String get noSettlementsNeeded => '모두 정산됨!';

  @override
  String get everyoneEven => '모두 정산 완료';

  @override
  String get expenses => '지출';

  @override
  String get noExpenses => '지출이 없습니다';

  @override
  String get noDescription => '설명 없음';

  @override
  String get paidBy => '결제자';

  @override
  String get inquiry => '문의';

  @override
  String get editGroup => '그룹 편집';

  @override
  String get save => '저장';

  @override
  String get search => '검색';

  @override
  String get addMember => '멤버 추가';

  @override
  String get addExpense => '지출 추가';

  @override
  String get records => '기록';

  @override
  String get noRecordsYet => '아직 기록이 없습니다';

  @override
  String get noRecordsSubtitle => '\"지출 추가\"에서 기록을 추가하세요.';

  @override
  String get settlementNoExpenses => '지출을 기록하면 정산 내용이 표시됩니다';

  @override
  String get noMembersWarning => '멤버 없음';

  @override
  String get noMembersWarningDescription => '\"그룹 편집\"에서 멤버를 추가해주세요.';

  @override
  String get currencyJPY => '일본 엔 (JPY)';

  @override
  String get currencyUSD => '미국 달러 (USD)';

  @override
  String get currencyEUR => '유로 (EUR)';

  @override
  String get currencyCNY => '중국 위안 (CNY)';

  @override
  String get currencyKRW => '한국 원 (KRW)';

  @override
  String get currencyTWD => '대만 달러 (TWD)';

  @override
  String get editExpense => '지출 편집';

  @override
  String get expenseAmount => '금액';

  @override
  String get expenseAmountRequired => '금액을 입력하세요';

  @override
  String get expenseAmountInvalid => '유효한 금액을 입력하세요';

  @override
  String get expenseDescription => '설명';

  @override
  String get expenseDescriptionHint => '예: 저녁 식사';

  @override
  String get expenseDescriptionRequired => '설명을 입력하세요';

  @override
  String get expensePaidBy => '결제자';

  @override
  String get expensePaidByRequired => '결제자를 선택하세요';

  @override
  String get expenseSplitWith => '분담 멤버';

  @override
  String get expenseSplitWithRequired => '분담 멤버를 선택하세요';

  @override
  String get expenseSplitWithHint => '이 비용을 분담할 멤버를 선택하세요';

  @override
  String get expenseCreateError => '지출 추가 실패';

  @override
  String get expenseUpdateError => '지출 업데이트 실패';

  @override
  String get settlementViewDetail => '정산 상세 보기';

  @override
  String get settlementDetailTitle => '정산 상세';

  @override
  String get settlementDetailSubtitle => '각 멤버의 지불 및 부담 금액 확인';

  @override
  String get settlementDetailEmpty => '아직 정산할 지출이 없습니다';

  @override
  String get settlementTotalSpending => '그룹 총 지출';

  @override
  String get settlementPaid => '지불 금액';

  @override
  String get settlementOwed => '부담 금액';

  @override
  String get settlementNetReceive => '받을 금액';

  @override
  String get settlementNetPay => '지불할 금액';

  @override
  String get settlementNetEven => '정산 완료';

  @override
  String get reviewEnjoyTitle => 'OurSplit을 즐겁게 사용하고 계신가요?';

  @override
  String get reviewYes => '네';

  @override
  String get reviewNo => '아니요';

  @override
  String get reviewFeedbackTitle => '피드백을 주시겠어요?';

  @override
  String get reviewFeedbackContent => '귀하의 피드백은 앱을 개선하는 데 도움이 됩니다.';

  @override
  String get reviewSendFeedback => '피드백 보내기';

  @override
  String get reviewNotNow => '나중에';

  @override
  String get feedbackTitle => '피드백';

  @override
  String shareMessage(String groupName, String groupId, String url) {
    return 'OurSplit에서 내 그룹 \"$groupName\"을(를) 확인하세요!\nID: $groupId\n링크: $url\n';
  }
}
