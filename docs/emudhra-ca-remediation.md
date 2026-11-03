# eMudhra CA remediation (みんなの割り勘)

This repository targets iOS and Android. Android `dart:io` requires a rebuilt
Flutter/Dart runtime; iOS Firestore separately requires a patched embedded trust
bundle. This change does not establish whether a distributed build used the same
dependencies or whether any user was affected.

- Flutter: 3.47.8 via `.fvmrc` (bundles Dart 3.13.7).
- Minimum Flutter in the application manifest: 3.47.8. The existing Dart language
  version is retained to preserve source/generated-code compatibility; CI checks
  the actual Dart runtime is at least 3.13.7.
- `cloud_firestore`: 6.10.2; `firebase_core`: 4.15.2.
- CocoaPods `FirebaseFirestore` and `FirebaseFirestoreInternal`: 12.19.3.
- Firebase plugins are aligned with the patched 6.x/4.x release family. Analytics
  12.6.1 accepts the separately published native Analytics 12.19.0.
- Dart and CocoaPods locks are committed. Dependency resolution in CI uses
  `flutter pub get --enforce-lockfile`; the security check rejects affected locks.

The backported release family retains CocoaPods and avoids a Firebase 13/SPM
migration. Existing iOS deployment targets already meet Firebase 12's iOS 15
minimum. No application data model, authentication flow, Firestore rules or
backend deployment is changed. No App Distribution Gradle plugin was found.

From the repository root, with the pinned Flutter on PATH:

```sh
python3 scripts/check_security_dependencies.py mobileapp
```

Before a separately authorized release, run the platform builds with the intended
flavor/signing configuration, confirm resolved native dependencies, and test
sign-in, Firestore reads/writes/listeners and offline persistence on devices.
Existing installed binaries remain unremediated until rebuilt and distributed;
OS updates alone do not fix their embedded trust stores. This PR does not publish
or deploy anything.

Sources checked 2026-11-03:

- [Firebase remediation guide](https://firebase.google.com/support/guides/compromised-emudhra-intermediate-ca)
- [Dart advisory GHSA-frr6-h895-5pxp](https://github.com/dart-lang/sdk/security/advisories/GHSA-frr6-h895-5pxp)
- [FlutterFire core backport notes](https://pub.dev/packages/firebase_core/versions/4.15.1/changelog)
