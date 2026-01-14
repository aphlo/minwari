import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobileapp/l10n/generated/app_localizations.dart';
import 'package:mobileapp/lib/currency.dart';
import 'package:mobileapp/lib/locale_currency.dart';
import 'package:mobileapp/models/group.dart';
import 'package:mobileapp/repositories/group_repository.dart';
import 'package:mobileapp/screens/group_detail_screen.dart';
import 'package:mobileapp/theme/app_theme_extension.dart';
import 'package:mobileapp/widgets/currency_selector.dart';
import 'package:mobileapp/widgets/members_editor.dart';
import 'package:mobileapp/widgets/section_header.dart';

/// Screen for creating or editing a group
/// Set [group] to edit an existing group, leave null to create new
class GroupFormScreen extends StatefulWidget {
  final Group? group;

  const GroupFormScreen({super.key, this.group});

  bool get isEditing => group != null;

  @override
  State<GroupFormScreen> createState() => _GroupFormScreenState();
}

class _GroupFormScreenState extends State<GroupFormScreen> {
  final _formKey = GlobalKey<FormState>();
  final _groupNameController = TextEditingController();
  final _memberController = TextEditingController();
  final _repository = GroupRepository();

  final List<String> _members = [];
  String _selectedCurrency = defaultCurrency;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    // Initialize with existing group data if editing
    if (widget.group != null) {
      _groupNameController.text = widget.group!.name;
      _members.addAll(widget.group!.members);
      _selectedCurrency = widget.group!.currency;
    }
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Set default currency based on locale (only for new groups)
    if (widget.group == null && _selectedCurrency == defaultCurrency) {
      final locale = Localizations.localeOf(context);
      final localeString = locale.countryCode != null
          ? '${locale.languageCode}-${locale.countryCode}'
          : locale.languageCode;
      _selectedCurrency = getDefaultCurrencyForLocale(localeString);
    }
  }

  @override
  void dispose() {
    _groupNameController.dispose();
    _memberController.dispose();
    super.dispose();
  }

  void _addMember() {
    final memberName = _memberController.text.trim();
    if (memberName.isEmpty) return;

    if (_members.contains(memberName)) {
      _showSnackBar(
        AppLocalizations.of(context)?.memberAlreadyExists ??
            'Member already exists',
      );
      return;
    }

    setState(() {
      _members.add(memberName);
      _memberController.clear();
    });
  }

  void _removeMember(String member) {
    setState(() {
      _members.remove(member);
    });
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    try {
      final String groupId;

      if (widget.isEditing) {
        // Update existing group
        await _repository.updateGroup(
          widget.group!.id,
          name: _groupNameController.text.trim(),
          members: _members,
          currency: _selectedCurrency,
        );
        groupId = widget.group!.id;
      } else {
        // Create new group
        groupId = await _repository.createGroup(
          name: _groupNameController.text.trim(),
          members: _members,
          currency: _selectedCurrency,
        );
      }

      // Fetch and save to local history
      final group = await _repository.getGroup(groupId);
      if (group != null) {
        await _repository.saveGroupToLocal(group);
      }

      if (!mounted) return;

      // Navigate to group detail screen
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(
          builder: (context) => GroupDetailScreen(groupId: groupId),
        ),
      );
    } catch (e) {
      _showSnackBar(
        AppLocalizations.of(context)?.createGroupError ??
            'Failed to save group',
      );
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);

    final title = widget.isEditing
        ? (l10n?.editGroup ?? 'Edit Group')
        : (l10n?.createGroup ?? 'Create Group');

    return Scaffold(
      appBar: AppBar(
        title: Text(title),
        leading: IconButton(
          icon: const Icon(CupertinoIcons.xmark),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: SafeArea(
        child: Form(
          key: _formKey,
          child: ListView(
            padding: const EdgeInsets.all(16),
            children: [
              // Group Name Section
              SectionHeader(
                title: l10n?.groupName ?? 'Group Name',
                textColor: context.textPrimary.withValues(alpha: 0.6),
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _groupNameController,
                style: const TextStyle(fontSize: 17),
                decoration: InputDecoration(
                  hintText: l10n?.groupNameHint ?? 'e.g., Okinawa Trip 2026',
                  filled: true,
                  fillColor: context.inputFillColor,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: BorderSide.none,
                  ),
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 14,
                  ),
                ),
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return l10n?.groupNameRequired ??
                        'Please enter a group name';
                  }
                  return null;
                },
              ),

              const SizedBox(height: 24),

              // Currency Section
              SectionHeader(
                title: l10n?.currency ?? 'Currency',
                textColor: context.textPrimary.withValues(alpha: 0.6),
              ),
              const SizedBox(height: 8),
              CurrencySelector(
                selectedCurrency: _selectedCurrency,
                onCurrencyChanged: (currency) {
                  setState(() => _selectedCurrency = currency);
                },
              ),

              const SizedBox(height: 24),

              // Members Section
              SectionHeader(
                title: l10n?.members ?? 'Members',
                textColor: context.textPrimary.withValues(alpha: 0.6),
              ),
              const SizedBox(height: 8),
              MembersEditor(
                members: _members,
                controller: _memberController,
                onAddMember: _addMember,
                onRemoveMember: _removeMember,
              ),

              const SizedBox(height: 32),

              // Submit Button
              SizedBox(
                height: 50,
                child: ElevatedButton(
                  onPressed: _isLoading ? null : _submit,
                  child: _isLoading
                      ? const CupertinoActivityIndicator(color: Colors.white)
                      : Text(widget.isEditing
                          ? (l10n?.save ?? 'Save')
                          : (l10n?.create ?? 'Create')),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
