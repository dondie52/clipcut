# License Headers

This document describes the license header format used in ClipCut source files.

## Header Format

All source files should include the following MIT License header:

```javascript
/**
 * Copyright (c) 2025 ClipCut Contributors
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
```

## Short Header Format

For files where the full header is too verbose, use this shorter format:

```javascript
/**
 * ClipCut - Free, Open-Source Video Editor
 * Copyright (c) 2025 ClipCut Contributors
 * Licensed under the MIT License
 */
```

## File-Specific Headers

Some files may include additional module documentation:

```javascript
/**
 * ClipCut - Free, Open-Source Video Editor
 * Copyright (c) 2025 ClipCut Contributors
 * Licensed under the MIT License
 * 
 * @module services/gdprService
 * @description GDPR compliance service for data export and deletion
 */
```

## Implementation Status

License headers have been added to the following key files:

- ✅ `src/main.jsx` - Application entry point
- ✅ `src/App.jsx` - Main application component
- ✅ `src/services/gdprService.js` - GDPR service
- ✅ `src/components/Settings.jsx` - Settings page
- ✅ `src/components/CookieConsent.jsx` - Cookie consent component
- ✅ `src/components/Footer.jsx` - Footer component

## Adding Headers to New Files

When creating new source files, always include the appropriate license header at the top of the file, before any imports or code.

## Automated Header Addition

To add headers to all source files, you can use a tool like `license-checker` or create a custom script. However, manual addition is recommended for better control and to avoid adding headers to third-party code.

## Exclusions

License headers should NOT be added to:
- Configuration files (vite.config.js, package.json, etc.)
- Build output files
- Third-party dependencies
- Generated files
- Test files (optional, but not required)

## Verification

To verify license headers are present, you can use:

```bash
# Search for files without license headers
grep -L "Copyright.*ClipCut" src/**/*.{js,jsx,ts,tsx}
```
