# Firestore App Check 導入設計（Webアプリ経由のみ許可）

## 目的
- Webアプリおよびモバイルアプリ以外からの Firestore 読み書きをブロックする。
- 既存の「認証なし・URL共有」方針は維持する。
- Web/モバイルともにサーバAPI（Admin SDK）経由で統一し、ロジックをサーバ側に集約する。

## 前提 / 現状
- Webは Next.js API（Admin SDK）経由で Firestore 操作。
- Mobile は Next.js API 経由で Firestore 操作（直アクセスは行わない）。
- `docs/architecture.md` と `docs/firebase-server-design.md` では「App Check は実装しない」と記載。

## 要件整理
1) Web/モバイル以外からの Firestore 直接アクセスを遮断する  
2) Web/モバイルともに API 経由のみ許可し、API 呼び出し時に App Check を検証する  
3) 認証は導入しない  

## 方針（推奨）
### 推奨案: Web/モバイルともにAPI経由 + App Check 検証
- Webクライアントは App Check トークンを取得し、API呼び出し時に付与。
- Mobile も App Check トークンを取得し、API呼び出し時に付与。
- API は App Check トークンを検証し、失敗時は拒否する。

この方式ならロジックをAPI側に集約でき、Web/モバイルで同一の精算ロジックを共有できる。

## 代替案
### 案B: Webクライアントが Firestore に直接アクセス + App Check 強制
- Firestore を App Check 強制にし、WebはクライアントSDK経由でアクセス。
- 既存のAPI経由設計と大きく異なり、データフローの変更コストが高い。

### 案C: Mobileのみ直アクセスを残す
- Mobile は App Check 付きで Firestore に直接アクセスし、WebはAPI経由。
- ロジックの二重実装が必要になり、整合性維持が難しくなる。

## 詳細設計（推奨案）

### 1) Firebase App Check 設定
- Firebase Console で Web アプリと Mobile アプリに App Check を有効化。
- Provider は reCAPTCHA v3 を想定（Enterprise を使う場合は運用負荷とコストを考慮）。
- Firestore の App Check 強制を「有効化」する。
  - Admin SDK は App Check の影響を受けない。

### 2) Web/Mobile クライアントで App Check トークン取得
- Web: Firebase JS SDK `firebase/app-check` を初期化。
- Mobile: FlutterFire の App Check を初期化。
- `getToken()` でトークンを取得し、API リクエストに付与。
- トークンは 1 時間程度で失効するため、キャッシュ + 自動更新を有効化。

**送信ヘッダー例**
- `X-Firebase-AppCheck: <token>`

### 3) サーバ API で App Check 検証
- `firebase-admin/app-check` の `verifyToken()` を使用。
- 検証に失敗したら 401/403 を返す。
- Next.js の Route Handler 共通で使えるミドルウェア関数を用意する。

**検証フロー例**
1. `X-Firebase-AppCheck` を取得  
2. `getAppCheck().verifyToken(token)`  
3. 失敗: `403 Forbidden`  
4. 成功: API 続行  

### 4) Firestore ルール
- 直接アクセスを完全に遮断するため、read/write は API 経由のみ許可の前提でルールを厳格化する。
- Admin SDK はルールを迂回できるため、API経由には影響しない。

## 影響範囲
- Webクライアント: App Check 初期化 + API リクエストにトークン付与。
- Mobileクライアント: App Check 初期化 + API リクエストにトークン付与。
- API サーバ: App Check 検証の共通処理追加。
- Firebase Console: App Check 設定、Firestore 強制化。
- ドキュメント更新: `docs/architecture.md` / `docs/firebase-server-design.md` の方針更新が必要。

## セキュリティ上の注意
- App Check は「正規アプリからのアクセス担保」であり、認証/認可ではない。
- API にはレート制限や監視（Cloud Logging 等）を追加するのが望ましい。
- Web向け App Check は完全防御ではないため、悪用の可能性は残る。

## 開発/運用メモ
- 開発環境は App Check デバッグトークンを使う。
- 本番用の Site Key は環境変数で管理する。
- App Check 導入後は、App Check なしのクライアントからのアクセスが失敗するため注意。

## 未決事項（要確認）
1) Mobile の App Check Provider 選定（Play Integrity / DeviceCheck / App Attest 等）  
2) Webの App Check Provider は reCAPTCHA v3 か Enterprise か  
3) App Check 失敗時の UI/リトライ方針  
