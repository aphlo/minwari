import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:minwari/lib/settlement_calculator.dart';
import 'package:minwari/models/expense.dart';
import 'package:minwari/models/group.dart';
import 'package:minwari/repositories/expense_repository.dart';
import 'package:minwari/repositories/group_repository.dart';
import 'package:minwari/screens/expense_form_screen.dart';
import 'package:minwari/screens/group_form_screen.dart';
import 'package:minwari/theme/app_theme_extension.dart';
import 'package:minwari/widgets/expense_list.dart';
import 'package:minwari/widgets/group_info_card.dart';
import 'package:minwari/widgets/settlement_list.dart';
import 'package:minwari/widgets/section_header.dart';

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
      if (group != null) {
        // Load expenses
        final expenses = await _expenseRepository.getExpenses(widget.groupId);

        // Calculate settlements
        final expensesForSettlement =
            expenses.map((e) => e.toExpenseForSettlement()).toList();
        final settlements = calculateSettlements(
          expensesForSettlement,
          group.members,
          group.currency,
        );

        setState(() {
          _group = group;
          _expenses = expenses;
          _settlements = settlements;
          _isLoading = false;
        });
      } else {
        setState(() {
          _error = 'Group not found';
          _isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  void _navigateToEditGroup(Group group) async {
    final updatedGroup = await Navigator.of(context).push<Group>(
      MaterialPageRoute(
        builder: (context) => GroupFormScreen(group: group),
        fullscreenDialog: true,
      ),
    );
    // Only update state if we got an updated group back (user saved changes)
    if (updatedGroup != null) {
      setState(() {
        _group = updatedGroup;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        backgroundColor: context.scaffoldBackgroundColor,
        appBar: AppBar(
          title: Text(
            context.l10n.groupDetail,
            style: TextStyle(color: context.textPrimary),
          ),
          backgroundColor: context.appBarBackgroundColor,
          elevation: 0,
          leading: const BackButton(),
        ),
        body: const Center(child: CupertinoActivityIndicator(radius: 14)),
      );
    }

    if (_error != null || _group == null) {
      return Scaffold(
        backgroundColor: context.scaffoldBackgroundColor,
        appBar: AppBar(
          title: Text(
            context.l10n.groupDetail,
            style: TextStyle(color: context.textPrimary),
          ),
          backgroundColor: context.appBarBackgroundColor,
          elevation: 0,
          leading: const BackButton(),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                _error ?? context.l10n.groupNotFound,
                style: TextStyle(color: context.textSecondary),
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: _loadData,
                child: const Text('Retry'),
              ),
            ],
          ),
        ),
      );
    }

    final group = _group!;
    final hasMembers = group.members.isNotEmpty;

    return Scaffold(
      backgroundColor: context.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          group.name,
          style: TextStyle(color: context.textPrimary),
        ),
        backgroundColor: context.appBarBackgroundColor,
        elevation: 0,
        iconTheme: IconThemeData(color: context.textPrimary),
        leading: const BackButton(),
      ),
      body: RefreshIndicator(
        onRefresh: _loadData,
        child: CustomScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          slivers: [
            SliverPadding(
              padding: const EdgeInsets.all(16),
              sliver: SliverList(
                delegate: SliverChildListDelegate([
                  // Group summary card with edit button
                  GroupInfoCard(
                    group: group,
                    onEdit: () => _navigateToEditGroup(group),
                  ),
                  const SizedBox(height: 16),

                  // No members warning
                  if (!hasMembers) ...[
                    _buildNoMembersWarning(context),
                    const SizedBox(height: 16),
                  ],

                  // Add expense button
                  _buildAddExpenseButton(context, hasMembers),
                  const SizedBox(height: 24),

                  // Records section
                  LargeSectionHeader(title: context.l10n.records),
                  const SizedBox(height: 12),
                  ExpenseList(
                    expenses: _expenses,
                    currency: group.currency,
                    groupId: group.id,
                    members: group.members,
                    onExpenseUpdated: _loadData,
                  ),
                  const SizedBox(height: 24),

                  // Settlement section
                  SettlementList(
                    settlements: _settlements,
                    currency: group.currency,
                    hasExpenses: _expenses.isNotEmpty,
                  ),

                  // Bottom padding for safe area
                  SizedBox(height: MediaQuery.of(context).padding.bottom + 16),
                ]),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNoMembersWarning(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.amber.withValues(alpha: 0.15),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          Icon(
            CupertinoIcons.exclamationmark_triangle,
            size: 20,
            color: Colors.amber[700],
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  context.l10n.noMembersWarning,
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                    color: Colors.amber[700],
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  context.l10n.noMembersWarningDescription,
                  style: TextStyle(
                    fontSize: 14,
                    color: Colors.amber[700],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _navigateToAddExpense() async {
    final group = _group;
    if (group == null) return;

    final result = await Navigator.of(context).push<bool>(
      MaterialPageRoute(
        builder: (context) => ExpenseFormScreen(
          groupId: group.id,
          members: group.members,
          currency: group.currency,
        ),
        fullscreenDialog: true,
      ),
    );

    // Reload data if an expense was created
    if (result == true) {
      _loadData();
    }
  }

  Widget _buildAddExpenseButton(BuildContext context, bool enabled) {
    return SizedBox(
      width: double.infinity,
      child: OutlinedButton.icon(
        onPressed: enabled ? _navigateToAddExpense : null,
        icon: const Icon(CupertinoIcons.add),
        label: Text(context.l10n.addExpense),
        style: OutlinedButton.styleFrom(
          foregroundColor: context.primaryColor,
          side: BorderSide(
            color: enabled
                ? context.primaryColor
                : context.primaryColor.withValues(alpha: 0.3),
          ),
          padding: const EdgeInsets.symmetric(vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      ),
    );
  }
}
