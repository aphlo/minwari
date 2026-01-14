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

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: context.cardBackground,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: supportedCurrencies.asMap().entries.map((entry) {
          final index = entry.key;
          final currency = entry.value;
          final isSelected = selectedCurrency == currency.code;
          final isLast = index == supportedCurrencies.length - 1;

          return Column(
            children: [
              Material(
                color: Colors.transparent,
                child: InkWell(
                  onTap: () => onCurrencyChanged(currency.code),
                  borderRadius: BorderRadius.vertical(
                    top: index == 0 ? const Radius.circular(12) : Radius.zero,
                    bottom: isLast ? const Radius.circular(12) : Radius.zero,
                  ),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 12,
                    ),
                    child: Row(
                      children: [
                        Text(
                          '${currency.symbol} ${currency.code}',
                          style: const TextStyle(fontSize: 17),
                        ),
                        const Spacer(),
                        if (isSelected)
                          Icon(
                            CupertinoIcons.checkmark,
                            color: context.primaryColor,
                            size: 20,
                          ),
                      ],
                    ),
                  ),
                ),
              ),
              if (!isLast)
                Divider(
                  height: 0.5,
                  thickness: 0.5,
                  indent: 16,
                  color: context.dividerColor,
                ),
            ],
          );
        }).toList(),
      ),
    );
  }
}
