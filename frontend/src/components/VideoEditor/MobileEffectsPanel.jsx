import { memo, useCallback } from 'react';
import Icon from './Icon';
import { EFFECT_PRESETS } from './constants';

const cp = (clip, key) => clip?.[key] ?? clip?.properties?.[key];

const MobileEffectsPanel = memo(function MobileEffectsPanel({ selectedClip, onClipUpdate }) {
  const hasClip = !!selectedClip;

  const addEffect = useCallback((preset) => {
    if (!selectedClip) return;
    const existing = cp(selectedClip, 'effects') || [];
    // Don't add duplicate effect types
    if (existing.some(e => e.type === preset.type)) return;
    onClipUpdate(selectedClip.id, {
      effects: [...existing, { type: preset.type, name: preset.name, params: { ...preset.params }, enabled: true }],
    });
  }, [selectedClip, onClipUpdate]);

  const removeEffect = useCallback((idx) => {
    if (!selectedClip) return;
    const existing = cp(selectedClip, 'effects') || [];
    onClipUpdate(selectedClip.id, { effects: existing.filter((_, i) => i !== idx) });
  }, [selectedClip, onClipUpdate]);

  const toggleEffect = useCallback((idx) => {
    if (!selectedClip) return;
    const existing = cp(selectedClip, 'effects') || [];
    onClipUpdate(selectedClip.id, {
      effects: existing.map((e, i) => i === idx ? { ...e, enabled: !e.enabled } : e),
    });
  }, [selectedClip, onClipUpdate]);

  if (!hasClip) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '32px 16px', color: '#475569', textAlign: 'center',
      }}>
        <div style={{
          width: '56px', height: '56px', borderRadius: '14px',
          background: 'linear-gradient(135deg, rgba(117,170,219,0.08) 0%, rgba(117,170,219,0.02) 100%)',
          border: '1px solid rgba(117,170,219,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px',
        }}>
          <Icon i="auto_fix_high" s={24} c="#3d4a5c" />
        </div>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', margin: '0 0 4px 0' }}>Select a clip first</p>
        <p style={{ fontSize: '11px', color: '#3d4a5c', margin: 0 }}>Select a clip on the timeline to apply effects</p>
      </div>
    );
  }

  const appliedEffects = cp(selectedClip, 'effects') || [];

  return (
    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Applied effects */}
      {appliedEffects.length > 0 && (
        <div>
          <div style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
            Applied
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {appliedEffects.map((e, idx) => (
              <div key={idx} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 10px', borderRadius: '8px',
                background: e.enabled ? 'rgba(117,170,219,0.08)' : 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon i={EFFECT_PRESETS.find(p => p.type === e.type)?.icon || 'auto_fix_high'} s={16} c={e.enabled ? '#75aadb' : '#475569'} />
                  <span style={{ fontSize: '12px', color: e.enabled ? '#e2e8f0' : '#64748b' }}>{e.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <button
                    onClick={() => toggleEffect(idx)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}
                    aria-label={e.enabled ? 'Disable effect' : 'Enable effect'}
                  >
                    <Icon i={e.enabled ? 'visibility' : 'visibility_off'} s={14} c="#64748b" />
                  </button>
                  <button
                    onClick={() => removeEffect(idx)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}
                    aria-label="Remove effect"
                  >
                    <Icon i="close" s={14} c="#64748b" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Effect presets grid */}
      <div>
        <div style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
          Add Effect
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {EFFECT_PRESETS.map(preset => {
            const isApplied = appliedEffects.some(e => e.type === preset.type);
            return (
              <button
                key={preset.name}
                onClick={() => addEffect(preset)}
                disabled={isApplied}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                  padding: '12px 4px', borderRadius: '10px', cursor: isApplied ? 'default' : 'pointer',
                  background: isApplied ? 'rgba(117,170,219,0.1)' : 'rgba(255,255,255,0.03)',
                  border: isApplied ? '1px solid rgba(117,170,219,0.3)' : '1px solid rgba(255,255,255,0.06)',
                  opacity: isApplied ? 0.6 : 1,
                  transition: 'all 0.15s ease',
                }}
              >
                <Icon i={preset.icon} s={22} c={isApplied ? '#75aadb' : '#94a3b8'} />
                <span style={{ fontSize: '9px', fontWeight: 500, color: isApplied ? '#75aadb' : '#94a3b8', textAlign: 'center' }}>
                  {preset.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default MobileEffectsPanel;
