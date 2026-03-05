# Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        ClipCut Web App                          │
│                     (React + Vite SPA)                          │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │  Auth     │  │Dashboard │  │  Video   │  │  Settings    │   │
│  │  Flow     │  │          │  │  Editor  │  │  + GDPR      │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────┬───────┘   │
│       │              │             │                │            │
│  ┌────┴──────────────┴─────────────┴────────────────┴────────┐  │
│  │                    Service Layer                           │  │
│  │  projectService  ffmpeg  videoOps  audioOps  effects  gdpr│  │
│  └────────────────────────┬──────────────────────────────────┘  │
│                           │                                     │
│  ┌────────────────────────┴──────────────────────────────────┐  │
│  │                    Utility Layer                           │  │
│  │  validation  rateLimiter  analytics  errorTracking  logger│  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────┬────────────────────────────┬──────────────────────┘
              │                            │
              ▼                            ▼
┌─────────────────────┐      ┌──────────────────────┐
│   Supabase Cloud    │      │   FFmpeg WASM        │
│  ┌───────────────┐  │      │  (runs in browser)   │
│  │ Auth (PKCE)   │  │      │                      │
│  │ PostgreSQL    │  │      │  Loaded from unpkg   │
│  │ Storage       │  │      │  CDN on demand       │
│  │ Realtime      │  │      │                      │
│  └───────────────┘  │      │  SharedArrayBuffer   │
└─────────────────────┘      │  required (COOP/COEP)│
                             └──────────────────────┘
              │
              ▼
┌─────────────────────┐      ┌──────────────────────┐
│   Vercel (Hosting)  │      │   External Services  │
│  - Static files     │      │  - Sentry (errors)   │
│  - SPA routing      │      │  - GA4 (analytics)   │
│  - Security headers │      │  - Google OAuth      │
│  - Asset caching    │      └──────────────────────┘
└─────────────────────┘
```

## Frontend Architecture

### Routing

All routes use **React.lazy()** for code splitting. The app is wrapped in `ErrorBoundary > AuthProvider > BrowserRouter`.

```
/                    → ClipCutSplash (PublicRoute)
/login               → DesktopLogin (PublicRoute)
/register            → DesktopRegister (PublicRoute)
/reset-password      → ResetPassword (PublicRoute)
/verify-email        → VerifyEmail (ProtectedRoute)
/onboarding/1-3      → OnboardingStep1-3 (ProtectedRoute)
/dashboard           → Dashboard (ProtectedRoute)
/editor              → VideoEditor (ProtectedRoute)
```

### Component Hierarchy

```
App.jsx
├── ErrorBoundary
│   └── AuthProvider
│       └── BrowserRouter
│           └── AppContent
│               ├── OfflineBanner
│               ├── SessionTimeoutBanner
│               ├── CookieConsent
│               └── Routes
│                   ├── ClipCutSplash
│                   ├── DesktopLogin / DesktopRegister
│                   ├── ResetPassword / VerifyEmail
│                   ├── OnboardingStep1-3
│                   ├── Dashboard
│                   └── VideoEditor
│                       ├── TopBar (+ ExportModal)
│                       ├── Toolbar
│                       ├── MediaPanel (lazy)
│                       ├── Player (lazy)
│                       ├── InspectorPanel (lazy)
│                       └── Timeline (lazy)
```

### State Management

ClipCut uses **React built-in state** (no Redux or external state library):

| State | Method | Scope |
|-------|--------|-------|
| Auth (user, session) | `useContext` via `AuthProvider` | Global |
| Timeline clips | `useReducer` with undo/redo | VideoEditor |
| Playback state | `useState` + `requestAnimationFrame` | VideoEditor |
| Media items | `useState` | VideoEditor |
| FFmpeg state | `useState` via `useFFmpeg` hook | VideoEditor |
| Form state | `useState` | Per component |

### Video Processing Pipeline

```
User imports file
    │
    ▼
getVideoInfo() ─── extracts duration, width, height
    │
    ▼
generateThumbnail() ─── browser-based (Canvas API)
    │
    ▼
Media added to mediaItems[]
    │
    ▼
User adds to timeline → clip created
    │
    ▼
User edits (trim/split/effects) → FFmpeg WASM processes
    │
    ▼
User exports → mergeClips() + exportVideo()
    │
    ▼
Browser download triggered
```

### Auto-Save

- Runs every **30 seconds** if clips exist
- Saves to **Supabase** if authenticated, **localStorage** otherwise
- Tracks project ID via ref — first save creates new project, subsequent saves update

### Undo/Redo

- Implemented via `useReducer` with `timelineReducer`
- Actions: `SET_CLIPS`, `UNDO`, `REDO`, `RESET`
- History capped at **50 entries** (`MAX_UNDO_HISTORY`)

## Security Architecture

### Authentication

- **PKCE flow** (Proof Key for Code Exchange) for OAuth
- **Account lockout**: 5 failed attempts → 30-minute lockout (tracked in `login_attempts` table)
- **Session management**: 30-minute inactivity timeout, 60-second validation interval, auto token refresh 5 minutes before expiry
- **2FA**: TOTP via Supabase MFA

### Input Security

- All user text inputs sanitized via `sanitizeTextInput()` (strips HTML tags, control characters)
- File names sanitized via `sanitizeFileName()` (prevents path traversal)
- URL parameters validated via `sanitizeUrlParam()` (supports UUID, JWT, enum types)
- Error messages sanitized via `sanitizeErrorMessage()` (strips stack traces, SQL, connection strings)

### File Upload Security

- **Client-side**: MIME type validation, extension-to-MIME matching (prevents spoofing), 500MB max
- **Server-side**: Supabase Storage bucket policies enforce MIME types and size limits
- **Storage paths**: `{userId}/...` pattern enforced by RLS policies

### HTTP Headers

Configured in both `vite.config.js` (dev) and `vercel.json` (prod):

| Header | Value | Purpose |
|--------|-------|---------|
| `Cross-Origin-Opener-Policy` | `same-origin` | Required for SharedArrayBuffer (FFmpeg) |
| `Cross-Origin-Embedder-Policy` | `require-corp` | Required for SharedArrayBuffer (FFmpeg) |
| `X-Content-Type-Options` | `nosniff` | Prevent MIME sniffing |
| `X-Frame-Options` | `DENY` | Prevent clickjacking |
| `X-XSS-Protection` | `1; mode=block` | XSS filter |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limit referrer info |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Disable unused APIs |

## Build and Bundle Strategy

### Code Splitting

Manual chunks configured in `vite.config.js`:

| Chunk | Packages |
|-------|----------|
| `vendor-react` | `react`, `react-dom` |
| `vendor-router` | `react-router-dom` |
| `vendor-supabase` | `@supabase/supabase-js` |
| `vendor-ffmpeg` | `@ffmpeg/ffmpeg`, `@ffmpeg/util` |

Route components are lazy-loaded via `React.lazy()`. Editor sub-panels (MediaPanel, Player, InspectorPanel, Timeline) are also lazy-loaded.

### Compression

- **Gzip** (.gz) and **Brotli** (.br) via `vite-plugin-compression`
- Threshold: 1KB minimum
- Applied to all build output

### Caching (PWA)

| Resource | Strategy | TTL |
|----------|----------|-----|
| Static assets | CacheFirst | 30 days |
| Google Fonts | CacheFirst | 365 days |
| FFmpeg WASM | CacheFirst | 90 days |
| Supabase API | NetworkFirst | 5 minutes |

## Testing Architecture

### Unit Tests (Vitest + React Testing Library)

- **162 tests** across components, services, supabase, and utils
- Environment: `happy-dom` (not jsdom, due to ESM compatibility)
- Setup file: `src/test-utils/setup.js`
- Mocks: `src/__mocks/` (analytics, error tracking, Supabase client)

### E2E Tests (Playwright)

- Browsers: Chromium, Firefox
- Tests: auth flow, editor interactions
- Dev server auto-started on port 5173
- Screenshots on failure, traces on first retry

## Data Flow

### Authentication Flow

```
User → DesktopLogin/Register
  │
  ├── Email/Password → signIn/signUp() → Supabase Auth
  │   │
  │   ├── Success → AuthContext updates → redirect to /dashboard
  │   └── Failure → check lockout → show error
  │
  └── Google OAuth → signInWithGoogle() → redirect to Google
      │
      └── Callback → /onboarding/1
```

### Project Save/Load Flow

```
Auto-save (30s) or manual Ctrl+S
  │
  ├── Authenticated? → projectService.saveProject() → Supabase
  └── Not authenticated? → localStorage fallback

Load project
  │
  ├── projectService.loadProject(id, userId)
  │   ├── Verifies ownership
  │   └── Retries 2x with 1s backoff
  └── Returns project_data JSONB → hydrates editor state
```
