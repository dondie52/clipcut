# ClipCut — AI-Assisted Editing Guide

> **For team members who want to use AI (ChatGPT, Claude, etc.) to make changes without writing code.**

---

## Table of Contents

1. [How This Works](#1-how-this-works)
2. [Project Context (Give This to the AI First)](#2-project-context)
3. [Which Files to Upload for Each Task](#3-which-files-to-upload)
4. [Ready-Made Prompts](#4-ready-made-prompts)
5. [How to Upload Changed Files to GitHub](#5-how-to-upload-to-github)
6. [How to Test Locally](#6-how-to-test-locally)
7. [Important Rules](#7-important-rules)

---

## 1. How This Works

1. **Download** the file you want to change from GitHub
2. **Upload** it to an AI chat (Claude, ChatGPT)
3. **Tell** the AI what to change using the prompts below
4. **Download** the modified file the AI gives back
5. **Upload** the modified file to GitHub (the site auto-deploys via Vercel)

---

## 2. Project Context

**Copy-paste this entire block into your AI chat FIRST before asking anything:**

```
I'm working on ClipCut, a free open-source video editor.

TECH STACK:
- React 18 + Vite 5 (JavaScript/JSX)
- CSS-in-JS for styling (inline styles and <style> tags in components — NOT Tailwind)
- Theme constants in src/constants/theme.js
- Material Symbols for icons (Google Fonts icon font, not SVGs)
- FFmpeg WASM (@ffmpeg/ffmpeg 0.12.15) for in-browser video processing
- Supabase for backend (PostgreSQL database + auth + storage)
- Sentry for error tracking, GA4 for analytics
- Vite PWA plugin for offline support
- Deployed on Vercel (primary) and GitHub Pages (secondary)

DESIGN SYSTEM — BOTSWANA FLAG COLOURS:
- Primary Blue: #75AADB (buttons, links, active elements, accents)
- Black: #0a0a0a / #0d1117 (backgrounds)
- White: #FFFFFF (text, icons)
- Dark Gray: #1a2332 (cards, panels, secondary backgrounds)
- Faded Blue: rgba(117,170,219,0.7) (secondary text)
- ALL accent colours MUST be Botswana blue (#75AADB). NO purple anywhere.

FONTS:
- Spline Sans (Google Fonts, weights 300–800) — main UI font
- Outfit (Google Fonts) — splash screen only

ICONS:
- Material Symbols font (class: material-symbols-rounded)
- Example: <span className="material-symbols-rounded">play_arrow</span>

STYLING APPROACH:
- All styles are CSS-in-JS (inline style objects or <style> tags inside components)
- Colour values come from src/constants/theme.js — always import and use those constants
- There is NO global CSS framework like Tailwind or Bootstrap
- Shared style utilities are in src/components/VideoEditor/styles.js

IMPORTANT RULES:
- Never remove security features (rate limiting, input sanitisation, RLS policies, CSP headers)
- Never expose Supabase keys outside .env files
- Keep all accessibility features (ARIA labels, keyboard navigation)
- Use Botswana blue (#75AADB) for ALL accents — never purple, never other blues
- Always give me the COMPLETE file back, not just the changed section
- Import colours/spacing from src/constants/theme.js, not hardcoded hex values

SCOPE-LOCK (CRITICAL — READ THIS CAREFULLY):
- ONLY modify the specific section, component, function, or data I ask you to change
- Do NOT refactor, rename, reformat, reorder, or "improve" any code outside the requested change
- Do NOT change import statements unless the task requires a new dependency
- Do NOT rename variables, functions, or CSS classes that already work
- Do NOT re-order array items, object keys, or JSX elements unless I explicitly ask
- Do NOT "clean up" or "optimise" unrelated code — even if you think it's better
- Do NOT change whitespace, indentation style, or formatting in lines you didn't need to touch
- If you are unsure whether something is in scope, leave it exactly as-is
- Before returning the file, mentally diff your output against the original — the ONLY differences should be the change I requested
```

---

## 3. Which Files to Upload

### Video Editor

| What you want to do | Upload this file from GitHub |
|---------------------|----------------------------|
| Edit the main editor layout / state management | `src/components/VideoEditor/VideoEditor.jsx` |
| Edit the top bar (save, export, undo/redo buttons) | `src/components/VideoEditor/TopBar.jsx` |
| Edit the left toolbar (tool buttons) | `src/components/VideoEditor/Toolbar.jsx` |
| Edit the media upload / library panel | `src/components/VideoEditor/MediaPanel.jsx` |
| Edit the video preview player | `src/components/VideoEditor/Player.jsx` |
| Edit the timeline (clips, tracks, drag-and-drop) | `src/components/VideoEditor/Timeline.jsx` |
| Edit the right-side properties panel | `src/components/VideoEditor/InspectorPanel.jsx` |
| Edit inspector sub-components (sliders, colour pickers) | `src/components/VideoEditor/InspectorComponents.jsx` |
| Edit export settings dialog | `src/components/VideoEditor/ExportModal.jsx` |
| Edit editor shared styles | `src/components/VideoEditor/styles.js` |
| Edit editor constants (shortcuts, filter presets, etc.) | `src/components/VideoEditor/constants.js` |
| Edit timeline math (zoom, snap, coordinates) | `src/components/VideoEditor/timelineEngine.js` |

### Authentication & Onboarding

| What you want to do | Upload this file from GitHub |
|---------------------|----------------------------|
| Edit login form | `src/components/DesktopLogin.jsx` |
| Edit registration form | `src/components/DesktopRegister.jsx` |
| Edit password reset page | `src/components/ResetPassword.jsx` |
| Edit email verification page | `src/components/VerifyEmail.jsx` |
| Edit onboarding step 1 (profile setup) | `src/components/OnboardingStep1.jsx` |
| Edit onboarding step 2 (skill level / use case) | `src/components/OnboardingStep2.jsx` |
| Edit onboarding step 3 (preferences) | `src/components/OnboardingStep3.jsx` |
| Edit auth logic (signup, signin, OAuth, 2FA) | `src/supabase/authService.js` |
| Edit auth state management | `src/supabase/AuthContext.jsx` |
| Edit route guards (protected/public routes) | `src/supabase/ProtectedRoute.jsx` |

### Main Pages & UI

| What you want to do | Upload this file from GitHub |
|---------------------|----------------------------|
| Edit the dashboard (project list, sidebar) | `src/components/Dashboard.jsx` |
| Edit settings page (GDPR, preferences) | `src/components/Settings.jsx` |
| Edit splash screen animation | `src/components/ClipCutSplash.jsx` |
| Edit cookie consent banner | `src/components/CookieConsent.jsx` |
| Edit error boundary (crash recovery UI) | `src/components/ErrorBoundary.jsx` |
| Edit footer | `src/components/Footer.jsx` |
| Edit the password strength indicator | `src/components/shared/PasswordStrengthBar.jsx` |
| Edit the Botswana stripe decoration | `src/components/shared/BotswanaStripe.jsx` |
| Edit feedback form | `src/components/FeedbackForm.jsx` |
| Edit bug report form | `src/components/BugReport.jsx` |

### Long-to-Shorts (AI Vertical Crop)

| What you want to do | Upload this file from GitHub |
|---------------------|----------------------------|
| Edit the main Long-to-Shorts workflow | `src/components/LongToShorts/LongToShorts.jsx` |
| Edit the video upload step | `src/components/LongToShorts/UploadStep.jsx` |
| Edit the analysis step | `src/components/LongToShorts/AnalysisStep.jsx` |
| Edit the review step | `src/components/LongToShorts/ReviewStep.jsx` |
| Edit the processing step | `src/components/LongToShorts/ProcessingStep.jsx` |
| Edit the done/download step | `src/components/LongToShorts/DoneStep.jsx` |

### Services (Backend Logic)

| What you want to do | Upload this file from GitHub |
|---------------------|----------------------------|
| Edit FFmpeg WASM initialisation / core operations | `src/services/ffmpeg.js` |
| Edit video operations (trim, merge, scale, export) | `src/services/videoOperations.js` |
| Edit audio operations (mix, volume) | `src/services/audioOperations.js` |
| Edit video effects/filters | `src/services/effects.js` |
| Edit project save/load (Supabase storage) | `src/services/projectService.js` |
| Edit face detection | `src/services/faceDetection.js` |
| Edit caption/subtitle service | `src/services/captionService.js` |
| Edit transcript service | `src/services/transcriptService.js` |
| Edit GDPR data export/deletion | `src/services/gdprService.js` |
| Edit Gemini AI integration | `src/services/geminiService.js` |

### Hooks

| What you want to do | Upload this file from GitHub |
|---------------------|----------------------------|
| Edit FFmpeg hook (load, trim, concat, etc.) | `src/hooks/useFFmpeg.js` |
| Edit performance monitoring hook | `src/hooks/usePerformance.js` |
| Edit session timeout hook | `src/hooks/useSessionTimeout.js` |

### Utilities

| What you want to do | Upload this file from GitHub |
|---------------------|----------------------------|
| Edit input validation / sanitisation | `src/utils/validation.js` |
| Edit rate limiting logic | `src/utils/rateLimiter.js` |
| Edit file upload validation (MIME types, sizes) | `src/utils/fileValidation.js` |
| Edit file upload to Supabase storage | `src/utils/fileUpload.js` |
| Edit error tracking (Sentry) | `src/utils/errorTracking.js` |
| Edit user-friendly error messages | `src/utils/errorHandling.js` |
| Edit analytics (GA4) | `src/utils/analytics.js` |
| Edit performance monitoring | `src/utils/performance.js` |
| Edit thumbnail caching | `src/utils/thumbnailCache.js` |
| Edit logging | `src/utils/logger.js` |

### Theme, Constants & Configuration

| What you want to do | Upload this file from GitHub |
|---------------------|----------------------------|
| Change colours, fonts, spacing, shadows | `src/constants/theme.js` |
| Change app-level constants (auto-save interval, etc.) | `src/constants/app.js` |
| Change editor constants (undo limit, zoom, speeds) | `src/constants/editor.js` |
| Change page routes / add new pages | `src/App.jsx` |
| Change Vite build configuration | `vite.config.js` |
| Change Vercel deployment settings | `vercel.json` |
| Change HTML meta tags / fonts / favicon | `index.html` |

### Database (Supabase SQL)

| What you want to do | Upload this migration file |
|---------------------|----------------------------|
| Edit user profiles table | `supabase/migrations/001_profiles.sql` |
| Edit projects table | `supabase/migrations/002_projects.sql` |
| Edit templates table | `supabase/migrations/003_templates.sql` |
| Edit template ratings table | `supabase/migrations/004_template_ratings.sql` |
| Edit storage bucket policies | `supabase/migrations/005_storage_buckets.sql` |
| Edit login attempts / lockout logic | `supabase/migrations/006_login_attempts.sql` |
| Edit performance indexes / fixes | `supabase/migrations/007_performance_and_fixes.sql` |

### How to download a file from GitHub:

1. Go to https://github.com/dondie52/clipcut
2. Navigate to the file path listed above
3. Click the file → click **"Raw"** → right-click → **"Save as"**

---

## 4. Ready-Made Prompts

> **Add this line to the end of EVERY prompt you send to the AI:**
> `"SCOPE-LOCK: Only change what I asked for. Do not refactor, rename, reorder, reformat, or clean up anything else in the file."`

### 4.1 Edit Video Editor UI

**Upload:** The relevant VideoEditor file (see table above)

```
I've uploaded [FILE NAME] from the ClipCut video editor.

I want to [describe your change — e.g., "add a new button to the top bar", "change the timeline track height", "add a new filter preset"].

Rules:
- This is a React + CSS-in-JS project (NOT Tailwind)
- Use Botswana blue #75AADB for accents, #0a0a0a for backgrounds, #FFFFFF for text
- Import colours from src/constants/theme.js when possible
- Icons use Material Symbols: <span className="material-symbols-rounded">icon_name</span>
- Don't change any other components or unrelated code
- Give me the COMPLETE file back

SCOPE-LOCK: Only change what I asked for. Do not refactor, rename, reorder, reformat, or clean up anything else in the file.
```

### 4.2 Change Theme / Colours

**Upload:** `src/constants/theme.js`

```
I've uploaded theme.js from ClipCut. This file defines all the colour and style constants for the app.

I want to [describe your change — e.g., "make the secondary background slightly lighter", "add a new accent colour for warnings"].

Rules:
- Primary blue MUST stay as #75AADB (Botswana flag)
- NO purple anywhere
- Background black: #0a0a0a, text white: #FFFFFF
- Give me the COMPLETE file back

SCOPE-LOCK: Only change what I asked for. Do not refactor, rename, reorder, reformat, or clean up anything else in the file.
```

### 4.3 Edit Login / Registration Forms

**Upload:** `src/components/DesktopLogin.jsx` or `src/components/DesktopRegister.jsx`

```
I've uploaded [DesktopLogin.jsx / DesktopRegister.jsx] from ClipCut.

I want to [describe your change — e.g., "add a 'Remember me' checkbox", "change the error message text", "add a new social login button"].

Rules:
- Keep the rate limiter imports and logic intact (security feature)
- Keep input validation and sanitisation
- Use CSS-in-JS (inline styles), not Tailwind classes
- Botswana blue #75AADB for buttons and links
- Give me the COMPLETE file back

SCOPE-LOCK: Only change what I asked for. Do not refactor, rename, reorder, reformat, or clean up anything else in the file.
```

### 4.4 Edit the Dashboard

**Upload:** `src/components/Dashboard.jsx`

```
I've uploaded Dashboard.jsx from ClipCut. This is the main project management page users see after logging in.

I want to [describe your change — e.g., "add a 'Sort by date' dropdown", "change the sidebar layout", "add a templates section"].

Rules:
- CSS-in-JS styling (NOT Tailwind)
- Botswana blue #75AADB for accents and active states
- Dark background: #0a0a0a, cards: #1a2332
- Material Symbols for icons
- Give me the COMPLETE file back

SCOPE-LOCK: Only change what I asked for. Do not refactor, rename, reorder, reformat, or clean up anything else in the file.
```

### 4.5 Edit Onboarding Steps

**Upload:** `src/components/OnboardingStep1.jsx`, `OnboardingStep2.jsx`, or `OnboardingStep3.jsx`

```
I've uploaded [OnboardingStep1/2/3.jsx] from ClipCut.

Step 1 = Profile setup (avatar, name, bio)
Step 2 = Skill level & use case selection
Step 3 = Preferences (notifications, resolution, theme)

I want to [describe your change — e.g., "add a new skill level option", "change the available purposes", "redesign the progress bar"].

Rules:
- CSS-in-JS styling, Botswana blue #75AADB for accents
- Keep the progress bar and navigation between steps working
- Give me the COMPLETE file back

SCOPE-LOCK: Only change what I asked for. Do not refactor, rename, reorder, reformat, or clean up anything else in the file.
```

### 4.6 Edit Export Settings

**Upload:** `src/components/VideoEditor/ExportModal.jsx`

```
I've uploaded ExportModal.jsx from ClipCut. This is the dialog where users choose export settings (resolution, format, quality).

I want to [describe your change — e.g., "add 4K resolution option", "add a WebM format toggle", "change the quality slider range"].

Rules:
- Current resolutions: 480p, 720p, 1080p
- Current formats: MP4, WebM
- FFmpeg handles the actual export — this is just the UI
- CSS-in-JS styling, Botswana blue #75AADB
- Give me the COMPLETE file back

SCOPE-LOCK: Only change what I asked for. Do not refactor, rename, reorder, reformat, or clean up anything else in the file.
```

### 4.7 Add / Edit Video Effects or Filters

**Upload:** `src/components/VideoEditor/constants.js` + `src/services/effects.js`

```
I've uploaded constants.js and effects.js from ClipCut.

constants.js defines FILTER_PRESETS (visual looks like 90s, Vintage, Cinema, B&W) and EFFECT_PRESETS (Motion Blur, Sharpen, Vignette, etc.).
effects.js applies these filters using FFmpeg filter commands.

I want to [describe your change — e.g., "add a Warm Tone filter preset", "add a Glitch effect", "change the Cinema preset values"].

Rules:
- Filter presets use CSS filter values (brightness, contrast, saturate, hue-rotate, sepia)
- Effect presets map to FFmpeg -vf filter strings
- Give me both COMPLETE files back

SCOPE-LOCK: Only change what I asked for. Do not refactor, rename, reorder, reformat, or clean up anything else in the file.
```

### 4.8 Edit Keyboard Shortcuts

**Upload:** `src/components/VideoEditor/constants.js`

```
I've uploaded constants.js from the ClipCut video editor.

The KEYBOARD_SHORTCUTS object defines all editor keyboard shortcuts (Space = play/pause, S = split, Delete = remove clip, etc.).

I want to [describe your change — e.g., "add Ctrl+D to duplicate a clip", "change the split shortcut from S to X"].

Rules:
- Keep existing shortcuts working unless you're explicitly replacing one
- Give me the COMPLETE file back

SCOPE-LOCK: Only change what I asked for. Do not refactor, rename, reorder, reformat, or clean up anything else in the file.
```

### 4.9 Supabase Database Changes

```
I need to make changes to a Supabase PostgreSQL database for ClipCut (video editor app).

I want to [describe what you need]:
- Add a new table
- Add a column to an existing table
- Change RLS policies
- Write a query to [get/update/delete] data

Existing tables: profiles, projects, templates, template_ratings, login_attempts

Give me the SQL to run in the Supabase SQL Editor.

Rules:
- Always enable Row Level Security (RLS) on new tables
- Users should only access their own data (WHERE user_id = auth.uid())
- Only authenticated users can INSERT/UPDATE/DELETE their own rows
- Don't give public/anon access to private data
- Keep existing RLS policies intact

SCOPE-LOCK: Only change what I asked for. Do not refactor, rename, reorder, reformat, or clean up anything else in the file.
```

### 4.10 Edit Validation Rules

**Upload:** `src/utils/validation.js`

```
I've uploaded validation.js from ClipCut. This file contains:
- validateEmail() — email format checking
- validatePassword() — password strength rules
- validateUsername() — username format rules
- sanitizeTextInput() — XSS prevention
- sanitizeUsername() — username sanitisation

I want to [describe your change — e.g., "allow passwords with 6 characters instead of 8", "add phone number validation"].

Rules:
- NEVER remove or weaken sanitisation functions (security!)
- Keep XSS prevention (sanitizeTextInput) intact
- Give me the COMPLETE file back

SCOPE-LOCK: Only change what I asked for. Do not refactor, rename, reorder, reformat, or clean up anything else in the file.
```

### 4.11 Edit the Splash Screen

**Upload:** `src/components/ClipCutSplash.jsx`

```
I've uploaded ClipCutSplash.jsx from ClipCut. This is the animated splash screen shown when the app first loads (scissors animation → screen split → logo → loading bar → fade out).

I want to [describe your change — e.g., "change the animation timing", "update the tagline text", "change the loading bar colour"].

Rules:
- Splash uses the Outfit font (not Spline Sans)
- Background: #0a0a0a, accent: #75AADB
- Navigates to /login after animation completes
- Give me the COMPLETE file back

SCOPE-LOCK: Only change what I asked for. Do not refactor, rename, reorder, reformat, or clean up anything else in the file.
```

### 4.12 Edit Cookie Consent / GDPR Settings

**Upload:** `src/components/CookieConsent.jsx` and/or `src/components/Settings.jsx`

```
I've uploaded [CookieConsent.jsx / Settings.jsx] from ClipCut.

CookieConsent.jsx = the GDPR cookie banner at the bottom of the screen
Settings.jsx = the settings page with data export, account deletion, and preferences

I want to [describe your change — e.g., "change the cookie banner text", "add a data portability option"].

Rules:
- Keep GDPR compliance features (consent recording, data export, deletion)
- CSS-in-JS styling, Botswana blue #75AADB
- Give me the COMPLETE file back

SCOPE-LOCK: Only change what I asked for. Do not refactor, rename, reorder, reformat, or clean up anything else in the file.
```

### 4.13 Add a New Route / Page

**Upload:** `src/App.jsx` + (optionally) the new component file

```
I've uploaded App.jsx from ClipCut. This file defines all routes using React Router with lazy loading.

I want to add a new page:
- Title: [PAGE TITLE]
- URL: /[path]
- Protected (login required): [yes/no]
- Content: [describe what the page should show]

You need to:
1. Add a lazy import at the top of App.jsx
2. Add a <Route> inside the correct route group (protected or public)
3. Create the new component file with the page content

Rules:
- Use React.lazy() and <Suspense> for the import (follow existing pattern)
- Wrap protected routes with <ProtectedRoute>
- Wrap public routes with <PublicRoute>
- CSS-in-JS styling, Botswana blue #75AADB, dark background #0a0a0a
- Material Symbols for icons
- Give me ALL COMPLETE files back

SCOPE-LOCK: Only change what I asked for in App.jsx. Do not refactor, rename, reorder, reformat, or clean up anything else.
```

### 4.14 Edit Long-to-Shorts Pipeline

**Upload:** The relevant LongToShorts file (see table above)

```
I've uploaded [FILE NAME] from the ClipCut Long-to-Shorts feature. This feature converts long horizontal videos into vertical TikTok/Shorts clips using AI.

The workflow is: Upload → Analysis (face detection + AI) → Review → Processing (FFmpeg crop) → Done (download)

I want to [describe your change — e.g., "change the maximum upload size", "add a new aspect ratio option", "edit the review step layout"].

Rules:
- CSS-in-JS styling, Botswana blue #75AADB
- Current max upload: 500MB (warn at 200MB)
- Supported formats: MP4, WebM, MOV, AVI
- Give me the COMPLETE file back

SCOPE-LOCK: Only change what I asked for. Do not refactor, rename, reorder, reformat, or clean up anything else in the file.
```

---

## 5. How to Upload to GitHub

After the AI gives you the modified file:

### Editing an existing file:

1. Go to https://github.com/dondie52/clipcut
2. Navigate to the **exact file path** (e.g., `src/components/Dashboard.jsx`)
3. Click the file → click the **pencil icon** (Edit this file)
4. Press **Ctrl+A** to select all existing content
5. Press **Delete** to remove it
6. **Paste** the AI's complete output
7. Scroll down, type a commit message (e.g., "Updated dashboard layout")
8. Click **"Commit changes"**
9. Wait **2–3 minutes** — Vercel auto-builds and deploys

### Creating a new file:

1. Navigate to the target folder in GitHub
2. Click **"Add file"** → **"Create new file"**
3. Type the filename in the path box (e.g., `src/components/NewPage.jsx`)
4. Paste content → Commit

### Uploading images or assets:

1. Navigate to `public/images/`
2. Click **"Add file"** → **"Upload files"**
3. Drag your image → Commit

### Verify it worked:

1. Go to https://github.com/dondie52/clipcut/actions
2. Check that the latest workflow run shows a green checkmark (success)
3. Visit your Vercel deployment URL
4. Hard refresh: **Ctrl+Shift+R**

---

## 6. How to Test Locally (Before Pushing to GitHub)

Want to see your changes before pushing them live? You can run the site on your own computer.

### What you need

**Node.js** (version 18+) — download from https://nodejs.org/ (pick the LTS version).

### Steps

**1. Download the project from GitHub:**

Go to https://github.com/dondie52/clipcut → click green **"Code"** button → **"Download ZIP"** → extract it.

Or with git:
```bash
git clone https://github.com/dondie52/clipcut.git
cd clipcut
```

**2. Set up environment variables:**

Copy `.env.example` to `.env` and fill in your Supabase credentials:
```bash
cp .env.example .env
```

Then edit `.env` with your Supabase URL and anon key (get these from https://app.supabase.com → your project → Settings → API).

**3. Install dependencies** (only needed once):
```bash
npm install
```

**4. Start the local server:**
```bash
npm run dev
```

**5. Open in browser:**

It will show a URL like `http://localhost:5173/` — open that. The site updates live as you edit files.

**6. Make changes, test, then stop:**

Press `Ctrl+C` to stop the server when done.

**7. Check for build errors before pushing:**
```bash
npm run build
```

If it succeeds, your code is safe to push to GitHub.

**8. Run tests (optional but recommended):**
```bash
npm test
```

All 162 unit tests should pass. If any fail after your change, something broke.

---

## 7. Important Rules

### Always:
- Upload the **COMPLETE** file to the AI (not a snippet)
- Ask for the **COMPLETE** file back (not just changes)
- Test the live site after uploading to GitHub
- Keep a backup (GitHub has full history — you can always revert)
- Use the Botswana blue `#75AADB` for all accent colours

### Never:
- Don't remove security features (rate limiting, input sanitisation, XSS prevention)
- Don't paste real API keys or passwords into AI chat
- Don't disable Row Level Security in Supabase
- Don't accept partial file responses (insist on the complete file)
- Don't use purple anywhere — all accents must be Botswana blue
- Don't add Tailwind classes — this project uses CSS-in-JS

### Prevent the AI from breaking unrelated code:

AI models often "helpfully" refactor, rename, or reorder things you didn't ask them to touch — and this silently breaks other parts of the app. To prevent this:

- **One task per prompt.** Don't combine "update the timeline AND fix the login form" in one message. Each change = one prompt.
- **Add the scope-lock line to every prompt:** `"Only change what I asked for. Do not refactor, rename, reorder, or clean up anything else."`
- **Spot-check the output before committing.** Quickly scan the file the AI returns — look for unexpected changes in sections you didn't ask about (renamed functions, reordered arrays, deleted comments, changed imports).
- **Use GitHub's diff view.** After pasting the AI's file into GitHub's editor, click **"Preview changes"** before committing. Scroll through the red/green diff. If you see changes in areas you didn't request, **don't commit** — go back and tell the AI to redo it without those changes.
- **If in doubt, test locally first.** Run `npm run dev` and `npm run build` (see Section 6) before pushing to GitHub.

### If something breaks:
1. Go to GitHub → navigate to the file → click **"History"**
2. Find the last working commit
3. Click it → click **"Raw"** → copy the old content
4. Edit the file → paste the old content → commit
5. The site will redeploy automatically in 2–3 minutes

### Quick reference — file structure:
```
clipcut/
├── src/
│   ├── components/
│   │   ├── VideoEditor/       # 14 files: editor, timeline, player, inspector, export
│   │   ├── LongToShorts/      # 6 files: AI vertical crop pipeline
│   │   ├── shared/            # Reusable UI (PasswordStrengthBar, BotswanaStripe)
│   │   ├── Dashboard.jsx      # Project management page
│   │   ├── Settings.jsx       # GDPR & preferences
│   │   ├── DesktopLogin.jsx   # Login form
│   │   ├── DesktopRegister.jsx # Registration form
│   │   ├── ClipCutSplash.jsx  # Splash screen
│   │   └── ...                # Other UI components
│   ├── hooks/                 # useFFmpeg, usePerformance, useSessionTimeout
│   ├── services/              # FFmpeg, video/audio ops, project storage, AI services
│   ├── supabase/              # Auth, database client, route guards
│   ├── utils/                 # Validation, analytics, error tracking, rate limiting
│   ├── constants/             # theme.js, app.js, editor.js
│   ├── App.jsx                # All routes (React Router + lazy loading)
│   └── main.jsx               # Entry point
├── supabase/migrations/       # 7 SQL migration files
├── public/                    # Icons, images, fonts, ML models
├── vite.config.js             # Build config
├── vercel.json                # Deployment config
└── package.json               # Dependencies & scripts
```
