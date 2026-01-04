# サーバAPIでのグループ作成設計

## 目的
- WebアプリからサーバAPI経由でグループを作成できるようにする。
- Firestoreの操作はサーバ側で行い、クライアントはAPI経由で作成する。

## 認証方針
- **認証は不要**：URLを知っている人は誰でもグループにアクセス・操作可能。
- Firebase Authは使用しない（匿名認証も不要）。
- APIは認証チェックなしで呼び出し可能。

## データフロー
1. クライアントから `POST /api/groups` を呼び出し。
2. サーバでバリデーション → Firestoreへ `groups` を作成。
3. 作成されたグループIDをレスポンスとして返す。

## API仕様
### POST `/api/groups`
**認証**: 不要
**リクエスト**
```json
{
  "groupName": "沖縄旅行2024",
  "members": ["太郎", "花子"]
}
```
**レスポンス**
```json
{
  "id": "generatedGroupId"
}
```

### GET `/api/groups/[groupId]`
**認証**: 不要
**レスポンス**
```json
{
  "id": "groupId",
  "name": "沖縄旅行2024",
  "members": ["太郎", "花子"],
  "createdAt": "2026-01-03T12:34:56.000Z",
  "updatedAt": "2026-01-03T12:34:56.000Z"
}
```

### PUT `/api/groups/[groupId]`
**認証**: 不要
**リクエスト**
```json
{
  "groupName": "沖縄旅行2024（更新）",
  "members": ["太郎", "花子", "次郎"]
}
```

### POST `/api/groups/[groupId]/expenses`
**認証**: 不要
**リクエスト**
```json
{
  "description": "レンタカー",
  "amount": 12000,
  "paidBy": "太郎",
  "splitWith": ["太郎", "花子", "次郎"]
}
```

### DELETE `/api/groups/[groupId]/expenses/[expenseId]`
**認証**: 不要

## Firestore書き込み内容
コレクション: `groups`
- `name`: グループ名
- `members`: メンバー名配列
- `createdAt`: serverTimestamp
- `updatedAt`: serverTimestamp

コレクション: `groups/{groupId}/expenses`
- `description`: 支出の説明
- `amount`: 金額
- `paidBy`: 支払った人
- `splitWith`: 割り勘対象者
- `createdAt`: serverTimestamp
- `updatedAt`: serverTimestamp

## 実装配置
- API: `webapp/app/api/groups/route.ts`, `webapp/app/api/groups/[groupId]/route.ts`
- Firebase Admin: `webapp/server/lib/firebaseAdmin.ts`
- Usecase: `webapp/server/usecases/createGroup.ts`
- Repository: `webapp/server/repositories/groupRepository.ts`, `webapp/server/repositories/expenseRepository.ts`
- Client Form: `webapp/client/components/NewGroupForm.tsx`
- 型: `webapp/shared/types/group.ts`

## 環境変数
### Server（Firebase Admin SDK）
- `GOOGLE_APPLICATION_CREDENTIALS`（ローカルのサービスアカウントJSONへの絶対パス）
- 代替で `FIREBASE_PROJECT_ID` / `FIREBASE_CLIENT_EMAIL` / `FIREBASE_PRIVATE_KEY` も利用可能

## セキュリティ
- groupIdを知っている人は誰でもCRUD可能（仕様として許容）
- Firestore Rulesで `groups` の `list` を禁止して列挙を防ぐ
- App Checkは実装しない

## 備考
- `docs/architecture.md` を参照。
