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

  @override
  String get appearance => 'Apariencia';

  @override
  String get themeLight => 'Claro';

  @override
  String get themeDark => 'Oscuro';

  @override
  String get themeSystem => 'Sistema';

  @override
  String get groupName => 'Nombre del grupo';

  @override
  String get groupNameHint => 'ej., Viaje a Okinawa 2026';

  @override
  String get groupNameRequired => 'Por favor ingresa un nombre de grupo';

  @override
  String get currency => 'Moneda';

  @override
  String get members => 'Miembros';

  @override
  String get memberNameHint => 'Nombre del miembro';

  @override
  String get noMembersYet => 'Sin miembros aún';

  @override
  String get memberAlreadyExists => 'El miembro ya existe';

  @override
  String get create => 'Crear';

  @override
  String get createGroupError => 'Error al crear grupo';

  @override
  String get groupDetail => 'Detalles del grupo';

  @override
  String get groupNotFound => 'Grupo no encontrado';

  @override
  String get goBack => 'Volver';

  @override
  String get settlement => 'Liquidación';

  @override
  String get noSettlementsNeeded => '¡Todo liquidado!';

  @override
  String get everyoneEven => 'Todos están en paz';

  @override
  String get expenses => 'Gastos';

  @override
  String get noExpenses => 'Sin gastos aún';

  @override
  String get noDescription => 'Sin descripción';

  @override
  String get paidBy => 'Pagado por';

  @override
  String get inquiry => 'Consulta';

  @override
  String get editGroup => 'Editar grupo';

  @override
  String get save => 'Guardar';

  @override
  String get search => 'Buscar';

  @override
  String get addMember => 'Añadir miembro';

  @override
  String get addExpense => 'Añadir gasto';

  @override
  String get records => 'Registros';

  @override
  String get noRecordsYet => 'Aún no hay registros';

  @override
  String get noRecordsSubtitle => 'Añade uno desde \"Añadir gasto\".';

  @override
  String get settlementNoExpenses =>
      'Los detalles de liquidación aparecerán cuando se añadan gastos';

  @override
  String get noMembersWarning => 'Sin miembros';

  @override
  String get noMembersWarningDescription =>
      'Por favor añade miembros desde \"Editar grupo\".';

  @override
  String get currencyJPY => 'Yen japones (JPY)';

  @override
  String get currencyUSD => 'Dolar estadounidense (USD)';

  @override
  String get currencyEUR => 'Euro (EUR)';

  @override
  String get currencyCNY => 'Yuan chino (CNY)';

  @override
  String get currencyKRW => 'Won coreano (KRW)';

  @override
  String get currencyTWD => 'Nuevo dolar taiwanes (TWD)';

  @override
  String get editExpense => 'Editar gasto';

  @override
  String get expenseAmount => 'Cantidad';

  @override
  String get expenseAmountRequired => 'Por favor ingresa una cantidad';

  @override
  String get expenseAmountInvalid => 'Por favor ingresa una cantidad válida';

  @override
  String get expenseDescription => 'Descripción';

  @override
  String get expenseDescriptionHint => 'ej., Cena';

  @override
  String get expenseDescriptionRequired => 'Por favor ingresa una descripción';

  @override
  String get expensePaidBy => 'Pagado por';

  @override
  String get expensePaidByRequired => 'Por favor selecciona quién pagó';

  @override
  String get expenseSplitWith => 'Dividir con';

  @override
  String get expenseSplitWithRequired =>
      'Por favor selecciona miembros para dividir';

  @override
  String get expenseSplitWithHint =>
      'Selecciona los miembros que compartirán este gasto';

  @override
  String get expenseCreateError => 'Error al añadir gasto';

  @override
  String get expenseUpdateError => 'Error al actualizar gasto';

  @override
  String get settlementViewDetail => 'View settlement details';

  @override
  String get settlementDetailTitle => 'Settlement Details';

  @override
  String get settlementDetailSubtitle =>
      'Review each member\'s paid and owed amounts';

  @override
  String get settlementDetailEmpty => 'No expenses to settle yet';

  @override
  String get settlementTotalSpending => 'Total group spending';

  @override
  String get settlementPaid => 'Paid';

  @override
  String get settlementOwed => 'Owed';

  @override
  String get settlementNetReceive => 'Receives';

  @override
  String get settlementNetPay => 'Pays';

  @override
  String get settlementNetEven => 'Settled';
}
