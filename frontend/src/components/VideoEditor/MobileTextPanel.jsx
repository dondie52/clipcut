import { memo, useCallback } from 'react';
import Icon from './Icon';
import { Slider } from './InspectorComponents';
import { TEXT_POSITION_PRESETS, TEXT_STYLE_PRESETS, TEXT_FONT_FAMILIES, DEFAULT_CLIP_PROPERTIES } from './constants';

const cp = (clip, key) => clip?.[key] ?? clip?.properties?.[key];
let _textId = 0;
const genTextId = () => `text-${Date.now()}-${(++_textId).toString(36)}`;

const MobileTextPanel = memo(function MobileTextPanel({ selectedClip, onClipUpdate, onAddClip, currentTime }) {
  const hasClip = !!selectedClip;
  const isTextClip = hasClip && (cp(selectedClip, 'type') === 'text' || cp(selectedClip, 'text'));

  const update = useCallback((key, val) => {
    if (!selectedClip) return;
    onClipUpdate(selectedClip.id, { [key]: val });
  }, [selectedClip, onClipUpdate]);

  const addTextClip = useCallback((preset) => {
    onAddClip({
      ...DEFAULT_CLIP_PROPERTIES,
      id: genTextId(),
      type: 'text',
      name: preset.name,
      text: preset.name,
      textSize: preset.textSize,
      textColor: preset.textColor,
      textPosition: preset.textPosition,
      textBgColor: preset.textBgColor,
      textBold: preset.textBold || false,
      textAlign: preset.textAlign || 'center',
      startTime: currentTime || 0,
      duration: 5,
      track: 1,
    });
  }, [onAddClip, currentTime]);

  const addDefaultText = useCallback(() => {
    onAddClip({
      ...DEFAULT_CLIP_PROPERTIES,
      id: genTextId(),
      type: 'text',
      name: 'Text',
      text: 'Your Text',
      textSize: 48,
      textColor: '#ffffff',
      textPosition: 'center',
      textBold: false,
      startTime: currentTime || 0,
      duration: 5,
      track: 1,
    });
  }, [onAddClip, currentTime]);

  return (
    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Add Text button — prominent CTA */}
      <button
        onClick={addDefaultText}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          padding: '12px', borderRadius: '8px', cursor: 'pointer',
          background: 'linear-gradient(135deg, #75aadb, #5a8cbf)',
          border: 'none', color: '#0a0a0a', fontSize: '13px', fontWeight: 600,
          fontFamily: "'Spline Sans', sans-serif",
          transition: 'all 0.15s ease',
        }}
      >
        <Icon i="add" s={18} c="#0a0a0a" />
        Add Text
      </button>

      {/* Style presets */}
      <div>
        <div style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
          Presets
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          {TEXT_STYLE_PRESETS.map(preset => (
            <button
              key={preset.name}
              onClick={() => addTextClip(preset)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '12px', borderRadius: '10px', cursor: 'pointer',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.15s ease', textAlign: 'left',
              }}
            >
              <Icon i={preset.icon} s={20} c="#f59e0b" />
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#e2e8f0' }}>{preset.name}</div>
                <div style={{ fontSize: '9px', color: '#64748b', marginTop: '2px' }}>{preset.textSize}px{preset.textBold ? ' bold' : ''}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Edit controls — shown when a text clip or clip with text is selected */}
      {isTextClip && (
        <>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
          <div>
            <div style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
              Edit Text
            </div>

            {/* Text input */}
            <textarea
              value={cp(selectedClip, 'text') || ''}
              onChange={(e) => update('text', e.target.value)}
              placeholder="Enter text..."
              rows={2}
              style={{
                width: '100%', padding: '10px 12px', borderRadius: '8px',
                background: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#e2e8f0', fontSize: '14px', fontFamily: "'Spline Sans', sans-serif",
                outline: 'none', resize: 'vertical', minHeight: '60px',
              }}
            />

            {/* Font family */}
            <div style={{ marginTop: '10px' }}>
              <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px', fontWeight: 500 }}>Font</div>
              <select
                value={cp(selectedClip, 'textFontFamily') || 'Spline Sans'}
                onChange={(e) => update('textFontFamily', e.target.value)}
                style={{
                  width: '100%', padding: '8px 10px', borderRadius: '6px',
                  background: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#e2e8f0', fontSize: '12px', fontFamily: "'Spline Sans', sans-serif",
                  outline: 'none', cursor: 'pointer',
                }}
              >
                {TEXT_FONT_FAMILIES.map(f => (
                  <option key={f} value={f} style={{ fontFamily: `'${f}', sans-serif` }}>{f}</option>
                ))}
              </select>
            </div>

            {/* Font size + color row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
              <div>
                <Slider
                  l="Font Size"
                  value={cp(selectedClip, 'textSize') || 48}
                  onChange={(val) => update('textSize', Math.max(8, Math.min(200, val)))}
                  min={8} max={200} defaultValue={48}
                />
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px', fontWeight: 500 }}>Color</div>
                <input
                  type="color"
                  value={cp(selectedClip, 'textColor') || '#ffffff'}
                  onChange={(e) => update('textColor', e.target.value)}
                  style={{
                    width: '100%', height: '32px', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px', background: 'rgba(30,41,59,0.5)', cursor: 'pointer', padding: '2px',
                  }}
                />
              </div>
            </div>

            {/* Style toggles: Bold / Italic / Underline */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
              {[
                { key: 'textBold', icon: 'format_bold', label: 'Bold' },
                { key: 'textItalic', icon: 'format_italic', label: 'Italic' },
                { key: 'textUnderline', icon: 'format_underlined', label: 'Underline' },
              ].map(s => {
                const active = !!cp(selectedClip, s.key);
                return (
                  <button
                    key={s.key}
                    onClick={() => update(s.key, !active)}
                    aria-label={s.label}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: '8px', borderRadius: '6px', cursor: 'pointer',
                      background: active ? 'rgba(117,170,219,0.15)' : 'rgba(30,41,59,0.5)',
                      border: active ? '1px solid #75aadb' : '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <Icon i={s.icon} s={18} c={active ? '#75aadb' : '#94a3b8'} />
                  </button>
                );
              })}
            </div>

            {/* Alignment: Left / Center / Right */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
              {[
                { value: 'left', icon: 'format_align_left' },
                { value: 'center', icon: 'format_align_center' },
                { value: 'right', icon: 'format_align_right' },
              ].map(a => {
                const active = (cp(selectedClip, 'textAlign') || 'center') === a.value;
                return (
                  <button
                    key={a.value}
                    onClick={() => update('textAlign', a.value)}
                    aria-label={`Align ${a.value}`}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: '8px', borderRadius: '6px', cursor: 'pointer',
                      background: active ? 'rgba(117,170,219,0.15)' : 'rgba(30,41,59,0.5)',
                      border: active ? '1px solid #75aadb' : '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <Icon i={a.icon} s={18} c={active ? '#75aadb' : '#94a3b8'} />
                  </button>
                );
              })}
            </div>

            {/* Opacity slider */}
            <div style={{ marginTop: '10px' }}>
              <Slider
                l="Opacity"
                value={Math.round((cp(selectedClip, 'opacity') ?? 1) * 100)}
                onChange={(val) => update('opacity', Math.max(0, Math.min(100, val)) / 100)}
                min={0} max={100} defaultValue={100}
              />
            </div>

            {/* Position grid (3x3) */}
            <div style={{ marginTop: '10px' }}>
              <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '6px', fontWeight: 500 }}>Position</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
                {TEXT_POSITION_PRESETS.map(p => {
                  const active = cp(selectedClip, 'textPosition') === p.value;
                  return (
                    <button
                      key={p.value}
                      onClick={() => {
                        update('textPosition', p.value);
                        // Clear custom position when using preset
                        update('textX', null);
                        update('textY', null);
                      }}
                      title={p.label}
                      style={{
                        background: active ? 'rgba(117,170,219,0.2)' : 'rgba(30,41,59,0.5)',
                        border: active ? '1px solid #75aadb' : '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '4px', padding: '8px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <Icon i={p.icon} s={14} c={active ? '#75aadb' : '#64748b'} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Background color toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
              <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 500 }}>Background</div>
              <button
                onClick={() => update('textBgColor', cp(selectedClip, 'textBgColor') ? '' : 'rgba(0,0,0,0.6)')}
                style={{
                  background: cp(selectedClip, 'textBgColor') ? 'rgba(117,170,219,0.15)' : 'rgba(30,41,59,0.5)',
                  border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px',
                  padding: '4px 10px', color: '#94a3b8', fontSize: '10px', cursor: 'pointer',
                }}
              >
                {cp(selectedClip, 'textBgColor') ? 'On' : 'Off'}
              </button>
              {cp(selectedClip, 'textBgColor') && (
                <input
                  type="color"
                  value={cp(selectedClip, 'textBgColor')?.startsWith('rgba') ? '#000000' : (cp(selectedClip, 'textBgColor') || '#000000')}
                  onChange={(e) => update('textBgColor', e.target.value)}
                  style={{
                    width: '32px', height: '28px', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '4px', background: 'rgba(30,41,59,0.5)', cursor: 'pointer', padding: '2px',
                  }}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export default MobileTextPanel;
