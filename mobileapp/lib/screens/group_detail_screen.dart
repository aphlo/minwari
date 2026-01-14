import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobileapp/models/group.dart';
import 'package:mobileapp/repositories/group_repository.dart';
import 'package:mobileapp/theme/app_theme_extension.dart';
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
          backgroundColor: context.scaffoldBackgroundColor,
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
          backgroundColor: context.scaffoldBackgroundColor,
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

    return Scaffold(
      backgroundColor: context.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          group.name,
          style: TextStyle(color: context.textPrimary),
        ),
        backgroundColor: context.scaffoldBackgroundColor,
        elevation: 0,
        iconTheme: IconThemeData(color: context.textPrimary),
        leading: const BackButton(),
        actions: [
          IconButton(
            icon: const Icon(CupertinoIcons.settings),
            onPressed: () {
              // TODO: Implement group settings
            },
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _loadData,
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          physics: const AlwaysScrollableScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              GroupInfoCard(group: group),
              const SizedBox(height: 24),
              SettlementList(
                settlements: const [], // TODO: Calculate settlements
                currency: group.currency,
              ),
              const SizedBox(height: 24),
              ExpenseList(
                expenses: const [], // TODO: Load expenses
                currency: group.currency,
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // TODO: Add expense
        },
        backgroundColor: context.primaryColor,
        child: const Icon(CupertinoIcons.add, color: Colors.white),
      ),
    );
  }
}
