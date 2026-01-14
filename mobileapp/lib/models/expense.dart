import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:mobileapp/lib/settlement_calculator.dart';

/// Expense model representing a single expense in a group.
class Expense {
  final String id;
  final String groupId;
  final String description;
  final double amount;
  final String paidBy;
  final List<String> splitWith;
  final DateTime createdAt;
  final DateTime? updatedAt;

  Expense({
    required this.id,
    required this.groupId,
    required this.description,
    required this.amount,
    required this.paidBy,
    required this.splitWith,
    required this.createdAt,
    this.updatedAt,
  });

  /// Create an Expense from Firestore document
  factory Expense.fromFirestore(DocumentSnapshot doc, String groupId) {
    final data = doc.data() as Map<String, dynamic>;
    return Expense(
      id: doc.id,
      groupId: groupId,
      description: data['description'] as String? ?? '',
      amount: (data['amount'] as num?)?.toDouble() ?? 0.0,
      paidBy: data['paidBy'] as String? ?? '',
      splitWith: List<String>.from(data['splitWith'] ?? []),
      createdAt: (data['createdAt'] as Timestamp?)?.toDate() ?? DateTime.now(),
      updatedAt: (data['updatedAt'] as Timestamp?)?.toDate(),
    );
  }

  /// Convert to Firestore document data
  Map<String, dynamic> toFirestore() {
    return {
      'description': description,
      'amount': amount,
      'paidBy': paidBy,
      'splitWith': splitWith,
      'createdAt': Timestamp.fromDate(createdAt),
      'updatedAt': updatedAt != null ? Timestamp.fromDate(updatedAt!) : null,
    };
  }

  /// Convert to ExpenseForSettlement for settlement calculation
  ExpenseForSettlement toExpenseForSettlement() {
    return ExpenseForSettlement(
      amount: amount,
      paidBy: paidBy,
      splitWith: splitWith,
    );
  }

  Expense copyWith({
    String? id,
    String? groupId,
    String? description,
    double? amount,
    String? paidBy,
    List<String>? splitWith,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return Expense(
      id: id ?? this.id,
      groupId: groupId ?? this.groupId,
      description: description ?? this.description,
      amount: amount ?? this.amount,
      paidBy: paidBy ?? this.paidBy,
      splitWith: splitWith ?? this.splitWith,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}
