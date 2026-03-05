# Deployment Process

ClipCut deploys to **Vercel** with automated CI/CD via GitHub Actions.

## Automatic Deployment

Pushing to the `main` branch triggers the full deployment pipeline:

```
Push to main
    │
    ▼
CI: Unit Tests (npm test)
    │
    ▼
Deploy: Vercel Production Build
    │
    ▼
Live at production URL
```

### GitHub Actions Workflows

**`.github/workflows/ci.yml`** — runs on every push/PR to `main`:
1. Unit tests (`npm test`) on Node.js 20
2. Production build (`npm run build`)
3. Uploads coverage and dist artifacts (retained 7 days)

**`.github/workflows/deploy.yml`** — runs on push to `main` only:
1. Unit tests
2. Production deploy via Vercel CLI
3. Outputs deployment URL to job summary

**`.github/workflows/performance-check.yml`** — runs on every push/PR:
1. Production build
2. Performance budget check (`node scripts/check-performance-budget.mjs`)

## Required Secrets

Configure these in GitHub repository settings > Secrets:

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel authentication token |

The deploy workflow uses `VERCEL_TOKEN` for `vercel pull`, `vercel build`, and `vercel deploy`.

## Vercel Configuration

The `vercel.json` file configures:

### Build Settings

| Setting | Value |
|---------|-------|
| Framework | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |

### Security Headers

Applied to all routes (`/(.*)`):

- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Embedder-Policy: require-corp`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

The COOP and COEP headers are **required** for FFmpeg WASM (SharedArrayBuffer).

### Caching

- `/assets/*` — `Cache-Control: public, max-age=31536000, immutable` (1 year, hashed filenames)
- All other routes — rewritten to `/index.html` (SPA routing)

## Manual Deployment

If you need to deploy manually:

```bash
# Install Vercel CLI
npm i -g vercel

# Link to your Vercel project (first time only)
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Environment Variables on Vercel

Set these in Vercel project settings > Environment Variables:

| Variable | Required | Notes |
|----------|----------|-------|
| `VITE_SUPABASE_URL` | Yes | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase anon key |
| `VITE_SENTRY_DSN` | Recommended | Error tracking in production |
| `VITE_GA_MEASUREMENT_ID` | Optional | Google Analytics |
| `VITE_APP_ENV` | Optional | Set to `production` |
| `VITE_APP_VERSION` | Optional | Current version |

## Build Output

The production build generates:

```
dist/
├── index.html
├── assets/
│   ├── vendor-react-[hash].js      # React + ReactDOM
│   ├── vendor-router-[hash].js     # React Router
│   ├── vendor-supabase-[hash].js   # Supabase client
│   ├── vendor-ffmpeg-[hash].js     # FFmpeg WASM loader
│   ├── index-[hash].js             # App code
│   └── index-[hash].css            # Styles
├── sw.js                            # Service worker (PWA)
├── manifest.webmanifest             # PWA manifest
└── *.gz, *.br                       # Compressed variants
```

Chunk size warning limit: 500KB. Gzip and Brotli compressed variants are generated for all files above 1KB.

## Troubleshooting

### Deploy fails with "VERCEL_TOKEN not set"

Add the `VERCEL_TOKEN` secret to your GitHub repository (Settings > Secrets > Actions).

### SharedArrayBuffer not available in production

Verify the COOP and COEP headers are being served. Check in browser DevTools > Network > Response Headers for any request. Both headers must be present:
```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

### Build succeeds but app shows blank page

Check the browser console for errors. Common causes:
- Missing environment variables (Supabase URL/key)
- CORS issues with Supabase (check allowed origins in Supabase dashboard)

### Performance budget exceeded

Run `npm run analyze` to see the bundle visualization and identify large dependencies.
