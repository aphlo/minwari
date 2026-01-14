import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/expense.dart';

class ExpenseRepository {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  /// Get all expenses for a group
  Future<List<Expense>> getExpenses(String groupId) async {
    final snapshot = await _firestore
        .collection('groups')
        .doc(groupId)
        .collection('expenses')
        .orderBy('createdAt', descending: true)
        .get();

    return snapshot.docs
        .map((doc) => Expense.fromFirestore(doc, groupId))
        .toList();
  }

  /// Create a new expense
  Future<String> createExpense(
    String groupId, {
    required String description,
    required double amount,
    required String paidBy,
    required List<String> splitWith,
  }) async {
    final docRef = await _firestore
        .collection('groups')
        .doc(groupId)
        .collection('expenses')
        .add({
      'description': description,
      'amount': amount,
      'paidBy': paidBy,
      'splitWith': splitWith,
      'createdAt': FieldValue.serverTimestamp(),
      'updatedAt': FieldValue.serverTimestamp(),
    });

    // Update group's updatedAt
    await _firestore.collection('groups').doc(groupId).update({
      'updatedAt': FieldValue.serverTimestamp(),
    });

    return docRef.id;
  }

  /// Delete an expense
  Future<void> deleteExpense(String groupId, String expenseId) async {
    await _firestore
        .collection('groups')
        .doc(groupId)
        .collection('expenses')
        .doc(expenseId)
        .delete();

    // Update group's updatedAt
    await _firestore.collection('groups').doc(groupId).update({
      'updatedAt': FieldValue.serverTimestamp(),
    });
  }
}
