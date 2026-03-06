import { useState, useRef, useCallback } from 'react';
import { getVideoInfo } from '../../services/videoOperations';

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const LARGE_FILE_WARN = 200 * 1024 * 1024; // 200MB
const ALLOWED_TYPES = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];

function formatFileSize(bytes) {
  if (bytes >= 1e9) return (bytes / 1e9).toFixed(1) + ' GB';
  if (bytes >= 1e6) return (bytes / 1e6).toFixed(1) + ' MB';
  return (bytes / 1e3).toFixed(0) + ' KB';
}

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function UploadStep({ state, dispatch }) {
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleFile = useCallback(async (file) => {
    setError(null);

    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type) && !file.name.match(/\.(mp4|webm|mov|avi|mkv)$/i)) {
      setError('Unsupported format. Use MP4, WebM, MOV, or AVI.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('File too large. Maximum size is 500MB.');
      return;
    }

    setLoading(true);
    try {
      const info = await getVideoInfo(file);
      const url = URL.createObjectURL(file);
      dispatch({
        type: 'SET_VIDEO',
        file,
        url,
        duration: info.duration,
        width: info.width,
        height: info.height,
      });
    } catch {
      setError('Could not read video. Try a different file.');
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const onDragOver = useCallback((e) => { e.preventDefault(); setDragOver(true); }, []);
  const onDragLeave = useCallback(() => setDragOver(false), []);

  const onClickZone = useCallback(() => inputRef.current?.click(), []);
  const onFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleAnalyze = useCallback(() => {
    if (state.videoFile) dispatch({ type: 'START_ANALYSIS' });
  }, [state.videoFile, dispatch]);

  return (
    <div style={{ width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {error && (
        <div className="lts-error" style={{ width: '100%', marginBottom: 16 }}>
          <span className="mi" style={{ fontSize: 18 }}>error</span>
          {error}
        </div>
      )}

      <div
        className={`lts-upload-zone ${dragOver ? 'dragover' : ''}`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={!state.videoFile ? onClickZone : undefined}
        style={state.videoFile ? { cursor: 'default' } : {}}
      >
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          style={{ display: 'none' }}
          onChange={onFileChange}
        />

        {loading ? (
          <>
            <div className="lts-analysis-spinner" />
            <p className="lts-upload-title">Reading video...</p>
          </>
        ) : !state.videoFile ? (
          <>
            <div className="lts-upload-icon">
              <span className="mi" style={{ fontSize: 32, color: '#75AADB' }}>upload_file</span>
            </div>
            <p className="lts-upload-title">Drop your video here</p>
            <p className="lts-upload-desc">or click to browse — MP4, WebM, MOV (max 500MB)</p>
          </>
        ) : (
          <>
            <div className="lts-upload-preview">
              <video src={state.videoUrl} muted />
              <div className="lts-upload-meta">
                <p className="name">{state.videoFile.name}</p>
                <p className="info">
                  {formatFileSize(state.videoFile.size)} &middot; {formatDuration(state.videoDuration)}
                  &middot; {state.videoWidth}x{state.videoHeight}
                </p>
              </div>
              <button
                className="lts-btn-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  if (state.videoUrl) URL.revokeObjectURL(state.videoUrl);
                  dispatch({ type: 'RESET' });
                }}
                style={{ flexShrink: 0 }}
              >
                <span className="mi" style={{ fontSize: 16 }}>close</span>
              </button>
            </div>
            {state.videoFile.size > LARGE_FILE_WARN && (
              <div className="lts-upload-warning">
                <span className="mi" style={{ fontSize: 16 }}>warning</span>
                Large file — processing may be slow in browser
              </div>
            )}
          </>
        )}
      </div>

      {state.videoFile && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20 }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Clip length:</span>
            {[15, 30, 60].map(d => (
              <button
                key={d}
                onClick={() => dispatch({ type: 'SET_CLIP_DURATION', clipDuration: d })}
                style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  border: state.clipDuration === d ? '1px solid #75AADB' : '1px solid rgba(255,255,255,0.1)',
                  background: state.clipDuration === d ? 'rgba(117,170,219,0.15)' : 'rgba(255,255,255,0.04)',
                  color: state.clipDuration === d ? '#75AADB' : 'rgba(255,255,255,0.6)',
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {d}s
              </button>
            ))}
          </div>
          <button
            className="lts-btn-primary"
            onClick={handleAnalyze}
            style={{ marginTop: 12 }}
          >
            <span className="mi" style={{ fontSize: 18 }}>auto_awesome</span>
            Analyze with AI
          </button>
        </>
      )}
    </div>
  );
}
