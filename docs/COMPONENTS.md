# Component Props Reference

## Video Editor Components

### `VideoEditor`

Main editor component. No props — manages all state internally via hooks and reducers.

**Internal State:**
- `projectId`, `projectName`, `projectResolution` — project metadata
- `mediaItems[]` — imported media files
- `clips[]` — timeline clips (managed via undo/redo reducer)
- `selectedClipId`, `selectedMediaId` — selection state
- `activeToolbar` — current toolbar panel

**Key Behaviours:**
- Undo/redo via `useReducer` with max 50 history entries
- Auto-save every 30 seconds (Supabase if authenticated, localStorage otherwise)
- FFmpeg integration via `useFFmpeg()` hook

---

### `TopBar`

Top navigation bar with project name, export button, and mode tabs.

| Prop | Type | Description |
|------|------|-------------|
| `projectName` | `string` | Current project name |
| `onProjectNameChange` | `(name: string) => void` | Called when project name is edited (sanitized, max 100 chars) |
| `onExport` | `(resolution: string) => void` | Called when export is initiated |
| `isExporting` | `boolean` | Whether export is in progress |
| `exportProgress` | `number` | Export progress 0-100 |
| `currentOperation` | `string \| null` | Current operation label (e.g., "Merging clips...") |
| `hasMediaToExport` | `boolean` | Enables/disables export button |
| `resolutions` | `object` | Resolution presets (`{ '480p', '720p', '1080p' }`) |
| `lastSaved` | `Date \| null` | Last save timestamp |
| `canUndo` | `boolean` | Whether undo is available |
| `canRedo` | `boolean` | Whether redo is available |
| `onUndo` | `() => void` | Undo handler |
| `onRedo` | `() => void` | Redo handler |
| `onCancelExport` | `() => void` | Cancel current export |

---

### `Toolbar`

Tool selection panel (media, audio, text, stickers, effects, transition, filters).

| Prop | Type | Description |
|------|------|-------------|
| `activeToolbar` | `string` | Currently active toolbar ID |
| `onToolbarChange` | `(id: string) => void` | Called when a toolbar item is selected |

---

### `MediaPanel`

Left sidebar for managing imported media files.

| Prop | Type | Description |
|------|------|-------------|
| `mediaTab` | `string` | Active tab: `'video'`, `'audio'`, or `'text'` |
| `onMediaTabChange` | `(tab: string) => void` | Tab change handler |
| `mediaItems` | `Array<MediaItem>` | List of imported media |
| `onImportMedia` | `(files: FileList) => void` | File import handler |
| `onRemoveMedia` | `(id: string) => void` | Remove media item |
| `onAddToTimeline` | `(item: MediaItem) => void` | Add media to timeline |
| `selectedMediaId` | `string \| null` | Currently selected media ID |
| `onSelectMedia` | `(id: string) => void` | Media selection handler |
| `isImporting` | `boolean` | Whether import is in progress |

**MediaItem shape:**
```js
{
  id: string,
  name: string,
  file: File,
  blobUrl: string,
  thumbnail: string,
  duration: number,
  width: number,
  height: number,
  type: 'video' | 'audio' | 'image',
  isProcessing: boolean
}
```

---

### `Player`

Video preview player.

| Prop | Type | Description |
|------|------|-------------|
| `isPlaying` | `boolean` | Playback state |
| `onPlayPause` | `() => void` | Toggle play/pause |
| `videoSrc` | `string \| null` | Video source URL (blob URL or file URL) |
| `currentTime` | `number` | Current playback time in seconds |
| `onTimeUpdate` | `(time: number) => void` | Called on playback time change |
| `onSeek` | `(time: number) => void` | Called when user seeks |
| `onEnded` | `() => void` | Called when video playback ends |
| `onVideoError` | `(blobUrl: string) => void` | Called on video format error (triggers format conversion) |

---

### `InspectorPanel`

Right sidebar properties inspector.

| Prop | Type | Description |
|------|------|-------------|
| `rightTab` | `string` | Active top-level tab |
| `onRightTabChange` | `(tab: string) => void` | Tab change handler |
| `rightSubTab` | `string` | Active sub-tab |
| `onRightSubTabChange` | `(tab: string) => void` | Sub-tab change handler |
| `selectedClip` | `Clip \| null` | Currently selected clip |
| `onClipUpdate` | `(clip: Clip) => void` | Clip property update handler |

---

### `Timeline`

Multi-track timeline with video and audio tracks.

| Prop | Type | Description |
|------|------|-------------|
| `clips` | `Array<Clip>` | All timeline clips |
| `selectedClipId` | `string \| null` | Currently selected clip ID |
| `onSelectClip` | `(id: string) => void` | Clip selection handler |
| `onUpdateClip` | `(clip: Clip) => void` | Clip update handler |
| `onDeleteClip` | `(id: string) => void` | Delete clip |
| `onSplitClip` | `(id: string, time: number) => void` | Split clip at time |
| `onTrimClip` | `(id: string, start: number, duration: number) => void` | Trim clip |
| `currentTime` | `number` | Current playhead position |
| `onSeek` | `(time: number) => void` | Seek to time |
| `totalDuration` | `number` | Total timeline duration |
| `isProcessing` | `boolean` | Whether a processing operation is active |
| `canUndo` | `boolean` | Whether undo is available |
| `canRedo` | `boolean` | Whether redo is available |
| `onUndo` | `() => void` | Undo handler |
| `onRedo` | `() => void` | Redo handler |
| `mediaItems` | `Array<MediaItem>` | Available media for drag-and-drop |
| `onAddToTimeline` | `(item: MediaItem, startTime?: number) => void` | Add media to timeline |

**Clip shape:**
```js
{
  id: string,
  mediaId: string,
  name: string,
  type: 'video' | 'audio' | 'image',
  startTime: number,
  duration: number,
  file: File | Blob,
  blobUrl: string,
  thumbnail: string
}
```

---

### `ExportModal`

Export settings dialog (rendered inside TopBar).

| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | `boolean` | Whether modal is visible |
| `onClose` | `() => void` | Close handler |
| `onExport` | `(resolution: string) => void` | Start export |
| `isExporting` | `boolean` | Whether export is in progress |
| `progress` | `number` | Export progress 0-100 |
| `operationLabel` | `string \| null` | Current operation description |
| `resolutions` | `object` | Available resolution presets |
| `onCancel` | `() => void` | Cancel export |

---

## Auth Components

### `DesktopLogin`

Split-layout login page.

| Prop | Type | Description |
|------|------|-------------|
| `onNavigateToRegister` | `() => void` | Navigate to registration page |

**Features:** Email/password login, Google OAuth, "Forgot password?" link, rate limiter (5 attempts/minute).

---

### `DesktopRegister`

Split-layout registration page.

| Prop | Type | Description |
|------|------|-------------|
| `onNavigateToLogin` | `() => void` | Navigate to login page |

**Features:** Username/email/password registration, 4-segment password strength bar, Google OAuth, rate limiter (3 attempts/2 minutes).

---

### `ResetPassword`

Password reset page. No props.

**Features:** URL token validation (`access_token`, `type` params), rate limiter (3 attempts/10 minutes), password strength display.

---

### `VerifyEmail`

Email verification page. No props.

**Features:** Auto-redirect when verified, resend with rate limiting (3 resends/5 minutes).

---

### `MobileAuth`

Mobile authentication in phone frame. No props.

**Features:** Login/signup toggle, styled for 390x844 viewport with notch and home indicator. Not yet integrated into routing.

---

## Onboarding Components

### `OnboardingStep1`

| Prop | Type | Description |
|------|------|-------------|
| `onContinue` | `() => void` | Continue to next step |
| `onSkip` | `() => void` | Skip onboarding |

### `OnboardingStep2`

| Prop | Type | Description |
|------|------|-------------|
| `onContinue` | `() => void` | Continue to next step |
| `onSkip` | `() => void` | Skip onboarding |

### `OnboardingStep3`

| Prop | Type | Description |
|------|------|-------------|
| `onComplete` | `() => void` | Complete onboarding |
| `onSkip` | `() => void` | Skip onboarding |

---

## Other Components

### `Dashboard`

Project dashboard. No props. Uses `useAuth()` hook for user data.

### `Settings`

User settings with GDPR compliance. No props. Uses `useAuth()` for user data, includes data export and account deletion.

### `ErrorBoundary`

React error boundary. Wraps the entire app.

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Child components |

### `CookieConsent`

Cookie consent banner. No props. Shown on first visit, stores consent in localStorage.

### `ClipCutSplash`

Animated splash screen. No props. Displays for 3 seconds.

---

## Auth Context

### `AuthProvider`

Wraps the app to provide authentication state.

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Child components |

### `useAuth()` Hook

Returns auth state. Must be used within `AuthProvider`.

```js
const {
  user,            // Object | null — Supabase user
  session,         // Object | null — Supabase session
  loading,         // boolean — true while auth is resolving
  signOut,         // () => Promise<void>
  refreshSession,  // () => Promise<void>
  isSessionValid   // boolean — false when session expired
} = useAuth();
```

### `ProtectedRoute`

Redirects to `/login` if not authenticated. Shows loading spinner while auth resolves.

### `PublicRoute`

Redirects to `/dashboard` if already authenticated.
