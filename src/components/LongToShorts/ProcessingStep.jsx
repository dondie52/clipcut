import { useEffect, useRef, useState } from 'react';
import { cropToVertical } from '../../services/videoOperations';
import { loadFFmpeg, terminateFFmpeg } from '../../services/ffmpeg';
import { detectFaceKeyframes, buildCropFilter } from '../../services/faceDetection';
import { buildCaptionFilterFromWords, loadCaptionFont, resetCaptionFontState, isCaptionFontReady } from '../../services/captionService';

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

      // Pre-load caption font into FFmpeg's virtual FS if captions are enabled.
      // Track availability locally — if font fails, disable captions for the
      // entire run instead of failing/retrying every segment.
      let captionsAvailable = false;
      if (state.captionsEnabled) {
        try {
          await loadCaptionFont();
          captionsAvailable = await isCaptionFontReady();
          if (!captionsAvailable) {
            console.warn('[LongToShorts] Caption font written but not readable in FS — disabling captions');
          } else {
            console.log('[LongToShorts] Caption font ready');
          }
        } catch (fontErr) {
          console.warn('[LongToShorts] Caption font load failed, captions disabled for this run:', fontErr.message);
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
          // Pass transcript words so the crop can follow the active speaker.
          let cropFilter = null;
          let keyframes = [];
          if (isLandscape) {
            keyframes = await detectFaceKeyframes(
              state.videoFile, seg.startSeconds, duration, seg.words
            );
            // #region agent log
            fetch('http://127.0.0.1:7249/ingest/d2db4c1e-da8f-4150-a6f6-6b5680af0010',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ProcessingStep.jsx:61',message:'[Crop] targets',data:{keyframesCount:keyframes.length,keyframes:keyframes.slice(0,10).map(k=>({t:k.time,x:Math.round(k.centerX)}))},timestamp:Date.now(),runId:'debug1',hypothesisId:'D'})}).catch(()=>{});
            // #endregion
            cropFilter = buildCropFilter(
              keyframes, state.videoWidth, state.videoHeight
            );
            // #region agent log
            fetch('http://127.0.0.1:7249/ingest/d2db4c1e-da8f-4150-a6f6-6b5680af0010',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ProcessingStep.jsx:64',message:'[Crop] filter built',data:{result:cropFilter?'filter':'null',filterPreview:cropFilter?cropFilter.substring(0,200):null},timestamp:Date.now(),runId:'debug1',hypothesisId:'D'})}).catch(()=>{});
            // #endregion
          }

          // Captions: build drawtext filter from word timings
          // Only attempt if font is confirmed available in the current FFmpeg FS
          let captionFilter = null;
          if (captionsAvailable && seg.words?.length > 0) {
            try {
              captionFilter = buildCaptionFilterFromWords(seg.words, seg.startSeconds);
            } catch (captionErr) {
              console.warn(`[LongToShorts] Caption filter build failed for "${seg.label}", exporting without captions:`, captionErr);
              captionFilter = null;
            }
          }

          // Diagnostic: log full filter pipeline result
          if (isLandscape) {
            console.log(`[LongToShorts] "${seg.label}" face detection result:`);
            console.log(`  keyframes count: ${keyframes.length}`);
            if (keyframes.length > 0) {
              const xs = keyframes.map(k => Math.round(k.centerX));
              console.log(`  keyframe centerX values: [${xs.join(', ')}]`);
              console.log(`  keyframe time range: ${keyframes[0].time.toFixed(1)}s – ${keyframes[keyframes.length - 1].time.toFixed(1)}s`);
            }
            console.log(`  cropFilter: ${cropFilter ? cropFilter.substring(0, 200) : 'null (will use default center crop)'}`);
            console.log(`  cropFilter type: ${cropFilter === null ? 'NULL_FALLBACK' : (cropFilter.includes('if(lt(t') ? 'DYNAMIC' : 'STATIC')}`);
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
            // FFmpeg progress callback sends { progress: 0-100 } or a number 0-100
            const raw = typeof p === 'object' ? p.progress : (typeof p === 'number' ? p : 0);
            const pct = Math.min(Math.max(raw, 0), 100);
            setProgress(prev => ({ ...prev, [seg.id]: Math.round(pct) }));
          };

          let blob;
          try {
            console.log(`[LongToShorts] Export started: "${seg.label}" (captions: ${!!captionFilter}, fontReady: ${captionsAvailable})`);
            console.log(`[LongToShorts] Final vfOverride for FFmpeg: ${combinedFilter ? combinedFilter.substring(0, 300) : 'null (cropToVertical will use built-in default)'}`);
            // #region agent log
            fetch('http://127.0.0.1:7249/ingest/d2db4c1e-da8f-4150-a6f6-6b5680af0010',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ProcessingStep.jsx:118',message:'[LongToShorts] vfOverride',data:{vfOverride:combinedFilter?combinedFilter.substring(0,300):'null',hasCropFilter:!!cropFilter,hasCaptionFilter:!!captionFilter},timestamp:Date.now(),runId:'debug1',hypothesisId:'E'})}).catch(()=>{});
            // #endregion
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
              // Disable captions for remaining segments — font is gone with the old FS
              captionsAvailable = false;
              // Terminate the corrupted WASM instance so the retry gets a fresh one
              await terminateFFmpeg();
              resetCaptionFontState();
              // Re-load a clean FFmpeg instance
              await loadFFmpeg();
              // Try to reload font for subsequent segments
              try {
                await loadCaptionFont();
                captionsAvailable = await isCaptionFontReady();
                console.log(`[LongToShorts] Font reloaded after retry: available=${captionsAvailable}`);
              } catch (reloadErr) {
                console.warn('[LongToShorts] Font reload after retry failed, captions stay disabled:', reloadErr.message);
              }
              console.log(`[LongToShorts] Retrying "${seg.label}" without captions (clean FFmpeg instance)`);
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

          // Validate the exported blob before accepting it
          const MIN_BLOB_SIZE = 1024; // 1 KB minimum for a valid MP4
          if (!blob || blob.size < MIN_BLOB_SIZE) {
            console.error(`[LongToShorts] Export rejected: "${seg.label}" — blob ${blob ? blob.size : 0} bytes (min ${MIN_BLOB_SIZE})`);
            // Skip this clip instead of showing a broken card
            setProgress(prev => ({ ...prev, [seg.id]: 100 }));
            continue;
          }

          const url = URL.createObjectURL(blob);
          console.log(`[LongToShorts] Export accepted: "${seg.label}" — blob=${blob.size} bytes, objectURL=${url}`);
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
