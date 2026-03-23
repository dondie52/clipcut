import { useCallback, useState, useMemo } from 'react';

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

function formatDur(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function DoneStep({ state, dispatch, navigate }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [copiedId, setCopiedId] = useState(null);

  const validResults = useMemo(() => state.results.filter(r => r.downloadUrl), [state.results]);

  // Analytics summary
  const analytics = useMemo(() => {
    const scores = validResults.filter(r => typeof r.score === 'number').map(r => r.score);
    const durations = state.segments.map(s => (s.endSeconds || 0) - (s.startSeconds || 0));
    return {
      totalClips: validResults.length,
      avgScore: scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null,
      bestScore: scores.length > 0 ? Math.max(...scores) : null,
      totalDuration: durations.reduce((a, b) => a + b, 0),
      avgDuration: durations.length > 0 ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : 0,
      viralCount: scores.filter(s => s >= 70).length,
    };
  }, [validResults, state.segments]);

  // Download all as individual files (sequential)
  const handleDownloadAll = useCallback(async () => {
    setDownloading(true);
    setDownloadProgress(0);

    for (let i = 0; i < validResults.length; i++) {
      try {
        const res = await fetch(validResults[i].downloadUrl);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = buildFilename(validResults[i], i);
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
  }, [validResults]);

  // Share a clip using Web Share API
  const handleShare = useCallback(async (result, index) => {
    const filename = buildFilename(result, index);
    try {
      const res = await fetch(result.downloadUrl);
      const blob = await res.blob();
      const file = new File([blob], filename, { type: 'video/mp4' });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ title: result.hookTitle || result.label, files: [file] });
        return;
      }
    } catch { /* share failed or not supported */ }
    // Fallback: copy download URL
    try {
      await navigator.clipboard.writeText(result.downloadUrl);
      setCopiedId(result.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch { /* clipboard not available */ }
  }, []);

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

      {/* Analytics summary */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 10,
        margin: '16px 0', padding: 14, borderRadius: 10,
        background: 'rgba(117,170,219,0.06)', border: '1px solid rgba(117,170,219,0.12)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9' }}>{analytics.totalClips}</div>
          <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Clips</div>
        </div>
        {analytics.avgScore !== null && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: analytics.avgScore >= 70 ? '#4ade80' : analytics.avgScore >= 40 ? '#fbbf24' : '#f87171' }}>
              {analytics.avgScore}
            </div>
            <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg Score</div>
          </div>
        )}
        {analytics.viralCount > 0 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#4ade80' }}>{analytics.viralCount}</div>
            <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Viral</div>
          </div>
        )}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9' }}>{formatDur(analytics.totalDuration)}</div>
          <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9' }}>{analytics.avgDuration}s</div>
          <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg Clip</div>
        </div>
      </div>

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
                <button className="lts-btn-secondary" onClick={() => handleShare(result, i)}>
                  <span className="mi" style={{ fontSize: 14 }}>{copiedId === result.id ? 'check' : 'share'}</span>
                  {copiedId === result.id ? 'Copied!' : 'Share'}
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
            ? `Downloading ${downloadProgress}/${validResults.length}...`
            : 'Download All'}
        </button>
      </div>
    </div>
  );
}
