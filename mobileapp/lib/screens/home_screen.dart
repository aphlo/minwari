import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import '../l10n/generated/app_localizations.dart';
import '../models/group.dart';
import '../providers/theme_provider.dart';
import '../repositories/group_repository.dart';
import '../widgets/app_drawer.dart';
import '../widgets/empty_state.dart';
import '../widgets/group_list.dart';

class HomeScreen extends StatefulWidget {
  final ThemeProvider themeProvider;

  const HomeScreen({super.key, required this.themeProvider});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final GroupRepository _repository = GroupRepository();
  List<Group>? _groups;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadGroups();
  }

  Future<void> _loadGroups() async {
    final groups = await _repository.getGroups();
    setState(() {
      _groups = groups;
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);

    if (l10n == null) {
      return const Scaffold(
        body: Center(
          child: CupertinoActivityIndicator(radius: 14),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.appTitle),
        leading: Builder(
          builder: (context) => IconButton(
            icon: const Icon(CupertinoIcons.line_horizontal_3),
            onPressed: () => Scaffold.of(context).openDrawer(),
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(CupertinoIcons.plus),
            onPressed: () {
              // TODO: Navigate to create group
            },
          ),
        ],
      ),
      drawer: AppDrawer(themeProvider: widget.themeProvider),
      body: _isLoading
          ? const Center(
              child: CupertinoActivityIndicator(radius: 14),
            )
          : _groups == null || _groups!.isEmpty
              ? EmptyState(onCreateGroup: () {
                  // TODO: Navigate to create group
                })
              : GroupList(
                  groups: _groups!,
                  onGroupTap: (group) {
                    // TODO: Navigate to group details
                  },
                ),
    );
  }
}
