import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import 'package:minwari/lib/currency.dart';
import 'package:minwari/lib/locale_currency.dart';
import 'package:minwari/models/group.dart';
import 'package:minwari/repositories/group_repository.dart';
import 'package:minwari/screens/group_detail_screen.dart';
import 'package:minwari/theme/app_theme_extension.dart';
import 'package:minwari/widgets/currency_selector.dart';
import 'package:minwari/widgets/members_editor.dart';
import 'package:minwari/widgets/section_header.dart'; // Ensure correct import
import 'package:minwari/widgets/banner_ad_widget.dart';

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
  final _nameController = TextEditingController();
  final _repository = GroupRepository();

  final List<String> _members = [];
  String _selectedCurrency = defaultCurrency;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    // Initialize with existing group data if editing
    if (widget.group != null) {
      _nameController.text = widget.group!.name;
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
    _nameController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    // Filter out empty member names and trim whitespace
    final cleanedMembers =
        _members.map((m) => m.trim()).where((m) => m.isNotEmpty).toList();

    // Check for duplicate member names
    final uniqueMembers = cleanedMembers.toSet();
    if (uniqueMembers.length != cleanedMembers.length) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(context.l10n.memberAlreadyExists),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    setState(() => _isLoading = true);

    try {
      final String groupId;

      if (widget.isEditing) {
        // Update existing group
        await _repository.updateGroup(
          widget.group!.id,
          name: _nameController.text.trim(),
          members: cleanedMembers,
          currency: _selectedCurrency,
        );
        groupId = widget.group!.id;
      } else {
        // Create new group
        groupId = await _repository.createGroup(
          name: _nameController.text.trim(),
          members: cleanedMembers,
          currency: _selectedCurrency,
        );
      }

      // Fetch and save to local history
      final group = await _repository.getGroup(groupId);
      if (group != null) {
        await _repository.saveGroupToLocal(group);
      }

      if (!mounted) return;

      if (widget.isEditing) {
        // Go back to detail screen with updated group
        Navigator.of(context).pop(group);
      } else {
        // Navigate to group detail screen for new groups
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(
            builder: (context) => GroupDetailScreen(groupId: groupId),
          ),
        );
      }
    } catch (e) {
      debugPrint('Group creation error: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('${context.l10n.createGroupError}: $e'),
            backgroundColor: Colors.red,
            duration: const Duration(seconds: 10),
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: context.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          widget.isEditing ? context.l10n.editGroup : context.l10n.createGroup,
          style: TextStyle(color: context.textPrimary),
        ),
        backgroundColor: context.appBarBackgroundColor,
        elevation: 0,
        iconTheme: IconThemeData(color: context.textPrimary),
        leading: IconButton(
          icon: const Icon(CupertinoIcons.xmark),
          onPressed: () => Navigator.of(context).pop(),
        ),
        actions: [
          TextButton(
            onPressed: _isLoading ? null : _submit,
            child: Text(
              widget.isEditing ? context.l10n.save : context.l10n.create,
              style: TextStyle(
                fontWeight: FontWeight.w600,
                fontSize: 17,
                color:
                    _isLoading ? context.textSecondary : context.primaryColor,
              ),
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: Form(
                key: _formKey,
                child: ListView(
                  padding: const EdgeInsets.all(16),
                  children: [
                    // Group Name Section
                    SectionHeader(title: context.l10n.groupName),
                    const SizedBox(height: 8),
                    TextFormField(
                      controller: _nameController,
                      style: TextStyle(color: context.textPrimary),
                      decoration: InputDecoration(
                        hintText: context.l10n.groupNameHint,
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
                        prefixIcon: Icon(
                          CupertinoIcons.person_2_fill,
                          color: context.textSecondary,
                        ),
                      ),
                      validator: (value) {
                        if (value == null || value.trim().isEmpty) {
                          return context.l10n.groupNameRequired;
                        }
                        return null;
                      },
                    ),

                    const SizedBox(height: 24),

                    // Currency Section
                    SectionHeader(title: context.l10n.currency),
                    const SizedBox(height: 8),
                    CurrencySelector(
                      selectedCurrency: _selectedCurrency,
                      onCurrencyChanged: (value) {
                        setState(() => _selectedCurrency = value);
                      },
                    ),

                    const SizedBox(height: 24),

                    // Members Section
                    SectionHeader(title: context.l10n.members),
                    const SizedBox(height: 8),
                    MembersEditor(
                      members: _members,
                      onMemberChanged: (index, name) {
                        setState(() {
                          if (index >= _members.length) {
                            _members.add(name);
                          } else {
                            _members[index] = name;
                          }
                        });
                      },
                      onMemberRemove: (index) {
                        setState(() {
                          if (index >= 0 && index < _members.length) {
                            _members.removeAt(index);
                          }
                        });
                      },
                    ),

                    const SizedBox(height: 32),

                    // Submit Button
                    SizedBox(
                      height: 50,
                      child: ElevatedButton(
                        onPressed: _isLoading ? null : _submit,
                        child: _isLoading
                            ? const CupertinoActivityIndicator(
                                color: Colors.white)
                            : Text(widget.isEditing
                                ? context.l10n.save
                                : context.l10n.create),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const BannerAdWidget(),
          ],
        ),
      ),
    );
  }
}
