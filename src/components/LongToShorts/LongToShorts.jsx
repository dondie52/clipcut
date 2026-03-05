/**
 * Long Video to Shorts — AI-powered feature
 * Takes a long video, uses Gemini AI to detect interesting segments,
 * then crops and trims each segment to vertical 9:16 shorts.
 */

import { useReducer, useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackEvent, analyticsEvents } from '../../utils/analytics';
import UploadStep from './UploadStep';
import AnalysisStep from './AnalysisStep';
import ReviewStep from './ReviewStep';
import ProcessingStep from './ProcessingStep';
import DoneStep from './DoneStep';

/* ========== CONSTANTS ========== */
const STEPS = ['Upload', 'Analyze', 'Review', 'Export'];

/* ========== STATE MACHINE ========== */
const initialState = {
  step: 'UPLOAD',       // UPLOAD | ANALYZING | REVIEW | PROCESSING | DONE
  videoFile: null,
  videoUrl: null,
  videoDuration: 0,
  videoWidth: 0,
  videoHeight: 0,
  segments: [],         // Array of { id, startSeconds, endSeconds, label, reason }
  results: [],          // Array of { id, label, blob, url }
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_VIDEO':
      return {
        ...state,
        step: 'UPLOAD',
        videoFile: action.file,
        videoUrl: action.url,
        videoDuration: action.duration,
        videoWidth: action.width,
        videoHeight: action.height,
        error: null,
      };
    case 'START_ANALYSIS':
      return { ...state, step: 'ANALYZING', error: null };
    case 'ANALYSIS_DONE':
      return { ...state, step: 'REVIEW', segments: action.segments, error: null };
    case 'ANALYSIS_ERROR':
      return { ...state, step: 'UPLOAD', error: action.error };
    case 'SET_SEGMENTS':
      return { ...state, segments: action.segments };
    case 'START_PROCESSING':
      return { ...state, step: 'PROCESSING', error: null };
    case 'PROCESSING_DONE':
      return { ...state, step: 'DONE', results: action.results, error: null };
    case 'PROCESSING_ERROR':
      return { ...state, step: 'REVIEW', error: action.error };
    case 'RESET':
      // Revoke any object URLs
      if (state.videoUrl) URL.revokeObjectURL(state.videoUrl);
      state.results.forEach(r => { if (r.url) URL.revokeObjectURL(r.url); });
      return { ...initialState };
    default:
      return state;
  }
}

/* ========== CSS ========== */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

  * { box-sizing: border-box; }

  .lts-root {
    width: 100vw; height: 100vh; background: #0a0a0a;
    font-family: 'Spline Sans', sans-serif;
    display: flex; flex-direction: column;
    overflow: hidden; color: white;
  }

  /* Top bar */
  .lts-topbar {
    height: 56px; min-height: 56px;
    background: #0e1218; border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex; align-items: center; padding: 0 20px; gap: 16px;
  }
  .lts-back {
    display: flex; align-items: center; gap: 8px;
    background: none; border: none; color: rgba(255,255,255,0.7);
    cursor: pointer; font-size: 14px; font-family: inherit; padding: 6px 10px;
    border-radius: 8px; transition: all 0.15s;
  }
  .lts-back:hover { background: rgba(255,255,255,0.05); color: white; }
  .lts-title {
    font-size: 16px; font-weight: 700; display: flex; align-items: center; gap: 8px;
  }
  .lts-title-icon {
    width: 28px; height: 28px; border-radius: 6px;
    background: linear-gradient(135deg, #75AADB, #5a8cbf);
    display: flex; align-items: center; justify-content: center;
  }

  /* Steps breadcrumb */
  .lts-steps {
    display: flex; align-items: center; gap: 4px; margin-left: auto;
  }
  .lts-step {
    font-size: 12px; font-weight: 500; padding: 4px 12px;
    border-radius: 16px; color: rgba(255,255,255,0.35);
    transition: all 0.2s;
  }
  .lts-step.active {
    background: rgba(117,170,219,0.15); color: #75AADB; font-weight: 600;
  }
  .lts-step.done { color: rgba(117,170,219,0.5); }
  .lts-step-arrow {
    color: rgba(255,255,255,0.15); font-size: 14px;
    display: flex; align-items: center;
  }

  /* Content area */
  .lts-content {
    flex: 1; overflow-y: auto; overflow-x: hidden;
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
  }

  /* Shared button styles */
  .lts-btn-primary {
    background: linear-gradient(135deg, #75AADB, #5a8cbf);
    border: none; color: white; font-family: inherit;
    font-size: 14px; font-weight: 600; padding: 12px 28px;
    border-radius: 10px; cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; gap: 8px;
  }
  .lts-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(117,170,219,0.3); }
  .lts-btn-primary:active { transform: translateY(0); }
  .lts-btn-primary:disabled {
    opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none;
  }

  .lts-btn-secondary {
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
    color: white; font-family: inherit; font-size: 13px; font-weight: 500;
    padding: 8px 16px; border-radius: 8px; cursor: pointer; transition: all 0.15s;
    display: flex; align-items: center; gap: 6px;
  }
  .lts-btn-secondary:hover { background: rgba(255,255,255,0.1); }

  /* Error banner */
  .lts-error {
    background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3);
    border-radius: 10px; padding: 12px 16px; margin-bottom: 16px;
    font-size: 13px; color: #fca5a5; display: flex; align-items: center; gap: 8px;
  }

  /* Upload zone */
  .lts-upload-zone {
    width: 100%; max-width: 600px;
    border: 2px dashed rgba(117,170,219,0.3); border-radius: 16px;
    padding: 48px 32px; text-align: center; cursor: pointer;
    transition: all 0.2s; background: rgba(117,170,219,0.03);
  }
  .lts-upload-zone:hover, .lts-upload-zone.dragover {
    border-color: #75AADB; background: rgba(117,170,219,0.08);
  }
  .lts-upload-icon {
    width: 64px; height: 64px; border-radius: 16px; margin: 0 auto 16px;
    background: rgba(117,170,219,0.1);
    display: flex; align-items: center; justify-content: center;
  }
  .lts-upload-title { font-size: 18px; font-weight: 600; margin: 0 0 8px; }
  .lts-upload-desc { font-size: 13px; color: rgba(255,255,255,0.45); margin: 0; }
  .lts-upload-preview {
    margin-top: 20px; border-radius: 10px; overflow: hidden;
    border: 1px solid rgba(255,255,255,0.1);
    background: #111; display: flex; align-items: center; gap: 14px;
    padding: 12px 16px;
  }
  .lts-upload-preview video {
    width: 120px; height: 68px; object-fit: cover; border-radius: 6px; background: #000;
  }
  .lts-upload-meta { flex: 1; text-align: left; }
  .lts-upload-meta p { margin: 0; }
  .lts-upload-meta .name { font-size: 14px; font-weight: 500; }
  .lts-upload-meta .info { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 4px; }
  .lts-upload-warning {
    margin-top: 12px; font-size: 12px; color: #fbbf24;
    display: flex; align-items: center; gap: 6px;
  }

  /* Analysis step */
  .lts-analysis {
    text-align: center; max-width: 400px;
  }
  .lts-analysis-spinner {
    width: 48px; height: 48px; border: 3px solid rgba(117,170,219,0.2);
    border-top-color: #75AADB; border-radius: 50%;
    animation: lts-spin 0.8s linear infinite; margin: 0 auto 20px;
  }
  @keyframes lts-spin { to { transform: rotate(360deg); } }
  .lts-analysis-phase { font-size: 16px; font-weight: 600; margin: 0 0 8px; }
  .lts-analysis-detail { font-size: 13px; color: rgba(255,255,255,0.45); margin: 0; }
  .lts-analysis-progress {
    margin-top: 16px; height: 4px; background: rgba(255,255,255,0.06);
    border-radius: 2px; overflow: hidden;
  }
  .lts-analysis-bar {
    height: 100%; background: #75AADB; border-radius: 2px;
    transition: width 0.3s ease;
  }

  /* Review step */
  .lts-review {
    width: 100%; max-width: 1100px; height: 100%;
    display: flex; gap: 20px;
  }
  .lts-review-player {
    flex: 1; min-width: 0; display: flex; flex-direction: column;
  }
  .lts-review-player video {
    width: 100%; border-radius: 10px; background: #000;
    aspect-ratio: 16/9; object-fit: contain;
  }
  .lts-review-sidebar {
    width: 340px; min-width: 340px; display: flex; flex-direction: column;
    gap: 12px; overflow-y: auto; padding-right: 4px;
  }
  .lts-review-sidebar::-webkit-scrollbar { width: 4px; }
  .lts-review-sidebar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 2px; }
  .lts-review-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 4px;
  }
  .lts-review-header h3 { font-size: 14px; font-weight: 600; margin: 0; }
  .lts-review-header span { font-size: 12px; color: rgba(255,255,255,0.4); }

  /* Segment card */
  .lts-segment {
    background: rgba(26,35,50,0.5); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px; padding: 12px; transition: all 0.15s;
  }
  .lts-segment:hover { border-color: rgba(117,170,219,0.2); }
  .lts-segment-top { display: flex; gap: 10px; }
  .lts-segment-thumb {
    width: 80px; height: 45px; border-radius: 6px; background: #000;
    object-fit: cover; flex-shrink: 0;
  }
  .lts-segment-info { flex: 1; min-width: 0; }
  .lts-segment-label {
    font-size: 13px; font-weight: 600; margin: 0 0 4px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .lts-segment-reason {
    font-size: 11px; color: rgba(255,255,255,0.4); margin: 0;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .lts-segment-time {
    display: flex; align-items: center; gap: 8px; margin-top: 8px;
    font-size: 12px; color: rgba(255,255,255,0.6);
  }
  .lts-segment-time input {
    width: 60px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 4px; color: white; font-family: inherit; font-size: 12px;
    padding: 3px 6px; text-align: center;
  }
  .lts-segment-time input:focus { outline: none; border-color: #75AADB; }
  .lts-segment-dur {
    margin-left: auto; background: rgba(117,170,219,0.1);
    color: #75AADB; font-size: 11px; font-weight: 600;
    padding: 2px 8px; border-radius: 10px;
  }
  .lts-segment-actions {
    display: flex; gap: 6px; margin-top: 8px;
  }
  .lts-segment-actions button {
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.6); border-radius: 6px; padding: 4px 10px;
    font-size: 11px; font-family: inherit; cursor: pointer; transition: all 0.15s;
    display: flex; align-items: center; gap: 4px;
  }
  .lts-segment-actions button:hover { background: rgba(255,255,255,0.08); color: white; }
  .lts-segment-actions .delete:hover { background: rgba(239,68,68,0.1); color: #fca5a5; }

  /* Add segment button */
  .lts-add-segment {
    border: 1px dashed rgba(255,255,255,0.1); border-radius: 10px;
    padding: 12px; text-align: center; cursor: pointer;
    color: rgba(255,255,255,0.4); font-size: 13px; font-family: inherit;
    background: none; width: 100%; transition: all 0.15s;
    display: flex; align-items: center; justify-content: center; gap: 6px;
  }
  .lts-add-segment:hover { border-color: rgba(117,170,219,0.3); color: #75AADB; }

  /* Processing step */
  .lts-processing {
    width: 100%; max-width: 600px;
  }
  .lts-processing-title { font-size: 18px; font-weight: 600; margin: 0 0 20px; text-align: center; }
  .lts-processing-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 16px; background: rgba(26,35,50,0.5);
    border: 1px solid rgba(255,255,255,0.06); border-radius: 10px;
    margin-bottom: 10px;
  }
  .lts-processing-item .label { flex: 1; font-size: 13px; font-weight: 500; }
  .lts-processing-bar {
    width: 120px; height: 4px; background: rgba(255,255,255,0.06);
    border-radius: 2px; overflow: hidden;
  }
  .lts-processing-bar-fill {
    height: 100%; background: #75AADB; border-radius: 2px;
    transition: width 0.3s ease;
  }
  .lts-processing-pct { font-size: 12px; color: rgba(255,255,255,0.4); width: 36px; text-align: right; }
  .lts-processing-check { color: #4ade80; }

  /* Done step */
  .lts-done {
    width: 100%; max-width: 900px;
  }
  .lts-done-title { font-size: 18px; font-weight: 600; margin: 0 0 4px; text-align: center; }
  .lts-done-sub { font-size: 13px; color: rgba(255,255,255,0.4); margin: 0 0 24px; text-align: center; }
  .lts-done-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
  .lts-done-card {
    background: rgba(26,35,50,0.5); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px; overflow: hidden; transition: all 0.15s;
  }
  .lts-done-card:hover { border-color: rgba(117,170,219,0.2); }
  .lts-done-card video {
    width: 100%; aspect-ratio: 9/16; object-fit: cover; background: #000;
    display: block;
  }
  .lts-done-card-body { padding: 12px; }
  .lts-done-card-label { font-size: 13px; font-weight: 500; margin: 0 0 8px; }
  .lts-done-card-btns { display: flex; gap: 6px; }
  .lts-done-card-btns button { flex: 1; }
  .lts-done-actions { display: flex; justify-content: center; gap: 12px; margin-top: 20px; }

  /* Material icon helper */
  .lts-root .mi {
    font-family: 'Material Symbols Outlined';
    font-size: 20px; font-weight: 400;
    font-style: normal; line-height: 1; display: inline-block;
    text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased;
  }
`;

/* ========== MAIN COMPONENT ========== */
export default function LongToShorts() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const videoRef = useRef(null);

  const stepIndex = {
    UPLOAD: 0,
    ANALYZING: 1,
    REVIEW: 2,
    PROCESSING: 3,
    DONE: 3,
  }[state.step] ?? 0;

  const handleBack = useCallback(() => {
    dispatch({ type: 'RESET' });
    navigate('/dashboard');
  }, [navigate]);

  return (
    <>
      <style>{CSS}</style>
      <div className="lts-root">
        {/* Top bar */}
        <header className="lts-topbar">
          <button className="lts-back" onClick={handleBack}>
            <span className="mi">arrow_back</span>
            Back
          </button>
          <div className="lts-title">
            <div className="lts-title-icon">
              <span className="mi" style={{ fontSize: 16, color: 'white' }}>content_cut</span>
            </div>
            Long to Shorts
          </div>

          {/* Step breadcrumb */}
          <div className="lts-steps">
            {STEPS.map((label, i) => (
              <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {i > 0 && <span className="lts-step-arrow"><span className="mi" style={{ fontSize: 14 }}>chevron_right</span></span>}
                <span className={`lts-step ${i === stepIndex ? 'active' : i < stepIndex ? 'done' : ''}`}>
                  {label}
                </span>
              </span>
            ))}
          </div>
        </header>

        {/* Content */}
        <div className="lts-content">
          {state.error && (
            <div className="lts-error" style={{ position: 'absolute', top: 72, left: 24, right: 24, zIndex: 10 }}>
              <span className="mi" style={{ fontSize: 18 }}>error</span>
              <span style={{ flex: 1 }}>{state.error}</span>
              {state.videoFile && (
                <button
                  className="lts-btn-secondary"
                  style={{ marginLeft: 'auto', flexShrink: 0 }}
                  onClick={() => dispatch({ type: 'START_ANALYSIS' })}
                >
                  <span className="mi" style={{ fontSize: 16 }}>refresh</span>
                  Retry
                </button>
              )}
            </div>
          )}

          {state.step === 'UPLOAD' && (
            <UploadStep state={state} dispatch={dispatch} />
          )}
          {state.step === 'ANALYZING' && (
            <AnalysisStep state={state} dispatch={dispatch} />
          )}
          {state.step === 'REVIEW' && (
            <ReviewStep state={state} dispatch={dispatch} videoRef={videoRef} />
          )}
          {state.step === 'PROCESSING' && (
            <ProcessingStep state={state} dispatch={dispatch} />
          )}
          {state.step === 'DONE' && (
            <DoneStep state={state} dispatch={dispatch} navigate={navigate} />
          )}
        </div>
      </div>
    </>
  );
}
