import 'dart:convert';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/group.dart';

class GroupRepository {
  static const String _groupsKey = 'groups';
  static const String _lastOpenedGroupIdKey = 'last_opened_group_id';

  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  // ============ Firestore Operations ============

  /// Create a new group in Firestore
  Future<String> createGroup({
    required String name,
    required List<String> members,
    required String currency,
    DateTime? createdAt,
  }) async {
    final docRef = await _firestore.collection('groups').add({
      'name': name,
      'members': members,
      'currency': currency,
      'createdAt': createdAt != null
          ? Timestamp.fromDate(createdAt)
          : FieldValue.serverTimestamp(),
      'updatedAt': FieldValue.serverTimestamp(),
    });
    return docRef.id;
  }

  /// Get a group from Firestore by ID
  Future<Group?> getGroup(String groupId) async {
    final doc = await _firestore.collection('groups').doc(groupId).get();
    if (!doc.exists) {
      return null;
    }
    return Group.fromFirestore(doc);
  }

  /// Update a group in Firestore
  Future<void> updateGroup(
    String groupId, {
    String? name,
    List<String>? members,
    String? currency,
    DateTime? createdAt,
  }) async {
    final updates = <String, dynamic>{
      'updatedAt': FieldValue.serverTimestamp(),
    };
    if (name != null) updates['name'] = name;
    if (members != null) updates['members'] = members;
    if (currency != null) updates['currency'] = currency;
    if (createdAt != null) {
      updates['createdAt'] = Timestamp.fromDate(createdAt);
    }

    await _firestore.collection('groups').doc(groupId).update(updates);
  }

  /// Delete a group from Firestore and local storage
  Future<void> deleteGroup(String groupId) async {
    // 1. Delete all expenses in the subcollection
    final expensesSnapshot = await _firestore
        .collection('groups')
        .doc(groupId)
        .collection('expenses')
        .get();

    final batch = _firestore.batch();
    for (final doc in expensesSnapshot.docs) {
      batch.delete(doc.reference);
    }
    // Delete group document
    batch.delete(_firestore.collection('groups').doc(groupId));
    await batch.commit();

    // 2. Remove from local storage
    await removeGroupFromLocal(groupId);
  }

  // ============ SharedPreferences Operations ============

  /// Get groups from local storage (history)
  Future<List<Group>> getLocalGroups() async {
    final prefs = await SharedPreferences.getInstance();
    final List<String> groupsJson = prefs.getStringList(_groupsKey) ?? [];

    return groupsJson.map((json) {
      final data = jsonDecode(json) as Map<String, dynamic>;
      return Group.fromJson(data);
    }).toList()
      ..sort((a, b) => b.createdAt.compareTo(a.createdAt)); // Newest first
  }

  /// Save group to local storage (history)
  Future<void> saveGroupToLocal(Group group) async {
    final prefs = await SharedPreferences.getInstance();
    final List<String> groupsJson = prefs.getStringList(_groupsKey) ?? [];

    // Check if group already exists (update scenario)
    final index = groupsJson.indexWhere((json) {
      final data = jsonDecode(json) as Map<String, dynamic>;
      return data['id'] == group.id;
    });

    final encoded = jsonEncode(group.toJson());
    if (index >= 0) {
      groupsJson[index] = encoded;
    } else {
      groupsJson.add(encoded);
    }

    await prefs.setStringList(_groupsKey, groupsJson);
  }

  /// Save the last opened group ID
  Future<void> saveLastOpenedGroupId(String groupId) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_lastOpenedGroupIdKey, groupId);
  }

  /// Get the last opened group ID
  Future<String?> getLastOpenedGroupId() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_lastOpenedGroupIdKey);
  }

  /// Remove group from local storage (history)
  Future<void> removeGroupFromLocal(String groupId) async {
    final prefs = await SharedPreferences.getInstance();
    final List<String> groupsJson = prefs.getStringList(_groupsKey) ?? [];

    groupsJson.removeWhere((json) {
      try {
        final data = jsonDecode(json) as Map<String, dynamic>;
        return data['id'] == groupId;
      } catch (_) {
        return false;
      }
    });

    await prefs.setStringList(_groupsKey, groupsJson);

    final lastOpened = prefs.getString(_lastOpenedGroupIdKey);
    if (lastOpened == groupId) {
      await prefs.remove(_lastOpenedGroupIdKey);
    }
  }
}
