# ClipCut

ClipCut is a free, open-source video editor built with React, Vite, Supabase, and FFmpeg WebAssembly.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create your local env file:
   ```bash
   cp .env.example .env
   ```
3. Fill in required values in `.env`.
4. Start development server:
   ```bash
   npm run dev
   ```

## Environment Variables

All frontend environment variables must be prefixed with `VITE_`.

| Variable | Required | Type | Example | Description |
| --- | --- | --- | --- | --- |
| `VITE_SUPABASE_URL` | Yes | URL string | `https://abc123.supabase.co` | Supabase project URL used to initialize the client. |
| `VITE_SUPABASE_ANON_KEY` | Yes | JWT-like string | `eyJ...` | Public Supabase anon key for client-side auth and database access (RLS-protected). |
| `VITE_ANALYTICS_ENDPOINT` | No | URL string | `https://api.example.com/analytics` | Endpoint that receives analytics events from the app. |
| `VITE_GA_MEASUREMENT_ID` | No | String | `G-XXXXXXXXXX` | Google Analytics 4 measurement ID used by `react-ga4`. |
| `VITE_LOG_LEVEL` | No | Enum | `info` | Minimum log level. Supported values: `debug`, `info`, `warn`, `error`. |
| `VITE_SENTRY_DSN` | No | URL string | `https://<key>@o0.ingest.sentry.io/0` | Sentry DSN for error reporting. |
| `VITE_SENTRY_DEBUG` | No | Boolean string | `false` | Enables verbose Sentry debug behavior in development when set to `true`. |
| `VITE_ERROR_ALERT_WEBHOOK_URL` | No | URL string | `https://hooks.slack.com/services/...` | Webhook destination for critical error alert notifications. |
| `VITE_ERROR_ALERT_THRESHOLD` | No | Integer | `3` | Number of critical errors in 5 minutes before alerting. |
| `VITE_APP_ENV` | No | String | `development` | Optional environment label included in logs/telemetry. |
| `VITE_APP_VERSION` | No | Semver string | `0.1.0` | Optional version tag sent with error tracking payloads. |

## Production planning documents

- `PRODUCTION_TASKS.md` - granular task list by category.
- `PRODUCTION_READINESS.md` - broader production checklist.
