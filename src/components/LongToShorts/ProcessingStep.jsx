import { useEffect, useRef, useState } from 'react';
import { cropToVertical } from '../../services/videoOperations';
import { loadFFmpeg, terminateFFmpeg } from '../../services/ffmpeg';
import { detectFaceKeyframes, buildCropFilter } from '../../services/faceDetection';
import { buildCaptionFilterFromWords, loadCaptionFont, resetCaptionFontState } from '../../services/captionService';

export default function ProcessingStep({ state, dispatch }) {
  const [progress, setProgress] = useState({}); // { [segId]: 0-100 }
  const [currentIdx, setCurrentIdx] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    (async () => {
      // Terminate any existing FFmpeg instance and start fresh.
      // The analysis phase (audio extraction) may have left the WASM
      // runtime in a corrupted state (Aborted / memory access out of bounds).
      await terminateFFmpeg();
      resetCaptionFontState(); // font was in the old FS — must reload
      await loadFFmpeg();

      // Pre-load caption font into FFmpeg's virtual FS if captions are enabled
      if (state.captionsEnabled) {
        try {
          await loadCaptionFont();
        } catch (fontErr) {
          console.warn('[LongToShorts] Caption font load failed, captions will be disabled:', fontErr.message);
        }
      }

      const isLandscape = state.videoWidth > state.videoHeight;

      const results = [];

      for (let i = 0; i < state.segments.length; i++) {
        const seg = state.segments[i];
        setCurrentIdx(i);

        try {
          const duration = seg.endSeconds - seg.startSeconds;

          // Face-aware crop: detect faces in this segment's time range
          let cropFilter = null;
          if (isLandscape) {
            const keyframes = await detectFaceKeyframes(
              state.videoFile, seg.startSeconds, duration
            );
            cropFilter = buildCropFilter(
              keyframes, state.videoWidth, state.videoHeight
            );
          }

          // Captions: build drawtext filter from word timings
          let captionFilter = null;
          if (state.captionsEnabled && seg.words?.length > 0) {
            try {
              captionFilter = buildCaptionFilterFromWords(seg.words, seg.startSeconds);
            } catch (captionErr) {
              console.warn(`[LongToShorts] Caption filter build failed for "${seg.label}", exporting without captions:`, captionErr);
              captionFilter = null;
            }
          }

          // Merge crop + caption filters into one -vf string
          // When captions exist but no face-crop, prepend the default crop/scale
          // so cropToVertical still reframes correctly (vfOverride replaces its default).
          let combinedFilter = cropFilter;
          if (captionFilter) {
            if (combinedFilter) {
              combinedFilter = `${combinedFilter},${captionFilter}`;
            } else {
              // No face-crop — build default crop base so captions don't skip reframing
              const defaultCrop = isLandscape
                ? `crop=ih*(9/16):ih:(iw-ih*(9/16))/2:0,scale=1080:1920`
                : `scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2`;
              combinedFilter = `${defaultCrop},${captionFilter}`;
            }
          }

          const progressCb = (p) => {
            const raw = typeof p === 'object' ? p.progress : (typeof p === 'number' ? p : 0);
            const pct = Math.min(raw, 1);
            setProgress(prev => ({ ...prev, [seg.id]: Math.round(pct * 100) }));
          };

          let blob;
          try {
            console.log(`[LongToShorts] Exporting "${seg.label}" (captions: ${!!captionFilter})`);
            blob = await cropToVertical(
              state.videoFile,
              seg.startSeconds,
              duration,
              progressCb,
              combinedFilter
            );
          } catch (err) {
            // If captions were included and export failed, retry without captions
            // in a fully isolated FFmpeg state (terminate + reload).
            if (captionFilter) {
              console.warn(`[LongToShorts] Export with captions failed for "${seg.label}", terminating FFmpeg for clean retry:`, err.message);
              // Terminate the corrupted WASM instance so the retry gets a fresh one
              await terminateFFmpeg();
              resetCaptionFontState(); // font was in the old FS
              // Re-load a clean FFmpeg instance
              await loadFFmpeg();
              console.log(`[LongToShorts] Retrying "${seg.label}" without captions`);
              blob = await cropToVertical(
                state.videoFile,
                seg.startSeconds,
                duration,
                progressCb,
                cropFilter // null or face-crop only — no caption drawtext
              );
            } else {
              throw err; // no captions were involved, genuine failure
            }
          }

          const url = URL.createObjectURL(blob);
          results.push({ id: seg.id, label: seg.label, hookTitle: seg.hookTitle, score: seg.score, blob, url });
          setProgress(prev => ({ ...prev, [seg.id]: 100 }));
        } catch (err) {
          console.error(`[LongToShorts] Failed to process segment ${seg.label}:`, err);
          dispatch({
            type: 'PROCESSING_ERROR',
            error: `Failed to process "${seg.label}": ${err.message}`,
          });
          return;
        }
      }

      dispatch({ type: 'PROCESSING_DONE', results });
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Overall progress: completed clips + current clip partial progress
  const completedCount = state.segments.filter(s => (progress[s.id] || 0) >= 100).length;
  const currentPct = progress[state.segments[currentIdx]?.id] || 0;
  const overallPct = state.segments.length > 0
    ? Math.round(((completedCount + currentPct / 100) / state.segments.length) * 100)
    : 0;

  return (
    <div className="lts-processing">
      <p className="lts-processing-title">
        Creating your shorts ({currentIdx + 1}/{state.segments.length})
      </p>

      {/* Overall progress bar */}
      <div className="lts-analysis-progress" style={{ marginBottom: 20 }}>
        <div className="lts-analysis-bar" style={{ width: `${overallPct}%` }} />
      </div>

      {state.segments.map((seg, i) => {
        const pct = progress[seg.id] || 0;
        const done = pct >= 100;
        const active = i === currentIdx && !done;

        return (
          <div key={seg.id} className="lts-processing-item">
            {done ? (
              <span className="mi lts-processing-check" style={{ fontSize: 20 }}>check_circle</span>
            ) : active ? (
              <div className="lts-analysis-spinner" style={{ width: 20, height: 20, margin: 0, borderWidth: 2 }} />
            ) : (
              <span className="mi" style={{ fontSize: 20, color: 'rgba(255,255,255,0.2)' }}>radio_button_unchecked</span>
            )}
            <span className="label">{seg.hookTitle || seg.label}</span>
            <div className="lts-processing-bar">
              <div className="lts-processing-bar-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="lts-processing-pct">{pct}%</span>
          </div>
        );
      })}
    </div>
  );
}
