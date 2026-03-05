# Service Functions Reference

## FFmpeg Service (`src/services/ffmpeg.js`)

Singleton FFmpeg WASM instance with lazy loading. WASM core loaded from `unpkg.com/@ffmpeg/core@0.12.6`.

### Loading

```js
import { loadFFmpeg, isFFmpegLoaded, preloadFFmpeg } from '../services/ffmpeg';

await preloadFFmpeg();                     // Warm browser cache (no initialization)
const ffmpeg = await loadFFmpeg(onProgress); // Full initialization, onProgress(0-100)
isFFmpegLoaded();                          // boolean
```

### State Subscription

```js
subscribeToLoadingState(listener)  // Returns unsubscribe function
// listener receives: { isLoading: boolean, loadProgress: number, error: string|null }

getLoadingState()  // Returns current state snapshot
```

### File Operations

```js
await writeFile(filename, fileOrBlobOrString)  // Write to virtual FS
const data = await readFile(filename)          // Returns Uint8Array
await deleteFile(filename)                     // Remove from virtual FS
await cleanup(['file1.mp4', 'file2.mp4'])      // Delete multiple files
await clearAllFiles()                          // Clear entire virtual FS
```

### Command Execution

```js
await exec(['-i', 'input.mp4', '-c', 'copy', 'output.mp4'], signal?)
// signal: optional AbortSignal for cancellation

const controller = createAbortController()
cancelCurrentOperation()   // Aborts the current operation
isOperationAborted()       // boolean
```

### Progress

```js
setProgressCallback(({ progress, time }) => { ... })
clearProgressCallback()
```

### Conversion Helpers

```js
const blob = toBlob(uint8Array, mimeType?)         // Default: 'video/mp4'
const url = toObjectURL(uint8Array, mimeType?)      // Returns blob URL
const uint8 = await fetchFile(fileOrBlobOrString)   // File/Blob/URL → Uint8Array
```

### Time Formatting

```js
formatTime(seconds)     // 65.5 → "00:01:05.500"
parseTime(timeString)   // "00:01:05.500" → 65.5
```

### Memory Management

```js
getMemoryUsage()         // Returns bytes used
isMemoryLimitExceeded()  // true if > 500MB
getMemoryLimit()         // 524288000 (500MB)
formatBytes(bytes)       // "1.5 MB"
getVirtualFiles()        // string[]
getVirtualFileCount()    // number
```

---

## Video Operations (`src/services/videoOperations.js`)

### Resolutions

```js
import { RESOLUTIONS } from '../services/videoOperations';
// { '480p': { width: 854, height: 480 }, '720p': { width: 1280, height: 720 }, '1080p': { width: 1920, height: 1080 } }
```

### Functions

```js
trimVideo(inputFile, startTime, duration, onProgress?)
// Returns: Promise<Blob>
// Cuts a segment from startTime for duration seconds

splitVideo(inputFile, splitTime, onProgress?)
// Returns: Promise<{ part1: Blob, part2: Blob }>
// Splits file at splitTime into two parts

mergeClips(clipFiles[], onProgress?)
// Returns: Promise<Blob>
// Merges clips; tries -c copy first, falls back to re-encode on codec mismatch

exportVideo(inputFile, resolution?, onProgress?)
// Returns: Promise<Blob>
// Exports with libx264, CRF23, veryfast preset, AAC 128k, +faststart

getVideoInfo(videoFile)
// Returns: Promise<{ duration: number, width: number, height: number, filename: string }>

generateThumbnail(videoFile, time?)
// Returns: Promise<Blob>
// Browser-based (no FFmpeg needed), max 320px width, JPEG

generateThumbnails(videoFile, count?)
// Returns: Promise<Array<{ time: number, blob: Blob }>>

generatePreviewVideo(inputFile, onProgress?)
// Returns: Promise<Blob>
// 480p, ultrafast, CRF28

getVideoFrameAtTime(videoElement, time, width?)
// Returns: Promise<string> — data URL (JPEG)

preloadVideoFrames(videoFile, frameCount?)
// Returns: Promise<{ frames: Map, duration: number }>

convertFormat(inputFile, format?, onProgress?)
// Returns: Promise<Blob>
// Converts to 'mp4' (libx264) or 'webm' (libvpx)
```

---

## Audio Operations (`src/services/audioOperations.js`)

```js
mixAudio(videoFile, audioFile, volume?, onProgress?)
// Returns: Promise<Blob>
// Mixes audio track with video. volume: 0.0-1.0 (default 0.3)

replaceAudio(videoFile, audioFile, onProgress?)
// Returns: Promise<Blob>
// Replaces video's audio track entirely

adjustVolume(videoFile, volumeLevel?, onProgress?)
// Returns: Promise<Blob>
// volumeLevel: 0.0=mute, 1.0=original, 2.0=double

muteAudio(videoFile, onProgress?)
// Returns: Promise<Blob>
// Strips all audio

extractAudio(videoFile, format?, onProgress?)
// Returns: Promise<Blob>
// Formats: 'mp3' (libmp3lame 192k), 'aac' (192k), 'wav' (pcm_s16le)

normalizeAudio(videoFile, onProgress?)
// Returns: Promise<Blob>
// Loudnorm: I=-16, LRA=11, TP=-1.5

fadeAudio(videoFile, fadeInDuration?, fadeOutDuration?, totalDuration?, onProgress?)
// Returns: Promise<Blob>
// Applies audio fade in/out
```

---

## Effects Service (`src/services/effects.js`)

### Constants

```js
import { TEXT_POSITIONS, TRANSITION_TYPES } from '../services/effects';

TEXT_POSITIONS  // 'top-left', 'top-center', ... 'bottom-right' (9 positions)
TRANSITION_TYPES  // 'fade', 'fadeblack', 'fadewhite', 'dissolve', 'pixelize',
                  // 'wipeleft', 'wiperight', 'wipeup', 'wipedown',
                  // 'slideleft', 'slideright', 'slideup', 'slidedown'
```

### Functions

```js
addTextOverlay(videoFile, text, options?, onProgress?)
// options: { position?, fontSize?, fontColor?, backgroundColor?, startTime?, duration? }
// Returns: Promise<Blob>

addTransition(clip1, clip2, transitionType?, duration?, onProgress?)
// Returns: Promise<Blob>
// Uses xfade + acrossfade FFmpeg filters

applyFilter(videoFile, filter, onProgress?)
// Returns: Promise<Blob>

adjustBrightnessContrast(videoFile, brightness?, contrast?, onProgress?)
// brightness: -1.0 to 1.0, contrast: -1.0 to 1.0
// Returns: Promise<Blob>

adjustSaturation(videoFile, saturation?, onProgress?)
// 0=grayscale, 1=original, 2=double
// Returns: Promise<Blob>

applyBlur(videoFile, radius?, onProgress?)       // boxblur
applySharpen(videoFile, strength?, onProgress?)   // unsharp

changeSpeed(videoFile, speed?, onProgress?)
// speed: 0.25-4.0. Uses setpts for video, atempo chain for audio
// Returns: Promise<Blob>

addFade(videoFile, fadeInDuration?, fadeOutDuration?, totalDuration?, onProgress?)
// Returns: Promise<Blob>

rotateVideo(videoFile, degrees?, onProgress?)
// degrees: 90, 180, 270, -90 (uses transpose filter)
// Returns: Promise<Blob>

flipVideo(videoFile, direction?, onProgress?)
// direction: 'horizontal' (hflip) or 'vertical' (vflip)
// Returns: Promise<Blob>

cropVideo(videoFile, cropArea, onProgress?)
// cropArea: { width, height, x?, y? }
// Returns: Promise<Blob>
```

---

## Project Service (`src/services/projectService.js`)

### Upload Limits

| Type | Max Size | Allowed MIME Types |
|------|----------|--------------------|
| Video | 500 MB | `video/mp4`, `video/webm`, `video/quicktime`, `video/x-msvideo` |
| Audio | 500 MB | `audio/mpeg`, `audio/wav`, `audio/ogg`, `audio/mp4`, `audio/webm` |
| Image | 500 MB | `image/jpeg`, `image/png`, `image/webp`, `image/gif` |

### Functions

```js
saveProject(userId, projectData)
// projectData: { name, id?, clips, duration, resolution, thumbnail? }
// Returns: Promise<Object> — saved project record
// Upserts to Supabase or falls back to localStorage

loadProject(projectId, userId)
// Returns: Promise<Object> — project record
// Verifies ownership. Retries up to 2x with 1s backoff

listProjects(userId, options?)
// options: { limit?: 50, offset?: 0, orderBy?: 'updated_at', ascending?: false }
// Returns: Promise<Array> — project list

deleteProject(projectId, userId)
// Returns: Promise<void>
// Deletes storage files then database record

updateProject(projectId, userId, updates)
// Allowed fields: name, description, resolution, is_public, is_template
// Returns: Promise<Object>

uploadProjectMedia(userId, projectId, file, options?)
// options: { onProgress?, signal?, compressImages?: boolean }
// Returns: Promise<string> — storage path
// Validates MIME, compresses images (1920x1080, q=0.85), retries 2x with 2s backoff

getProjectMediaUrl(storagePath, expiresIn?)
// Returns: Promise<string> — signed URL (default 1 hour)

deleteProjectMedia(storagePath)
// Returns: Promise<void>

migrateLocalProjectsToCloud(userId)
// Returns: Promise<number> — count of projects migrated from localStorage
```

---

## GDPR Service (`src/services/gdprService.js`)

```js
exportUserData(userId)
// Returns: Promise<Object>
// Object: { exportDate, userId, account, profile, projects[], templates[], analytics }

deleteUserData(userId)
// Returns: Promise<void>
// Deletes in order: projects+storage, templates, ratings, profile, localStorage

downloadUserDataExport(userId)
// Returns: Promise<void>
// Triggers JSON file download: clipcut-data-export-{userId}-{timestamp}.json
```

---

## Auth Service (`src/supabase/authService.js`)

### Authentication

```js
signUp({ email, password, username })   // Creates user + profile
signIn({ email, password })             // Checks lockout first, records attempts
signInWithGoogle()                      // Redirects to Google OAuth → /onboarding/1
signOut()                               // Signs out, clears session
resetPassword(email)                    // Sends reset email → /reset-password
updatePassword(newPassword)             // Updates current user's password
```

### Session

```js
getSession()   // Returns: Promise<Object|null>
getUser()      // Returns: Promise<Object|null>
```

### Profile

```js
getProfile(userId)                     // Returns: Promise<Object>
updateProfile(userId, updates)         // Returns: Promise<Object>
uploadAvatar(userId, file)             // Returns: Promise<string> (URL)
// Avatar: max 5MB, image/jpeg|png|webp|gif, validates extension matches MIME

saveOnboardingData(userId, data)
// data: { displayName, bio, skillLevel, purposes, defaultResolution }
// Sanitizes displayName (max 100) and bio (max 500)
```

### Email Verification

```js
resendVerificationEmail(email)    // Returns: Promise<Object>
isEmailVerified(userId)           // Returns: Promise<boolean>
```

### Account Lockout

```js
recordFailedLoginAttempt(email)
// Returns: Promise<{ locked, lockedUntil?, attemptsRemaining, attempts? }>

clearFailedLoginAttempts(email)   // Resets counter
checkAccountLockout(email)        // Returns: Promise<{ locked, lockedUntil?, attemptsRemaining }>
```

### Two-Factor Authentication (TOTP)

```js
enable2FA()                                    // Returns QR code, secret, URI
verify2FA(factorId, code)                      // Verify TOTP code
disable2FA(factorId)                           // Remove 2FA factor
get2FAFactors()                                // List enrolled factors
challenge2FA(factorId)                         // Create challenge
verify2FAChallenge(challengeId, code)          // Verify challenge
```

---

## Hooks

### `useFFmpeg()`

Wraps all FFmpeg operations with progress tracking, error handling, and operation labels.

```js
const {
  isLoading, isReady, progress, loadProgress, error, currentOperation,
  initialize, preload, clearError, resetProgress, cancelOperation, clearMemory,
  getMemoryInfo,
  trimVideo, splitVideo, mergeClips, exportVideo, getVideoInfo,
  generateThumbnail, convertToWebFormat,
  mixAudio, adjustVolume, muteAudio, extractAudio,
  addTextOverlay, addTransition, changeSpeed, addFade,
  rotateVideo, flipVideo, cropVideo, adjustBrightnessContrast,
  resolutions, textPositions, transitionTypes
} = useFFmpeg();
```

### `useSessionTimeout(warningWindowMs?)`

Tracks session expiry and shows warning.

```js
const { showWarning, timeRemainingMs, extendSession, logoutNow } = useSessionTimeout(60000);
```

### `usePerformance(options?)`

Component performance tracking.

```js
const {
  trackOperation, trackAPI, trackUpload, trackInteraction,
  getMetrics, getSummary, performanceMonitor
} = usePerformance({ componentName: 'MyComponent' });
```

---

## Utilities

### Validation (`src/utils/validation.js`)

```js
validateEmail(email)       // { valid, error? }
validateUsername(username)  // { valid, error? }
validatePassword(password) // { valid, error?, strength: 0-4 }
validatePasswordMatch(password, confirmPassword)  // { valid, error? }
validateRegistration({ email, password, confirmPassword, username })  // { valid, errors }
validateLogin({ email, password })  // { valid, errors }
```

### Sanitization (`src/utils/validation.js`)

```js
sanitizeInput(input)              // HTML entity encoding
escapeHtml(text)                  // DOM-based HTML escape
sanitizeErrorMessage(error, fallback?)  // Strips sensitive patterns
sanitizeUsername(username)        // Alphanumeric + underscore only
sanitizeTextInput(input, options?) // options: { maxLength: 100, allowNewlines: false }
sanitizeFileName(fileName)        // Path traversal protection, max 255 chars
sanitizeSearchQuery(query, options?) // options: { maxLength: 200, escapeRegex: false }
sanitizeUrlParam(param, options?) // options: { type: 'string'|'uuid'|'jwt'|'enum', allowedValues?, maxLength: 500 }
```

### Rate Limiter (`src/utils/rateLimiter.js`)

```js
const limiter = createRateLimiter(maxAttempts, windowMs);
limiter.check()  // { allowed: boolean, remaining: number }
limiter.reset()

const persistentLimiter = createPersistentRateLimiter(key, maxAttempts, windowMs);
// Same API, persists to localStorage
```

### File Upload (`src/utils/fileUpload.js`)

```js
uploadFile(file, bucket, path, options?)
// options: { onProgress?, signal?, resumable?: true }
// Chunked upload for files >= 10MB (5MB chunks, 3 retries, exponential backoff)

uploadFiles(files[], options?)  // Parallel upload with per-file callbacks

compressImage(imageFile, options?)
// options: { maxWidth: 1920, maxHeight: 1080, quality: 0.8 }
```
