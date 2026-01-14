import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:minwari/theme/app_theme_extension.dart';

class MembersEditor extends StatefulWidget {
  final List<String> members;
  final Function(int, String) onMemberChanged;
  final Function(int) onMemberRemove;
  final VoidCallback? onAddMember;

  const MembersEditor({
    super.key,
    required this.members,
    required this.onMemberChanged,
    required this.onMemberRemove,
    this.onAddMember,
  });

  @override
  State<MembersEditor> createState() => _MembersEditorState();
}

class _MembersEditorState extends State<MembersEditor> {
  final List<TextEditingController> _controllers = [];
  final List<FocusNode> _focusNodes = [];

  @override
  void initState() {
    super.initState();
    _syncControllers();
  }

  @override
  void didUpdateWidget(MembersEditor oldWidget) {
    super.didUpdateWidget(oldWidget);
    _syncControllers();
  }

  void _syncControllers() {
    // Ensure we have at least one field (for new members)
    final targetCount = widget.members.isEmpty ? 1 : widget.members.length;

    // Add controllers if needed
    while (_controllers.length < targetCount) {
      final controller = TextEditingController();
      final focusNode = FocusNode();
      _controllers.add(controller);
      _focusNodes.add(focusNode);
    }

    // Remove extra controllers
    while (_controllers.length > targetCount) {
      _controllers.removeLast().dispose();
      _focusNodes.removeLast().dispose();
    }

    // Update controller texts
    for (int i = 0; i < widget.members.length; i++) {
      if (_controllers[i].text != widget.members[i]) {
        _controllers[i].text = widget.members[i];
      }
    }

    // Clear empty field if members list is empty
    if (widget.members.isEmpty && _controllers.isNotEmpty) {
      _controllers[0].text = '';
    }
  }

  @override
  void dispose() {
    for (final controller in _controllers) {
      controller.dispose();
    }
    for (final focusNode in _focusNodes) {
      focusNode.dispose();
    }
    super.dispose();
  }

  void _addMember() {
    // Add empty member to trigger new field
    widget.onMemberChanged(widget.members.length, '');
    // Focus on the new field after build
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_focusNodes.isNotEmpty) {
        _focusNodes.last.requestFocus();
      }
    });
  }

  void _onFieldChanged(int index, String value) {
    if (index < widget.members.length) {
      widget.onMemberChanged(index, value);
    } else if (value.isNotEmpty) {
      // New member being added
      widget.onMemberChanged(index, value);
    }
  }

  void _onFieldSubmitted(int index) {
    // If this is the last field and it has content, add a new member
    if (index == _controllers.length - 1 &&
        _controllers[index].text.trim().isNotEmpty) {
      _addMember();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Member fields
        for (int i = 0; i < _controllers.length; i++)
          Padding(
            padding:
                EdgeInsets.only(bottom: i < _controllers.length - 1 ? 8 : 0),
            child: _buildMemberField(context, i),
          ),

        const SizedBox(height: 12),

        // Add member button
        GestureDetector(
          onTap: _addMember,
          child: Row(
            children: [
              Icon(
                CupertinoIcons.add_circled,
                color: context.primaryColor,
                size: 22,
              ),
              const SizedBox(width: 8),
              Text(
                context.l10n.addMember,
                style: TextStyle(
                  color: context.primaryColor,
                  fontSize: 16,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildMemberField(BuildContext context, int index) {
    final isExistingMember = index < widget.members.length;

    return Row(
      children: [
        Expanded(
          child: Container(
            decoration: BoxDecoration(
              color: context.inputFillColor,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: _focusNodes[index].hasFocus
                    ? context.primaryColor
                    : Colors.transparent,
                width: 2,
              ),
            ),
            child: TextField(
              controller: _controllers[index],
              focusNode: _focusNodes[index],
              decoration: InputDecoration(
                hintText: context.l10n.memberNameHint,
                border: InputBorder.none,
                contentPadding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 14,
                ),
                isDense: true,
              ),
              style: TextStyle(
                fontSize: 17,
                color: context.textPrimary,
              ),
              onChanged: (value) => _onFieldChanged(index, value),
              onSubmitted: (_) => _onFieldSubmitted(index),
            ),
          ),
        ),
        const SizedBox(width: 8),
        // Show delete button for existing members or non-empty new fields
        if (isExistingMember || _controllers[index].text.isNotEmpty)
          IconButton(
            icon: Icon(
              CupertinoIcons.xmark,
              color: context.textSecondary,
              size: 20,
            ),
            onPressed: () {
              if (isExistingMember) {
                widget.onMemberRemove(index);
              } else {
                _controllers[index].clear();
              }
            },
          )
        else
          const SizedBox(width: 48), // Placeholder for alignment
      ],
    );
  }
}
