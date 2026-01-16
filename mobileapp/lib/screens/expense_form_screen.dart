import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:minwari/lib/currency.dart';
import 'package:minwari/models/expense.dart';
import 'package:minwari/repositories/expense_repository.dart';
import 'package:minwari/theme/app_theme_extension.dart';
import 'package:minwari/widgets/section_header.dart';

/// Screen for creating or editing an expense
class ExpenseFormScreen extends StatefulWidget {
  final String groupId;
  final List<String> members;
  final String currency;
  final Expense? expense;

  const ExpenseFormScreen({
    super.key,
    required this.groupId,
    required this.members,
    required this.currency,
    this.expense,
  });

  bool get isEditing => expense != null;

  @override
  State<ExpenseFormScreen> createState() => _ExpenseFormScreenState();
}

class _ExpenseFormScreenState extends State<ExpenseFormScreen> {
  final _formKey = GlobalKey<FormState>();
  final _amountController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _repository = ExpenseRepository();

  String? _paidBy;
  Set<String> _splitWith = {};
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    if (widget.expense != null) {
      final fractionDigits = getCurrencyFractionDigits(widget.currency);
      _amountController.text =
          widget.expense!.amount.toStringAsFixed(fractionDigits);
      _descriptionController.text = widget.expense!.description;
      _paidBy = widget.expense!.paidBy;
      _splitWith = widget.expense!.splitWith.toSet();
    } else {
      // Default: first member pays, split with all members
      if (widget.members.isNotEmpty) {
        _paidBy = widget.members.first;
        _splitWith = widget.members.toSet();
      }
    }
  }

  @override
  void dispose() {
    _amountController.dispose();
    _descriptionController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    if (_paidBy == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(context.l10n.expensePaidByRequired),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    if (_splitWith.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(context.l10n.expenseSplitWithRequired),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    setState(() => _isLoading = true);

    try {
      final fractionDigits = getCurrencyFractionDigits(widget.currency);
      final amount = double.parse(_amountController.text);
      final normalizedAmount = normalizeCurrencyAmount(amount, fractionDigits);

      if (widget.isEditing) {
        await _repository.updateExpense(
          widget.groupId,
          widget.expense!.id,
          description: _descriptionController.text.trim(),
          amount: normalizedAmount,
          paidBy: _paidBy!,
          splitWith: _splitWith.toList(),
        );
      } else {
        await _repository.createExpense(
          widget.groupId,
          description: _descriptionController.text.trim(),
          amount: normalizedAmount,
          paidBy: _paidBy!,
          splitWith: _splitWith.toList(),
        );
      }

      if (!mounted) return;
      Navigator.of(context).pop(true);
    } catch (e) {
      debugPrint('Expense save error: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(widget.isEditing
                ? context.l10n.expenseUpdateError
                : context.l10n.expenseCreateError),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  void _toggleSplitMember(String member) {
    setState(() {
      if (_splitWith.contains(member)) {
        _splitWith.remove(member);
      } else {
        _splitWith.add(member);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final currencySymbol = getCurrencySymbol(widget.currency);
    final fractionDigits = getCurrencyFractionDigits(widget.currency);

    return Scaffold(
      backgroundColor: context.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          widget.isEditing ? context.l10n.editExpense : context.l10n.addExpense,
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
        child: Form(
          key: _formKey,
          child: ListView(
            padding: const EdgeInsets.all(16),
            children: [
              // Amount Section
              SectionHeader(title: context.l10n.expenseAmount),
              const SizedBox(height: 8),
              TextFormField(
                controller: _amountController,
                keyboardType:
                    const TextInputType.numberWithOptions(decimal: true),
                style: TextStyle(color: context.textPrimary),
                decoration: InputDecoration(
                  hintText:
                      fractionDigits > 0 ? '0.${'0' * fractionDigits}' : '0',
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
                  prefixIcon: Padding(
                    padding: const EdgeInsets.only(left: 16, right: 8),
                    child: Text(
                      currencySymbol,
                      style: TextStyle(
                        fontSize: 17,
                        color: context.textSecondary,
                      ),
                    ),
                  ),
                  prefixIconConstraints: const BoxConstraints(minWidth: 0),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return context.l10n.expenseAmountRequired;
                  }
                  final amount = double.tryParse(value);
                  if (amount == null || amount <= 0) {
                    return context.l10n.expenseAmountInvalid;
                  }
                  return null;
                },
              ),

              const SizedBox(height: 24),

              // Description Section
              SectionHeader(title: context.l10n.expenseDescription),
              const SizedBox(height: 8),
              TextFormField(
                controller: _descriptionController,
                style: TextStyle(color: context.textPrimary),
                decoration: InputDecoration(
                  hintText: context.l10n.expenseDescriptionHint,
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
                    CupertinoIcons.doc_text,
                    color: context.textSecondary,
                  ),
                ),
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return context.l10n.expenseDescriptionRequired;
                  }
                  return null;
                },
              ),

              const SizedBox(height: 24),

              // Paid By Section
              SectionHeader(title: context.l10n.expensePaidBy),
              const SizedBox(height: 8),
              DropdownMenu<String>(
                initialSelection: _paidBy,
                expandedInsets: EdgeInsets.zero,
                inputDecorationTheme: InputDecorationTheme(
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
                textStyle: TextStyle(
                  color: context.textPrimary,
                  fontSize: 16,
                ),
                trailingIcon: Icon(
                  CupertinoIcons.chevron_down,
                  color: context.textSecondary,
                  size: 18,
                ),
                selectedTrailingIcon: Icon(
                  CupertinoIcons.chevron_up,
                  color: context.textSecondary,
                  size: 18,
                ),
                menuStyle: MenuStyle(
                  backgroundColor:
                      WidgetStatePropertyAll(context.cardBackground),
                  shape: WidgetStatePropertyAll(
                    RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                ),
                dropdownMenuEntries: widget.members.map((member) {
                  return DropdownMenuEntry<String>(
                    value: member,
                    label: member,
                  );
                }).toList(),
                onSelected: (value) {
                  setState(() => _paidBy = value);
                },
              ),

              const SizedBox(height: 24),

              // Split With Section
              SectionHeader(title: context.l10n.expenseSplitWith),
              const SizedBox(height: 8),
              Container(
                decoration: BoxDecoration(
                  color: context.inputFillColor,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Column(
                  children: widget.members.asMap().entries.map((entry) {
                    final index = entry.key;
                    final member = entry.value;
                    final isSelected = _splitWith.contains(member);
                    final isLast = index == widget.members.length - 1;

                    return Column(
                      children: [
                        ListTile(
                          title: Text(
                            member,
                            style: TextStyle(
                              color: context.textPrimary,
                              fontWeight: isSelected
                                  ? FontWeight.w600
                                  : FontWeight.normal,
                            ),
                          ),
                          trailing: isSelected
                              ? Icon(
                                  CupertinoIcons.checkmark_square_fill,
                                  color: context.primaryColor,
                                )
                              : Icon(
                                  CupertinoIcons.square,
                                  color: context.textSecondary
                                      .withValues(alpha: 0.3),
                                ),
                          onTap: () => _toggleSplitMember(member),
                          contentPadding: const EdgeInsets.symmetric(
                            horizontal: 16,
                            vertical: 4,
                          ),
                        ),
                        if (!isLast)
                          Divider(
                            height: 1,
                            indent: 16,
                            endIndent: 16,
                            color: context.dividerColor,
                          ),
                      ],
                    );
                  }).toList(),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 8, left: 4),
                child: Text(
                  context.l10n.expenseSplitWithHint,
                  style: TextStyle(
                    fontSize: 13,
                    color: context.textSecondary,
                  ),
                ),
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
                          ? context.l10n.save
                          : context.l10n.create),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
