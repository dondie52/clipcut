import { useCallback } from 'react';

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
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50) || 'short';
}

export default function DoneStep({ state, dispatch, navigate }) {
  const handleDownload = useCallback((result) => {
    const name = `${sanitizeFilename(result.label)}.mp4`;
    downloadBlob(result.blob, name);
  }, []);

  const handleDownloadAll = useCallback(() => {
    state.results.forEach((result, i) => {
      setTimeout(() => {
        const name = `short-${i + 1}-${sanitizeFilename(result.label)}.mp4`;
        downloadBlob(result.blob, name);
      }, i * 500); // Stagger downloads
    });
  }, [state.results]);

  const handleSendToEditor = useCallback((result) => {
    const file = new File([result.blob], `${sanitizeFilename(result.label)}.mp4`, { type: 'video/mp4' });
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
        {state.results.map((result) => (
          <div key={result.id} className="lts-done-card">
            <video src={result.url} controls muted playsInline />
            <div className="lts-done-card-body">
              <p className="lts-done-card-label">{result.label}</p>
              <div className="lts-done-card-btns">
                <button className="lts-btn-secondary" onClick={() => handleDownload(result)}>
                  <span className="mi" style={{ fontSize: 14 }}>download</span>
                  Download
                </button>
                <button className="lts-btn-secondary" onClick={() => handleSendToEditor(result)}>
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
        <button className="lts-btn-primary" onClick={handleDownloadAll}>
          <span className="mi" style={{ fontSize: 18 }}>download</span>
          Download All
        </button>
      </div>
    </div>
  );
}
