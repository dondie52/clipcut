import { useEffect, useRef, useState } from 'react';
import { cropToVertical } from '../../services/videoOperations';

export default function ProcessingStep({ state, dispatch }) {
  const [progress, setProgress] = useState({}); // { [segId]: 0-100 }
  const [currentIdx, setCurrentIdx] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    (async () => {
      const results = [];

      for (let i = 0; i < state.segments.length; i++) {
        const seg = state.segments[i];
        setCurrentIdx(i);

        try {
          const duration = seg.endSeconds - seg.startSeconds;
          const blob = await cropToVertical(
            state.videoFile,
            seg.startSeconds,
            duration,
            (p) => {
              const pct = typeof p === 'object' ? p.progress : (typeof p === 'number' ? p : 0);
              setProgress(prev => ({ ...prev, [seg.id]: Math.round(pct * 100) }));
            }
          );

          const url = URL.createObjectURL(blob);
          results.push({ id: seg.id, label: seg.label, blob, url });
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

  return (
    <div className="lts-processing">
      <p className="lts-processing-title">
        Creating your shorts ({currentIdx + 1}/{state.segments.length})
      </p>

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
            <span className="label">{seg.label}</span>
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
