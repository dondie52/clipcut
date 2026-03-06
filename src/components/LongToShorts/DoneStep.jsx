import { useCallback, useState } from 'react';

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function sanitizeFilename(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
    .slice(0, 40) || 'short';
}

function buildFilename(result, index) {
  const num = String(index + 1).padStart(2, '0');
  const slug = sanitizeFilename(result.hookTitle || result.label);
  return `clip_${num}_${slug}.mp4`;
}

export default function DoneStep({ state, dispatch, navigate }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownload = useCallback((result, index) => {
    downloadBlob(result.blob, buildFilename(result, index));
  }, []);

  const handleDownloadAll = useCallback(() => {
    setDownloading(true);
    setDownloadProgress(0);

    state.results.forEach((result, i) => {
      setTimeout(() => {
        downloadBlob(result.blob, buildFilename(result, i));
        setDownloadProgress(i + 1);
        if (i === state.results.length - 1) {
          setTimeout(() => setDownloading(false), 800);
        }
      }, i * 500);
    });
  }, [state.results]);

  const handleSendToEditor = useCallback((result, index) => {
    const file = new File([result.blob], buildFilename(result, index), { type: 'video/mp4' });
    navigate('/editor', { state: { filesToImport: [file] } });
  }, [navigate]);

  const handleStartOver = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, [dispatch]);

  return (
    <div className="lts-done">
      <p className="lts-done-title">Your shorts are ready!</p>
      <p className="lts-done-sub">{state.results.length} vertical short{state.results.length !== 1 ? 's' : ''} created</p>

      <div className="lts-done-grid">
        {state.results.map((result, i) => (
          <div key={result.id} className="lts-done-card">
            <video src={result.url} controls muted playsInline />
            <div className="lts-done-card-body">
              <p className="lts-done-card-label">
                {result.hookTitle || result.label}
              </p>
              {typeof result.score === 'number' && (
                <span
                  className={`lts-score-badge ${result.score >= 70 ? 'score-viral' : result.score >= 40 ? 'score-good' : 'score-low'}`}
                  style={{ marginLeft: 0, marginBottom: 8 }}
                >
                  {result.score} {result.score >= 70 ? 'Viral' : result.score >= 40 ? 'Good' : 'Low'}
                </span>
              )}
              <div className="lts-done-card-btns">
                <button className="lts-btn-secondary" onClick={() => handleDownload(result, i)}>
                  <span className="mi" style={{ fontSize: 14 }}>download</span>
                  Download
                </button>
                <button className="lts-btn-secondary" onClick={() => handleSendToEditor(result, i)}>
                  <span className="mi" style={{ fontSize: 14 }}>movie_edit</span>
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lts-done-actions">
        <button className="lts-btn-secondary" onClick={handleStartOver}>
          <span className="mi" style={{ fontSize: 16 }}>refresh</span>
          Start over
        </button>
        <button className="lts-btn-primary" onClick={handleDownloadAll} disabled={downloading}>
          <span className="mi" style={{ fontSize: 18 }}>download</span>
          {downloading
            ? `Downloading ${downloadProgress}/${state.results.length}...`
            : 'Download All'}
        </button>
      </div>
    </div>
  );
}
