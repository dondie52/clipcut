import { useCallback, useState } from 'react';

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

  const handleDownloadAll = useCallback(async () => {
    const valid = state.results.filter(r => r.downloadUrl);
    setDownloading(true);
    setDownloadProgress(0);

    for (let i = 0; i < valid.length; i++) {
      try {
        const res = await fetch(valid[i].downloadUrl);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = buildFilename(valid[i], i);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error(`Failed to download clip ${i + 1}:`, err);
      }
      setDownloadProgress(i + 1);
    }

    setTimeout(() => setDownloading(false), 800);
  }, [state.results]);

  const handleSendToEditor = useCallback(async (result, index) => {
    try {
      const res = await fetch(result.downloadUrl);
      const blob = await res.blob();
      const file = new File([blob], buildFilename(result, index), { type: 'video/mp4' });
      navigate('/editor', { state: { filesToImport: [file] } });
    } catch (err) {
      console.error('Failed to fetch clip for editor:', err);
    }
  }, [navigate]);

  const handleStartOver = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, [dispatch]);

  const validResults = state.results.filter(r => r.downloadUrl);

  if (validResults.length === 0) {
    return (
      <div className="lts-done">
        <p className="lts-done-title">No valid clips were produced</p>
        <p className="lts-done-sub">Export failed on the server. Try again with different segments.</p>
        <div className="lts-done-actions">
          <button className="lts-btn-primary" onClick={handleStartOver}>
            <span className="mi" style={{ fontSize: 16 }}>refresh</span>
            Start over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lts-done">
      <p className="lts-done-title">Your shorts are ready!</p>
      <p className="lts-done-sub">{validResults.length} vertical short{validResults.length !== 1 ? 's' : ''} created</p>

      <div className="lts-done-grid">
        {validResults.map((result, i) => (
          <div key={result.id} className="lts-done-card">
            <video src={result.downloadUrl} controls muted playsInline crossOrigin="anonymous" />
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
                <a
                  className="lts-btn-secondary"
                  href={result.downloadUrl}
                  download={buildFilename(result, i)}
                  style={{ textDecoration: 'none' }}
                >
                  <span className="mi" style={{ fontSize: 14 }}>download</span>
                  Download
                </a>
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
            ? `Downloading ${downloadProgress}/${validResults.length}...`
            : 'Download All'}
        </button>
      </div>
    </div>
  );
}
