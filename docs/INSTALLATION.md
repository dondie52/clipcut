# Installation Guide

## Prerequisites

- **Node.js** 18 or later (LTS recommended)
- **npm** 9 or later
- **Git**
- A **Supabase** project ([supabase.com](https://supabase.com) — free tier works)

## Step 1: Clone the Repository

```bash
git clone https://github.com/dondie52/clipcut.git
cd clipcut
```

## Step 2: Install Dependencies

```bash
npm install
```

This installs all runtime and development dependencies including:

| Package | Purpose |
|---------|---------|
| `react`, `react-dom` | UI framework |
| `react-router-dom` | Client-side routing |
| `@supabase/supabase-js` | Backend (auth, database, storage) |
| `@ffmpeg/ffmpeg`, `@ffmpeg/util` | Video processing (WASM) |
| `@sentry/react` | Error tracking |
| `react-ga4` | Google Analytics |
| `vite` | Build tool |
| `vitest`, `@testing-library/react` | Unit testing |
| `@playwright/test` | E2E testing |

### Installing Playwright Browsers (for E2E tests)

If you plan to run E2E tests:

```bash
npx playwright install
```

## Step 3: Configure Environment

```bash
cp env.example .env
```

Edit `.env` and fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...your-anon-key
```

See [ENVIRONMENT.md](ENVIRONMENT.md) for all available variables.

## Step 4: Set Up Supabase Database

Run the SQL migrations in order against your Supabase project:

1. Go to your Supabase dashboard > SQL Editor
2. Run each migration file in `supabase/migrations/` in numerical order (001 through 007)

See [DATABASE.md](DATABASE.md) for full schema documentation.

## Step 5: Start Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

## Step 6: Verify Setup

1. Open `http://localhost:5173` in your browser
2. You should see the ClipCut splash screen animation
3. After the splash, you'll be redirected to the login page
4. Create an account or sign in with Google

## Optional: Production Build

```bash
npm run build
npm run preview
```

The production build outputs to `dist/` and can be previewed at `http://localhost:4173`.

## Troubleshooting

### `SharedArrayBuffer is not defined`

FFmpeg WASM requires `SharedArrayBuffer`, which needs specific HTTP headers:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

These are configured automatically in `vite.config.js` for development. For production, they're set in `vercel.json`.

### `@exodus/bytes` ESM compatibility error with jsdom

The project uses `happy-dom` instead of `jsdom` for testing due to an ESM compatibility issue with `@exodus/bytes`. This is already configured in `vitest.config.js`.

### Supabase connection errors

- Verify your `VITE_SUPABASE_URL` starts with `https://` and ends with `.supabase.co`
- Verify your `VITE_SUPABASE_ANON_KEY` is the **anon** (public) key, not the service role key
- In development, the app will log warnings but continue without Supabase. In production, it will fail

### Port 5173 already in use

```bash
# Find and kill the process using port 5173
lsof -i :5173
kill -9 <PID>

# Or use a different port
npm run dev -- --port 3000
```

### Node.js version issues

```bash
# Check your Node version
node --version

# If below 18, use nvm to switch
nvm install 18
nvm use 18
```

### Slow initial load in development

The first load downloads FFmpeg WASM (~25MB). Subsequent loads use the browser cache. The `vite-plugin-pwa` caches FFmpeg WASM for 90 days in production.
