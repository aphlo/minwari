import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:minwari/lib/settlement_calculator.dart';

part 'expense.freezed.dart';
part 'expense.g.dart';

/// Expense model representing a single expense in a group.
@freezed
abstract class Expense with _$Expense {
  const Expense._();

  const factory Expense({
    required String id,
    required String groupId,
    required String description,
    required double amount,
    required String paidBy,
    required List<String> splitWith,
    required DateTime createdAt,
    DateTime? updatedAt,
  }) = _Expense;

  factory Expense.fromJson(Map<String, dynamic> json) =>
      _$ExpenseFromJson(json);

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
}
