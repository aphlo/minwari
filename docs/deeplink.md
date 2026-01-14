## 0) 目標の挙動（今回の方針に合う）

* ユーザーが **`https://oursplit.us/groups/{id}` を開く**

  * **アプリが入っている** → アプリが開いてグループ詳細へ
  * **アプリがない** → そのままWebで `https://oursplit.us/groups/{id}` を表示（ストア誘導なし）

これ、Universal Links / App Linksがまさにこの挙動です。

---

## 1) iOS Universal Links

### 1-1. Apple App Site Association（AASA）を配信

以下のJSONを **どちらか** に置きます（推奨は `.well-known`）:

* `https://oursplit.us/.well-known/apple-app-site-association`
  または
* `https://oursplit.us/apple-app-site-association`

**内容（テンプレ）**

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "YOUR_TEAM_ID.com.yourcompany.yourapp",
        "paths": [ "/groups/*" ]
      }
    ]
  }
}
```

* `YOUR_TEAM_ID` は Apple Developer の Team ID
* `com.yourcompany.yourapp` は iOSのBundle ID

**重要**

* HTTPSで配信
* **リダイレクトしない**（Cloudflare/Next.jsのリライト含めて最終URLがそのまま返ること）
* `Content-Type: application/json` か `application/pkcs7-mime` でOK（実運用では `application/json` が多いです）

### 1-2. Xcode（FlutterのiOS）側の設定

`ios/Runner/Runner.entitlements` に Associated Domains を追加（なければ作る）:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>com.apple.developer.associated-domains</key>
  <array>
    <string>applinks:oursplit.us</string>
  </array>
</dict>
</plist>
```

また、Xcodeの `Signing & Capabilities` で **Associated Domains** をONにして同じ `applinks:oursplit.us` が入っている状態にします。

---

## 2) Android App Links

### 2-1. Digital Asset Links を配信

以下にJSONを置きます：

* `https://oursplit.us/.well-known/assetlinks.json`

**内容（テンプレ）**

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.yourcompany.yourapp",
      "sha256_cert_fingerprints": [
        "YOUR_SHA256_FINGERPRINT"
      ]
    }
  }
]
```

**sha256_cert_fingerprints の出し方（例）**

* Play App Signing を使うなら、**Play Console に表示される SHA-256** を使うのが本番の正です
* ローカルのデバッグ署名で試す場合は、デバッグ用SHA-256を入れたassetlinksでも検証できます（ただし本番とは別物）

ローカルdebugのSHA-256例（mac/linux）:

```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android | grep SHA256
```

### 2-2. AndroidManifest に intent-filter（/groups/* をハンドル）

`android/app/src/main/AndroidManifest.xml` の該当Activity（通常 `MainActivity`）へ追加:

```xml
<activity
    android:name=".MainActivity"
    android:exported="true"
    android:launchMode="singleTask"
    android:theme="@style/LaunchTheme"
    android:configChanges="orientation|keyboardHidden|keyboard|screenSize|smallestScreenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
    android:hardwareAccelerated="true"
    android:windowSoftInputMode="adjustResize">

    <!-- 既存の intent-filter (MAIN/LAUNCHER) はそのまま -->

    <!-- App Links -->
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data
            android:scheme="https"
            android:host="oursplit.us"
            android:pathPrefix="/groups/" />
    </intent-filter>
</activity>
```

ポイント：

* `launchMode="singleTask"` にしておくと、アプリ起動中にリンクが来たとき処理しやすいです（推奨）
* `android:autoVerify="true"` により、assetlinksが正しければ「このURLは常にアプリで開く」が成立しやすいです

---

## 3) Flutter側：リンク受信 → `/groups/:id` に遷移

ここは **2パターン**あります。

* A) ルーティングに `go_router` を使う（おすすめ）
* B) ルーティングが素朴でも、URLを受け取って手動でpushする

以下、A案でテンプレを出します。

### 3-1. 依存追加

`pubspec.yaml`

```yaml
dependencies:
  flutter:
    sdk: flutter
  go_router: ^14.0.0
  uni_links: ^0.5.1
```

### 3-2. ルータ定義（/groups/:id）

例：`lib/router.dart`

```dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

final router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (_, __) => const HomePage(),
    ),
    GoRoute(
      path: '/groups/:id',
      builder: (context, state) {
        final id = state.pathParameters['id']!;
        return GroupDetailPage(groupId: id);
      },
    ),
  ],
);

class HomePage extends StatelessWidget {
  const HomePage({super.key});
  @override
  Widget build(BuildContext context) => const Scaffold(body: Center(child: Text('Home')));
}

class GroupDetailPage extends StatelessWidget {
  final String groupId;
  const GroupDetailPage({super.key, required this.groupId});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Group')),
      body: Center(child: Text('groupId = $groupId')),
    );
  }
}
```

### 3-3. ディープリンク受信（cold start + foreground）

例：`lib/deep_link_handler.dart`

```dart
import 'dart:async';
import 'package:go_router/go_router.dart';
import 'package:uni_links/uni_links.dart';

class DeepLinkHandler {
  DeepLinkHandler(this._router);

  final GoRouter _router;
  StreamSubscription? _sub;

  Future<void> init() async {
    // 1) アプリが「リンクから起動」された場合（cold start）
    final initial = await getInitialUri();
    _handle(initial);

    // 2) アプリ起動中にリンクが来た場合
    _sub = uriLinkStream.listen((uri) {
      _handle(uri);
    }, onError: (_) {
      // ログに出す程度でOK
    });
  }

  void dispose() => _sub?.cancel();

  void _handle(Uri? uri) {
    if (uri == null) return;

    // 受け取り例: https://oursplit.us/groups/{id}
    if (uri.host != 'oursplit.us') return;
    final segments = uri.pathSegments;
    if (segments.length >= 2 && segments[0] == 'groups') {
      final id = segments[1];
      if (id.isNotEmpty) {
        _router.go('/groups/$id');
      }
    }
  }
}
```

### 3-4. `main.dart` に組み込み

```dart
import 'package:flutter/material.dart';
import 'router.dart';
import 'deep_link_handler.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  final deepLinkHandler = DeepLinkHandler(router);
  await deepLinkHandler.init();

  runApp(MyApp(deepLinkHandler: deepLinkHandler));
}

class MyApp extends StatefulWidget {
  final DeepLinkHandler deepLinkHandler;
  const MyApp({super.key, required this.deepLinkHandler});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  void dispose() {
    widget.deepLinkHandler.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: router,
    );
  }
}
```

---

## 4) Web側：「アプリで開く」ボタンの実装（あなたの方針に合う）

**ボタンのリンク先をそのまま** `https://oursplit.us/groups/{id}` にしてください。

* アプリが入っていればOSがアプリを開く
* 入っていなければWebを表示（今回の要件どおり）

例（Next.js）:

```tsx
<Link href={`/groups/${groupId}`} className="btn">
  アプリで開く
</Link>
```

※「すでに今そのURLを見ている」場合でも、OS判定が効くケースは多いですが、iOSはユーザーの過去選択状態などで開かないことがあります。その場合でも要件的には **Web継続でOK** なので問題なしです。

---

## 5) 動作確認コマンド

### Android

```bash
adb shell am start -a android.intent.action.VIEW -d "https://oursplit.us/groups/0123-uuid..."
```

リンクがアプリに入ればOK。入らなければ Web が開きます（アプリ未インストール時の挙動も確認できます）。

### iOS

* 実機で Safari から `https://oursplit.us/groups/{id}` を開く
* AASAが正しく読めていればアプリが開きます（インストール済みの場合）

---

## 6) よくあるハマりどころ（最短で潰す）

* `.well-known` のJSONが **リダイレクト**されている
* `assetlinks.json` / AASA が **キャッシュ**されて反映が遅い（変更したら端末側の再インストールが効くことも）
* Androidのfingerprintが **debugとreleaseで違う**（本番はPlay署名のSHA-256）
* CloudflareやLBで **Content-Typeが変**、もしくは圧縮/最適化で壊れている（まずは生で200返ってるか確認）

