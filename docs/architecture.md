# OurSplit アーキテクチャ

## Web: SSG + CSR / 閲覧専用

- ドメイン: `https://oursplit.aphlo.com`
- Next.js App Routerを `output: "export"` で静的書き出しする。SSR・ISR・Next.jsの実行サーバーは使わない。
- Firebase Hostingが `webapp/out` を配信する。
- トップ、記事一覧・記事本文、紹介、規約、プライバシー、問い合わせは7言語のSSG。
- グループは固定ページ `/{locale}/groups/?id={groupId}`。ブラウザから閲覧APIを呼び出すCSR。
- 精算の内訳は同じ固定ページの `&view=settlement`。グループ作成後のWeb再ビルドは不要。
- グループの作成、メンバー編集、支出の登録・編集・削除はFlutterアプリのみ。
- Webの共有リンクは認証不要。IDを知っている人は閲覧できる。グループ一覧APIは公開しない。
- 閲覧履歴はWebのlocalStorage / モバイルのSharedPreferencesに保存し、端末間では同期しない。
- Webは初回表示と明示的な再取得のみ。リアルタイム購読・自動ポーリングは使わない。
- グループページはnoindex。サイトマップにはマーケティングページと記事だけを含める。

## 閲覧API

Firebase Hostingの `/api/**` をCloud Runの `minwari-api` (asia-northeast1) に転送する。
新APIはNode.jsのHTTP API。既存SSRの `minwari-webapp` とはサービス・実行ID・コンテナイメージを分離する。
APIサービスはGitHub Actionsが作成・更新し、Terraformは既存SSRとAPI用IAMを管理する。

`GET /api/groups/{groupId}` はグループ、支出、精算結果、各メンバーの支払額・負担額・差額、支出総額を返す。
`GET /api/health` はFirestoreに接続しないヘルスチェック。
書き込みメソッドは405、一覧取得や旧支出エンドポイントは404。応答は `Cache-Control: no-store`。

Cloud Run専用の `minwari-api-reader` サービスアカウントに `roles/datastore.viewer` のみを付与する。
Admin SDKはApplication Default Credentialsを使用する。Firestore RulesではなくIAMがサーバーの権限を制御する。
サービスアカウント鍵や別の認証情報をコンテナに渡さない。
読み取り権限はプロジェクトのFirestore全体に及ぶが、APIから公開するのは指定IDのグループと支出のみ。
組織・フォルダー・プロジェクトから別途書き込みロールを付与しない。

## モバイルとデータモデル

FlutterはFirestoreへ直接アクセスし、作成・更新・削除を行う。
Cloud RunのIAM制限は、モバイルのFirestore Rulesを変更しない。
認証なしのモバイルアクセスについては、Firestore RulesとApp Checkを別途管理する。
「Webの更新機能廃止」は、任意のFirestoreクライアントをモバイルアプリとして認証する仕組みではない。

- `groups/{groupId}`: name, members (文字列配列), currency, createdAt, updatedAt
- `groups/{groupId}/expenses/{expenseId}`: description, amount, paidBy, splitWith (文字列配列), createdAt, updatedAt
- 精算結果は保存せず取得時に計算。通貨ごとの最小単位で計算し丸め差を処理する。

## URL移行

- 新しい共有URL: `https://oursplit.aphlo.com/en/groups/?id={groupId}`
- `oursplit://groups/{groupId}` のアプリ起動スキームは維持。
- 併存期間は旧 `oursplit.us` を既存SSRで提供し、実行ID・環境変数・ドメインマッピングを維持する。
- 新サイト公開とモバイル更新の確認後に、別作業で旧Web URLを新ドメインへ転送する。今回のデプロイでは旧ドメインを転送に切り替えない。
- 新ドメインでも旧 `/{locale}/groups/{id}` や `/groups/{id}` を固定ページへ転送する。
- アプリ内の利用規約とプライバシーポリシーのURLも新ドメインを使用。
