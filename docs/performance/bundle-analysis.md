# Bundle Analysis Report

Generated with:

```bash
npm run analyze
```

The build outputs a bundle visualization report at `dist/stats.html`.

## Top JavaScript Chunks (uncompressed)

- `dist/assets/Czouravf.js` — **177.36 kB** (58.02 kB gzip)
- `dist/assets/DZxFKcQQ.js` — **170.74 kB** (45.43 kB gzip)
- `dist/assets/ABR1JzZk.js` — **53.64 kB** (16.45 kB gzip)

## Observations

1. Two largest chunks (`~170-177 kB`) dominate shipped JS and should be the first optimization target.
2. Existing manual chunking already separates vendor groups (`react`, `router`, `supabase`, `ffmpeg`) in `vite.config.js`.
3. Compression is active for both gzip and Brotli and yields substantial transfer-size savings.

## Optimization Opportunities

1. **Lazy-load heavy editor subfeatures**
   - Move optional video effect panels/modals into route- or interaction-level dynamic imports.
2. **Reduce FFmpeg bootstrap footprint**
   - Keep FFmpeg-related UI and helpers isolated from initial route bundles where possible.
3. **Review router-level split granularity**
   - The dashboard/editor route split can be made finer for infrequently used editor tools.
4. **Use the generated `dist/stats.html` treemap in PR review**
   - Compare branch changes against this baseline and flag chunk deltas >10%.
