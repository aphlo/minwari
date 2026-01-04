# Firebase匿名認証 + サーバAPIでのグループ作成設計

## 目的
- Webアプリから匿名認証済みユーザーのみがグループを作成できるようにする。
- Firestoreの操作はサーバ側で行い、クライアントはAPI経由で作成する。

## 変更点の概要
- クライアント: Firebase Auth（匿名認証）でIDトークンを取得しAPIへ送信。
- サーバ: Firebase Admin SDKでIDトークンを検証し、Firestoreへ書き込み。

## データフロー
1. クライアントで `signInAnonymously` を実行。
2. `currentUser.getIdToken()` を取得。
3. `POST /api/groups` に `Authorization: Bearer <token>` を付与して送信。
4. サーバでトークン検証 → Firestoreへ `groups` を作成。

## API仕様
### POST `/api/groups`
**認証**: Firebase匿名認証のIDトークン必須  
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

## Firestore書き込み内容
コレクション: `groups`
- `name`: グループ名
- `members`: メンバー名配列
- `createdByUid`: 作成者UID
- `createdAt`: serverTimestamp
- `updatedAt`: serverTimestamp

## 実装配置
- API: `webapp/app/api/groups/route.ts`
- Firebase Admin: `webapp/server/lib/firebaseAdmin.ts`
- Usecase/Repository: `webapp/server/usecases/createGroup.ts`, `webapp/server/repositories/groupRepository.ts`
- Client Auth: `webapp/client/lib/firebaseClient.ts`
- Client Form: `webapp/client/components/NewGroupForm.tsx`
- 型: `webapp/shared/types/group.ts`

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

## 備考
- `docs/architecture.md` の「APIサーバは置かない」方針とは異なるため、今後の方針は本ドキュメントを優先する。
