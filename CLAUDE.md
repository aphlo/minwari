# CLAUDE

## Package manager
- npmではなくpnpmを使用すること

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
