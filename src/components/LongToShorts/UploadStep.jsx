import { useState, useRef, useCallback } from 'react';
import { uploadVideo, importUrl } from '../../services/apiService';

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const LARGE_FILE_WARN = 200 * 1024 * 1024; // 200MB
const ALLOWED_TYPES = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
const TARGET_MAX_HEIGHT = 720;
const TARGET_BITRATE = 2_000_000; // 2 Mbps

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

/**
 * Compress a video using canvas + MediaRecorder.
 * Scales down to 720p max, ~2Mbps bitrate. Returns a WebM blob.
 * @param {File} file
 * @param {(pct: number) => void} onProgress - 0-100
 * @returns {Promise<File>}
 */
function compressVideo(file, onProgress) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.src = URL.createObjectURL(file);

    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      reject(new Error('Failed to load video for compression'));
    };

    video.onloadedmetadata = () => {
      // Calculate target dimensions (max 720p, keep aspect ratio)
      let w = video.videoWidth;
      let h = video.videoHeight;
      if (h > TARGET_MAX_HEIGHT) {
        const scale = TARGET_MAX_HEIGHT / h;
        w = Math.round(w * scale);
        h = TARGET_MAX_HEIGHT;
      }
      // Ensure even dimensions (required by some codecs)
      w = w % 2 === 0 ? w : w + 1;
      h = h % 2 === 0 ? h : h + 1;

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');

      // Capture canvas stream + audio from video
      const canvasStream = canvas.captureStream(30);
      try {
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaElementSource(video);
        const dest = audioCtx.createMediaStreamDestination();
        source.connect(dest);
        source.connect(audioCtx.destination);
        dest.stream.getAudioTracks().forEach(t => canvasStream.addTrack(t));
      } catch {
        // No audio track or AudioContext not supported — continue without audio
      }

      // Pick a supported MIME type
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : MediaRecorder.isTypeSupported('video/webm;codecs=vp8')
          ? 'video/webm;codecs=vp8'
          : 'video/webm';

      const recorder = new MediaRecorder(canvasStream, {
        mimeType,
        videoBitsPerSecond: TARGET_BITRATE,
      });

      const chunks = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        URL.revokeObjectURL(video.src);
        const blob = new Blob(chunks, { type: 'video/webm' });
        const compressed = new File([blob], file.name.replace(/\.[^.]+$/, '.webm'), {
          type: 'video/webm',
        });
        resolve(compressed);
      };

      recorder.onerror = () => {
        URL.revokeObjectURL(video.src);
        reject(new Error('MediaRecorder error during compression'));
      };

      // Draw frames to canvas while video plays
      const duration = video.duration;
      function drawFrame() {
        if (video.paused || video.ended) return;
        ctx.drawImage(video, 0, 0, w, h);
        onProgress(Math.round((video.currentTime / duration) * 100));
        requestAnimationFrame(drawFrame);
      }

      video.onended = () => {
        // Draw final frame and stop recording
        ctx.drawImage(video, 0, 0, w, h);
        onProgress(100);
        recorder.stop();
      };

      // Start recording, then play the video
      recorder.start(100); // collect data every 100ms
      video.play().then(drawFrame).catch(() => {
        URL.revokeObjectURL(video.src);
        reject(new Error('Browser blocked video playback for compression'));
      });
    };
  });
}

export default function UploadStep({ state, dispatch }) {
  const [tab, setTab] = useState('file'); // 'file' | 'url'
  const [dragOver, setDragOver] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle | compressing | uploading | importing
  const [compressProgress, setCompressProgress] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [compressEnabled, setCompressEnabled] = useState(true);
  const [compressionSaving, setCompressionSaving] = useState(null); // { original, compressed }
  const [error, setError] = useState(null);
  const [ytUrl, setYtUrl] = useState('');
  const [importedFromUrl, setImportedFromUrl] = useState(false);
  const inputRef = useRef(null);

  const handleFile = useCallback(async (file) => {
    setError(null);
    setCompressionSaving(null);

    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type) && !file.name.match(/\.(mp4|webm|mov|avi|mkv)$/i)) {
      setError('Unsupported format. Use MP4, WebM, MOV, or AVI.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('File too large. Maximum size is 500MB.');
      return;
    }

    const localUrl = URL.createObjectURL(file);
    let fileToUpload = file;

    // Compress if enabled
    if (compressEnabled) {
      setPhase('compressing');
      setCompressProgress(0);
      try {
        const compressed = await compressVideo(file, (pct) => setCompressProgress(pct));
        setCompressionSaving({ original: file.size, compressed: compressed.size });
        fileToUpload = compressed;
      } catch (err) {
        console.warn('[UploadStep] Compression failed, uploading original:', err.message);
        // Fall back to original file
      }
    }

    // Upload
    setPhase('uploading');
    setUploadProgress(0);

    try {
      const result = await uploadVideo(fileToUpload, (pct) => setUploadProgress(pct));

      dispatch({
        type: 'SET_VIDEO',
        file,
        url: localUrl,
        duration: result.duration,
        width: result.width,
        height: result.height,
      });
      dispatch({ type: 'SET_JOB_ID', jobId: result.jobId });
    } catch (err) {
      URL.revokeObjectURL(localUrl);
      setError(err.message || 'Upload failed. Please try again.');
    } finally {
      setPhase('idle');
    }
  }, [dispatch, compressEnabled]);

  const handleImportUrl = useCallback(async () => {
    setError(null);
    const url = ytUrl.trim();
    if (!url) return;

    setPhase('importing');
    try {
      const result = await importUrl(url);
      setImportedFromUrl(true);
      dispatch({
        type: 'SET_VIDEO',
        file: null,
        url: null,
        duration: result.duration,
        width: result.width,
        height: result.height,
      });
      dispatch({ type: 'SET_JOB_ID', jobId: result.jobId });
    } catch (err) {
      setError(err.message || 'Import failed. Check the URL and try again.');
    } finally {
      setPhase('idle');
    }
  }, [ytUrl, dispatch]);

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
    if (state.jobId) dispatch({ type: 'START_ANALYSIS' });
  }, [state.jobId, dispatch]);

  const busy = phase !== 'idle';
  const videoReady = state.jobId && (state.videoFile || importedFromUrl);

  // Tab button style
  const tabStyle = (active) => ({
    flex: 1,
    padding: '8px 0',
    border: 'none',
    borderBottom: active ? '2px solid #75AADB' : '2px solid transparent',
    background: 'transparent',
    color: active ? '#75AADB' : 'rgba(255,255,255,0.4)',
    fontSize: 13,
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: busy ? 'default' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    transition: 'all 0.15s',
  });

  return (
    <div style={{ width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {error && (
        <div className="lts-error" style={{ width: '100%', marginBottom: 16 }}>
          <span className="mi" style={{ fontSize: 18 }}>error</span>
          {error}
        </div>
      )}

      {/* Tabs — only shown when no video is loaded yet */}
      {!videoReady && !busy && (
        <div style={{ display: 'flex', width: '100%', marginBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <button style={tabStyle(tab === 'file')} onClick={() => { setTab('file'); setError(null); }}>
            <span className="mi" style={{ fontSize: 16 }}>upload_file</span>
            Upload File
          </button>
          <button style={tabStyle(tab === 'url')} onClick={() => { setTab('url'); setError(null); }}>
            <span className="mi" style={{ fontSize: 16 }}>smart_display</span>
            YouTube URL
          </button>
        </div>
      )}

      {/* FILE TAB */}
      {tab === 'file' && (
        <div
          className={`lts-upload-zone ${dragOver ? 'dragover' : ''}`}
          style={{ width: '100%', ...(videoReady || busy ? { cursor: 'default' } : {}) }}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={!state.videoFile && !busy ? onClickZone : undefined}
        >
          <input
            ref={inputRef}
            type="file"
            accept="video/*"
            style={{ display: 'none' }}
            onChange={onFileChange}
          />

          {phase === 'compressing' ? (
            <>
              <div className="lts-analysis-spinner" />
              <p className="lts-upload-title">Compressing video...</p>
              <p className="lts-upload-desc">{compressProgress}% — resizing to 720p for faster upload</p>
              <div className="lts-analysis-progress" style={{ marginTop: 16, maxWidth: 300, margin: '16px auto 0' }}>
                <div className="lts-analysis-bar" style={{ width: `${compressProgress}%` }} />
              </div>
            </>
          ) : phase === 'uploading' ? (
            <>
              <div className="lts-analysis-spinner" />
              <p className="lts-upload-title">Uploading video...</p>
              <p className="lts-upload-desc">
                {uploadProgress}% uploaded
                {compressionSaving && (
                  <span style={{ display: 'block', marginTop: 4, color: '#4ade80', fontSize: 11 }}>
                    Compressed {formatFileSize(compressionSaving.original)} → {formatFileSize(compressionSaving.compressed)}
                  </span>
                )}
              </p>
              <div className="lts-analysis-progress" style={{ marginTop: 16, maxWidth: 300, margin: '16px auto 0' }}>
                <div className="lts-analysis-bar" style={{ width: `${uploadProgress}%` }} />
              </div>
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
                    setImportedFromUrl(false);
                  }}
                  style={{ flexShrink: 0 }}
                >
                  <span className="mi" style={{ fontSize: 16 }}>close</span>
                </button>
              </div>
              {state.videoFile.size > LARGE_FILE_WARN && (
                <div className="lts-upload-warning">
                  <span className="mi" style={{ fontSize: 16 }}>warning</span>
                  Large file — upload may take a moment
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* URL TAB */}
      {tab === 'url' && (
        <div className="lts-upload-zone" style={{ width: '100%', cursor: 'default', gap: 12 }}>
          {phase === 'importing' ? (
            <>
              <div className="lts-analysis-spinner" />
              <p className="lts-upload-title">Downloading from YouTube...</p>
              <p className="lts-upload-desc">Server is fetching at full speed — this takes 10–30 seconds</p>
            </>
          ) : importedFromUrl && state.jobId ? (
            <>
              <div className="lts-upload-preview" style={{ border: 'none', padding: 0 }}>
                <span className="mi" style={{ fontSize: 32, color: '#4ade80' }}>check_circle</span>
                <div className="lts-upload-meta">
                  <p className="name">YouTube video ready</p>
                  <p className="info">
                    {formatDuration(state.videoDuration)} &middot; {state.videoWidth}x{state.videoHeight}
                  </p>
                </div>
                <button
                  className="lts-btn-secondary"
                  onClick={() => {
                    dispatch({ type: 'RESET' });
                    setImportedFromUrl(false);
                    setYtUrl('');
                  }}
                  style={{ flexShrink: 0 }}
                >
                  <span className="mi" style={{ fontSize: 16 }}>close</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="mi" style={{ fontSize: 32, color: '#75AADB' }}>smart_display</span>
              <p className="lts-upload-title">Paste a YouTube URL</p>
              <p className="lts-upload-desc">The server downloads it directly — no upload from your browser</p>
              <div style={{ display: 'flex', gap: 8, width: '100%', maxWidth: 420, marginTop: 4 }}>
                <input
                  type="url"
                  value={ytUrl}
                  onChange={(e) => setYtUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !busy && handleImportUrl()}
                  placeholder="https://youtube.com/watch?v=..."
                  style={{
                    flex: 1,
                    padding: '9px 12px',
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.06)',
                    color: '#fff',
                    fontSize: 13,
                    fontFamily: 'inherit',
                    outline: 'none',
                  }}
                />
                <button
                  className="lts-btn-primary"
                  onClick={handleImportUrl}
                  disabled={!ytUrl.trim() || busy}
                  style={{ flexShrink: 0, padding: '9px 18px' }}
                >
                  Import
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Compress toggle — only in file tab before a video is selected */}
      {tab === 'file' && !state.videoFile && !busy && (
        <label
          style={{
            display: 'flex', alignItems: 'center', gap: 8, marginTop: 12,
            fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={compressEnabled}
            onChange={(e) => setCompressEnabled(e.target.checked)}
            style={{ accentColor: '#75AADB', width: 14, height: 14, cursor: 'pointer' }}
          />
          Compress for faster upload
        </label>
      )}

      {/* Clip duration + Analyze — shown whenever a video is ready (file or URL) */}
      {videoReady && (
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
            disabled={!state.jobId}
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
