// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Spanish Castilian (`es`).
class AppLocalizationsEs extends AppLocalizations {
  AppLocalizationsEs([String locale = 'es']) : super(locale);

  @override
  String get appTitle => 'OurSplit';

  @override
  String get termsOfService => 'Términos de servicio';

  @override
  String get privacyPolicy => 'Política de privacidad';

  @override
  String get version => 'Versión';

  @override
  String get license => 'Licencia';

  @override
  String get settings => 'Configuración';

  @override
  String get theme => 'Tema';

  @override
  String get language => 'Idioma';

  @override
  String get noGroups => 'No hay grupos todavía';

  @override
  String get emptyStateDescription =>
      'Crea un grupo para empezar a dividir gastos con amigos';

  @override
  String get createGroup => 'Crear grupo';

  @override
  String get groupListTitle => 'Grupos';
}
