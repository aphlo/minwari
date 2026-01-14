import 'dart:convert';

class Group {
  final String id;
  final String name;
  final DateTime createdAt;

  Group({
    required this.id,
    required this.name,
    required this.createdAt,
  });

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'createdAt': createdAt.toIso8601String(),
    };
  }

  factory Group.fromJson(Map<String, dynamic> json) {
    return Group(
      id: json['id'] as String,
      name: json['name'] as String,
      createdAt: DateTime.parse(json['createdAt'] as String),
    );
  }

  String encode() => jsonEncode(toJson());

  factory Group.decode(String jsonString) =>
      Group.fromJson(jsonDecode(jsonString) as Map<String, dynamic>);
}
