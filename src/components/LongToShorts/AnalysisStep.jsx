import { useEffect, useRef, useState } from 'react';
import { analyzeTranscript, getTranscriptErrorMessage } from '../../services/transcriptService';
import { extractFrames, analyzeWithGemini, getGeminiErrorMessage } from '../../services/geminiService';

/**
 * Phase flow:
 *   extracting_audio → transcribing → building → scoring → done
 *   If NO_SPEECH → fallback_extracting → fallback_sending → done
 *   Rate-limit retries shown as "retrying"
 */

export default function AnalysisStep({ state, dispatch }) {
  const [phase, setPhase] = useState('extracting_audio');
  const [percent, setPercent] = useState(0);
  const [retryInfo, setRetryInfo] = useState(null);
  const abortRef = useRef(false);
  const startedRef = useRef(false);
  const countdownRef = useRef(null);

  useEffect(() => {
    abortRef.current = false;
    if (startedRef.current) return;
    startedRef.current = true;

    const workerUrl = import.meta.env.VITE_AI_WORKER_URL;

    (async () => {
      // ── Primary path: transcript-based analysis ───────────
      let fallbackReason = null;
      try {
        console.log('[Analysis] Transcript pipeline started',
          { duration: state.videoDuration, clipDuration: state.clipDuration, workerUrl });
        setPhase('extracting_audio');
        setPercent(0);

        const segments = await analyzeTranscript(
          state.videoFile,
          state.videoDuration,
          workerUrl,
          state.clipDuration || 30,
          (p, pct) => {
            if (abortRef.current) return;
            setPhase(p);         // extracting | transcribing | building | scoring
            setPercent(pct || 0);
          }
        );

        if (abortRef.current) return;

        console.log(`[Analysis] Transcript pipeline succeeded — ${segments.length} segments`);
        const withIds = segments.map((s, i) => ({ ...s, id: `seg-${Date.now()}-${i}` }));
        dispatch({ type: 'ANALYSIS_DONE', segments: withIds });
        return;
      } catch (err) {
        if (abortRef.current) return;

        if (err.message === 'NO_SPEECH' || err.message === 'NO_CANDIDATES') {
          fallbackReason = err.message;
          console.log(`[Analysis] Fallback triggered: ${err.message}`);
        } else if (err.message === 'TRANSCRIPTION_FAILED') {
          fallbackReason = err.message;
          console.warn('[Analysis] Transcription API failed — falling back to frame analysis');
          console.warn('[Analysis] Detail:', err.detail || 'unknown');
        } else {
          fallbackReason = err.message;
          console.warn('[Analysis] Transcript pipeline failed — falling back to frame analysis');
          console.warn('[Analysis] Error details:', err.message, err.stack);
        }
      }

      // ── Fallback: frame-based analysis (existing logic) ───
      try {
        console.log(`[Analysis] Frame-based fallback started (reason: ${fallbackReason})`);
        setPhase('fallback_extracting');
        setPercent(0);

        // Scale frame count with video duration: ~1 frame per 30s, min 6, max 20
        const scaledFrames = Math.ceil(state.videoDuration / 30);
        const maxFrames = Math.min(20, Math.max(6, scaledFrames));
        console.log(`[Analysis] Extracting ${maxFrames} frames for ${Math.round(state.videoDuration)}s video`);
        const frames = await extractFrames(state.videoFile, maxFrames, (done, total) => {
          if (!abortRef.current) setPercent(Math.round((done / total) * 100));
        });

        if (abortRef.current) return;

        setPhase('fallback_sending');
        setPercent(0);

        const segments = await analyzeWithGemini(frames, state.videoDuration, {
          clipDuration: state.clipDuration || 30,
          onRetry: (attempt, waitSeconds) => {
            if (abortRef.current) return;
            setPhase('retrying');
            setRetryInfo({ attempt, waitSeconds, countdown: waitSeconds });

            clearInterval(countdownRef.current);
            let remaining = waitSeconds;
            countdownRef.current = setInterval(() => {
              remaining--;
              if (remaining <= 0) {
                clearInterval(countdownRef.current);
                setPhase('fallback_sending');
                setRetryInfo(null);
              } else {
                setRetryInfo(prev => prev ? { ...prev, countdown: remaining } : null);
              }
            }, 1000);
          },
        });

        if (abortRef.current) return;

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

  // ── Progress bar mapping ──────────────────────────────────
  let progress = 0;
  switch (phase) {
    case 'extracting_audio': progress = Math.round(percent * 0.15); break;             // 0-15
    case 'extracting':       progress = Math.round(15 + percent * 0.10); break;        // 15-25
    case 'transcribing':     progress = Math.round(25 + percent * 0.40); break;        // 25-65
    case 'building':         progress = 70; break;
    case 'scoring':          progress = Math.round(70 + percent * 0.25); break;        // 70-95
    case 'fallback_extracting': progress = Math.round(percent * 0.60); break;          // 0-60
    case 'fallback_sending': progress = 75; break;
    case 'retrying':         progress = 70; break;
    default:                 progress = 0;
  }

  // ── Phase labels ──────────────────────────────────────────
  const labels = {
    extracting_audio:    { title: 'Extracting audio...',           detail: 'Preparing for speech analysis' },
    extracting:          { title: 'Extracting audio...',           detail: 'Converting to speech format' },
    transcribing:        { title: 'Transcribing speech...',        detail: `${percent}% — converting speech to text` },
    building:            { title: 'Finding segments...',           detail: 'Detecting sentence boundaries' },
    scoring:             { title: 'Scoring segments...',           detail: 'Rating hook strength, clarity & emotion' },
    fallback_extracting: { title: 'Extracting frames...',          detail: 'No speech found — using visual analysis' },
    fallback_sending:    { title: 'Analyzing with AI...',          detail: 'Finding the most engaging moments' },
    retrying:            { title: `Rate limited — retrying in ${retryInfo?.countdown ?? '?'}s`, detail: `Attempt ${retryInfo?.attempt ?? '?'} of 3` },
  };

  const { title, detail } = labels[phase] || labels.extracting_audio;

  return (
    <div className="lts-analysis">
      <div className="lts-analysis-spinner" />
      <p className="lts-analysis-phase">{title}</p>
      <p className="lts-analysis-detail">{detail}</p>
      <div className="lts-analysis-progress">
        <div className="lts-analysis-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
