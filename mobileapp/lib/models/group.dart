import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'group.freezed.dart';
part 'group.g.dart';

/// Group model representing a warikan group.
@freezed
abstract class Group with _$Group {
  const Group._();

  const factory Group({
    required String id,
    required String name,
    @Default([]) List<String> members,
    @Default('JPY') String currency,
    required DateTime createdAt,
    DateTime? updatedAt,
  }) = _Group;

  /// Create from JSON (for SharedPreferences)
  factory Group.fromJson(Map<String, dynamic> json) => _$GroupFromJson(json);

  /// Create a Group from Firestore document
  factory Group.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return Group(
      id: doc.id,
      name: data['name'] as String? ?? '',
      members: List<String>.from(data['members'] ?? []),
      currency: data['currency'] as String? ?? 'JPY',
      createdAt: (data['createdAt'] as Timestamp?)?.toDate() ?? DateTime.now(),
      updatedAt: (data['updatedAt'] as Timestamp?)?.toDate(),
    );
  }

  /// Convert to Firestore document data
  Map<String, dynamic> toFirestore() {
    return {
      'name': name,
      'members': members,
      'currency': currency,
      'createdAt': Timestamp.fromDate(createdAt),
      'updatedAt': updatedAt != null ? Timestamp.fromDate(updatedAt!) : null,
    };
  }
}
