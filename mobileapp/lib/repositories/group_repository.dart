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
  }) async {
    final docRef = await _firestore.collection('groups').add({
      'name': name,
      'members': members,
      'currency': currency,
      'createdAt': FieldValue.serverTimestamp(),
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
  }) async {
    final updates = <String, dynamic>{
      'updatedAt': FieldValue.serverTimestamp(),
    };
    if (name != null) updates['name'] = name;
    if (members != null) updates['members'] = members;
    if (currency != null) updates['currency'] = currency;

    await _firestore.collection('groups').doc(groupId).update(updates);
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
}
