# ClipCut — Codebase Context

> Current state snapshot for AI assistants, contributors, and code review.
> Last updated: 2026-03-23

---

## What This App Is

**ClipCut** — free, open-source video editor. React + Vite web app deployed on Vercel. Also runs as an Electron desktop app (Linux/Windows).

Final Year Project, University of Botswana (Student ID: 202103579). Target users: content creators in Botswana/Africa who can't afford CapCut or use Linux.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | React 18.2 + React Router 7.13 |
| Build | Vite 5.0.8 + esbuild |
| Video | @ffmpeg/ffmpeg 0.12.15 (WASM) |
| Backend API | FastAPI at `185.215.166.46:8090` (LongToShorts only) |
| Auth/DB | Supabase (PostgreSQL + Auth + Storage) |
| Error tracking | Sentry 10.40.0 |
| Analytics | react-ga4 2.1.0 |
| PWA | vite-plugin-pwa 1.2.0 (Workbox) |
| Testing | Vitest 4 + React Testing Library + happy-dom / Playwright 1.58 |

---

## Design System

**Colours — Botswana flag. NO purple.**

| Name | Hex | Usage |
|------|-----|-------|
| Blue | `#75AADB` | All accents — buttons, links, active states |
| Blue Dark | `#5a8cbf` | Hover/press |
| Blue Faded | `rgba(117,170,219,0.7)` | Secondary text |
| BG Primary | `#0a0a0a` | Main background |
| BG Secondary | `#0d1117` | Panels/cards |
| BG Card | `#1a2332` | Card surfaces |
| Audio | `#34d399` | Audio tracks (green only) |

**Fonts:** Spline Sans (main UI, 300–800) · Outfit (splash only)

---

## Project Structure

```
src/
├── components/
│   ├── VideoEditor/          # 14 files — full timeline editor
│   ├── LongToShorts/         # 5 files — AI vertical shorts pipeline
│   ├── shared/               # PasswordStrengthBar, BotswanaStripe
│   ├── Dashboard.jsx
│   ├── Settings.jsx          # GDPR
│   ├── ErrorBoundary.jsx
│   ├── CookieConsent.jsx
│   ├── DesktopLogin.jsx
│   ├── DesktopRegister.jsx
│   ├── ResetPassword.jsx
│   ├── VerifyEmail.jsx
│   └── OnboardingStep[1-3].jsx
├── services/
│   ├── apiService.js         # FastAPI backend integration (NEW)
│   ├── ffmpeg.js             # FFmpeg singleton + lazy loading
│   ├── projectService.js     # Supabase project save/load
│   ├── videoOperations.js    # Trim, cut, concat FFmpeg commands
│   ├── audioOperations.js    # Volume, mixing
│   ├── effects.js            # Filter presets
│   ├── faceDetection.js      # TensorFlow + MediaPipe
│   ├── captionService.js     # Burn captions via FFmpeg
│   ├── transcriptService.js  # Speech-to-text
│   ├── geminiService.js      # Google Gemini AI
│   └── gdprService.js        # Data deletion
├── hooks/
│   ├── useFFmpeg.js          # FFmpeg state, progress, cancellation
│   ├── useSessionTimeout.js  # 30-min inactivity auto-logout
│   └── usePerformance.js     # Core Web Vitals tracking
├── supabase/
│   ├── supabaseClient.js
│   ├── authService.js        # signUp/In/Out, 2FA, lockout
│   ├── AuthContext.jsx       # AuthProvider + useAuth() hook
│   └── ProtectedRoute.jsx    # ProtectedRoute + PublicRoute
├── utils/
│   ├── validation.js         # validateEmail/Username/Password, sanitize*
│   ├── analytics.js
│   ├── errorTracking.js
│   ├── performance.js
│   └── rateLimiter.js
├── constants/
│   ├── theme.js              # Full design token system
│   ├── editor.js             # Editor defaults, keyboard shortcuts
│   └── app.js
├── __mocks__/                # supabaseClient, analytics, errorTracking
└── test-utils/
    ├── index.jsx             # renderWithRouter() helper
    └── setup.js
```

---

## VideoEditor — Component Map

| File | Purpose | Size |
|------|---------|------|
| `VideoEditor.jsx` | Master state, undo/redo (50 levels), auto-save (30s) | ~1000 LOC |
| `Player.jsx` | Playback, filters, effects controls | 41 KB |
| `Timeline.jsx` | Drag-drop clips, split/trim/reorder | 56 KB |
| `Toolbar.jsx` | Export, save, undo/redo buttons | 5.3 KB |
| `TopBar.jsx` | Breadcrumb, project name display | 29 KB |
| `InspectorPanel.jsx` | Clip properties, volume, text overlays | 31 KB |
| `MediaPanel.jsx` | Import media, upload library | 25 KB |
| `ExportModal.jsx` | Resolution (480p/720p/1080p), format, progress | 12 KB |
| `InspectorComponents.jsx` | Filter/effect subcomponents | 17 KB |
| `timelineEngine.js` | Clip manipulation logic | 5.2 KB |
| `styles.js` | CSS-in-JS editor theme helpers | 7.6 KB |
| `constants.js` | Filter presets, shortcuts, defaults | 9.7 KB |

**Undo/redo architecture:** `useReducer` with `timelineReducer`. Past/future stacks, 50-level limit.

```js
// VideoEditor.jsx — simplified reducer shape
{ clips, past: [...], future: [...] }
// SET_CLIPS pushes to past, clears future
// UNDO pops past, pushes to future
// REDO pops future, pushes to past
```

---

## LongToShorts — Pipeline

Five-step state machine: `Upload → Analyze → Review → Processing → Done`

| Component | Purpose |
|-----------|---------|
| `LongToShorts.jsx` | State machine reducer + CSS-in-JS wrapper |
| `UploadStep.jsx` | Drag-drop upload, client-side compression (720p, 2Mbps via canvas+MediaRecorder) |
| `AnalysisStep.jsx` | Calls `POST /api/analyze`, shows elapsed timer |
| `ReviewStep.jsx` | Edit segments, toggle captions, adjust in/out times |
| `ProcessingStep.jsx` | Calls `POST /api/export`, shows per-segment progress |
| `DoneStep.jsx` | Grid of clips with score badges, individual/bulk download |

**Backend:** FastAPI at `http://185.215.166.46:8090` — handles frame extraction, transcription, AI scoring, FFmpeg export. Client is orchestration only.

**apiService.js exports:** `uploadVideo()`, `analyzeVideo()`, `exportClips()`, `getJobStatus()`, `resolveApiUrl()`

---

## Authentication & Security

- **Auth:** Supabase email/password + Google OAuth + 2FA
- **Session:** 30-min inactivity timeout, token refresh 5 min before expiry, 1-min validation interval
- **Rate limiting:** Login 5/min · Signup 3/2min (client-side via `rateLimiter.js`)
- **Brute force:** Login attempts logged in `login_attempts` table
- **AuthContext:** NOT exported — use `useAuth()` hook, never import `AuthContext` directly
- **Route guards:** `ProtectedRoute` (requires auth) + `PublicRoute` (redirects if authed)

---

## Database Schema (Supabase/PostgreSQL)

| Table | Key Columns |
|-------|-------------|
| `profiles` | `id` (FK auth.users), `username`, `avatar_url` |
| `projects` | `id`, `user_id`, `name`, `thumbnail_url`, `project_data` (JSONB), `duration_seconds`, `resolution` |
| `templates` | `id`, `creator_id`, `name`, `category`, `template_data` (JSONB), `downloads` |
| `template_ratings` | `template_id`, `user_id`, `rating` (1–5) — unique per pair |
| `login_attempts` | `email`, `ip_address`, `attempted_at`, `success` |

Migrations: `supabase/migrations/` (6 SQL files)

---

## FFmpeg Architecture

**Two separate FFmpeg contexts:**

| Context | Where | Used For |
|---------|-------|----------|
| WASM (`@ffmpeg/ffmpeg`) | Browser (client) | VideoEditor — trim, filters, export |
| Server-side FFmpeg | FastAPI backend | LongToShorts — heavy processing |

**ffmpeg.js singleton:**
- Lazy-loaded on first use (avoids bloating initial bundle)
- Caches WASM modules in IndexedDB (90-day PWA cache)
- Subscription-based state (`subscribeToLoadingState()`)
- Memory tracking (`getMemoryUsage()`, `isMemoryLimitExceeded()`)

---

## Routing (App.jsx)

All routes lazy-loaded via `React.lazy` + `Suspense`.

| Path | Component | Guard |
|------|-----------|-------|
| `/` | ClipCutSplash | — |
| `/login` | DesktopLogin | PublicRoute |
| `/register` | DesktopRegister | PublicRoute |
| `/reset-password` | ResetPassword | PublicRoute |
| `/verify-email` | VerifyEmail | PublicRoute |
| `/onboarding/1` · `/2` · `/3` | OnboardingStep1-3 | ProtectedRoute |
| `/dashboard` | Dashboard | ProtectedRoute |
| `/editor` | VideoEditor | ProtectedRoute |
| `/long-to-shorts` | LongToShorts | ProtectedRoute |
| `/feedback` | FeedbackForm | — |
| `/bug-report` | BugReport | — |

---

## Vite Config Highlights

- **COOP/COEP headers:** Required for FFmpeg `SharedArrayBuffer` — `same-origin` + `credentialless`
- **CSP:** Includes `wasm-unsafe-eval` for FFmpeg WASM
- **Manual chunks:** `vendor-react`, `vendor-router`, `vendor-supabase`, `vendor-ffmpeg`, `vendor-mediapipe`
- **Compression:** Gzip + Brotli (threshold 1KB)
- **Dev proxy:** `/api/cf-ai` → Cloudflare Workers AI
- **Build target:** ES2020, esbuild minifier, no source maps in prod

---

## Testing

**Unit tests:** Vitest 4 + React Testing Library 16 + happy-dom

> **Do NOT use jsdom** — `@exodus/bytes` ESM incompatibility. Use `happy-dom`.

```bash
npm test                 # run once
npm run test:watch       # watch mode
npm run test:coverage    # coverage report
npm run test:e2e         # Playwright
npm run test:e2e:ui      # interactive Playwright UI
```

**Known test patterns:**
- Always mock `../../utils/rateLimiter.js` in component tests (module-scoped, accumulates)
- Use exact label strings: `getByLabelText('Email')` not `/email/i`
  - (eye button has `aria-label="Show password"` which regex would match)
- `useAuth` is mocked from AuthContext path, not provided via context

**Test files:**
```
src/utils/__tests__/validation.test.js
src/supabase/__tests__/authService.test.js
src/supabase/__tests__/ProtectedRoute.test.jsx
src/services/__tests__/ffmpeg.test.js
src/components/__tests__/DesktopLogin.test.jsx
src/components/__tests__/DesktopRegister.test.jsx
tests/e2e/auth.spec.js
tests/e2e/editor.spec.js
```

---

## Implementation Status

### Done
- Auth flow (email/password, Google OAuth, 2FA, reset, verify)
- Splash screen, onboarding (3 steps), dashboard, settings (GDPR)
- Full VideoEditor UI — timeline, player, inspector, media panel, export modal
- Undo/redo (50 levels), auto-save (30s)
- LongToShorts pipeline (Upload → Done) with FastAPI backend
- Sentry, GA4, PWA, cookie consent, error boundary
- Rate limiting, input validation/sanitization utilities
- Supabase schema (6 migrations), session timeout
- 162 unit tests passing

### Partially Done
- FFmpeg WASM → VideoEditor UI not fully wired (hook exists, not connected)
- Input sanitization utilities exist but not connected to all form fields
- Mobile routing detected but `MobileAuth` not in App.jsx routes

### Not Started
- Real video export pipeline (FFmpeg → file download in VideoEditor)
- Template library browser page
- Electron desktop wrapper
- Flutter mobile app

---

## Key Files Quick Reference

| What you need | Where |
|--------------|-------|
| Auth logic | `src/supabase/authService.js` |
| Auth state | `src/supabase/AuthContext.jsx` → `useAuth()` |
| Route guards | `src/supabase/ProtectedRoute.jsx` |
| Form validation | `src/utils/validation.js` |
| FFmpeg service | `src/services/ffmpeg.js` |
| Backend API calls | `src/services/apiService.js` |
| Project storage | `src/services/projectService.js` |
| Design tokens | `src/constants/theme.js` |
| Editor constants | `src/constants/editor.js` |
| Test helpers | `src/test-utils/index.jsx` |
| Test mocks | `src/__mocks__/` |
