// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Portuguese (`pt`).
class AppLocalizationsPt extends AppLocalizations {
  AppLocalizationsPt([String locale = 'pt']) : super(locale);

  @override
  String get appTitle => 'OurSplit';

  @override
  String get termsOfService => 'Termos de Serviço';

  @override
  String get privacyPolicy => 'Política de Privacidade';

  @override
  String get version => 'Versão';

  @override
  String get license => 'Licença';

  @override
  String get settings => 'Configurações';

  @override
  String get theme => 'Tema';

  @override
  String get language => 'Idioma';

  @override
  String get noGroups => 'Nenhum grupo ainda';

  @override
  String get emptyStateDescription =>
      'Crie um grupo para começar a dividir despesas com amigos';

  @override
  String get createGroup => 'Criar grupo';

  @override
  String get groupListTitle => 'Grupos';
}

/// The translations for Portuguese, as used in Brazil (`pt_BR`).
class AppLocalizationsPtBr extends AppLocalizationsPt {
  AppLocalizationsPtBr() : super('pt_BR');

  @override
  String get appTitle => 'OurSplit';

  @override
  String get termsOfService => 'Termos de Serviço';

  @override
  String get privacyPolicy => 'Política de Privacidade';

  @override
  String get version => 'Versão';

  @override
  String get license => 'Licença';

  @override
  String get settings => 'Configurações';

  @override
  String get theme => 'Tema';

  @override
  String get language => 'Idioma';

  @override
  String get noGroups => 'Nenhum grupo ainda';

  @override
  String get emptyStateDescription =>
      'Crie um grupo para começar a dividir despesas com amigos';

  @override
  String get createGroup => 'Criar grupo';

  @override
  String get groupListTitle => 'Grupos';
}
