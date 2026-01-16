import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_en.dart';
import 'app_localizations_es.dart';
import 'app_localizations_ja.dart';
import 'app_localizations_ko.dart';
import 'app_localizations_pt.dart';
import 'app_localizations_zh.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'generated/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale)
      : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates =
      <LocalizationsDelegate<dynamic>>[
    delegate,
    GlobalMaterialLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[
    Locale('en'),
    Locale('es'),
    Locale('ja'),
    Locale('ko'),
    Locale('pt'),
    Locale('pt', 'BR'),
    Locale('zh'),
    Locale('zh', 'CN'),
    Locale('zh', 'TW')
  ];

  /// No description provided for @appTitle.
  ///
  /// In en, this message translates to:
  /// **'OurSplit'**
  String get appTitle;

  /// No description provided for @termsOfService.
  ///
  /// In en, this message translates to:
  /// **'Terms of Service'**
  String get termsOfService;

  /// No description provided for @privacyPolicy.
  ///
  /// In en, this message translates to:
  /// **'Privacy Policy'**
  String get privacyPolicy;

  /// No description provided for @version.
  ///
  /// In en, this message translates to:
  /// **'Version'**
  String get version;

  /// No description provided for @license.
  ///
  /// In en, this message translates to:
  /// **'License'**
  String get license;

  /// No description provided for @settings.
  ///
  /// In en, this message translates to:
  /// **'Settings'**
  String get settings;

  /// No description provided for @theme.
  ///
  /// In en, this message translates to:
  /// **'Theme'**
  String get theme;

  /// No description provided for @language.
  ///
  /// In en, this message translates to:
  /// **'Language'**
  String get language;

  /// No description provided for @noGroups.
  ///
  /// In en, this message translates to:
  /// **'No groups yet'**
  String get noGroups;

  /// No description provided for @emptyStateDescription.
  ///
  /// In en, this message translates to:
  /// **'Create a group to start splitting expenses with friends'**
  String get emptyStateDescription;

  /// No description provided for @createGroup.
  ///
  /// In en, this message translates to:
  /// **'Create a group'**
  String get createGroup;

  /// No description provided for @groupListTitle.
  ///
  /// In en, this message translates to:
  /// **'Groups'**
  String get groupListTitle;

  /// No description provided for @appearance.
  ///
  /// In en, this message translates to:
  /// **'Appearance'**
  String get appearance;

  /// No description provided for @themeLight.
  ///
  /// In en, this message translates to:
  /// **'Light'**
  String get themeLight;

  /// No description provided for @themeDark.
  ///
  /// In en, this message translates to:
  /// **'Dark'**
  String get themeDark;

  /// No description provided for @themeSystem.
  ///
  /// In en, this message translates to:
  /// **'System'**
  String get themeSystem;

  /// No description provided for @groupName.
  ///
  /// In en, this message translates to:
  /// **'Group Name'**
  String get groupName;

  /// No description provided for @groupNameHint.
  ///
  /// In en, this message translates to:
  /// **'e.g., Okinawa Trip 2026'**
  String get groupNameHint;

  /// No description provided for @groupNameRequired.
  ///
  /// In en, this message translates to:
  /// **'Please enter a group name'**
  String get groupNameRequired;

  /// No description provided for @currency.
  ///
  /// In en, this message translates to:
  /// **'Currency'**
  String get currency;

  /// No description provided for @members.
  ///
  /// In en, this message translates to:
  /// **'Members'**
  String get members;

  /// No description provided for @memberNameHint.
  ///
  /// In en, this message translates to:
  /// **'Member name'**
  String get memberNameHint;

  /// No description provided for @noMembersYet.
  ///
  /// In en, this message translates to:
  /// **'No members yet'**
  String get noMembersYet;

  /// No description provided for @memberAlreadyExists.
  ///
  /// In en, this message translates to:
  /// **'Member already exists'**
  String get memberAlreadyExists;

  /// No description provided for @create.
  ///
  /// In en, this message translates to:
  /// **'Create'**
  String get create;

  /// No description provided for @createGroupError.
  ///
  /// In en, this message translates to:
  /// **'Failed to create group'**
  String get createGroupError;

  /// No description provided for @groupDetail.
  ///
  /// In en, this message translates to:
  /// **'Group Details'**
  String get groupDetail;

  /// No description provided for @groupNotFound.
  ///
  /// In en, this message translates to:
  /// **'Group not found'**
  String get groupNotFound;

  /// No description provided for @goBack.
  ///
  /// In en, this message translates to:
  /// **'Go Back'**
  String get goBack;

  /// No description provided for @settlement.
  ///
  /// In en, this message translates to:
  /// **'Settlement'**
  String get settlement;

  /// No description provided for @noSettlementsNeeded.
  ///
  /// In en, this message translates to:
  /// **'All settled!'**
  String get noSettlementsNeeded;

  /// No description provided for @everyoneEven.
  ///
  /// In en, this message translates to:
  /// **'Everyone is even'**
  String get everyoneEven;

  /// No description provided for @expenses.
  ///
  /// In en, this message translates to:
  /// **'Expenses'**
  String get expenses;

  /// No description provided for @noExpenses.
  ///
  /// In en, this message translates to:
  /// **'No expenses yet'**
  String get noExpenses;

  /// No description provided for @noDescription.
  ///
  /// In en, this message translates to:
  /// **'No description'**
  String get noDescription;

  /// No description provided for @paidBy.
  ///
  /// In en, this message translates to:
  /// **'Paid by'**
  String get paidBy;

  /// No description provided for @inquiry.
  ///
  /// In en, this message translates to:
  /// **'Inquiry'**
  String get inquiry;

  /// No description provided for @editGroup.
  ///
  /// In en, this message translates to:
  /// **'Edit Group'**
  String get editGroup;

  /// No description provided for @save.
  ///
  /// In en, this message translates to:
  /// **'Save'**
  String get save;

  /// No description provided for @search.
  ///
  /// In en, this message translates to:
  /// **'Search'**
  String get search;

  /// No description provided for @addMember.
  ///
  /// In en, this message translates to:
  /// **'Add member'**
  String get addMember;

  /// No description provided for @addExpense.
  ///
  /// In en, this message translates to:
  /// **'Add expense'**
  String get addExpense;

  /// No description provided for @records.
  ///
  /// In en, this message translates to:
  /// **'Records'**
  String get records;

  /// No description provided for @noRecordsYet.
  ///
  /// In en, this message translates to:
  /// **'No records yet'**
  String get noRecordsYet;

  /// No description provided for @noRecordsSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Add one from \"Add expense\".'**
  String get noRecordsSubtitle;

  /// No description provided for @settlementNoExpenses.
  ///
  /// In en, this message translates to:
  /// **'Settlement details will appear once expenses are added'**
  String get settlementNoExpenses;

  /// No description provided for @noMembersWarning.
  ///
  /// In en, this message translates to:
  /// **'No members'**
  String get noMembersWarning;

  /// No description provided for @noMembersWarningDescription.
  ///
  /// In en, this message translates to:
  /// **'Please add members from \"Edit group\".'**
  String get noMembersWarningDescription;

  /// No description provided for @currencyJPY.
  ///
  /// In en, this message translates to:
  /// **'Japanese Yen (JPY)'**
  String get currencyJPY;

  /// No description provided for @currencyUSD.
  ///
  /// In en, this message translates to:
  /// **'US Dollar (USD)'**
  String get currencyUSD;

  /// No description provided for @currencyEUR.
  ///
  /// In en, this message translates to:
  /// **'Euro (EUR)'**
  String get currencyEUR;

  /// No description provided for @currencyCNY.
  ///
  /// In en, this message translates to:
  /// **'Chinese Yuan (CNY)'**
  String get currencyCNY;

  /// No description provided for @currencyKRW.
  ///
  /// In en, this message translates to:
  /// **'Korean Won (KRW)'**
  String get currencyKRW;

  /// No description provided for @currencyTWD.
  ///
  /// In en, this message translates to:
  /// **'New Taiwan Dollar (TWD)'**
  String get currencyTWD;

  /// No description provided for @editExpense.
  ///
  /// In en, this message translates to:
  /// **'Edit Expense'**
  String get editExpense;

  /// No description provided for @expenseAmount.
  ///
  /// In en, this message translates to:
  /// **'Amount'**
  String get expenseAmount;

  /// No description provided for @expenseAmountRequired.
  ///
  /// In en, this message translates to:
  /// **'Please enter an amount'**
  String get expenseAmountRequired;

  /// No description provided for @expenseAmountInvalid.
  ///
  /// In en, this message translates to:
  /// **'Please enter a valid amount'**
  String get expenseAmountInvalid;

  /// No description provided for @expenseDescription.
  ///
  /// In en, this message translates to:
  /// **'Description'**
  String get expenseDescription;

  /// No description provided for @expenseDescriptionHint.
  ///
  /// In en, this message translates to:
  /// **'e.g., Dinner'**
  String get expenseDescriptionHint;

  /// No description provided for @expenseDescriptionRequired.
  ///
  /// In en, this message translates to:
  /// **'Please enter a description'**
  String get expenseDescriptionRequired;

  /// No description provided for @expensePaidBy.
  ///
  /// In en, this message translates to:
  /// **'Paid by'**
  String get expensePaidBy;

  /// No description provided for @expensePaidByRequired.
  ///
  /// In en, this message translates to:
  /// **'Please select who paid'**
  String get expensePaidByRequired;

  /// No description provided for @expenseSplitWith.
  ///
  /// In en, this message translates to:
  /// **'Split with'**
  String get expenseSplitWith;

  /// No description provided for @expenseSplitWithRequired.
  ///
  /// In en, this message translates to:
  /// **'Please select members to split with'**
  String get expenseSplitWithRequired;

  /// No description provided for @expenseSplitWithHint.
  ///
  /// In en, this message translates to:
  /// **'Select members who will share this expense'**
  String get expenseSplitWithHint;

  /// No description provided for @expenseCreateError.
  ///
  /// In en, this message translates to:
  /// **'Failed to add expense'**
  String get expenseCreateError;

  /// No description provided for @expenseUpdateError.
  ///
  /// In en, this message translates to:
  /// **'Failed to update expense'**
  String get expenseUpdateError;

  /// No description provided for @settlementViewDetail.
  ///
  /// In en, this message translates to:
  /// **'View settlement details'**
  String get settlementViewDetail;

  /// No description provided for @settlementDetailTitle.
  ///
  /// In en, this message translates to:
  /// **'Settlement Details'**
  String get settlementDetailTitle;

  /// No description provided for @settlementDetailSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Review each member\'s paid and owed amounts'**
  String get settlementDetailSubtitle;

  /// No description provided for @settlementDetailEmpty.
  ///
  /// In en, this message translates to:
  /// **'No expenses to settle yet'**
  String get settlementDetailEmpty;

  /// No description provided for @settlementTotalSpending.
  ///
  /// In en, this message translates to:
  /// **'Total group spending'**
  String get settlementTotalSpending;

  /// No description provided for @settlementPaid.
  ///
  /// In en, this message translates to:
  /// **'Paid'**
  String get settlementPaid;

  /// No description provided for @settlementOwed.
  ///
  /// In en, this message translates to:
  /// **'Owed'**
  String get settlementOwed;

  /// No description provided for @settlementNetReceive.
  ///
  /// In en, this message translates to:
  /// **'Receives'**
  String get settlementNetReceive;

  /// No description provided for @settlementNetPay.
  ///
  /// In en, this message translates to:
  /// **'Pays'**
  String get settlementNetPay;

  /// No description provided for @settlementNetEven.
  ///
  /// In en, this message translates to:
  /// **'Settled'**
  String get settlementNetEven;

  /// No description provided for @reviewEnjoyTitle.
  ///
  /// In en, this message translates to:
  /// **'Are you enjoying Minwari?'**
  String get reviewEnjoyTitle;

  /// No description provided for @reviewYes.
  ///
  /// In en, this message translates to:
  /// **'Yes'**
  String get reviewYes;

  /// No description provided for @reviewNo.
  ///
  /// In en, this message translates to:
  /// **'No'**
  String get reviewNo;

  /// No description provided for @reviewFeedbackTitle.
  ///
  /// In en, this message translates to:
  /// **'Would you mind giving us some feedback?'**
  String get reviewFeedbackTitle;

  /// No description provided for @reviewFeedbackContent.
  ///
  /// In en, this message translates to:
  /// **'Your feedback will help us improve the app.'**
  String get reviewFeedbackContent;

  /// No description provided for @reviewSendFeedback.
  ///
  /// In en, this message translates to:
  /// **'Send Feedback'**
  String get reviewSendFeedback;

  /// No description provided for @reviewNotNow.
  ///
  /// In en, this message translates to:
  /// **'Not Now'**
  String get reviewNotNow;

  /// No description provided for @feedbackTitle.
  ///
  /// In en, this message translates to:
  /// **'Feedback'**
  String get feedbackTitle;
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) => <String>[
        'en',
        'es',
        'ja',
        'ko',
        'pt',
        'zh'
      ].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when language+country codes are specified.
  switch (locale.languageCode) {
    case 'pt':
      {
        switch (locale.countryCode) {
          case 'BR':
            return AppLocalizationsPtBr();
        }
        break;
      }
    case 'zh':
      {
        switch (locale.countryCode) {
          case 'CN':
            return AppLocalizationsZhCn();
          case 'TW':
            return AppLocalizationsZhTw();
        }
        break;
      }
  }

  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'en':
      return AppLocalizationsEn();
    case 'es':
      return AppLocalizationsEs();
    case 'ja':
      return AppLocalizationsJa();
    case 'ko':
      return AppLocalizationsKo();
    case 'pt':
      return AppLocalizationsPt();
    case 'zh':
      return AppLocalizationsZh();
  }

  throw FlutterError(
      'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
      'an issue with the localizations generation tool. Please file an issue '
      'on GitHub with a reproducible sample app and the gen-l10n configuration '
      'that was used.');
}
