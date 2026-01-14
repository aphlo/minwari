import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobileapp/l10n/generated/app_localizations.dart';
import 'package:mobileapp/lib/settlement_calculator.dart';
import 'package:mobileapp/models/expense.dart';
import 'package:mobileapp/models/group.dart';
import 'package:mobileapp/repositories/expense_repository.dart';
import 'package:mobileapp/repositories/group_repository.dart';
import 'package:mobileapp/widgets/expense_list.dart';
import 'package:mobileapp/widgets/group_info_card.dart';
import 'package:mobileapp/widgets/settlement_list.dart';

class GroupDetailScreen extends StatefulWidget {
  final String groupId;

  const GroupDetailScreen({super.key, required this.groupId});

  @override
  State<GroupDetailScreen> createState() => _GroupDetailScreenState();
}

class _GroupDetailScreenState extends State<GroupDetailScreen> {
  final GroupRepository _groupRepository = GroupRepository();
  final ExpenseRepository _expenseRepository = ExpenseRepository();

  Group? _group;
  List<Expense> _expenses = [];
  List<Settlement> _settlements = [];
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final group = await _groupRepository.getGroup(widget.groupId);
      if (group == null) {
        setState(() {
          _error = 'Group not found';
          _isLoading = false;
        });
        return;
      }

      final expenses = await _expenseRepository.getExpenses(widget.groupId);

      // Calculate settlements
      final expensesForSettlement =
          expenses.map((e) => e.toExpenseForSettlement()).toList();
      final settlements = calculateSettlements(
        expensesForSettlement,
        group.members,
        group.currency,
      );

      // Save to local history and last opened
      await _groupRepository.saveGroupToLocal(group);
      await _groupRepository.saveLastOpenedGroupId(widget.groupId);

      setState(() {
        _group = group;
        _expenses = expenses;
        _settlements = settlements;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);

    if (_isLoading) {
      return Scaffold(
        appBar: AppBar(title: Text(l10n?.groupDetail ?? 'Group Details')),
        body: const Center(child: CupertinoActivityIndicator(radius: 14)),
      );
    }

    if (_error != null || _group == null) {
      return _buildErrorState(l10n);
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(_group!.name),
        actions: [
          IconButton(
            icon: const Icon(CupertinoIcons.refresh),
            onPressed: _loadData,
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _loadData,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            GroupInfoCard(group: _group!),
            const SizedBox(height: 24),
            SettlementList(
              settlements: _settlements,
              currency: _group!.currency,
            ),
            const SizedBox(height: 24),
            ExpenseList(
              expenses: _expenses,
              currency: _group!.currency,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildErrorState(AppLocalizations? l10n) {
    return Scaffold(
      appBar: AppBar(title: Text(l10n?.groupDetail ?? 'Group Details')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              CupertinoIcons.exclamationmark_circle,
              size: 48,
              color: Theme.of(context).colorScheme.error,
            ),
            const SizedBox(height: 16),
            Text(
              _error ?? l10n?.groupNotFound ?? 'Group not found',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () => Navigator.of(context).pop(),
              child: Text(l10n?.goBack ?? 'Go Back'),
            ),
          ],
        ),
      ),
    );
  }
}
