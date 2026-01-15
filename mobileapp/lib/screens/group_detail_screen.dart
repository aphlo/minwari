import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:minwari/models/group.dart';
import 'package:minwari/repositories/group_repository.dart';
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
  final GroupRepository _repository = GroupRepository();
  Group? _group;
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
      final group = await _repository.getGroup(widget.groupId);
      if (group != null) {
        setState(() {
          _group = group;
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
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          physics: const AlwaysScrollableScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
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
                expenses: const [], // TODO: Load expenses
                currency: group.currency,
              ),
              const SizedBox(height: 24),

              // Settlement section
              SettlementList(
                settlements: const [], // TODO: Calculate settlements
                currency: group.currency,
                hasExpenses: false, // TODO: Check if has expenses
              ),
            ],
          ),
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

  Widget _buildAddExpenseButton(BuildContext context, bool enabled) {
    return SizedBox(
      width: double.infinity,
      child: OutlinedButton.icon(
        onPressed: enabled
            ? () {
                // TODO: Navigate to add expense screen
              }
            : null,
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
