# Agent Instructions

You're working inside the **WAT framework** (Workflows, Agents, Tools). This architecture separates concerns so that probabilistic AI handles reasoning while deterministic code handles execution. That separation is what makes this system reliable.

## The WAT Architecture

**Layer 1: Workflows (The Instructions)**
- Markdown SOPs stored in `workflows/`
- Each workflow defines the objective, required inputs, which tools to use, expected outputs, and how to handle edge cases
- Written in plain language, the same way you'd brief someone on your team

**Layer 2: Agents (The Decision-Maker)**
- This is your role. You're responsible for intelligent coordination.
- Read the relevant workflow, run tools in the correct sequence, handle failures gracefully, and ask clarifying questions when needed
- You connect intent to execution without trying to do everything yourself
- Example: If you need to pull data from a website, don't attempt it directly. Read `workflows/scrape_website.md`, figure out the required inputs, then execute `tools/scrape_single_site.py`

**Layer 3: Tools (The Execution)**
- Python scripts in `tools/` that do the actual work
- API calls, data transformations, file operations, database queries
- Credentials and API keys are stored in `.env`
- These scripts are consistent, testable, and fast

**Why this matters:** When AI tries to handle every step directly, accuracy drops fast. If each step is 90% accurate, you're down to 59% success after just five steps. By offloading execution to deterministic scripts, you stay focused on orchestration and decision-making where you excel.

## How to Operate

**1. Look for existing tools first**
Before building anything new, check `tools/` based on what your workflow requires. Only create new scripts when nothing exists for that task.

**2. Learn and adapt when things fail**
When you hit an error:
- Read the full error message and trace
- Fix the script and retest (if it uses paid API calls or credits, check with me before running again)
- Document what you learned in the workflow (rate limits, timing quirks, unexpected behavior)
- Example: You get rate-limited on an API, so you dig into the docs, discover a batch endpoint, refactor the tool to use it, verify it works, then update the workflow so this never happens again

**3. Keep workflows current**
Workflows should evolve as you learn. When you find better methods, discover constraints, or encounter recurring issues, update the workflow. That said, don't create or overwrite workflows without asking unless I explicitly tell you to. These are your instructions and need to be preserved and refined, not tossed after one use.

## The Self-Improvement Loop

Every failure is a chance to make the system stronger:
1. Identify what broke
2. Fix the tool
3. Verify the fix works
4. Update the workflow with the new approach
5. Move on with a more robust system

This loop is how the framework improves over time.

## File Structure

**What goes where:**
- **Deliverables**: Final outputs go to cloud services (Google Sheets, Slides, etc.) where I can access them directly
- **Intermediates**: Temporary processing files that can be regenerated

**Directory layout:**
```
.tmp/           # Temporary files (scraped data, intermediate exports). Regenerated as needed.
tools/          # Python scripts for deterministic execution
workflows/      # Markdown SOPs defining what to do and how
.env            # API keys and environment variables (NEVER store secrets anywhere else)
credentials.json, token.json  # Google OAuth (gitignored)
```

**Core principle:** Local files are just for processing. Anything I need to see or use lives in cloud services. Everything in `.tmp/` is disposable.

## Bottom Line

You sit between what I want (workflows) and what actually gets done (tools). Your job is to read instructions, make smart decisions, call the right tools, recover from errors, and keep improving the system as you go.

Stay pragmatic. Stay reliable. Keep learning.

---

# ClipCut — Project Context

## Overview

**ClipCut** is a free, open-source, cross-platform video editor. Final Year Project at the **University of Botswana**, Department of Computer Science (Student ID: 202103579).

A free alternative to CapCut targeting content creators in Botswana and Africa who can't afford subscription-based editing tools and/or use Linux where CapCut isn't available.

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Desktop App | Electron + React (JS/TS) | Linux & Windows only, NO macOS |
| Web App | React + Vite | Same codebase as desktop, deployed on Vercel |
| Mobile App | Flutter (Dart) | Android & iOS (future) |
| Backend/DB | Supabase | PostgreSQL, Auth, Realtime, Storage |
| Video Engine | @ffmpeg/ffmpeg 0.12.15 + @ffmpeg/util | WASM in browser; fluent-ffmpeg via Node.js on desktop |
| Error Tracking | @sentry/react 10.40.0 | Production monitoring |
| Analytics | react-ga4 2.1.0 | GA4 + Core Web Vitals |
| PWA | vite-plugin-pwa 1.2.0 | Offline support |
| Build Tool | Vite 5.0.8 | Dev server and production builds |
| Routing | React Router DOM 7.13.0 | Lazy-loaded routes |

## Design System

### Colours — Botswana Flag

| Colour | Hex | Usage |
|--------|-----|-------|
| Blue | `#75AADB` | Primary accent, buttons, links, active elements |
| Black | `#0a0a0a` / `#0d1117` | Backgrounds |
| White | `#FFFFFF` | Text, icons |
| Dark Gray | `#1a2332` | Cards, panels, secondary backgrounds |
| Faded Blue | `rgba(117,170,219,0.7)` | Secondary text |

### NO purple anywhere. All accents are Botswana blue (#75AADB).

### Fonts
- **Spline Sans** (Google Fonts) — weights 300–800, main UI font
- **Outfit** (Google Fonts) — splash screens only

## Project Structure

```
clipcut-main/
├── src/
│   ├── components/
│   │   ├── VideoEditor/          # 14 files: editor, timeline, player, inspector, etc.
│   │   ├── LongToShorts/         # Vertical crop pipeline
│   │   ├── ClipCutSplash.jsx     # Splash screen
│   │   ├── DesktopLogin.jsx      # Login
│   │   ├── DesktopRegister.jsx   # Registration
│   │   ├── ResetPassword.jsx     # Password reset
│   │   ├── VerifyEmail.jsx       # Email verification
│   │   ├── OnboardingStep[1-3].jsx
│   │   ├── Dashboard.jsx
│   │   ├── Settings.jsx          # GDPR compliance
│   │   ├── CookieConsent.jsx
│   │   └── ErrorBoundary.jsx
│   ├── hooks/                    # useFFmpeg, usePerformance, useSessionTimeout
│   ├── services/                 # projectService, authService, ffmpeg, videoOps, audioOps, effects, faceDetection, gdpr
│   ├── supabase/                 # supabaseClient, authService, AuthContext, ProtectedRoute
│   ├── utils/                    # validation, analytics, errorTracking, performance, rateLimiter, etc.
│   ├── constants/                # app, editor, theme
│   ├── App.jsx                   # Routing with lazy loading + auth guards
│   └── main.jsx
├── supabase/migrations/          # 6 SQL migrations
├── public/
├── vite.config.js
└── package.json
```

## Database Schema (Supabase/PostgreSQL)

- **profiles** — `id` (UUID, FK auth.users), `username`, `avatar_url`, `created_at`
- **projects** — `id`, `user_id` (FK profiles), `name`, `thumbnail_url`, `project_data` (JSONB), `duration_seconds`, `resolution`, timestamps
- **templates** — `id`, `creator_id` (FK profiles), `name`, `category`, `thumbnail_url`, `template_data` (JSONB), `downloads`, `created_at`
- **template_ratings** — `id`, `template_id`, `user_id`, `rating` (1–5), unique per user/template
- **login_attempts** — `id`, `email`, `ip_address`, `attempted_at`, `success`

## Core Features (In Scope)

1. Timeline-based editor — drag-and-drop, cutting, trimming, splitting, reordering
2. Text overlays — fonts, sizes, colours, positioning
3. Transition effects — fade, dissolve, slide, wipe
4. Audio management — volume, background music, sync
5. Video export — MP4/WebM at 480p/720p/1080p via FFmpeg
6. Supabase auth — signup, login, Google OAuth, password reset, email verification
7. Cloud project storage — save/load via Supabase Storage
8. Community template library

## Out of Scope

macOS support, advanced VFX, AI editing, real-time collaboration, GPU rendering, payment/monetization.

## Implementation Status

### Done
- Project structure (Vite + React), routing with lazy loading, auth guards
- Splash screen, auth flow (signup, login, OAuth, reset, verify), onboarding
- Video editor UI (timeline, player, inspector, media panel, export modal, undo/redo, auto-save)
- Dashboard, settings (GDPR), cookie consent, error boundary
- Sentry error tracking, GA4 analytics, performance monitoring, PWA
- Input validation/sanitization utilities, rate limiting, file upload security
- Supabase schema (6 migrations), session timeout
- Speaker-following reframing for LongToShorts vertical crop
- Face detection service, transcript-based analysis, captions

### In Progress
- FFmpeg WASM hook exists but not fully wired to editor UI
- Input sanitization not connected to all form components
- Mobile routing detected but MobileAuth not in App.jsx routes

### Not Started
- Real video export pipeline (FFmpeg → file download)
- Template library browser page
- Electron desktop wrapper
- Flutter mobile app

## FFmpeg Reference Commands

```bash
# Trim
ffmpeg -i input.mp4 -ss 00:00:05 -t 00:00:10 -c copy output.mp4
# Concat
ffmpeg -f concat -safe 0 -i filelist.txt -c copy merged.mp4
# Text overlay
ffmpeg -i input.mp4 -vf "drawtext=text='Hello':fontsize=48:fontcolor=white:x=100:y=100" output.mp4
# Crossfade
ffmpeg -i clip1.mp4 -i clip2.mp4 -filter_complex "xfade=transition=fade:duration=1:offset=4" output.mp4
# Background music
ffmpeg -i video.mp4 -i music.mp3 -filter_complex "[1:a]volume=0.3[a1];[0:a][a1]amix=inputs=2" output.mp4
# Resolution export
ffmpeg -i input.mp4 -vf scale=1920:1080 -c:v libx264 -crf 23 output_1080p.mp4
```

## Development Priority (Next)

1. Connect FFmpeg WASM hook to VideoEditor for actual video processing
2. Complete input sanitization across all components
3. Build template browser page
4. Implement real video export pipeline
5. Electron desktop wrapper
6. Flutter mobile app
7. Testing and documentation
