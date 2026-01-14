import 'package:flutter/material.dart';

/// Section header widget with Apple-style typography
class SectionHeader extends StatelessWidget {
  final String title;
  final Color? textColor;

  const SectionHeader({
    super.key,
    required this.title,
    this.textColor,
  });

  @override
  Widget build(BuildContext context) {
    final defaultColor =
        Theme.of(context).textTheme.bodyLarge?.color?.withValues(alpha: 0.6);

    return Text(
      title,
      style: TextStyle(
        fontSize: 13,
        fontWeight: FontWeight.w500,
        color: textColor ?? defaultColor,
        letterSpacing: -0.2,
      ),
    );
  }
}

/// Large section header for detail pages
class LargeSectionHeader extends StatelessWidget {
  final String title;
  final Color? textColor;

  const LargeSectionHeader({
    super.key,
    required this.title,
    this.textColor,
  });

  @override
  Widget build(BuildContext context) {
    final defaultColor = Theme.of(context).textTheme.bodyLarge?.color;

    return Text(
      title,
      style: TextStyle(
        fontSize: 20,
        fontWeight: FontWeight.w700,
        color: textColor ?? defaultColor,
        letterSpacing: -0.3,
      ),
    );
  }
}
