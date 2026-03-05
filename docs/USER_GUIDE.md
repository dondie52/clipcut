# User Guide

## Getting Started

### Creating an Account

1. Open ClipCut in your browser
2. After the splash screen, you'll see the login page
3. Click **Create Account** to switch to registration
4. Fill in your username, email, and password
   - Password must be at least 8 characters with uppercase, lowercase, number, and special character
   - The 4-segment strength bar shows password strength
5. Alternatively, click **Sign in with Google** for one-click signup
6. Verify your email address via the link sent to your inbox

### Onboarding

After registration, you'll go through a 3-step onboarding:

1. **Welcome** — introduction to ClipCut
2. **Features** — overview of editing capabilities
3. **Preferences** — set your display name, skill level, and default resolution

You can skip onboarding at any step.

### Signing In

1. Enter your email and password
2. Click **Sign In**
3. If you have 2FA enabled, enter your TOTP code

**Account lockout:** After 5 failed login attempts, your account is locked for 30 minutes.

## Dashboard

The dashboard shows:

- **Welcome message** with your name
- **Recent Projects** as thumbnail cards with duration badges
- **New Project** card — click to create a new project
- **Community Templates** — browse trending, cinematic, and business templates
- **Search bar** for finding projects and templates

## Video Editor

### Layout

```
┌──────────────────────────────────────────────┐
│                   Top Bar                     │
│  [Logo] [Project Name] [Edit|Color|Audio]    │
│                              [Undo][Redo]    │
│                              [Export]         │
├──────────┬───────────────────┬───────────────┤
│  Media   │                   │   Inspector   │
│  Panel   │     Preview       │   Panel       │
│          │     Player        │               │
│ [Video]  │                   │  Typography   │
│ [Audio]  │                   │  Effects      │
│ [Text]   │   [◀ ▶ ■ ]       │  Transform    │
├──────────┴───────────────────┴───────────────┤
│                 Timeline                      │
│  [Video 1] ████████████░░░░░░░░░░░░░░░░░░   │
│  [Video 2] ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │
│  [Audio 1] ████████████░░░░░░░░░░░░░░░░░░   │
└──────────────────────────────────────────────┘
```

### Importing Media

1. Click **Import Media** in the Media Panel or press `Ctrl+I`
2. Select video, audio, or image files from your computer
3. Supported formats:
   - **Video:** MP4, WebM, MOV, AVI, MKV, FLV, WMV
   - **Audio:** MP3, WAV, OGG, AAC, M4A, FLAC
   - **Image:** JPG, PNG, GIF, WebP, SVG

Imported files appear in the Media Panel. ClipCut automatically generates thumbnails and extracts video information (duration, resolution).

### Adding Media to Timeline

- **Double-click** a media item in the Media Panel to add it to the timeline
- Clips are placed after the last clip of the same type (video after video, audio after audio)

### Playing Back

- Press **Space** or click the play button to play/pause
- The playhead (blue line) shows the current position
- Use **Left/Right arrows** to skip forward/backward by 5 seconds
- Use **Shift+Left/Right** for 10-second jumps
- Press **,** / **.**  to step one frame backward/forward
- Press **Home** / **End** to jump to the start/end of the timeline

### Editing Clips

**Splitting:**
1. Move the playhead to the desired split point
2. Select a clip on the timeline
3. Press **S** to split the clip at the playhead

**Trimming:**
- Drag the edges of a clip on the timeline to trim the start or end

**Deleting:**
- Select a clip and press **Delete** to remove it

**Deselecting:**
- Press **Escape** to deselect the current clip

### Audio Controls

- Press **M** to mute/unmute
- Press **Up/Down arrows** to adjust volume
- Use the Audio panel in the toolbar for advanced mixing, replacing audio tracks, and normalization

### Video Effects

Available through the toolbar panels and inspector:

| Effect | Description |
|--------|-------------|
| **Transitions** | Fade, dissolve, slide, wipe between clips (12 types) |
| **Text Overlay** | Add text at 9 positions with custom font, size, colour |
| **Speed Change** | 0.25x to 4x playback speed |
| **Brightness/Contrast** | -1.0 to +1.0 adjustment |
| **Saturation** | 0 (grayscale) to 2 (vivid) |
| **Blur/Sharpen** | Adjustable radius/strength |
| **Rotate** | 90, 180, 270 degrees |
| **Flip** | Horizontal or vertical |
| **Crop** | Custom crop area |
| **Fade In/Out** | Video and audio fade effects |

### Exporting

1. Click the **Export** button in the top bar or press `Ctrl+E`
2. Choose your resolution:
   - **480p** (854x480) — smaller file, faster export
   - **720p** (1280x720) — HD quality
   - **1080p** (1920x1080) — Full HD quality
3. Click **Export** to start processing
4. A progress bar shows the export status
5. When complete, the file downloads automatically as MP4

You can cancel an export in progress by clicking the cancel button.

### Saving Projects

- Projects **auto-save every 30 seconds** when you have clips on the timeline
- Press `Ctrl+S` to save manually
- If signed in, projects save to the cloud (Supabase)
- If not signed in, projects save to your browser's local storage

### Undo/Redo

- **Undo:** `Ctrl+Z`
- **Redo:** `Ctrl+Shift+Z` or `Ctrl+Y`
- Up to 50 undo steps are preserved

## Keyboard Shortcuts

### Playback

| Shortcut | Action |
|----------|--------|
| `Space` | Play / Pause |
| `Left Arrow` | Skip backward 5 seconds |
| `Right Arrow` | Skip forward 5 seconds |
| `Shift+Left Arrow` | Skip backward 10 seconds |
| `Shift+Right Arrow` | Skip forward 10 seconds |
| `,` (comma) | Previous frame |
| `.` (period) | Next frame |
| `Home` | Go to start |
| `End` | Go to end |

### Editing

| Shortcut | Action |
|----------|--------|
| `S` | Split clip at playhead |
| `Delete` | Delete selected clip |
| `Escape` | Deselect clip |
| `Ctrl+Z` | Undo |
| `Ctrl+Shift+Z` / `Ctrl+Y` | Redo |

### Audio

| Shortcut | Action |
|----------|--------|
| `M` | Mute / Unmute |
| `Up Arrow` | Volume up |
| `Down Arrow` | Volume down |

### General

| Shortcut | Action |
|----------|--------|
| `Ctrl+S` | Save project |
| `Ctrl+E` | Export video |
| `Ctrl+I` | Import media |
| `F` | Toggle fullscreen |
| `1` – `7` | Switch toolbar panel (Media, Audio, Text, Stickers, Effects, Transition, Filters) |

## Settings

Access settings from the dashboard or editor.

### Profile

- Update your display name, bio, and avatar
- Change your default export resolution

### Security

- Change password
- Enable/disable two-factor authentication (TOTP)

### GDPR / Data Privacy

- **Export Data** — download all your data as a JSON file (account info, projects, templates, analytics)
- **Delete Account** — permanently delete your account and all associated data

## Offline Usage

ClipCut works as a **Progressive Web App (PWA)**:

- Install it from your browser (look for the install prompt or "Add to Home Screen")
- Static assets and fonts are cached for offline use
- Video processing (FFmpeg WASM) works entirely in the browser — no server needed for editing
- Cloud features (save/load, templates) require an internet connection

An **offline banner** appears at the top when you lose connectivity.

## Session Management

- Your session expires after **30 minutes of inactivity**
- A warning banner appears 1 minute before expiry with "Stay signed in" and "Sign out" options
- Active interactions (mouse, keyboard, scroll, touch) reset the timer
