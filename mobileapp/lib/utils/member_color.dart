import 'package:flutter/material.dart';

/// Get a consistent color for a member based on their name
Color getMemberColor(String name) {
  final hash = name.hashCode.abs();
  final colors = [
    Colors.blue, // primary
    Colors.purple, // secondary
    Colors.green, // success
    Colors.orange, // warning
    Colors.red, // danger
  ];
  return colors[hash % colors.length];
}
