# 閲覧専用API

実装: `webapp/server/api/index.ts`、`handler.ts`。

## エンドポイント

`GET /api/groups/{groupId}`

```json
{
  "group": {"id": "abc", "name": "Trip", "members": ["A", "B"], "currency": "JPY", "createdAt": "2026-01-01T00:00:00.000Z", "updatedAt": "2026-01-01T00:00:00.000Z"},
  "expenses": [],
  "settlements": [],
  "balances": [{"name": "A", "paid": 0, "owed": 0, "net": 0}, {"name": "B", "paid": 0, "owed": 0, "net": 0}],
  "totalAmount": 0
}
```

- 400: 不正なID（スラッシュ、壊れたエンコード、1500バイト超など）。
- 404: グループ不在または未公開のエンドポイント。
- 405: GET以外。Firestoreを呼び出す前に拒否する。
- 500: 取得エラー。詳細な認証情報や内部エラーはレスポンスに含めない。
- Cache-Control: no-store。Webに最新情報を渡す。

`GET /api/health` はデータベースを読み込まず200を返す。
APIサービス内の旧WebパスへのGET/HEADは新ドメインへ301転送する。
ただし併存期間の `oursplit.us` は既存SSRに接続するため、この転送処理は旧サイトに適用されない。

## 権限

新しいCloud Run `minwari-api` の実行サービスアカウントは `minwari-api-reader@minwarikan.iam.gserviceaccount.com`。
Terraformでプロジェクトに `roles/datastore.viewer` のみを付与する。
Admin SDKの権限はIAMで制御され、Firestore Rulesは適用されない。
APIから更新コードを削除し、さらにIAMでcreate/update/deleteを許可しない。
APIとモバイルは認証経路が別なので、モバイルの書き込みは影響を受けない。

組織・フォルダーでの追加ロールや、別の鍵による認証は読み取り制限を崩すので使用しない。
実データへのIAM書き込み拒否確認は、Terraform適用・APIデプロイ後に行う。
