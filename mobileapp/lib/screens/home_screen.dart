import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:minwari/theme/app_theme_extension.dart';
import 'package:minwari/models/group.dart';
import 'package:minwari/repositories/group_repository.dart';
import 'package:minwari/widgets/app_drawer.dart';
import 'package:minwari/widgets/empty_state.dart';
import 'package:minwari/widgets/group_list.dart';
import 'package:minwari/screens/group_form_screen.dart';
import 'package:minwari/screens/group_detail_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final GroupRepository _repository = GroupRepository();
  List<Group> _groups = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadGroups();
  }

  Future<void> _loadGroups() async {
    final groups = await _repository.getLocalGroups();
    setState(() {
      _groups = groups;
      _isLoading = false;
    });
  }

  void _navigateToCreateGroup(BuildContext context) async {
    await Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => const GroupFormScreen(),
        fullscreenDialog: true,
      ),
    );
    // Reload groups when returning
    _loadGroups();
  }

  void _navigateToGroupDetail(BuildContext context, Group group) async {
    await Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => GroupDetailScreen(groupId: group.id),
      ),
    );
    // Reload groups when returning
    _loadGroups();
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        backgroundColor: context.scaffoldBackgroundColor,
        body: const Center(child: CupertinoActivityIndicator()),
      );
    }

    return Scaffold(
      backgroundColor: context.scaffoldBackgroundColor,
      appBar: AppBar(
        backgroundColor: context.appBarBackgroundColor,
        elevation: 0,
        title: Text(
          context.l10n.appTitle,
          style: TextStyle(
            color: context.textPrimary,
            fontWeight: FontWeight.w700,
          ),
        ),
        iconTheme: IconThemeData(color: context.textPrimary),
      ),
      drawer: const AppDrawer(),
      body: _groups.isEmpty
          ? EmptyState(onCreateGroup: () => _navigateToCreateGroup(context))
          : GroupList(
              groups: _groups,
              onGroupTap: (group) => _navigateToGroupDetail(context, group),
            ),
      floatingActionButton: FloatingActionButton(
        heroTag: 'home_fab',
        onPressed: () => _navigateToCreateGroup(context),
        backgroundColor: context.primaryColor,
        child: const Icon(CupertinoIcons.add, color: Colors.white),
      ),
    );
  }
}
