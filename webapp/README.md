# OurSplit Web

Next.jsの静的書き出し（SSG）とグループ閲覧のCSRをFirebase Hostingで配信します。
グループ作成・支出の変更はスマホアプリのみ。閲覧APIはCloud RunのNode.jsサーバーです。

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm lint
pnpm check
pnpm typecheck
pnpm test
```

静的ファイルは `out/` に生成されます。記事更新時は再ビルドが必要です。
グループ詳細: `/ja/groups/?id={groupId}`、精算の内訳: 同URLに `&view=settlement`。

APIのローカル起動は `pnpm api:local`（8081）。Firestore Emulatorまたは読み取り専用ADCを用意してください。
静的サイトのローカル検証は、`pnpm build` 後に `pnpm preview`（4173）。`/api/**` を8081へプロキシします。
Webの見た目の開発には `pnpm local`（3000）も利用できますが、APIを含む動作確認はpreviewで行ってください。
本番は `firebase.json` のHosting rewriteでCloud Runへ転送します。
デプロイとカスタムドメインの設定は `../docs/gcp-infra.md` を参照してください。
