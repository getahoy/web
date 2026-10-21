# Ahoy web

Next.js site and API for Ahoy: accounts (Better Auth) on Postgres (Neon, Drizzle).

## Setup

```bash
pnpm install
cp .env.example .env.local
pnpm db:migrate
pnpm dev
```

`@getahoy/lib` comes from `../shared/packages/lib`; run `pnpm build` there first.

## Scripts

| Script | Does |
|---|---|
| `pnpm dev` | Dev server on port 3000 |
| `pnpm build` | Production build |
| `pnpm lint` | Biome checks |
| `pnpm typecheck` | Route types plus `tsc` |
| `pnpm db:generate` | Migration from schema changes |
| `pnpm db:migrate` | Apply migrations |
