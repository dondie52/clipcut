import { useState, useCallback, useEffect, useRef } from 'react';
import { generateThumbnail } from '../../services/videoOperations';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function parseTime(str) {
  const parts = str.split(':');
  if (parts.length === 2) {
    return (parseInt(parts[0], 10) || 0) * 60 + (parseInt(parts[1], 10) || 0);
  }
  return parseFloat(str) || 0;
}

function getScoreClass(score) {
  if (score >= 70) return 'score-viral';
  if (score >= 40) return 'score-good';
  return 'score-low';
}

function getScoreLabel(score) {
  if (score >= 70) return 'Viral';
  if (score >= 40) return 'Good';
  return 'Low';
}

const CAPTION_STYLES = [
  { id: 'bold-center', label: 'Bold Center', icon: 'format_bold', desc: 'Large centered text' },
  { id: 'lower-third', label: 'Lower Third', icon: 'subtitles', desc: 'Bottom bar overlay' },
  { id: 'word-highlight', label: 'Word Highlight', icon: 'highlight', desc: 'Highlight word-by-word' },
  { id: 'none', label: 'No Captions', icon: 'closed_caption_disabled', desc: 'Export without captions' },
];

export default function ReviewStep({ state, dispatch, videoRef }) {
  const [thumbnails, setThumbnails] = useState({});
  const [captionStyle, setCaptionStyle] = useState('bold-center');
  const thumbsLoaded = useRef(new Set());

  // Clean up preview listeners on unmount
  useEffect(() => {
    return () => {
      const video = videoRef.current;
      if (!video) return;
      if (seekListenerRef.current) {
        video.removeEventListener('seeked', seekListenerRef.current);
      }
      if (stopListenerRef.current) {
        video.removeEventListener('timeupdate', stopListenerRef.current);
      }
    };
  }, [videoRef]);

  // Generate thumbnails for each segment
  useEffect(() => {
    for (const seg of state.segments) {
      if (thumbsLoaded.current.has(seg.id)) continue;
      thumbsLoaded.current.add(seg.id);
      generateThumbnail(state.videoFile, seg.startSeconds).then(blob => {
        const url = URL.createObjectURL(blob);
        setThumbnails(prev => ({ ...prev, [seg.id]: url }));
      }).catch(() => {});
    }
  }, [state.segments, state.videoFile]);

  const updateSegment = useCallback((id, updates) => {
    dispatch({
      type: 'SET_SEGMENTS',
      segments: state.segments.map(s => s.id === id ? { ...s, ...updates } : s),
    });
  }, [state.segments, dispatch]);

  const deleteSegment = useCallback((id) => {
    dispatch({
      type: 'SET_SEGMENTS',
      segments: state.segments.filter(s => s.id !== id),
    });
  }, [state.segments, dispatch]);

  const addSegment = useCallback(() => {
    const newSeg = {
      id: `seg-${Date.now()}-manual`,
      startSeconds: 0,
      endSeconds: Math.min(30, state.videoDuration),
      label: 'Custom segment',
      reason: 'Manually added',
    };
    dispatch({ type: 'SET_SEGMENTS', segments: [...state.segments, newSeg] });
  }, [state.segments, state.videoDuration, dispatch]);

  const stopListenerRef = useRef(null);
  const seekListenerRef = useRef(null);

  const previewSegment = useCallback((seg) => {
    const video = videoRef.current;
    if (!video || !state.videoUrl) return;

    // Clean up any previous listeners
    if (seekListenerRef.current) {
      video.removeEventListener('seeked', seekListenerRef.current);
      seekListenerRef.current = null;
    }
    if (stopListenerRef.current) {
      video.removeEventListener('timeupdate', stopListenerRef.current);
      stopListenerRef.current = null;
    }
    video.pause();

    // Wait for seek to complete, then play
    const onSeeked = () => {
      video.removeEventListener('seeked', onSeeked);
      seekListenerRef.current = null;

      const handleTimeUpdate = () => {
        if (video.currentTime >= seg.endSeconds) {
          video.pause();
          video.removeEventListener('timeupdate', handleTimeUpdate);
          stopListenerRef.current = null;
        }
      };
      stopListenerRef.current = handleTimeUpdate;
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.play();
    };

    seekListenerRef.current = onSeeked;
    video.addEventListener('seeked', onSeeked);
    video.currentTime = seg.startSeconds;
  }, [videoRef]);

  const handleProcess = useCallback(() => {
    if (state.segments.length > 0) {
      dispatch({ type: 'START_PROCESSING' });
    }
  }, [state.segments, dispatch]);

  return (
    <div className="lts-review">
      {/* Left: video player */}
      <div className="lts-review-player">
        {state.videoUrl ? (
          <video
            ref={videoRef}
            src={state.videoUrl}
            controls
            playsInline
            preload="metadata"
            style={{ marginBottom: 12 }}
          />
        ) : (
          <div
            style={{
              width: '100%', aspectRatio: '16/9', background: '#111',
              borderRadius: 10, display: 'flex', alignItems: 'center',
              justifyContent: 'center', flexDirection: 'column', gap: 8,
              marginBottom: 12, border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span className="mi" style={{ fontSize: 36, color: 'rgba(255,255,255,0.15)' }}>videocam_off</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>Preview not available</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>Video is stored on the server</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            className="lts-btn-primary"
            onClick={handleProcess}
            disabled={state.segments.length === 0}
          >
            <span className="mi" style={{ fontSize: 18 }}>movie_creation</span>
            Create {state.segments.length} Short{state.segments.length !== 1 ? 's' : ''}
          </button>
        </div>
      </div>

      {/* Right: segment list */}
      <div className="lts-review-sidebar">
        <div className="lts-review-header">
          <h3>Detected Segments</h3>
          <span>{state.segments.length} segment{state.segments.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Caption style selector — shown when transcript words are available */}
        {state.segments.some(s => s.words?.length > 0) && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748b', fontWeight: 600, marginBottom: 8 }}>
              Caption Style
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {CAPTION_STYLES.map(cs => (
                <button
                  key={cs.id}
                  onClick={() => {
                    setCaptionStyle(cs.id);
                    dispatch({ type: 'SET_CAPTIONS', enabled: cs.id !== 'none' });
                  }}
                  style={{
                    padding: '8px 10px', borderRadius: 8, border: captionStyle === cs.id ? '1.5px solid #75AADB' : '1px solid rgba(255,255,255,0.08)',
                    background: captionStyle === cs.id ? 'rgba(117,170,219,0.12)' : 'rgba(255,255,255,0.02)',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                    fontFamily: "'Spline Sans', sans-serif", color: captionStyle === cs.id ? '#75AADB' : '#94a3b8',
                    fontSize: 11, fontWeight: captionStyle === cs.id ? 600 : 400,
                  }}
                >
                  <span className="mi" style={{ fontSize: 14 }}>{cs.icon}</span>
                  {cs.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {state.segments.map((seg) => {
          const dur = Math.round(seg.endSeconds - seg.startSeconds);
          return (
            <div key={seg.id} className="lts-segment">
              <div className="lts-segment-top">
                {thumbnails[seg.id] ? (
                  <img className="lts-segment-thumb" src={thumbnails[seg.id]} alt="" loading="lazy" decoding="async" />
                ) : (
                  <div className="lts-segment-thumb" />
                )}
                <div className="lts-segment-info">
                  {seg.hookTitle && (
                    <p className="lts-segment-hook">{seg.hookTitle}</p>
                  )}
                  <p className="lts-segment-label">
                    {seg.label}
                    {typeof seg.score === 'number' && (
                      <span
                        className={`lts-score-badge ${getScoreClass(seg.score)}`}
                        title={`Viral score: ${seg.score}/100`}
                      >
                        {seg.score}
                        <span style={{ fontWeight: 500, opacity: 0.85 }}>{getScoreLabel(seg.score)}</span>
                      </span>
                    )}
                  </p>
                  <p className="lts-segment-reason">{seg.reason}</p>
                </div>
              </div>

              {seg.transcriptSnippet && (
                <p className="lts-segment-transcript">
                  <span className="mi" style={{ fontSize: 12, verticalAlign: 'middle', marginRight: 4 }}>format_quote</span>
                  {seg.transcriptSnippet.length > 120
                    ? seg.transcriptSnippet.slice(0, 120) + '…'
                    : seg.transcriptSnippet}
                </p>
              )}

              {/* Range slider for in/out points */}
              <div style={{ padding: '4px 0 2px', position: 'relative' }}>
                <input
                  type="range"
                  min={0} max={state.videoDuration} step={0.5}
                  value={seg.startSeconds}
                  onChange={(e) => updateSegment(seg.id, { startSeconds: Math.min(Number(e.target.value), seg.endSeconds - 1) })}
                  style={{ width: '100%', accentColor: '#75AADB', height: 4 }}
                  title="Start point"
                />
                <input
                  type="range"
                  min={0} max={state.videoDuration} step={0.5}
                  value={seg.endSeconds}
                  onChange={(e) => updateSegment(seg.id, { endSeconds: Math.max(Number(e.target.value), seg.startSeconds + 1) })}
                  style={{ width: '100%', accentColor: '#4ade80', height: 4, marginTop: -4 }}
                  title="End point"
                />
              </div>
              <div className="lts-segment-time">
                <input
                  value={formatTime(seg.startSeconds)}
                  onChange={(e) => updateSegment(seg.id, { startSeconds: parseTime(e.target.value) })}
                  title="Start time"
                  aria-label="Start time"
                />
                <span>—</span>
                <input
                  value={formatTime(seg.endSeconds)}
                  onChange={(e) => updateSegment(seg.id, { endSeconds: parseTime(e.target.value) })}
                  title="End time"
                  aria-label="End time"
                />
                <span className="lts-segment-dur">{dur}s</span>
              </div>

              <div className="lts-segment-actions">
                <button onClick={() => previewSegment(seg)}>
                  <span className="mi" style={{ fontSize: 14 }}>play_arrow</span>
                  Preview
                </button>
                <button className="delete" onClick={() => deleteSegment(seg.id)}>
                  <span className="mi" style={{ fontSize: 14 }}>delete</span>
                  Remove
                </button>
              </div>
            </div>
          );
        })}

        <button className="lts-add-segment" onClick={addSegment}>
          <span className="mi" style={{ fontSize: 18 }}>add</span>
          Add segment manually
        </button>
      </div>
    </div>
  );
}
