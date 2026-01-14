import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:minwari/lib/currency.dart';
import 'package:minwari/theme/app_theme_extension.dart';

/// Currency selector widget for group forms
/// Used in both group creation and editing
class CurrencySelector extends StatelessWidget {
  final String selectedCurrency;
  final ValueChanged<String> onCurrencyChanged;

  const CurrencySelector({
    super.key,
    required this.selectedCurrency,
    required this.onCurrencyChanged,
  });

  void _showCurrencyPicker(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => _CurrencyPickerSheet(
        selectedCurrency: selectedCurrency,
        onCurrencyChanged: (currency) {
          onCurrencyChanged(currency);
          Navigator.of(context).pop();
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final selected = supportedCurrencies.firstWhere(
      (c) => c.code == selectedCurrency,
      orElse: () => supportedCurrencies.first,
    );

    return GestureDetector(
      onTap: () => _showCurrencyPicker(context),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        decoration: BoxDecoration(
          color: context.inputFillColor,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          children: [
            Icon(
              CupertinoIcons.money_dollar_circle,
              color: context.textSecondary,
              size: 22,
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                '${selected.symbol} ${selected.code}',
                style: TextStyle(
                  fontSize: 17,
                  color: context.textPrimary,
                ),
              ),
            ),
            Icon(
              CupertinoIcons.chevron_down,
              color: context.textSecondary,
              size: 18,
            ),
          ],
        ),
      ),
    );
  }
}

class _CurrencyPickerSheet extends StatefulWidget {
  final String selectedCurrency;
  final ValueChanged<String> onCurrencyChanged;

  const _CurrencyPickerSheet({
    required this.selectedCurrency,
    required this.onCurrencyChanged,
  });

  @override
  State<_CurrencyPickerSheet> createState() => _CurrencyPickerSheetState();
}

class _CurrencyPickerSheetState extends State<_CurrencyPickerSheet> {
  final TextEditingController _searchController = TextEditingController();
  List<CurrencyInfo> _filteredCurrencies = supportedCurrencies;

  @override
  void initState() {
    super.initState();
    _searchController.addListener(_onSearchChanged);
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _onSearchChanged() {
    final query = _searchController.text.toLowerCase();
    setState(() {
      if (query.isEmpty) {
        _filteredCurrencies = supportedCurrencies;
      } else {
        _filteredCurrencies = supportedCurrencies
            .where((c) =>
                c.code.toLowerCase().contains(query) ||
                c.symbol.contains(query))
            .toList();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.6,
      decoration: BoxDecoration(
        color: context.scaffoldBackgroundColor,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        children: [
          // Handle bar
          Container(
            margin: const EdgeInsets.only(top: 12),
            width: 36,
            height: 5,
            decoration: BoxDecoration(
              color: context.dividerColor,
              borderRadius: BorderRadius.circular(2.5),
            ),
          ),
          // Title
          Padding(
            padding: const EdgeInsets.all(16),
            child: Text(
              context.l10n.currency,
              style: TextStyle(
                fontSize: 17,
                fontWeight: FontWeight.w600,
                color: context.textPrimary,
              ),
            ),
          ),
          // Search field
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Container(
              decoration: BoxDecoration(
                color: context.inputFillColor,
                borderRadius: BorderRadius.circular(10),
              ),
              child: TextField(
                controller: _searchController,
                decoration: InputDecoration(
                  hintText: context.l10n.search,
                  border: InputBorder.none,
                  contentPadding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  prefixIcon: Icon(
                    CupertinoIcons.search,
                    color: context.textSecondary,
                    size: 20,
                  ),
                  suffixIcon: _searchController.text.isNotEmpty
                      ? IconButton(
                          icon: Icon(
                            CupertinoIcons.clear_circled_solid,
                            color: context.textSecondary,
                            size: 18,
                          ),
                          onPressed: () {
                            _searchController.clear();
                          },
                        )
                      : null,
                ),
                style: TextStyle(
                  fontSize: 16,
                  color: context.textPrimary,
                ),
              ),
            ),
          ),
          const SizedBox(height: 8),
          // Currency list
          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              itemCount: _filteredCurrencies.length,
              separatorBuilder: (context, index) => Divider(
                height: 1,
                color: context.dividerColor,
              ),
              itemBuilder: (context, index) {
                final currency = _filteredCurrencies[index];
                final isSelected = widget.selectedCurrency == currency.code;

                return ListTile(
                  contentPadding: EdgeInsets.zero,
                  onTap: () => widget.onCurrencyChanged(currency.code),
                  title: Text(
                    '${currency.symbol} ${currency.code}',
                    style: TextStyle(
                      fontSize: 17,
                      color: context.textPrimary,
                      fontWeight:
                          isSelected ? FontWeight.w600 : FontWeight.normal,
                    ),
                  ),
                  trailing: isSelected
                      ? Icon(
                          CupertinoIcons.checkmark,
                          color: context.primaryColor,
                          size: 20,
                        )
                      : null,
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
