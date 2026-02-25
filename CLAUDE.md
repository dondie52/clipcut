# CLAUDE.md — ClipCut Project Context

## Project Overview
**ClipCut** is a free, open-source, cross-platform video editor being developed as a Final Year Project at the **University of Botswana**, Department of Computer Science.

- **Student ID:** 202103579
- **Project Type:** Final Year Project (FYP)
- **Status:** Development in progress — React web app foundation built, routing and core UI components implemented

## What ClipCut Is
A free alternative to CapCut (which went paid) that works on Linux, Windows, Web, and Mobile. It targets content creators in Botswana and Africa who can't afford subscription-based editing tools and/or use Linux where CapCut isn't available.

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Desktop App** | Electron + React (JavaScript/TypeScript) | Linux & Windows only, NO macOS |
| **Web App** | React + Vite (same codebase as desktop) | Currently in development, will be deployed on Vercel |
| **Mobile App** | Flutter (Dart) | Android & iOS |
| **Backend/DB** | Supabase | PostgreSQL, Auth, Realtime, Storage |
| **Video Engine** | FFmpeg | Via fluent-ffmpeg (Node.js) on desktop/web, FFmpeg Kit on mobile |
| **Dev Tools** | Cursor IDE, Claude AI, Git/GitHub | |
| **Build Tool** | Vite 5.0.8 | Fast development server and build tool |
| **Routing** | React Router DOM 7.13.0 | Client-side routing for web app |

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

## Screens Designed So Far

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
- Files: `DesktopLogin.jsx`, `DesktopRegister.jsx` (separate components with navigation)

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

## Screens Still Needed
- [ ] Template browser (full page)
- [ ] Export settings modal
- [ ] Text editor overlay panel
- [ ] Transition picker panel
- [ ] Audio mixer panel
- [ ] Settings/preferences page
- [ ] Mobile dashboard / project selector
- [ ] Video editor timeline interface
- [ ] Media library/import panel

## Project Architecture (Current)

```
clipcut-main/                 # Current web app structure
├── src/
│   ├── components/
│   │   ├── ClipCutSplash.jsx        # Splash screen ✅
│   │   ├── DesktopLogin.jsx         # Login page ✅
│   │   ├── DesktopRegister.jsx      # Registration page ✅
│   │   ├── OnboardingStep1.jsx      # Onboarding step 1 ✅
│   │   ├── OnboardingStep2.jsx      # Onboarding step 2 ✅
│   │   ├── OnboardingStep3.jsx      # Onboarding step 3 ✅
│   │   ├── Dashboard.jsx            # Main dashboard ✅
│   │   ├── DesktopAuth.jsx          # (Legacy auth component)
│   │   └── MobileAuth.jsx           # Mobile auth (not yet integrated)
│   ├── App.jsx                      # Main app with routing ✅
│   └── main.jsx                     # Entry point ✅
├── public/                          # Static assets
├── index.html                       # HTML template
├── vite.config.js                   # Vite configuration
└── package.json                     # Dependencies

## Project Architecture (Planned - Full Structure)

```
clipcut/
├── desktop/                  # Electron wrapper (future)
│   ├── main.js              # Electron main process
│   └── preload.js           # Bridge to Node.js/FFmpeg
├── web/                     # React app (current - clipcut-main)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Timeline/    # Timeline editor component (TODO)
│   │   │   ├── Preview/     # Video preview player (TODO)
│   │   │   ├── MediaPanel/  # Left sidebar media library (TODO)
│   │   │   ├── Inspector/   # Right sidebar properties (TODO)
│   │   │   ├── Toolbar/     # Top toolbar (TODO)
│   │   │   ├── Splash/      # Splash screen ✅
│   │   │   ├── Auth/        # Login/Signup ✅
│   │   │   └── Dashboard/   # Project dashboard ✅
│   │   ├── hooks/           # Custom React hooks (TODO)
│   │   ├── services/
│   │   │   ├── ffmpeg.js    # FFmpeg command builder (TODO)
│   │   │   ├── supabase.js  # Supabase client (TODO)
│   │   │   └── project.js   # Project save/load (TODO)
│   │   ├── store/           # State management (TODO)
│   │   └── App.jsx          # Main app with routing ✅
│   └── package.json
├── mobile/                   # Flutter app (future)
│   ├── lib/
│   │   ├── screens/
│   │   ├── widgets/
│   │   ├── services/
│   │   └── main.dart
│   └── pubspec.yaml
└── supabase/
    ├── migrations/           # Database schema (TODO)
    └── seed.sql
```

## Database Schema (Planned — Supabase/PostgreSQL)

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
4. **Next:** Integrate Supabase authentication (replace TODO placeholders)
5. **Next:** Design and build timeline editor component
6. **Next:** Integrate FFmpeg for video processing
7. **Next:** Add Supabase cloud storage for projects
8. **Next:** Design remaining screens (template browser, export modal, mobile dashboard)
9. **Next:** Wrap in Electron for desktop
10. **Next:** Build Flutter mobile app
11. **Next:** Testing and documentation

## All React Component Files Created
| File | Description | Status |
|------|-------------|--------|
| `ClipCutSplash.jsx` | Desktop splash screen with scissors animation | ✅ Implemented |
| `DesktopLogin.jsx` | Desktop login page with split layout | ✅ Implemented |
| `DesktopRegister.jsx` | Desktop registration page with split layout | ✅ Implemented |
| `OnboardingStep1.jsx` | First onboarding step | ✅ Implemented |
| `OnboardingStep2.jsx` | Second onboarding step | ✅ Implemented |
| `OnboardingStep3.jsx` | Third onboarding step | ✅ Implemented |
| `Dashboard.jsx` | Main project dashboard | ✅ Implemented |
| `DesktopAuth.jsx` | Legacy desktop auth component (may be deprecated) | ⚠️ Exists but not used |
| `MobileAuth.jsx` | Mobile login/signup in phone frame with toggle | ⚠️ Created but not integrated |
| `App.jsx` | Main app component with React Router setup | ✅ Implemented |
| `main.jsx` | React app entry point | ✅ Implemented |

## Current Implementation Status
- ✅ Project structure set up with Vite + React
- ✅ React Router configured with routes for login, register, onboarding, dashboard
- ✅ Splash screen component with animation
- ✅ Desktop authentication UI (login/register pages)
- ✅ Onboarding flow (3 steps)
- ✅ Dashboard component structure
- ⚠️ Authentication logic (currently placeholder - needs Supabase integration)
- ⚠️ Mobile responsive routing (detected but not fully implemented)
- ❌ Video editor timeline (not started)
- ❌ FFmpeg integration (not started)
- ❌ Supabase backend integration (not started)
