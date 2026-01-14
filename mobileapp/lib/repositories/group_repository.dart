import 'package:shared_preferences/shared_preferences.dart';
import '../models/group.dart';

class GroupRepository {
  static const String _groupsKey = 'groups';

  Future<List<Group>> getGroups() async {
    final prefs = await SharedPreferences.getInstance();
    final List<String> groupsJson = prefs.getStringList(_groupsKey) ?? [];

    return groupsJson.map((json) => Group.decode(json)).toList()
      ..sort((a, b) => b.createdAt.compareTo(a.createdAt)); // Newest first
  }

  Future<void> saveGroup(Group group) async {
    final prefs = await SharedPreferences.getInstance();
    final List<String> groupsJson = prefs.getStringList(_groupsKey) ?? [];

    // Check if group already exists (update scenario)
    final index = groupsJson.indexWhere((json) {
      final g = Group.decode(json);
      return g.id == group.id;
    });

    if (index >= 0) {
      groupsJson[index] = group.encode();
    } else {
      groupsJson.add(group.encode());
    }

    await prefs.setStringList(_groupsKey, groupsJson);
  }
}
