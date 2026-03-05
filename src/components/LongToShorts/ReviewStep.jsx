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

export default function ReviewStep({ state, dispatch, videoRef }) {
  const [thumbnails, setThumbnails] = useState({});
  const thumbsLoaded = useRef(new Set());

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

  const seekTo = useCallback((time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
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
        <video
          ref={videoRef}
          src={state.videoUrl}
          controls
          style={{ marginBottom: 12 }}
        />
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

        {state.segments.map((seg) => {
          const dur = Math.round(seg.endSeconds - seg.startSeconds);
          return (
            <div key={seg.id} className="lts-segment">
              <div className="lts-segment-top">
                {thumbnails[seg.id] ? (
                  <img className="lts-segment-thumb" src={thumbnails[seg.id]} alt="" />
                ) : (
                  <div className="lts-segment-thumb" />
                )}
                <div className="lts-segment-info">
                  <p className="lts-segment-label">{seg.label}</p>
                  <p className="lts-segment-reason">{seg.reason}</p>
                </div>
              </div>

              <div className="lts-segment-time">
                <input
                  value={formatTime(seg.startSeconds)}
                  onChange={(e) => updateSegment(seg.id, { startSeconds: parseTime(e.target.value) })}
                  title="Start time"
                />
                <span>—</span>
                <input
                  value={formatTime(seg.endSeconds)}
                  onChange={(e) => updateSegment(seg.id, { endSeconds: parseTime(e.target.value) })}
                  title="End time"
                />
                <span className="lts-segment-dur">{dur}s</span>
              </div>

              <div className="lts-segment-actions">
                <button onClick={() => seekTo(seg.startSeconds)}>
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
