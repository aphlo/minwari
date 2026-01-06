# GCPインフラ構成（Next.jsデプロイ）

## 目的
- Next.js（App Router + API Routes）をGCP上でホストする。
- Firebase Auth/Firestoreを利用し、API経由でデータ操作を行う。

## 構成概要
- Cloud Run: Next.jsアプリの実行環境
- Artifact Registry: コンテナイメージ保管
- GitHub Actions: ビルド/デプロイ
- Firebase/Firestore: 認証・データストア
- Cloud Logging/Monitoring: ログと監視
- Cloud Runドメインマッピング: Cloudflareドメインを利用した公開

## アーキテクチャ（テキスト図）
```
Browser
  -> Cloud Run (Next.js) (Custom Domain via Domain Mapping)
       -> Firebase Auth (IDトークン検証 via Admin SDK)
       -> Firestore (Admin SDK)
```

## デプロイ方針
1. GitHub ActionsでNext.jsをコンテナ化
   - Dockerfileを用意するか、Buildpacksを使用
2. Artifact Registryへpush
3. Cloud Runへデプロイ
4. Cloud Runのドメインマッピングを設定し、CloudflareでDNS設定を行う

## GitHub Actions構成
- OIDC/Workload IdentityでGCPに認証
- `gcloud auth configure-docker` でArtifact Registryへpush
- `gcloud run deploy` でCloud Runへデプロイ

## Cloud Run設定
- 実行環境: Node.js（コンテナ）
- 認証: 公開アクセス（アプリ側でFirebase AuthのIDトークンを検証）
- スケール: 自動（最小0、最大は必要に応じて）
- リージョン: 任意（Firestore/Firebaseと同一リージョン推奨）
- カスタムドメイン: Cloud Runのドメインマッピングを使用

## Cloudflareドメイン設定（LBなし）
1. Cloud Runのドメインマッピングを作成
2. GCPが提示するDNSレコード（CNAME/AAAA）をCloudflareに追加
3. CloudflareはDNS only（プロキシOFF）で運用

## 環境変数
### Client（Next.js）
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`

### Server（Firebase Admin SDK）
- ローカル: `GOOGLE_APPLICATION_CREDENTIALS`（サービスアカウントJSONへの絶対パス）
- Cloud Run: 付与したIAMロールでADCを利用（キー不要）

## IAM/権限
- Cloud Runのサービスアカウントに以下を付与:
  - Firestoreアクセス（`roles/datastore.user`）

## 監視/運用
- Cloud LoggingでAPIエラーを監視
- 重要な失敗（認証失敗やFirestore書き込み失敗）をログに記録
- 必要に応じてアラート（Cloud Monitoring）を設定

## 補足
- CloudflareをプロキシONにするとCloud Runのドメインマッピングと相性が悪いため、DNS onlyで運用
- CDN/WAFが必要になった段階でHTTPS LB + Cloud Armorを追加検討
