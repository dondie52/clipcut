import { useEffect, useRef, useState } from 'react';
import { exportClips, getDownloadUrl, getThumbnailUrl, resolveApiUrl } from '../../services/apiService';

/**
 * ProcessingStep — calls the backend /api/export endpoint.
 * The server handles FFmpeg cutting, cropping, and audio preservation.
 */
export default function ProcessingStep({ state, dispatch }) {
  const [elapsed, setElapsed] = useState(0);
  const startedRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const t0 = Date.now();
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - t0) / 1000));
    }, 1000);

    (async () => {
      try {
        console.log('[Processing] Calling backend export API', {
          jobId: state.jobId,
          segments: state.segments.length,
        });

        // Always export as vertical (9:16) — that's the whole point of Long to Shorts
        const result = await exportClips(state.jobId, state.segments, true);

        // Debug: log raw clips to verify downloadUrl values
        console.log('[Processing] Raw clips from server:', result.clips);

        const results = (result.clips || []).map((clip) => {
          // Backend returns clip.id (not clip.segmentId)
          const clipId = clip.id || clip.segmentId;
          const seg = state.segments.find(s => s.id === clipId) || {};
          const downloadUrl = resolveApiUrl(clip.downloadUrl) || getDownloadUrl(state.jobId, clipId);
          const thumbnailUrl = resolveApiUrl(clip.thumbnailUrl) || getThumbnailUrl(state.jobId, clipId);
          console.log(`[Processing] clip ${clipId}: downloadUrl=${downloadUrl}`);
          return {
            id: clipId,
            label: seg.label || 'Clip',
            hookTitle: seg.hookTitle,
            score: seg.score,
            downloadUrl,
            thumbnailUrl,
          };
        });

        console.log(`[Processing] Backend returned ${results.length} clips`);
        dispatch({ type: 'PROCESSING_DONE', results });
      } catch (err) {
        console.error('[Processing] Backend error:', err.message);
        dispatch({ type: 'PROCESSING_ERROR', error: err.message });
      } finally {
        clearInterval(timerRef.current);
      }
    })();

    return () => clearInterval(timerRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const formatElapsed = (s) => {
    if (s < 60) return `${s}s`;
    return `${Math.floor(s / 60)}m ${s % 60}s`;
  };

  return (
    <div className="lts-processing">
      <p className="lts-processing-title">
        Creating your shorts ({state.segments.length} clip{state.segments.length !== 1 ? 's' : ''})
      </p>

      {/* Indeterminate progress bar */}
      <div className="lts-analysis-progress" style={{ marginBottom: 20 }}>
        <div
          className="lts-analysis-bar"
          style={{
            width: `${Math.min(15 + (elapsed * 3), 90)}%`,
            transition: 'width 1s ease',
          }}
        />
      </div>

      <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
        Server is cutting, cropping to 9:16, and preserving audio ({formatElapsed(elapsed)})
      </p>

      {/* Segment list — static display while server processes */}
      {state.segments.map((seg) => (
        <div key={seg.id} className="lts-processing-item">
          <div className="lts-analysis-spinner" style={{ width: 20, height: 20, margin: 0, borderWidth: 2 }} />
          <span className="label">{seg.hookTitle || seg.label}</span>
        </div>
      ))}
    </div>
  );
}
