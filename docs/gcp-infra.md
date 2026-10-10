# Firebase Hosting + Cloud Run

## 構成

- Firebase Hosting: `webapp/out` のHTML/CSS/JS/画像。
- Cloud Run: 新規 `minwari-api`、asia-northeast1でNode.jsの閲覧専用APIを提供。
- 旧Cloud Run: `minwari-webapp` で `oursplit.us` のSSRを継続。
- Firestore: モバイルが書き込み、閲覧APIが読み取り。
- Terraform Cloud: IAM、サービス設定、Artifact Registry、GitHub OIDCを管理。
- Firebase CLI: 静的ファイルとHosting rewriteをデプロイ。

`firebase.json` の `/api/**` rewriteでCloud Runを呼び出す。同一オリジンなのでCORS設定は不要。
最小インスタンス0、256MiB、1 CPU、リクエストベースの課金を維持する。

## 旧URLと新URLの併存

| 用途 | 配信先 | 実行ID / 管理方法 |
| --- | --- | --- |
| `oursplit.us` | 既存SSRの `minwari-webapp` | 既存実行ID・設定を維持 / Terraform |
| `oursplit.aphlo.com` | Firebase Hosting | 静的ファイル / Firebase CLI |
| 新サイトの `/api/**` | 新規 `minwari-api` | `minwari-api-reader` / GitHub Actions |

APIコンテナのイメージ名も `minwari-api:<commit SHA>` とし、旧SSRのイメージ名と分離する。
新APIサービスはGitHub Actionsの `gcloud run deploy` が作成・更新するため、Terraformに新APIサービスのリソースは追加しない。
TerraformはAPI用サービスアカウントとIAMを追加し、既存SSRサービスの定義を維持する。
旧ドメインのDNS・Cloud Runドメインマッピングには変更を加えない。

## 初回移行の順序

1. Terraform Cloudの現在のサービス名・リージョンを確認する。
   既存SSRのサービス名が `minwari-api` ではないことを確認する。
   `terraform/env/prod` のplanをレビューし、API実行ID・読み取り権限・Hosting API・GitHub Actionsのデプロイ権限を追加する。
   `module.cloud_run`、旧実行ID、旧ドメインマッピングの変更・削除がplanに出る場合は適用せず、既存設定やドリフトを確認する。
   Terraform Cloudで `github_service_account_roles` を上書きしている場合は、既存ロールを維持して `roles/firebasehosting.admin` と `roles/serviceusage.serviceUsageConsumer` を追加する。
2. `.github/workflows/deliver-web.yml` を実行し、別サービス `minwari-api` を作成する。
   コンテナにはserver/sharedのみをコピーし、環境ファイルやサービスアカウント鍵を含めない。
   新APIだけに `--service-account minwari-api-reader@...` を指定し、環境変数をクリアする。
   続いてFirebase Hostingをデプロイする。Hostingの `/api/**` rewriteは新APIを指す。
   このワークフローは旧SSRを更新しない。併存期間中は旧SSR用の別デプロイ手順で今回のAPI専用Dockerfileを使用しない。
3. FirebaseコンソールのHostingで `oursplit.aphlo.com` をカスタムドメインとして追加し、表示されたDNSレコードを新ドメインだけに設定する。
   Firebaseの証明書が有効になってから、新URLでグループ閲覧・精算・記事・規約ページを確認する。
   旧URLでもグループ閲覧と旧Webの作成・編集が引き続き動くことを確認する。
   新APIのPOSTが405になること、API実行IDにFirestore書き込み権限がないことも確認する。
4. 新サイトの確認後に、新URLを使うモバイル更新をリリースする。
   共有URL・利用規約・プライバシーポリシーの変更は、この順序でリリースする。
   古いアプリは旧URLを使用し、新しいアプリは新URLを使用する。両方が同じFirestoreを参照するためデータ移行は不要。
5. 併存期間を設け、新サイトとモバイルが安定した後に、別作業で旧サイトを転送専用に切り替える。
   旧グループURLを新しい `/{locale}/groups/?id={groupId}` に変換する。
   初めは302で確認し、その後301にする。旧ドメインとHTTPSは過去の共有リンクのために維持する。
   この段階で旧Webの作成・編集が終了する。今回の設定変更ではこの切り替えを実施しない。
6. 旧SSRの終了後に、他で使われていない旧実行IDの権限・鍵を整理する。
   併存期間中に旧実行IDの書き込み権限を削除しない。

新APIのサービス名・リージョンを変更する場合、`firebase.json` とCIの設定・サービス名ガードを一致させる。
新規API専用IDに、別途Owner/Editor/Datastore User等を付与しない。
現在のIAM設定変更はモバイルのFirestore Rulesを変更しない。

## 併存期間の切り戻し

新APIに問題があれば `minwari-api` の直前の正常なリビジョンへトラフィックを戻す。
Hostingに問題があれば、Hostingの直前の正常なリリースに戻す。
初回公開で正常なリリースがまだない場合はモバイルの新URL更新をリリースせず、新環境を修正する。
旧SSR・旧ドメインはそのまま利用できるため、新環境の切り戻しで旧環境の再デプロイは不要。

## 手動ビルド / デプロイ

```sh
cd webapp
pnpm install --frozen-lockfile
pnpm lint
pnpm check
pnpm typecheck
pnpm test
pnpm build
cd ..
pnpm dlx firebase-tools@14 deploy --only hosting --project minwarikan
```

Cloud RunのDockerfileはAPI専用。静的サイトのビルドはCI/ローカルで行う。
Google Fontsをビルド時に取得するため、ビルド環境には外部ネットワーク接続が必要。
Google Cloudへの認証は既存のWorkload Identity Federationを使用する。
請求はFirebaseのBlazeプランと同じGoogle Cloudプロジェクトで管理する。

## 2026-10-06 初回公開の記録

- Terraformは新API用IAM・Hosting関連の5リソースだけを対象にplanを保存し、追加5・変更0・削除0で適用した。
- 通常のplanにはArtifact Registryの `delete-old` ポリシーを `older_than = "0s"` に変更する差分があったため、今回は適用していない。次回の通常applyでもイメージ削除ポリシーの差分を確認する。
- 新APIは `minwari-api-00002-rw4`、イメージは `minwari-api:migration-20261006-v2`。旧SSRのイメージ・実行ID・URL・リビジョンが変わっていないことを確認した。
- `https://minwarikan.web.app` に公開し、SSGページ・既存グループの読み取り・POSTの405拒否を確認した。
- ヘルスチェックは `GET /api/health`。Cloud Runの予約パスとの衝突を避け、Hosting rewrite経由でも確認できる。
- 公開時点の `oursplit.aphlo.com` は所有権確認と証明書発行が未完了。HTTPS接続を確認するまでモバイルの新URL更新をリリースしない。
