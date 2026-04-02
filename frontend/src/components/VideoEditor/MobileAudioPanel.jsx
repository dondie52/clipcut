import { memo, useCallback, useRef } from 'react';
import Icon from './Icon';
import { Slider } from './InspectorComponents';

const cp = (clip, key) => clip?.[key] ?? clip?.properties?.[key];

const MobileAudioPanel = memo(function MobileAudioPanel({
  selectedClip, onClipUpdate,
  bgMusic, onImportBgMusic, onUpdateBgMusicVolume, onRemoveBgMusic,
}) {
  const fileRef = useRef(null);
  const hasClip = !!selectedClip;

  const update = useCallback((key, val) => {
    if (!selectedClip) return;
    onClipUpdate(selectedClip.id, { [key]: val });
  }, [selectedClip, onClipUpdate]);

  const handleImport = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) onImportBgMusic(file);
    e.target.value = '';
  }, [onImportBgMusic]);

  return (
    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Import audio */}
      <div>
        <button
          onClick={() => fileRef.current?.click()}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            padding: '12px', borderRadius: '10px', cursor: 'pointer',
            background: 'rgba(117,170,219,0.08)', border: '1px solid rgba(117,170,219,0.2)',
            color: '#75aadb', fontSize: '13px', fontWeight: 600, fontFamily: "'Spline Sans', sans-serif",
            transition: 'all 0.15s ease',
          }}
        >
          <Icon i="add" s={18} c="#75aadb" />
          Import Audio
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="audio/*"
          onChange={handleImport}
          style={{ display: 'none' }}
        />
      </div>

      {/* Background music controls */}
      {bgMusic && (
        <div style={{
          padding: '10px', borderRadius: '8px',
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon i="music_note" s={16} c="#34d399" />
              <span style={{ fontSize: '12px', color: '#e2e8f0', fontWeight: 500 }}>
                {bgMusic.name || 'Background Music'}
              </span>
            </div>
            <button
              onClick={onRemoveBgMusic}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}
              aria-label="Remove background music"
            >
              <Icon i="close" s={14} c="#64748b" />
            </button>
          </div>
          <Slider
            l="Music Volume"
            value={Math.round((bgMusic.volume ?? 0.3) * 100)}
            onChange={(val) => onUpdateBgMusicVolume(val / 100)}
            defaultValue={30}
            max={100}
          />
        </div>
      )}

      {/* Clip audio controls — shown when clip is selected */}
      {hasClip && (
        <>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
          <div>
            <div style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
              Clip Audio
            </div>

            {/* Volume */}
            <Slider
              l="Volume"
              value={Math.round((cp(selectedClip, 'volume') ?? 1) * 100)}
              onChange={(val) => update('volume', val / 100)}
              defaultValue={100}
              max={200}
            />

            {/* Mute toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
              <button
                onClick={() => update('isMuted', !cp(selectedClip, 'isMuted'))}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 12px', borderRadius: '6px', cursor: 'pointer',
                  background: cp(selectedClip, 'isMuted') ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.03)',
                  border: cp(selectedClip, 'isMuted') ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(255,255,255,0.08)',
                  color: cp(selectedClip, 'isMuted') ? '#ef4444' : '#94a3b8',
                  fontSize: '11px', fontWeight: 500,
                }}
              >
                <Icon i={cp(selectedClip, 'isMuted') ? 'volume_off' : 'volume_up'} s={16} c={cp(selectedClip, 'isMuted') ? '#ef4444' : '#94a3b8'} />
                {cp(selectedClip, 'isMuted') ? 'Muted' : 'Mute'}
              </button>
            </div>

            {/* Fade In / Fade Out */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
              <Slider
                l="Fade In"
                value={Math.round((cp(selectedClip, 'fadeIn') || 0) * 10)}
                onChange={(val) => update('fadeIn', val / 10)}
                min={0} max={50} defaultValue={0}
                unit="s"
                v={`${(cp(selectedClip, 'fadeIn') || 0).toFixed(1)}s`}
              />
              <Slider
                l="Fade Out"
                value={Math.round((cp(selectedClip, 'fadeOut') || 0) * 10)}
                onChange={(val) => update('fadeOut', val / 10)}
                min={0} max={50} defaultValue={0}
                unit="s"
                v={`${(cp(selectedClip, 'fadeOut') || 0).toFixed(1)}s`}
              />
            </div>
          </div>
        </>
      )}

      {/* Hint when no clip and no bg music */}
      {!hasClip && !bgMusic && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '10px',
          borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
        }}>
          <Icon i="info" s={14} c="#3d4a5c" />
          <span style={{ fontSize: '11px', color: '#475569' }}>
            Import audio or select a clip to adjust its volume
          </span>
        </div>
      )}
    </div>
  );
});

export default MobileAudioPanel;
