# Partial Pre-Rendering

Some experiments with the new cacheComponents API from NextJS 16.

## Features

- Use cacheComponents and PPP to cache private and public pages on the Server
- Use custom cacheHandler for cacheComponents
- Draft Mode to bypass the cache
- Multi locale (manually set the `locale` cookie to a value, fallback to `en`)

## Test Locally

1) Clone Repo
2) Install Dependencies using `pnpm install`
3) Build and Start the Server using `pnpm build && pnpm start`

For local dev mode use `pnpm dev` instead of step `pnpm build && pnpm start`.