import { useState } from 'react';

/**
 * Collapsible debug panel showing face detection → crop pipeline internals.
 * Only rendered in development (caller should gate on import.meta.env.DEV).
 *
 * @param {{ debugData: object, segLabel: string }} props
 */
export default function FaceDebugOverlay({ debugData, segLabel }) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (!debugData) return null;

  const tabs = ['overview', 'frames', 'speakers', 'selection', 'smoothing'];

  return (
    <div style={styles.container}>
      <button onClick={() => setOpen(!open)} style={styles.toggle}>
        {open ? '▼' : '▶'} Face Debug: {segLabel}
      </button>

      {open && (
        <div style={styles.panel}>
          {/* Tab bar */}
          <div style={styles.tabBar}>
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  ...styles.tab,
                  ...(activeTab === tab ? styles.tabActive : {}),
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div style={styles.content}>
            {activeTab === 'overview' && <OverviewTab data={debugData} />}
            {activeTab === 'frames' && <FramesTab data={debugData} />}
            {activeTab === 'speakers' && <SpeakersTab data={debugData} />}
            {activeTab === 'selection' && <SelectionTab data={debugData} />}
            {activeTab === 'smoothing' && <SmoothingTab data={debugData} />}
          </div>
        </div>
      )}
    </div>
  );
}

function OverviewTab({ data }) {
  const framesWithFaces = data.frames.filter(f => f.faceCount > 0).length;

  return (
    <div>
      <Row label="Detection method" value={data.detectionMethod || 'none'} />
      <Row label="Frames sampled" value={data.frames.length} />
      <Row label="Frames with faces" value={`${framesWithFaces} / ${data.frames.length}`} />
      <Row label="Speaker clusters" value={data.speakers.length} />
      <Row label="Transcript intervals" value={data.speakerIntervals.length} />
      <Row label="Jaw data available" value={data.hasJawOpenData ? 'YES' : 'no'} highlight={data.hasJawOpenData} />
      <Row label="Speaker method" value={data.speakerDetectionMethod || 'none'} />
      <Row label="Mouth intervals" value={data.mouthIntervals?.length ?? 0} />
      <Row label="Raw keyframes" value={data.rawKeyframes.length} />
      <Row label="Flat detection" value={data.flatDetection ? 'YES' : 'no'} highlight={data.flatDetection} />
      <Row label="Transcript override" value={data.transcriptOverrideApplied ? 'YES' : 'no'} highlight={data.transcriptOverrideApplied} />
      <Row label="Crop filter type"
        value={
          !data.cropFilter ? 'NULL (default center)'
          : data.cropFilter.includes('if(lt(t') ? 'DYNAMIC' : 'STATIC'
        }
      />
      {data.cropFilter && (
        <div style={styles.mono}>
          <strong>Filter (first 300 chars):</strong>
          <div style={{ wordBreak: 'break-all', fontSize: 10, marginTop: 4 }}>
            {data.cropFilter.substring(0, 300)}{data.cropFilter.length > 300 ? '…' : ''}
          </div>
        </div>
      )}
    </div>
  );
}

function FramesTab({ data }) {
  if (!data.frames.length) return <p style={styles.empty}>No frames sampled</p>;

  return (
    <div style={styles.tableWrap}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>#</th>
            <th style={styles.th}>Time</th>
            <th style={styles.th}>Faces</th>
            <th style={styles.th}>Details</th>
          </tr>
        </thead>
        <tbody>
          {data.frames.map((f, i) => (
            <tr key={i} style={f.faceCount === 0 ? styles.dimRow : {}}>
              <td style={styles.td}>{i}</td>
              <td style={styles.td}>{f.time.toFixed(2)}s</td>
              <td style={styles.td}>{f.faceCount}</td>
              <td style={styles.td}>
                {f.faces.map((face, j) => (
                  <span key={j} style={styles.badge}>
                    X:{face.centerX} W:{face.width} A:{face.area}
                    {face.jawOpen != null && ` jaw:${face.jawOpen.toFixed(2)}`}
                    {face.isTalking && ' TALKING'}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SpeakersTab({ data }) {
  return (
    <div>
      <h4 style={styles.sectionTitle}>Speaker Clusters ({data.speakers.length})</h4>
      {data.speakers.map((s, i) => (
        <div key={i} style={styles.card}>
          <Row label={`Speaker ${i}`} value={`avgX: ${s.avgCenterX}px`} />
          <Row label="Frame count" value={s.frameCount} />
          <Row label="Activity score" value={s.activityScore.toFixed(2)} />
        </div>
      ))}

      <h4 style={styles.sectionTitle}>Transcript Intervals ({data.speakerIntervals.length})</h4>
      {data.speakerIntervals.map((iv, i) => (
        <div key={i} style={styles.card}>
          <Row label={`Interval ${i}`} value={`speaker ${iv.speakerIdx}`} />
          <Row label="Time" value={`${iv.start.toFixed(2)}s – ${iv.end.toFixed(2)}s`} />
        </div>
      ))}
    </div>
  );
}

function SelectionTab({ data }) {
  if (!data.perFrameSelection.length) {
    return <p style={styles.empty}>No per-frame selection data (single speaker or both fit in crop)</p>;
  }

  return (
    <div style={styles.tableWrap}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Time</th>
            <th style={styles.th}>Method</th>
            <th style={styles.th}>Speaker</th>
            <th style={styles.th}>Transcript Idx</th>
            <th style={styles.th}>Area Variances</th>
          </tr>
        </thead>
        <tbody>
          {data.perFrameSelection.map((sel, i) => (
            <tr key={i}>
              <td style={styles.td}>{sel.time.toFixed(2)}s</td>
              <td style={styles.td}>
                <span style={{
                  ...styles.methodBadge,
                  background: sel.method === 'transcript' ? '#2a6f2a'
                    : sel.method === 'mediapipe-mouth' ? '#2a4f6f'
                    : '#6f4f2a',
                }}>
                  {sel.method}
                </span>
              </td>
              <td style={styles.td}>{sel.speakerIdx}</td>
              <td style={styles.td}>{sel.activeSpeakerFromTranscript}</td>
              <td style={styles.td}>
                {sel.areaVariances
                  ? sel.areaVariances.map((v, j) => `s${j}:${v.toFixed(0)}`).join(' ')
                  : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SmoothingTab({ data }) {
  const stages = data.smoothingStages;
  if (!stages) return <p style={styles.empty}>No smoothing data (no crop filter built)</p>;

  const stageNames = [
    ['raw', 'Raw (centerX → cropX)'],
    ['afterHysteresis', 'After Hysteresis'],
    ['afterHold', 'After Hold Filter'],
    ['afterEMA', 'After EMA'],
    ['afterVelocity', 'After Velocity Clamp'],
    ['final', 'Final (deduped + capped)'],
  ];

  return (
    <div>
      {stageNames.map(([key, label]) => {
        const positions = stages[key];
        if (!positions || !positions.length) return null;
        const xs = positions.map(p => p.cropX);
        const min = Math.min(...xs);
        const max = Math.max(...xs);
        const uniqueCount = new Set(xs).size;

        return (
          <div key={key} style={styles.card}>
            <div style={styles.stageHeader}>
              <strong>{label}</strong>
              <span style={styles.dimText}>
                {positions.length} pts | range {min}–{max} | {uniqueCount} unique
              </span>
            </div>
            <div style={styles.miniChart}>
              {positions.map((p, i) => {
                const maxVal = Math.max(...xs, 1);
                const pct = (p.cropX / maxVal) * 100;
                return (
                  <div
                    key={i}
                    style={{
                      ...styles.miniBar,
                      width: `${100 / positions.length}%`,
                      height: `${Math.max(pct, 2)}%`,
                    }}
                    title={`t=${p.time.toFixed(2)}s cropX=${p.cropX}`}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Row({ label, value, highlight }) {
  return (
    <div style={styles.row}>
      <span style={styles.label}>{label}:</span>
      <span style={{ ...styles.value, ...(highlight ? styles.highlight : {}) }}>
        {String(value)}
      </span>
    </div>
  );
}

const styles = {
  container: {
    margin: '8px 0',
    fontFamily: '"Spline Sans", monospace',
    fontSize: 12,
  },
  toggle: {
    background: 'rgba(117,170,219,0.15)',
    border: '1px solid rgba(117,170,219,0.3)',
    color: '#75AADB',
    padding: '6px 12px',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 12,
    width: '100%',
    textAlign: 'left',
  },
  panel: {
    background: '#0d1117',
    border: '1px solid rgba(117,170,219,0.2)',
    borderRadius: 6,
    marginTop: 4,
    overflow: 'hidden',
  },
  tabBar: {
    display: 'flex',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    padding: '0 4px',
  },
  tab: {
    background: 'none',
    border: 'none',
    color: 'rgba(255,255,255,0.5)',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tabActive: {
    color: '#75AADB',
    borderBottom: '2px solid #75AADB',
  },
  content: {
    padding: 12,
    maxHeight: 400,
    overflowY: 'auto',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '3px 0',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  label: { color: 'rgba(255,255,255,0.5)' },
  value: { color: '#fff', fontFamily: 'monospace' },
  highlight: { color: '#ff6b6b', fontWeight: 'bold' },
  mono: { color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', padding: '6px 0' },
  empty: { color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' },
  tableWrap: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 11 },
  th: {
    textAlign: 'left',
    padding: '4px 8px',
    color: 'rgba(117,170,219,0.8)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  td: {
    padding: '3px 8px',
    color: 'rgba(255,255,255,0.8)',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
    fontFamily: 'monospace',
  },
  dimRow: { opacity: 0.4 },
  badge: {
    display: 'inline-block',
    background: 'rgba(117,170,219,0.15)',
    padding: '1px 6px',
    borderRadius: 3,
    marginRight: 4,
    fontSize: 10,
  },
  methodBadge: {
    display: 'inline-block',
    padding: '1px 6px',
    borderRadius: 3,
    color: '#fff',
    fontSize: 10,
  },
  card: {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#75AADB',
    fontSize: 12,
    margin: '12px 0 6px',
  },
  stageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    marginBottom: 6,
  },
  dimText: { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' },
  miniChart: {
    display: 'flex',
    alignItems: 'flex-end',
    height: 40,
    background: 'rgba(0,0,0,0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  miniBar: {
    background: 'rgba(117,170,219,0.6)',
    minWidth: 2,
    borderRight: '1px solid rgba(0,0,0,0.3)',
  },
};
