# Dependency Audit

Date: 2026-02-25

## Scope
Audited dependencies declared in `package.json` against references in:
- `src/`
- `scripts/`
- `vite.config.js`

Build-time/script-only packages (`sharp`, `rollup-plugin-visualizer`, `vite-plugin-*`) were treated as valid when referenced in config or scripts.

## Results
No dependencies were removed. Every declared dependency and devDependency is referenced in application code, build config, or scripts.

### Runtime dependencies
- `@ffmpeg/ffmpeg`: used in `src/services/ffmpeg.js`; also excluded in Vite optimizeDeps config.
- `@ffmpeg/util`: used in `src/services/ffmpeg.js`; also excluded in Vite optimizeDeps config.
- `@supabase/supabase-js`: used in `src/supabase/supabaseClient.js`.
- `react`: used broadly across `src/`.
- `react-dom`: used in `src/main.jsx`.
- `react-router-dom`: used in `src/App.jsx`, route guards, and multiple components.

### Dev dependencies
- `vite`: used by npm scripts and `vite.config.js`.
- `@vitejs/plugin-react`: imported in `vite.config.js`.
- `rollup-plugin-visualizer`: imported in `vite.config.js` for analyze builds.
- `vite-plugin-compression`: imported in `vite.config.js`.
- `vite-plugin-pwa`: imported in `vite.config.js`.
- `sharp`: used in `scripts/optimize-images.mjs` and `scripts/generate-icons.mjs`.

## Verification
- Re-scanned all dependency names via ripgrep to confirm references remain and no dangling imports were introduced.
- Ran `npm run build`; it failed due to a pre-existing parse error in `src/services/videoOperations.js` (unrelated to dependency cleanup).
- Ran `npm run check:performance`; it reported missing `dist/assets` because the build did not complete.

## Lockfile
No package removals were necessary, so lockfile regeneration was not required.
