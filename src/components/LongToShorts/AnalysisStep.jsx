import { useEffect, useRef, useState } from 'react';
import { extractFrames, analyzeWithGemini, getGeminiErrorMessage } from '../../services/geminiService';

export default function AnalysisStep({ state, dispatch }) {
  const [phase, setPhase] = useState('extracting'); // extracting | sending | retrying
  const [extracted, setExtracted] = useState(0);
  const [totalFrames, setTotalFrames] = useState(0);
  const [retryInfo, setRetryInfo] = useState(null); // { attempt, waitSeconds, countdown }
  const abortRef = useRef(false);
  const startedRef = useRef(false);
  const countdownRef = useRef(null);

  useEffect(() => {
    abortRef.current = false;
    if (startedRef.current) return;
    startedRef.current = true;

    (async () => {
      try {
        // Phase 1: Extract frames
        setPhase('extracting');
        const maxFrames = Math.min(8, Math.max(4, Math.ceil(state.videoDuration / 15)));
        setTotalFrames(maxFrames);

        const frames = await extractFrames(state.videoFile, maxFrames, (done, total) => {
          setExtracted(done);
          setTotalFrames(total);
        });

        if (abortRef.current) return;

        // Phase 2: Send to Gemini (with automatic retry on 429)
        setPhase('sending');
        const segments = await analyzeWithGemini(frames, state.videoDuration, (attempt, waitSeconds) => {
          if (abortRef.current) return;
          setPhase('retrying');
          setRetryInfo({ attempt, waitSeconds, countdown: waitSeconds });

          // Start countdown
          clearInterval(countdownRef.current);
          let remaining = waitSeconds;
          countdownRef.current = setInterval(() => {
            remaining--;
            if (remaining <= 0) {
              clearInterval(countdownRef.current);
              setPhase('sending');
              setRetryInfo(null);
            } else {
              setRetryInfo(prev => prev ? { ...prev, countdown: remaining } : null);
            }
          }, 1000);
        });

        if (abortRef.current) return;

        // Add unique IDs to segments
        const withIds = segments.map((s, i) => ({ ...s, id: `seg-${Date.now()}-${i}` }));
        dispatch({ type: 'ANALYSIS_DONE', segments: withIds });
      } catch (err) {
        if (!abortRef.current) {
          dispatch({ type: 'ANALYSIS_ERROR', error: getGeminiErrorMessage(err) });
        }
      }
    })();

    return () => {
      abortRef.current = true;
      clearInterval(countdownRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const progress = phase === 'extracting' && totalFrames > 0
    ? Math.round((extracted / totalFrames) * 60)  // 0-60%
    : phase === 'retrying' ? 70
    : phase === 'sending' ? 75 : 0;

  return (
    <div className="lts-analysis">
      <div className="lts-analysis-spinner" />
      {phase === 'extracting' ? (
        <>
          <p className="lts-analysis-phase">Extracting frames...</p>
          <p className="lts-analysis-detail">
            {extracted} / {totalFrames || '...'} frames
          </p>
        </>
      ) : phase === 'retrying' && retryInfo ? (
        <>
          <p className="lts-analysis-phase">Rate limited — retrying in {retryInfo.countdown}s</p>
          <p className="lts-analysis-detail">
            Attempt {retryInfo.attempt} of 3 — API is busy, waiting automatically
          </p>
        </>
      ) : (
        <>
          <p className="lts-analysis-phase">Analyzing with AI...</p>
          <p className="lts-analysis-detail">Finding the most engaging moments</p>
        </>
      )}
      <div className="lts-analysis-progress">
        <div className="lts-analysis-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
