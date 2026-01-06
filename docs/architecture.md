````md
# 割り勘アプリ（Web/モバイル）アーキテクチャ

## 1. 目的 / 方針（確定）
- グループを作成し、複数人で支出を登録して割り勘（精算）を計算できる。
- **認証は不要**：URLを知っている人は誰でもグループにアクセス・操作可能。
- Webは **Next.js APIでFirestore操作**を行い、モバイルは **Firestoreに直接アクセス**する。
- **"誰でもグループ作成OK"**（作成制限なし）。
- **groupId / URL を知っている人は、そのグループに対して誰でも CRUD 可能**（削除・改ざんも許容）。
- Firebase App Check を **実装する**（Web/モバイルともにAPI経由で検証）。
- **Firestore のリアルタイム購読（onSnapshot / stream）は使わない**。
  - 取得は **明示的な再取得** または **短い間隔のポーリング（任意）**で行う。
- グループ履歴は同期しない：
  - Web: `localStorage` に履歴を保存
  - Mobile: `SharedPreferences` に履歴を保存

---

## 2. 全体アーキテクチャ

### 2.1 クライアント
- Web: Next.js（App Router）
- Mobile: Flutter

### 2.2 認証
- **認証なし**：URLを知っている人は誰でもアクセス・操作可能。
- Firebase Authは使用しない。

### 2.3 WebのAPI構成
- Next.jsのRoute HandlerをAPIサーバとして利用する。
- クライアントはAPIを直接呼び出す（認証トークン不要）。
- サーバはFirebase Admin SDKでFirestoreへ書き込み/取得を行う。

### 2.4 Firestore アクセス方式（リアルタイムなし）
- **常に one-shot read** を使う：
  - Web: API経由で取得（サーバ側で `getDoc` / `getDocs`）
  - Flutter: `get()`（QuerySnapshot/DocumentSnapshot）
- 更新検知は次のいずれか：
  1) 画面に「更新」ボタンを置いて **手動再取得**
  2) ページ表示中だけ **数秒〜数十秒のポーリング**（任意）
  3) ドキュメントの `updatedAt` を見て、変更があれば再取得（ポーリングの軽量化）

> MVP推奨：**手動更新 + 必要なら10〜30秒ポーリング**  
> （リアルタイム購読よりコストと実装が読みやすい）

---

## 3. セキュリティ / アクセス制御の方針
- 仕様上「groupIdを知っていれば誰でもCRUD」なので、**厳密な権限制御はしない**。
- **認証は不要**：URLを知っていれば誰でもアクセス可能。
- WebのAPIは認証チェックなしで呼び出し可能。
- **列挙（groups一覧取得）を防ぐ**ため、Firestore Rules で `groups` の `list` を禁止する。

### 3.1 Firestore Rules（推奨たたき台）
```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // groups の列挙を防ぐ（IDを知らないと辿れない）
    match /groups/{groupId} {
      allow get: if true;
      allow list: if false;

      // 誰でも作成/更新/削除OK
      allow create, update, delete: if true;

      match /members/{memberId} {
        allow read, write: if true;
      }

      match /expenses/{expenseId} {
        allow read, write: if true;
      }

      match /settlements/{settlementId} {
        allow read, write: if true;
      }
    }
  }
}
````

---

## 4. URL / 共有導線（Deep Link）

### 4.1 Web

* グループページ: `/g/{groupId}`
* 「URLコピー」ボタンで共有

### 4.2 Mobile

* groupId 手入力で参加できる UI
* Web側に「スマホアプリで開く」ボタンを用意し、Deep Link で起動：

  * 例: `myapp://g/{groupId}`
* アプリ起動後、受け取った groupId を使って Firestore を取得し表示する。

---

## 5. ローカル履歴（同期なし）

### 5.1 Web（localStorage）

* Key例: `warikan:groupHistory:v1`

```json
{
  "version": 1,
  "items": [
    {
      "groupId": "abc123...",
      "name": "沖縄旅行",
      "lastOpenedAt": "2026-01-03T12:34:56.000Z"
    }
  ]
}
```

### 5.2 Mobile（SharedPreferences）

* Key例: `warikan_group_history_v1`
* 形式はWebと同等JSON推奨
* **Webと同期しない**（各端末で独立）

---

## 6. Firestore データモデル（コレクション構成）

### 6.1 コレクション一覧

* `groups/{groupId}`
* `groups/{groupId}/members/{memberId}`
* `groups/{groupId}/expenses/{expenseId}`
* `groups/{groupId}/settlements/{settlementId}`（任意：保存する場合のみ）

---

## 7. ドキュメント構造（詳細）

### 7.1 `groups/{groupId}`

```json
{
  "name": "沖縄旅行",
  "currency": "JPY",
  "status": "active",
  "createdAt": "Timestamp",
  "updatedAt": "Timestamp"
}
```

* **one-shot read前提**なので `updatedAt` は重要（変更検知・ポーリング最適化に使う）
* 更新系操作（members/expensesの変更）でも、可能なら group の `updatedAt` を更新する（クライアント側で都度更新）

### 7.2 `groups/{groupId}/members/{memberId}`

**要件：同名メンバーを追加できない**

* 推奨：**`memberId = normalizedName`**（trim + lower + 空白圧縮 等）

  * 同名は作成不可（FirestoreのID重複で弾かれる）
  * 名前変更は「旧ID削除→新ID作成」

```json
{
  "displayName": "太郎",
  "normalizedName": "taro",
  "createdAt": "Timestamp",
  "updatedAt": "Timestamp",
  "isActive": true
}
```

### 7.3 `groups/{groupId}/expenses/{expenseId}`

```json
{
  "title": "レンタカー",
  "amount": 12000,
  "paidByMemberId": "taro",
  "participantMemberIds": ["taro", "hanako", "jiro"],
  "notes": "",
  "spentAt": "Timestamp",
  "createdAt": "Timestamp",
  "updatedAt": "Timestamp",
  "isDeleted": false,
  "deletedAt": null
}
```

* 削除は「物理削除」でもよいが、履歴や復旧を考えるなら **論理削除**も選べる
* 要件として削除を許容するため、MVPでは物理削除でもOK

#### バリデーション（アプリ側で必須）

* `amount > 0`
* `participantMemberIds.length >= 1`
* `paidByMemberId` は `participantMemberIds` に含める（仕様でそうするなら）
* `paidByMemberId` / `participantMemberIds` が members に存在すること（必要に応じて）

### 7.4 `groups/{groupId}/settlements/{settlementId}`（任意）

```json
{
  "computedAt": "Timestamp",
  "transfers": [
    { "fromMemberId": "hanako", "toMemberId": "taro", "amount": 3000 }
  ],
  "basedOnUpdatedAt": "Timestamp"
}
```

* こちらも `basedOnUpdatedAt` を持たせると「古い精算結果」を判定しやすい

---

## 8. データ取得戦略（リアルタイム無しの具体方針）

### 8.1 画面表示時の基本取得

* グループ画面を開いたら以下を one-shot で取得：

  1. `groups/{groupId}`（getDoc）
  2. `members`（getDocs）
  3. `expenses`（getDocs, orderBy spentAt desc）

### 8.2 更新検知（任意ポーリング）

* 画面表示中のみ、10〜30秒間隔で `groups/{groupId}.updatedAt` だけ取得

  * 前回の `updatedAt` と異なれば members/expenses を再取得
* ポーリングを使わない場合は「更新」ボタンで再取得

> ポーリングは read 回数を増やすため、必要な画面だけに限定すること。

---

## 9. 精算計算ロジック（オンデマンド）

* 各 member の

  * `paid`: その人が払った合計
  * `owed`: その人が参加した支出の割り当て合計（等分割）
* `net = paid - owed`

  * `net > 0` 受け取り
  * `net < 0` 支払い
* 受け取り側と支払い側を貪欲にマッチして `transfers` を生成
* 保存しない（オンデマンド）を推奨。必要なら settlements に保存。

---

## 10. 主要ユースケース（実装順）

### 10.1 グループ作成（Web/Mobile）

1. `groups` に新規作成（Firestoreの自動IDをgroupIdに）
2. メンバー名を入力（任意）
3. 履歴に `groupId` と `name` を保存（Web localStorage / Mobile SharedPreferences）

### 10.2 グループ参加

* Web: `/g/{groupId}` を開く → `groups/{groupId}` を get
* Mobile: groupId手入力 or Deep Link → `groups/{groupId}` を get
* 必要なら自分の名前入力 → `members/{normalizedName}` を作成（同名なら失敗→別名要求）
* 履歴へ保存

### 10.3 支出追加/編集/削除

* expenses にCRUD（one-shot readで一覧更新）
* 操作後に `groups/{groupId}.updatedAt` を更新（変更検知用）

---

## 11. 既知のリスク / トレードオフ（方針に伴うもの）

* App Check は導入するが、認証なしのため自動化アクセスの完全防止はできない
* groupId 漏洩時は誰でも改ざん・削除できる（仕様として許容）
* リアルタイム購読なしのため、同時編集は「再取得」しないと反映されない（UX）
* ポーリングを入れると read 回数が増える（コスト）

---

## 12. 実装注意点

* **認証は不要**：Firebase Authは使用しない（匿名認証も不要）
* Firestore Rules は `groups` の `list` を禁止して列挙を防ぐ
* `updatedAt` を更新系操作のたびに必ず更新する（ポーリング最適化用）
* members の同名禁止は `memberId = normalizedName` 方式を採用する
* リアルタイム購読は使わず、画面表示/更新操作で one-shot 取得する
* 履歴は端末ごとに独立（同期なし）
* Deep Link で groupId を受け取り、該当グループを開けるようにする
