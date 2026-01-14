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
  final TextEditingController _controller = TextEditingController();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _addMember() {
    if (_controller.text.trim().isNotEmpty) {
      widget.onMemberChanged(widget.members.length, _controller.text.trim());
      _controller.clear();
      // Only call onAddMember if it's explicitly passed (usually not needed if we handle state here)
      widget.onAddMember?.call();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (widget.members.isNotEmpty)
          Container(
            decoration: BoxDecoration(
              color: context.cardBackground,
              borderRadius: BorderRadius.circular(12),
            ),
            child: ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: widget.members.length,
              separatorBuilder: (context, index) => Divider(
                height: 1,
                indent: 16,
                color: context.dividerColor,
              ),
              itemBuilder: (context, index) {
                return Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: Row(
                    children: [
                      Container(
                        width: 32,
                        height: 32,
                        decoration: BoxDecoration(
                          color: context.primaryColor.withValues(alpha: 0.1),
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: Icon(
                          CupertinoIcons.person_fill,
                          size: 18,
                          color: context.primaryColor,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Text(
                          widget.members[index],
                          style: TextStyle(
                            fontSize: 17,
                            color: context.textPrimary,
                          ),
                        ),
                      ),
                      IconButton(
                        icon: Icon(
                          CupertinoIcons.minus_circle_fill,
                          color: Colors.red.withValues(alpha: 0.8),
                          size: 22,
                        ),
                        onPressed: () => widget.onMemberRemove(index),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: Container(
                decoration: BoxDecoration(
                  color: context.inputFillColor,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: TextField(
                  controller: _controller,
                  decoration: InputDecoration(
                    hintText: context.l10n.memberNameHint,
                    border: InputBorder.none,
                    contentPadding: const EdgeInsets.symmetric(
                        horizontal: 16, vertical: 14),
                    isDense: true,
                  ),
                  style: TextStyle(
                    fontSize: 17,
                    color: context.textPrimary,
                  ),
                  onSubmitted: (_) => _addMember(),
                ),
              ),
            ),
            const SizedBox(width: 12),
            Container(
              decoration: BoxDecoration(
                color: context.primaryColor,
                borderRadius: BorderRadius.circular(12),
              ),
              child: IconButton(
                icon: const Icon(CupertinoIcons.add, color: Colors.white),
                onPressed: _addMember,
              ),
            ),
          ],
        ),
      ],
    );
  }
}
