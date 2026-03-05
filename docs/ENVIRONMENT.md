# Environment Variables

All frontend environment variables must be prefixed with `VITE_` to be exposed to the browser by Vite.

## Setup

```bash
cp env.example .env
```

## Required Variables

| Variable | Type | Example | Description |
|----------|------|---------|-------------|
| `VITE_SUPABASE_URL` | URL | `https://abc123.supabase.co` | Your Supabase project URL. Found in Supabase dashboard > Settings > API. |
| `VITE_SUPABASE_ANON_KEY` | JWT | `eyJ...` | Public Supabase anon key (RLS-protected). Found in Supabase dashboard > Settings > API. Use the **anon** key, not the service role key. |

## Optional Variables

### Analytics

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `VITE_GA_MEASUREMENT_ID` | String | — | Google Analytics 4 measurement ID (e.g., `G-XXXXXXXXXX`). Analytics disabled if not set. |
| `VITE_ANALYTICS_ENDPOINT` | URL | — | Custom analytics endpoint for receiving events. |

### Error Tracking

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `VITE_SENTRY_DSN` | URL | — | Sentry DSN for error reporting. Error tracking disabled if not set. |
| `VITE_SENTRY_DEBUG` | Boolean | `false` | Enables verbose Sentry debug logging in development. |

### Error Alerting

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `VITE_ERROR_ALERT_WEBHOOK_URL` | URL | — | Webhook URL (e.g., Slack) for critical error notifications. |
| `VITE_ERROR_ALERT_THRESHOLD` | Integer | `3` | Number of critical errors within 5 minutes before sending an alert. |

### Application

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `VITE_APP_ENV` | String | `development` | Environment label included in logs and error reports. |
| `VITE_APP_VERSION` | Semver | `0.1.0` | Version tag sent with error tracking payloads. |
| `VITE_LOG_LEVEL` | Enum | `info` | Minimum log level. Values: `debug`, `info`, `warn`, `error`. |

## Example `.env` File

```env
# Required — Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional — Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional — Error tracking
VITE_SENTRY_DSN=https://abc123@o0.ingest.sentry.io/0

# Optional — App metadata
VITE_APP_ENV=development
VITE_APP_VERSION=0.1.0
VITE_LOG_LEVEL=debug
```

## Environment-Specific Behaviour

### Development
- Supabase misconfiguration logs a warning but the app continues running
- Sentry debug mode can be enabled with `VITE_SENTRY_DEBUG=true`
- `VITE_LOG_LEVEL=debug` shows all log output

### Production
- Supabase misconfiguration throws an error and prevents startup
- Source maps are disabled in production builds
- Service worker is registered for PWA caching
- Gzip and Brotli compression are applied to build output

## Security Notes

- Never commit `.env` to version control (it's in `.gitignore`)
- The `VITE_SUPABASE_ANON_KEY` is safe to expose client-side — it's protected by Row Level Security
- Do not use the Supabase **service role** key in the frontend
