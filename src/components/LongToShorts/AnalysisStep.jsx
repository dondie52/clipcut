import { useEffect, useRef, useState } from 'react';
import { analyzeVideo } from '../../services/apiService';

/**
 * AnalysisStep — calls the backend /api/analyze endpoint.
 * The server handles frame extraction, transcription, and AI scoring.
 */
export default function AnalysisStep({ state, dispatch }) {
  const [phase, setPhase] = useState('analyzing');
  const [elapsed, setElapsed] = useState(0);
  const startedRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    // Elapsed-time counter so the user knows it's still working
    const t0 = Date.now();
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - t0) / 1000));
    }, 1000);

    (async () => {
      try {
        console.log('[Analysis] Calling backend API', {
          jobId: state.jobId,
          clipDuration: state.clipDuration,
        });
        setPhase('analyzing');

        const result = await analyzeVideo(state.jobId, state.clipDuration || 30);

        const segments = (result.segments || []).map((s, i) => ({
          ...s,
          id: s.id || `seg-${Date.now()}-${i}`,
        }));

        console.log(`[Analysis] Backend returned ${segments.length} segments`);
        dispatch({ type: 'ANALYSIS_DONE', segments });
      } catch (err) {
        console.error('[Analysis] Backend error:', err.message);
        dispatch({ type: 'ANALYSIS_ERROR', error: err.message });
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
    <div className="lts-analysis">
      <div className="lts-analysis-spinner" />
      <p className="lts-analysis-phase">Analyzing video...</p>
      <p className="lts-analysis-detail">
        {phase === 'analyzing'
          ? `Server is extracting frames, transcribing, and finding the best moments (${formatElapsed(elapsed)})`
          : 'Processing...'}
      </p>
      <div className="lts-analysis-progress">
        {/* Indeterminate-style: pulse between 20-80% based on elapsed time */}
        <div
          className="lts-analysis-bar"
          style={{
            width: `${Math.min(20 + (elapsed * 2), 90)}%`,
            transition: 'width 1s ease',
          }}
        />
      </div>
    </div>
  );
}
