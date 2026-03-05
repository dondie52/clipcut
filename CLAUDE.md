# CLAUDE.md — ClipCut Project Context

## Project Overview
**ClipCut** is a free, open-source, cross-platform video editor being developed as a Final Year Project at the **University of Botswana**, Department of Computer Science.

- **Student ID:** 202103579
- **Project Type:** Final Year Project (FYP)
- **Status:** Development in progress — full auth flow, video editor UI, Supabase integration, and monitoring all implemented

## What ClipCut Is
A free alternative to CapCut (which went paid) that works on Linux, Windows, Web, and Mobile. It targets content creators in Botswana and Africa who can't afford subscription-based editing tools and/or use Linux where CapCut isn't available.

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Desktop App** | Electron + React (JavaScript/TypeScript) | Linux & Windows only, NO macOS |
| **Web App** | React + Vite (same codebase as desktop) | Currently in development, will be deployed on Vercel |
| **Mobile App** | Flutter (Dart) | Android & iOS |
| **Backend/DB** | Supabase | PostgreSQL, Auth, Realtime, Storage |
| **Video Engine** | @ffmpeg/ffmpeg 0.12.15 + @ffmpeg/util | WASM-based, runs in browser; fluent-ffmpeg via Node.js on desktop |
| **Error Tracking** | @sentry/react 10.40.0 | Production error monitoring |
| **Analytics** | react-ga4 2.1.0 | Google Analytics 4 + Core Web Vitals |
| **PWA** | vite-plugin-pwa 1.2.0 | Offline support, service worker |
| **Image Processing** | sharp 0.34.5 | Image optimization |
| **Dev Tools** | Cursor IDE, Claude AI, Git/GitHub | |
| **Build Tool** | Vite 5.0.8 | Fast development server and build tool |
| **Routing** | React Router DOM 7.13.0 | Client-side routing with lazy loading |

## Core Features (In Scope)
1. **Timeline-based editor** — drag-and-drop media import, clip cutting, trimming, splitting, reordering
2. **Text overlays** — customizable fonts, sizes, colours, positioning
3. **Transition effects** — fade, dissolve, slide, wipe
4. **Audio management** — volume control, background music, audio-video sync
5. **Video export** — MP4/WebM at 480p, 720p, 1080p via FFmpeg
6. **User auth** — Supabase authentication
7. **Cloud project storage** — save/load projects from cloud via Supabase Storage
8. **Shared template library** — community templates users can browse and use

## Out of Scope
- macOS support
- Advanced VFX (motion tracking, chroma key, 3D rendering)
- AI-powered editing
- Real-time multi-user collaboration
- GPU-accelerated rendering
- Payment/monetization (it's 100% free)

## Design System

### Colour Theme — Botswana Flag Colours
| Colour | Hex | Usage |
|--------|-----|-------|
| **Blue** | `#75AADB` | Primary accent, buttons, links, active elements, loading bars |
| **Black** | `#0a0a0a` / `#0d1117` | Backgrounds |
| **White** | `#FFFFFF` | Text, icons |
| **Dark Gray** | `#1a2332` | Cards, panels, secondary backgrounds |
| **Faded Blue** | `rgba(117,170,219,0.7)` | Taglines, secondary text |

### NO purple anywhere. All accents are Botswana blue (#75AADB).

### Font
- **Spline Sans** (Google Fonts) — weights 300, 400, 500, 600, 700, 800
- Used for splash screens: **Outfit** (Google Fonts)

### Logo
- Material Symbols icon `movie` (filled) in blue as the main icon
- Small blue circle badge with `content_cut` (scissors) icon on bottom-right corner
- The scissors represent "cutting" video clips
- Desktop left side uses the logo alongside "ClipCut" text horizontally
- Mobile uses the logo centered above "ClipCut" text vertically

## Screens Implemented

### 1. Desktop Splash Screen (React/JSX) ✅
- Animated scissors-cutting-the-screen reveal
- Phase animation: dark screen → scissors slide in → cut line glows → screen splits (top/bottom curtains) → logo reveals → loading bar fills → Botswana flag stripe appears at bottom
- Font: Outfit
- File: `ClipCutSplash.jsx`

### 2. Mobile Splash Screen (React/JSX) ✅
- Same animation as desktop but in phone frame (390x844)
- Includes notch, status bar, home indicator
- Scaled down: 38px title, 200px loading bar
- Font: Outfit
- File: `ClipCutSplashMobile.jsx`

### 3. Desktop Editor (Figma/Stitch) ✅
- Dark charcoal theme with Botswana blue accents
- Layout: Left sidebar (Media/Audio/Text tabs) → Center preview player → Right sidebar (Inspector with Typography, Effect Controls, Transform) → Bottom multi-track timeline (Video 1, Video 2, Audio 1)
- Top bar: ClipCut logo, project name, Edit/Color/Audio tabs, Export button

### 4. Project Dashboard (Figma/Stitch) ✅
- "Welcome back, [Name]" greeting
- Recent Projects as thumbnail cards with duration badges
- "New Project" card (dashed border, + icon)
- Community Templates section (Trending, Cinematic, Business categories)
- Search bar, Import Media button, notification icon, user avatar

### 5. Mobile Editor (Figma/Stitch) ✅
- Vertical layout: preview player on top → simplified timeline below → bottom toolbar (Split, Text, Audio, Filters, Effects)
- Export button top-right
- Project name and resolution info at top

### 6. Desktop Login/Signup (React/JSX) ✅
- Split layout: left side has faded background images + ClipCut logo + "Tools for the Next Generation of Botswana Creators" heading + subtitle
- Right side: dark card with form (login or signup toggle)
- Signup has: username, email, password with 4-segment strength bar, confirm password
- Login has: email, password, "Forgot password?" link
- Google sign-in button (white), "or" divider
- Botswana flag stripe at bottom
- Font: Spline Sans
- Files: `DesktopLogin.jsx`, `DesktopRegister.jsx`

### 7. Mobile Login/Signup (React/JSX) ✅
- Phone frame (390x844) with notch and home indicator
- Top: large film icon with scissors badge + "ClipCut" + "EDIT. CREATE. SHARE." tagline
- Login: email + password fields, "Forgot password?" link, Sign In button
- Signup: username + email + password (4-segment strength bar) + confirm password, Create Account button
- Google sign-in, toggle between login/signup
- Uppercase labels (EMAIL, PASSWORD)
- Botswana flag stripe at bottom
- Font: Spline Sans
- File: `MobileAuth.jsx`

### 8. Onboarding Flow (React/JSX) ✅
- Three-step onboarding process after registration
- Step 1: Welcome/introduction screen
- Step 2: Feature highlights/tutorial
- Step 3: Final setup/preferences
- Navigation between steps with continue/skip options
- Files: `OnboardingStep1.jsx`, `OnboardingStep2.jsx`, `OnboardingStep3.jsx`

### 9. Dashboard (React/JSX) ✅
- Main project dashboard after login/onboarding
- File: `Dashboard.jsx`

### 10. Reset Password (React/JSX) ✅
- Secure URL token validation (access_token, type params)
- Rate limiting: 3 attempts per 10 minutes
- Password strength display
- File: `ResetPassword.jsx`

### 11. Verify Email (React/JSX) ✅
- Auto-redirect when email is verified
- Resend email with rate limiting (3 resends per 5 minutes)
- File: `VerifyEmail.jsx`

### 12. Video Editor (React/JSX) ✅
- Full editor layout: top bar → left media panel → center player → right inspector → bottom timeline
- Undo/redo system, auto-save
- Export modal with resolution presets (480p, 720p, 1080p)
- Folder: `VideoEditor/` (14 files)

### 13. Settings (React/JSX) ✅
- User profile settings
- GDPR compliance: export all user data, delete account
- File: `Settings.jsx`

### 14. Cookie Consent (React/JSX) ✅
- Cookie consent banner displayed on first visit
- File: `CookieConsent.jsx`

## Screens Still Needed
- [ ] Template browser (full page)
- [ ] Mobile dashboard / project selector
- [ ] Text editor overlay panel
- [ ] Transition picker panel
- [ ] Audio mixer panel
- [ ] Settings/preferences page (expanded)

## Project Architecture (Current)

```
clipcut-main/
├── src/
│   ├── components/
│   │   ├── VideoEditor/
│   │   │   ├── VideoEditor.jsx        # Main editor with undo/redo, auto-save
│   │   │   ├── TopBar.jsx             # Project name, export button, edit/color/audio tabs
│   │   │   ├── Toolbar.jsx            # Split, text, audio, filters, effects buttons
│   │   │   ├── Timeline.jsx           # Multi-track timeline component
│   │   │   ├── Player.jsx             # Video preview player
│   │   │   ├── MediaPanel.jsx         # Left sidebar media library (video/audio/text tabs)
│   │   │   ├── InspectorPanel.jsx     # Right sidebar properties inspector
│   │   │   ├── InspectorComponents.jsx # Reusable inspector UI pieces
│   │   │   ├── ExportModal.jsx        # Export settings dialog
│   │   │   ├── Icon.jsx               # Icon component
│   │   │   ├── GhostBtn.jsx           # Ghost button styling
│   │   │   ├── styles.js              # Shared CSS-in-JS styles
│   │   │   ├── constants.js           # Editor-specific constants
│   │   │   └── index.js
│   │   ├── ClipCutSplash.jsx          # Splash screen with scissors animation ✅
│   │   ├── DesktopLogin.jsx           # Login page with split layout ✅
│   │   ├── DesktopRegister.jsx        # Registration page with split layout ✅
│   │   ├── ResetPassword.jsx          # Password reset with secure token handling ✅
│   │   ├── VerifyEmail.jsx            # Email verification with auto-redirect ✅
│   │   ├── MobileAuth.jsx             # Mobile auth (not yet integrated into routing) ⚠️
│   │   ├── OnboardingStep1.jsx        # Onboarding step 1 ✅
│   │   ├── OnboardingStep2.jsx        # Onboarding step 2 ✅
│   │   ├── OnboardingStep3.jsx        # Onboarding step 3 ✅
│   │   ├── Dashboard.jsx              # Main project dashboard ✅
│   │   ├── Settings.jsx               # User settings + GDPR compliance ✅
│   │   ├── CookieConsent.jsx          # Cookie consent banner ✅
│   │   ├── Footer.jsx                 # Footer component ✅
│   │   ├── OptimizedImage.jsx         # Image optimization wrapper ✅
│   │   ├── ErrorBoundary.jsx          # React error boundary ✅
│   │   └── index.js
│   ├── hooks/
│   │   ├── useFFmpeg.js               # FFmpeg WASM loading + video processing
│   │   ├── usePerformance.js          # Component render + memory tracking
│   │   ├── useSessionTimeout.js       # 15-min idle timeout + warning banner
│   │   └── index.js
│   ├── services/
│   │   ├── projectService.js          # Cloud save/load, media upload, sanitization
│   │   ├── authService.js             # Supabase auth wrapper
│   │   ├── ffmpeg.js                  # FFmpeg command builder
│   │   ├── videoOperations.js         # Trim, split, merge
│   │   ├── audioOperations.js         # Volume control, mixing
│   │   ├── effects.js                 # Transition effects, filters
│   │   ├── gdprService.js             # Export/delete user data (GDPR)
│   │   └── index.js
│   ├── supabase/
│   │   ├── supabaseClient.js          # Supabase client init + isSupabaseConfigured()
│   │   ├── authService.js             # signUp, signIn, signOut, Google OAuth, resetPassword, updatePassword, uploadAvatar
│   │   ├── AuthContext.jsx            # React context for auth state + session timeout
│   │   ├── ProtectedRoute.jsx         # ProtectedRoute + PublicRoute guards
│   │   └── index.js
│   ├── utils/
│   │   ├── validation.js              # validateEmail/Username/Password, sanitizeTextInput/FileName/SearchQuery/UrlParam
│   │   ├── analytics.js               # GA4 init, trackEvent, trackPageView, Core Web Vitals (LCP/FID/CLS/TTFB/INP)
│   │   ├── errorTracking.js           # Sentry init, captureError, addBreadcrumb
│   │   ├── performance.js             # performanceMonitor, trackAPIRequest, trackFileUpload
│   │   ├── fileUpload.js              # uploadFile, compressImage, file type validation
│   │   ├── rateLimiter.js             # createRateLimiter (e.g. 3 attempts/10 min)
│   │   ├── errorAlerts.js             # User-friendly error display
│   │   ├── logger.js                  # Dev/prod conditional logging
│   │   ├── serviceWorker.js           # PWA service worker registration
│   │   ├── thumbnailCache.js          # Video thumbnail caching
│   │   └── index.js
│   ├── constants/
│   │   ├── app.js                     # Splash duration, mobile breakpoint (768px)
│   │   ├── editor.js                  # Timeline zoom levels, clip defaults, undo history limit, auto-save interval, export resolution presets
│   │   ├── theme.js                   # Design system (colours #75AADB, fonts, breakpoints, spacing, shadows)
│   │   └── index.js
│   ├── App.jsx                        # Routing with lazy loading, auth guards, mobile detection, session timeout banner, error boundary
│   └── main.jsx                       # React entry point
├── supabase/
│   ├── migrations/
│   │   ├── 001_profiles.sql           # User profile table (username, avatar_url)
│   │   ├── 002_projects.sql           # Projects table (user_id, name, project_data JSONB, duration, resolution)
│   │   ├── 003_templates.sql          # Community templates table
│   │   ├── 004_template_ratings.sql   # Template ratings (1–5 stars, unique per user/template)
│   │   ├── 005_storage_buckets.sql    # Storage buckets (avatars, projects, media, templates)
│   │   └── 006_login_attempts.sql     # Login attempt tracking for security
│   └── seed.sql                       # Sample data for development
├── public/                            # Static assets
├── index.html
├── vite.config.js
└── package.json
```

## Project Architecture (Planned — Electron + Flutter)

```
clipcut/
├── desktop/                  # Electron wrapper (future)
│   ├── main.js              # Electron main process
│   └── preload.js           # Bridge to Node.js/FFmpeg
├── web/                     # React app (current — clipcut-main)
└── mobile/                  # Flutter app (future)
    ├── lib/
    │   ├── screens/
    │   ├── widgets/
    │   ├── services/
    │   └── main.dart
    └── pubspec.yaml
```

## Database Schema (Implemented — Supabase/PostgreSQL)

```sql
-- Users (handled by Supabase Auth, extended with profiles)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  thumbnail_url TEXT,
  project_data JSONB, -- timeline, clips, effects serialized
  duration_seconds INTEGER,
  resolution TEXT DEFAULT '1080p',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Templates
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  category TEXT, -- 'trending', 'cinematic', 'business', etc.
  thumbnail_url TEXT,
  template_data JSONB,
  downloads INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ratings
CREATE TABLE template_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES templates(id),
  user_id UUID REFERENCES profiles(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(template_id, user_id)
);

-- Login attempts (security)
CREATE TABLE login_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT,
  ip_address TEXT,
  attempted_at TIMESTAMPTZ DEFAULT NOW(),
  success BOOLEAN
);
```

## Key FFmpeg Commands (Reference)

```bash
# Cut/trim a clip
ffmpeg -i input.mp4 -ss 00:00:05 -t 00:00:10 -c copy output.mp4

# Merge clips (concat)
ffmpeg -f concat -safe 0 -i filelist.txt -c copy merged.mp4

# Add text overlay
ffmpeg -i input.mp4 -vf "drawtext=text='Hello':fontsize=48:fontcolor=white:x=100:y=100" output.mp4

# Add transition (crossfade)
ffmpeg -i clip1.mp4 -i clip2.mp4 -filter_complex "xfade=transition=fade:duration=1:offset=4" output.mp4

# Add background music
ffmpeg -i video.mp4 -i music.mp3 -filter_complex "[1:a]volume=0.3[a1];[0:a][a1]amix=inputs=2" output.mp4

# Export at specific resolution
ffmpeg -i input.mp4 -vf scale=1920:1080 -c:v libx264 -crf 23 output_1080p.mp4
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libx264 -crf 23 output_720p.mp4
```

## FYP Proposal Summary
- **Title:** Design and Implementation of ClipCut: A Free, Open-Source, Cross-Platform Video Editor for Content Creators
- **Problem:** CapCut went paid, Adobe is expensive, Linux has no good video editors
- **Solution:** Free, open-source editor on desktop (Linux/Windows), web, and mobile
- **Methodology:** Iterative SDLC
- **Timeline:** 14 weeks (6 phases)
- **Submitted via:** UB Department of Computer Science Microsoft Forms

## Student's Technical Background
- Strong with React, Flutter/Dart, Supabase, JavaScript
- Uses Cursor IDE + Claude AI for development
- Previous projects: Jobsy (Flutter gig app), TireloMate (service marketplace), Plumfolio (finance app), MyUB (student companion), Futurify Designs (web dev business)
- Runs on Linux (primary OS)

## Important Notes
- NO macOS — student doesn't have a Mac
- All tools must be FREE (student budget is P0)
- Botswana flag colours ONLY (blue #75AADB, black, white) — no purple
- The app itself is free forever — no freemium, no subscriptions
- Open source on GitHub
- This is the #1 FYP option; #2 is UB Hustle (campus marketplace), #3 is UB Finance System

## What To Do Next
When continuing development, the priority order is:
1. ✅ Set up the project repo and folder structure
2. ✅ Build React web app foundation with routing
3. ✅ Implement splash screen, auth, onboarding, and dashboard UI
4. ✅ Integrate Supabase authentication (signup, login, Google OAuth, password reset, email verification)
5. ✅ Build video editor UI (timeline, player, inspector, media panel, export modal)
6. ✅ Add error tracking (Sentry), analytics (GA4), performance monitoring, PWA support
7. **Next:** Connect FFmpeg WASM hook to VideoEditor for actual video processing
8. **Next:** Complete input sanitization integration across all components (see INPUT_SANITIZATION_TASKS.md)
9. **Next:** Build template browser page (full page)
10. **Next:** Implement real video export pipeline (FFmpeg → file download)
11. **Next:** Wrap in Electron for desktop
12. **Next:** Build Flutter mobile app
13. **Next:** Testing and documentation

## All React Component Files

| File | Description | Status |
|------|-------------|--------|
| `ClipCutSplash.jsx` | Desktop splash screen with scissors animation | ✅ |
| `DesktopLogin.jsx` | Desktop login page with split layout | ✅ |
| `DesktopRegister.jsx` | Desktop registration page with split layout | ✅ |
| `ResetPassword.jsx` | Password reset with secure token + rate limiting | ✅ |
| `VerifyEmail.jsx` | Email verification with auto-redirect + resend | ✅ |
| `OnboardingStep1.jsx` | First onboarding step | ✅ |
| `OnboardingStep2.jsx` | Second onboarding step | ✅ |
| `OnboardingStep3.jsx` | Third onboarding step | ✅ |
| `Dashboard.jsx` | Main project dashboard | ✅ |
| `Settings.jsx` | User settings + GDPR data export/delete | ✅ |
| `CookieConsent.jsx` | Cookie consent banner | ✅ |
| `Footer.jsx` | Footer component | ✅ |
| `OptimizedImage.jsx` | Image optimization wrapper | ✅ |
| `ErrorBoundary.jsx` | React error boundary | ✅ |
| `VideoEditor/VideoEditor.jsx` | Main editor with undo/redo + auto-save | ✅ |
| `VideoEditor/TopBar.jsx` | Top bar with project name, export, tabs | ✅ |
| `VideoEditor/Toolbar.jsx` | Tool buttons (split, text, audio, filters, effects) | ✅ |
| `VideoEditor/Timeline.jsx` | Multi-track timeline | ✅ |
| `VideoEditor/Player.jsx` | Video preview player | ✅ |
| `VideoEditor/MediaPanel.jsx` | Left sidebar media library | ✅ |
| `VideoEditor/InspectorPanel.jsx` | Right sidebar properties inspector | ✅ |
| `VideoEditor/ExportModal.jsx` | Export settings dialog | ✅ |
| `MobileAuth.jsx` | Mobile auth in phone frame (not yet in routing) | ⚠️ |
| `DesktopAuth.jsx` | Legacy auth component (deprecated, not used) | ⚠️ |
| `App.jsx` | Main app with routing, auth guards, lazy loading | ✅ |
| `main.jsx` | React app entry point | ✅ |

## Current Implementation Status
- ✅ Project structure set up with Vite + React
- ✅ React Router configured with lazy-loaded routes, protected/public guards
- ✅ Error boundary and mobile detection (shows "coming soon" on mobile)
- ✅ Session timeout warning (15-min idle + extend/logout banner)
- ✅ Splash screen component with animation
- ✅ Authentication flow: signup, login, Google OAuth, password reset, email verification
- ✅ Onboarding flow (3 steps)
- ✅ Dashboard component
- ✅ Video editor UI (complete: timeline, player, inspector, media panel, export modal, undo/redo, auto-save)
- ✅ User settings with GDPR compliance (export data, delete account)
- ✅ Input validation and sanitization utilities (validation.js — comprehensive)
- ✅ Error tracking (Sentry) and analytics (GA4 + Core Web Vitals)
- ✅ Performance monitoring hooks and utilities
- ✅ Rate limiting utility (used in ResetPassword, VerifyEmail)
- ✅ Supabase schema (6 migrations: profiles, projects, templates, ratings, storage, login attempts)
- ✅ File upload security (MIME validation, 500MB max, path traversal protection)
- ✅ PWA support (service worker, offline capability)
- ⚠️ Input sanitization not yet connected to all form components (task list in INPUT_SANITIZATION_TASKS.md)
- ⚠️ FFmpeg WASM hook exists but not wired to editor UI (no real video processing yet)
- ⚠️ Mobile routing detected but MobileAuth not integrated into App.jsx routes
- ❌ Real video rendering/export pipeline (FFmpeg → file download)
- ❌ Template library browser page
- ❌ Electron desktop wrapper
- ❌ Flutter mobile app
