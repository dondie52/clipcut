# Third-Party Licenses

This document lists all third-party open-source libraries and components used in ClipCut, along with their respective licenses.

## Dependencies

### Production Dependencies

#### @ffmpeg/ffmpeg (^0.12.15)
- **License:** Apache-2.0
- **Repository:** https://github.com/ffmpegwasm/ffmpeg.wasm
- **Purpose:** FFmpeg WebAssembly port for video processing in the browser
- **License Text:** See [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

#### @ffmpeg/util (^0.12.2)
- **License:** Apache-2.0
- **Repository:** https://github.com/ffmpegwasm/ffmpeg.wasm
- **Purpose:** Utility functions for FFmpeg.wasm
- **License Text:** See [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

#### @sentry/react (^10.40.0)
- **License:** MIT
- **Repository:** https://github.com/getsentry/sentry-javascript
- **Purpose:** Error tracking and performance monitoring
- **License Text:** See [MIT License](https://opensource.org/licenses/MIT)

#### @supabase/supabase-js (^2.97.0)
- **License:** MIT
- **Repository:** https://github.com/supabase/supabase-js
- **Purpose:** Supabase client library for backend services
- **License Text:** See [MIT License](https://opensource.org/licenses/MIT)

#### react (^18.2.0)
- **License:** MIT
- **Repository:** https://github.com/facebook/react
- **Purpose:** UI library
- **License Text:** See [MIT License](https://opensource.org/licenses/MIT)

#### react-dom (^18.2.0)
- **License:** MIT
- **Repository:** https://github.com/facebook/react
- **Purpose:** React DOM renderer
- **License Text:** See [MIT License](https://opensource.org/licenses/MIT)

#### react-ga4 (^2.1.0)
- **License:** Apache-2.0
- **Repository:** https://github.com/codler/react-ga4
- **Purpose:** Google Analytics 4 integration for React
- **License Text:** See [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

#### react-router-dom (^7.13.0)
- **License:** MIT
- **Repository:** https://github.com/remix-run/react-router
- **Purpose:** Client-side routing
- **License Text:** See [MIT License](https://opensource.org/licenses/MIT)

### Development Dependencies

#### @vitejs/plugin-react (^4.2.1)
- **License:** MIT
- **Repository:** https://github.com/vitejs/vite-plugin-react
- **Purpose:** Vite plugin for React support
- **License Text:** See [MIT License](https://opensource.org/licenses/MIT)

#### rollup-plugin-visualizer (^7.0.0)
- **License:** MIT
- **Repository:** https://github.com/btd/rollup-plugin-visualizer
- **Purpose:** Bundle size visualization
- **License Text:** See [MIT License](https://opensource.org/licenses/MIT)

#### sharp (^0.34.5)
- **License:** Apache-2.0
- **Repository:** https://github.com/lovell/sharp
- **Purpose:** Image processing and optimization
- **License Text:** See [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

#### vite (^5.0.8)
- **License:** MIT
- **Repository:** https://github.com/vitejs/vite
- **Purpose:** Build tool and development server
- **License Text:** See [MIT License](https://opensource.org/licenses/MIT)

#### vite-plugin-compression (^0.5.1)
- **License:** MIT
- **Repository:** https://github.com/vbenjs/vite-plugin-compression
- **Purpose:** Gzip/Brotli compression for production builds
- **License Text:** See [MIT License](https://opensource.org/licenses/MIT)

#### vite-plugin-pwa (^1.2.0)
- **License:** MIT
- **Repository:** https://github.com/vite-pwa/vite-plugin-pwa
- **Purpose:** Progressive Web App support
- **License Text:** See [MIT License](https://opensource.org/licenses/MIT)

## Fonts

### Spline Sans
- **License:** SIL Open Font License 1.1
- **Source:** Google Fonts
- **Purpose:** Primary UI font
- **License Text:** See [SIL OFL 1.1](https://scripts.sil.org/OFL)

### Outfit
- **License:** SIL Open Font License 1.1
- **Source:** Google Fonts
- **Purpose:** Splash screen font
- **License Text:** See [SIL OFL 1.1](https://scripts.sil.org/OFL)

### Material Symbols Outlined
- **License:** Apache-2.0
- **Source:** Google Fonts
- **Purpose:** Icon font
- **License Text:** See [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

## Services

### Supabase
- **License:** Apache-2.0 (open-source components)
- **Repository:** https://github.com/supabase/supabase
- **Purpose:** Backend infrastructure (database, auth, storage)
- **Note:** Supabase is a hosted service. The open-source components are licensed under Apache-2.0.

### Google Analytics
- **License:** Proprietary
- **Purpose:** Usage analytics
- **Note:** Google Analytics is a proprietary service. We use it with user consent.

### Sentry
- **License:** Proprietary (SaaS)
- **Purpose:** Error tracking and performance monitoring
- **Note:** Sentry is a proprietary SaaS service.

## License Compatibility

All open-source dependencies use licenses compatible with ClipCut's MIT License:

- **MIT License:** Permissive, allows commercial use, modification, and distribution
- **Apache-2.0 License:** Permissive, compatible with MIT
- **SIL Open Font License:** Permissive, compatible with MIT

## Generating License Report

To generate an up-to-date license report, run:

```bash
npm install -g license-checker
license-checker --onlyAllow "MIT;Apache-2.0;SIL-1.1" --summary
```

Or use npm's built-in license checker:

```bash
npm list --depth=0 --json | grep -A 1 "license"
```

## Attribution

ClipCut acknowledges and thanks all the open-source projects and contributors that make this application possible. We are committed to maintaining proper attribution and compliance with all license requirements.

## Updates

This document is updated periodically. Last updated: January 2025

For the most current license information, please refer to the `package.json` file and the `node_modules` directory, or run `npm list` to see all installed packages and their versions.
