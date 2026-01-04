# GCPインフラ構成（Next.jsデプロイ）

## 目的
- Next.js（App Router + API Routes）をGCP上でホストする。
- Firebase Auth/Firestoreを利用し、API経由でデータ操作を行う。

## 構成概要
- Cloud Run: Next.jsアプリの実行環境
- Artifact Registry: コンテナイメージ保管
- GitHub Actions: ビルド/デプロイ
- Secret Manager: Firebase Admin SDKの秘密情報保管
- Firebase/Firestore: 認証・データストア
- Cloud Logging/Monitoring: ログと監視

## アーキテクチャ（テキスト図）
```
Browser
  -> Cloud Run (Next.js)
       -> Firebase Auth (IDトークン検証 via Admin SDK)
       -> Firestore (Admin SDK)
```

## デプロイ方針
1. GitHub ActionsでNext.jsをコンテナ化
   - Dockerfileを用意するか、Buildpacksを使用
2. Artifact Registryへpush
3. Cloud Runへデプロイ
4. Secret ManagerにFirebase Admin SDKの秘密情報を登録し、Cloud Runへ環境変数として注入

## GitHub Actions構成
- OIDC/Workload IdentityでGCPに認証
- `gcloud auth configure-docker` でArtifact Registryへpush
- `gcloud run deploy` でCloud Runへデプロイ

## Cloud Run設定
- 実行環境: Node.js（コンテナ）
- 認証: 公開アクセス（アプリ側でFirebase AuthのIDトークンを検証）
- スケール: 自動（最小0、最大は必要に応じて）
- リージョン: 任意（Firestore/Firebaseと同一リージョン推奨）

## 環境変数
### Client（Next.js）
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`

### Server（Firebase Admin SDK）
- `GOOGLE_APPLICATION_CREDENTIALS`（ローカルのサービスアカウントJSONへの絶対パス）
- 代替で `FIREBASE_PROJECT_ID` / `FIREBASE_CLIENT_EMAIL` / `FIREBASE_PRIVATE_KEY` も利用可能

## IAM/権限
- Cloud Runのサービスアカウントに以下を付与:
  - Firestoreアクセス（`roles/datastore.user`）
  - Secret Manager参照（`roles/secretmanager.secretAccessor`）
- Firebase Admin SDK用のサービスアカウントキーはSecret Managerで管理

## 監視/運用
- Cloud LoggingでAPIエラーを監視
- 重要な失敗（認証失敗やFirestore書き込み失敗）をログに記録
- 必要に応じてアラート（Cloud Monitoring）を設定

## 補足
- カスタムドメインが必要な場合はCloud Runのドメインマッピングを利用
- CDNが必要ならCloud CDN + HTTPS LBを検討
