# CLAUDE

## Package manager
- npmではなくpnpmを使用すること

## i18n
- i18nのJSONファイル（`webapp/messages/*.json`）を編集する際は、すべての言語ファイル（`en.json`、`ja.json`、`zh-CN.json`、`ko.json`、`es.json`、`pt-BR.json`、`zh-TW.json`）を更新して同期させること
- アプリケーションにテキストを追加するときは、必ず多言語対応（i18n）を行うこと。ソースコードに日本語などのテキストをハードコードしてはいけない。


## Quality checks
- 変更後は `webapp/` で `pnpm lint`, `pnpm check`, `pnpm typecheck`, `pnpm test` を実行して通ることを確認すること

## Webapp design
- デスクトップサイズではなく基本的にスマホサイズに最適化されたデザインにすること

## Web app structure (Next.js)
```
webapp/
├── app/              # Routing definitions only
│   ├── [locale]/     # i18n routing
│   │   ├── (auth)/   # Auth pages
│   │   ├── (main)/   # Main app
│   │   └── (marketing)/ # Marketing pages
│   └── api/          # API endpoints
├── client/           # Client-side code
│   ├── components/   # React components
│   ├── contexts/     # React Context
│   ├── hooks/        # Custom hooks
│   ├── lib/          # Client-only utilities
│   ├── providers/    # Provider components
│   └── stores/       # Zustand store
├── server/           # Server-side code
│   ├── actions/      # Server Actions
│   ├── api/          # Hono API handlers
│   ├── interfaces/   # External integrations
│   ├── lib/          # Server-only utilities
│   ├── loaders/      # Server-side data fetching
│   ├── repositories/ # Data access layer
│   └── usecases/     # Business logic
├── shared/           # Client/server shared
│   ├── lib/          # Shared utilities
│   └── types/        # Shared types
├── i18n/             # i18n config
└── messages/         # Translation files (ja.json, en.json)
```

### Key principles
- Keep `app/` for routing definitions only, no business logic.
- Separate responsibilities with `client/`, `server/`, and `shared/`.
- Use Route Groups to split layouts.
- Keep layouts as Server Components.

### Architecture reference
See `docs/architecture.md` for the app-wide architecture and data model decisions.
