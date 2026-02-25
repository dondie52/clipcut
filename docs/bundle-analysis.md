# Bundle analysis report

## Commands used

```bash
npm run build:stats
```

This command runs both `vite build` and `ANALYZE=true vite build`, producing `dist/stats.html`.

## Before/after chunk size snapshot

| Chunk grouping | Before (single chunk mapping) | After (current mapping) | Delta |
| --- | ---: | ---: | ---: |
| React + Router vendor payload | `assets/Czouravf.js` 177.36 kB (gzip 58.02 kB) | `assets/D7Zzjp5l.js` 141.81 kB + `assets/BrVsYWHS.js` 35.40 kB (gzip 45.43 + 12.83 kB) | split for cacheability, ~same total |
| Supabase vendor | `assets/DZxFKcQQ.js` 170.74 kB (gzip 45.43 kB) | `assets/DZxFKcQQ.js` 170.74 kB (gzip 45.43 kB) | no change |
| FFmpeg vendor | `assets/DxyVEPs7.js` 5.53 kB (gzip 2.22 kB) | `assets/DxyVEPs7.js` 5.53 kB (gzip 2.22 kB) | no change |

## Manual-chunk contributor review

### vendor-react
- Total rendered module weight: **143.92 KiB**.
- Top contributors:
  - `react-dom.production.min.js`: **130.17 KiB**
  - `react.production.min.js`: **7.47 KiB**
  - `scheduler.production.min.js`: **4.31 KiB**

### vendor-router
- Total rendered module weight: **76.59 KiB**.
- Top contributors:
  - `react-router/dist/development/chunk-JZWAC4HX.mjs`: **76.59 KiB** (dominant)

### vendor-supabase
- Total rendered module weight: **500.97 KiB** (largest package group).
- Top contributors:
  - `@supabase/auth-js/GoTrueClient.js`: **130.96 KiB**
  - `@supabase/storage-js/dist/index.mjs`: **84.44 KiB**
  - `@supabase/postgrest-js/dist/index.mjs`: **46.50 KiB**
  - `@supabase/auth-js/lib/webauthn.js`: **32.60 KiB**

### vendor-ffmpeg
- Total rendered module weight: **14.58 KiB**.
- Top contributors:
  - `@ffmpeg/ffmpeg/dist/esm/classes.js`: **9.40 KiB**
  - `@ffmpeg/util/dist/esm/index.js`: **3.67 KiB**

## Optimization opportunities identified

1. **Keep FFmpeg fully deferred behind interaction boundaries**.
   - Ensure every FFmpeg entry path is `await import('./services/ffmpeg')` / `await import('@ffmpeg/ffmpeg')` only after user action (e.g., clicking “Trim”, “Export”, “Generate preview”).
   - This avoids forcing FFmpeg-related orchestration into critical route bundles.

2. **Route/component level code splitting for editor surfaces**.
   - The editor-heavy application code chunk remains large; split `VideoEditor` subpanels (`Timeline`, `Inspector`, `MediaPanel`) with `React.lazy` to defer non-critical panes until opened.
   - This should reduce initial parse/eval cost even when transfer size is already compressed.

3. **Supabase client slimming by capability**.
   - Current client pulls Auth + Realtime + Storage + PostgREST into one vendor group. If the app does not require all features on first paint, instantiate scoped clients or lazy import auth/realtime flows on demand.
   - Opportunity is especially high because `GoTrueClient` and storage modules dominate total size.

4. **Asset and media format tuning**.
   - Continue/expand aggressive image optimization (`.webp`/`.avif` for hero and splash media) and verify lazy decoding for non-critical visuals.
   - While JS dominates logic cost, static assets still affect LCP on constrained networks.

## Status

- ✅ **Analysis complete**: `dist/stats.html` generated and reviewed.
- ✅ **Opportunities identified**: 4 concrete optimization tracks listed above.
