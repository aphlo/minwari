// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ad_remove_provider.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, type=warning

@ProviderFor(AdRemoveNotifier)
final adRemoveProvider = AdRemoveNotifierProvider._();

final class AdRemoveNotifierProvider
    extends $NotifierProvider<AdRemoveNotifier, DateTime?> {
  AdRemoveNotifierProvider._()
      : super(
          from: null,
          argument: null,
          retry: null,
          name: r'adRemoveProvider',
          isAutoDispose: true,
          dependencies: null,
          $allTransitiveDependencies: null,
        );

  @override
  String debugGetCreateSourceHash() => _$adRemoveNotifierHash();

  @$internal
  @override
  AdRemoveNotifier create() => AdRemoveNotifier();

  /// {@macro riverpod.override_with_value}
  Override overrideWithValue(DateTime? value) {
    return $ProviderOverride(
      origin: this,
      providerOverride: $SyncValueProvider<DateTime?>(value),
    );
  }
}

String _$adRemoveNotifierHash() => r'f98f49518a01bfbace25a9ae4cc302352ec867d2';

abstract class _$AdRemoveNotifier extends $Notifier<DateTime?> {
  DateTime? build();
  @$mustCallSuper
  @override
  void runBuild() {
    final ref = this.ref as $Ref<DateTime?, DateTime?>;
    final element = ref.element as $ClassProviderElement<
        AnyNotifier<DateTime?, DateTime?>, DateTime?, Object?, Object?>;
    element.handleCreate(ref, build);
  }
}

@ProviderFor(isAdRemoved)
final isAdRemovedProvider = IsAdRemovedProvider._();

final class IsAdRemovedProvider extends $FunctionalProvider<bool, bool, bool>
    with $Provider<bool> {
  IsAdRemovedProvider._()
      : super(
          from: null,
          argument: null,
          retry: null,
          name: r'isAdRemovedProvider',
          isAutoDispose: true,
          dependencies: null,
          $allTransitiveDependencies: null,
        );

  @override
  String debugGetCreateSourceHash() => _$isAdRemovedHash();

  @$internal
  @override
  $ProviderElement<bool> $createElement($ProviderPointer pointer) =>
      $ProviderElement(pointer);

  @override
  bool create(Ref ref) {
    return isAdRemoved(ref);
  }

  /// {@macro riverpod.override_with_value}
  Override overrideWithValue(bool value) {
    return $ProviderOverride(
      origin: this,
      providerOverride: $SyncValueProvider<bool>(value),
    );
  }
}

String _$isAdRemovedHash() => r'379a2530844a5df3859f56b83ebb18f48d1235fb';
