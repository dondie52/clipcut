import { useCallback, useRef, memo } from 'react';
import Icon from './Icon';
import { styles } from './styles';
import { SCROLLBAR_CSS, FILTER_PRESETS, EFFECT_PRESETS, ANIMATION_PRESETS, SPEED_PRESETS, TEXT_POSITION_PRESETS, TRANSITION_PRESETS, DEFAULT_CLIP_PROPERTIES } from './constants';
import { Section, Row, Slider, SmallInput, Hr, EffectCard, ColorPicker } from './InspectorComponents';

/* ========== CSS ANIMATIONS ========== */
const INSPECTOR_CSS = `
  ${SCROLLBAR_CSS}

  .inspector-tab {
    position: relative;
    transition: all 0.15s ease;
  }

  .inspector-tab::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: #75aadb;
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }

  .inspector-tab.active::after {
    transform: scaleX(1);
  }

  .inspector-tab:hover:not(.active) {
    color: #94a3b8 !important;
    background: rgba(255, 255, 255, 0.03);
  }

  .inspector-subtab {
    transition: all 0.15s ease;
  }

  .inspector-subtab:hover:not(.active) {
    background: rgba(255, 255, 255, 0.05) !important;
  }

  .add-effect-btn {
    transition: all 0.15s ease;
  }

  .add-effect-btn:hover {
    background: rgba(117, 170, 219, 0.15) !important;
    border-color: #75aadb !important;
  }

  .coming-soon-badge {
    display: inline-block;
    background: rgba(117, 170, 219, 0.15);
    color: #75aadb;
    font-size: 9px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 10px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
`;

/* ========== HELPER: safely read clip property ========== */
const cp = (clip, key) => clip?.[key] ?? DEFAULT_CLIP_PROPERTIES[key];

/* ========== COMING SOON PLACEHOLDER ========== */
const ComingSoonPlaceholder = memo(({ icon, title, description }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', padding: '32px 20px', textAlign: 'center',
    color: '#475569', gap: '12px'
  }}>
    <div style={{
      width: '56px', height: '56px', borderRadius: '16px',
      background: 'rgba(117, 170, 219, 0.08)', display: 'flex',
      alignItems: 'center', justifyContent: 'center'
    }}>
      <Icon i={icon} s={28} c="#334155" />
    </div>
    <div>
      <p style={{ fontSize: '13px', fontWeight: 600, margin: '0 0 4px 0', color: '#94a3b8' }}>
        {title}
      </p>
      <p style={{ fontSize: '11px', color: '#475569', margin: '0 0 8px 0', lineHeight: 1.4 }}>
        {description}
      </p>
      <span className="coming-soon-badge">Coming Soon</span>
    </div>
  </div>
));
ComingSoonPlaceholder.displayName = 'ComingSoonPlaceholder';

/* ========== INSPECTOR PANEL COMPONENT (RIGHT SIDEBAR) ========== */
const InspectorPanel = ({
  rightTab,
  onRightTabChange,
  rightSubTab,
  onRightSubTabChange,
  selectedClip,
  onClipUpdate,
  bgMusic,
  onImportBgMusic,
  onUpdateBgMusicVolume,
  onRemoveBgMusic,
  style: styleProp,
}) => {
  const bgMusicFileRef = useRef(null);
  // Helper to update a clip property
  const update = useCallback((key, value) => {
    if (!selectedClip) return;
    onClipUpdate(selectedClip.id, { [key]: value });
  }, [selectedClip, onClipUpdate]);

  // Effect handlers
  const handleToggleEffect = useCallback((effectId) => {
    if (!selectedClip) return;
    const effects = (selectedClip.effects || []).map(e =>
      e.id === effectId ? { ...e, enabled: !e.enabled } : e
    );
    onClipUpdate(selectedClip.id, { effects });
  }, [selectedClip, onClipUpdate]);

  const handleDeleteEffect = useCallback((effectId) => {
    if (!selectedClip) return;
    const effects = (selectedClip.effects || []).filter(e => e.id !== effectId);
    onClipUpdate(selectedClip.id, { effects });
  }, [selectedClip, onClipUpdate]);

  const handleAddEffect = useCallback(() => {
    if (!selectedClip) return;
    const newEffect = {
      id: Date.now(),
      name: 'New Effect',
      enabled: true,
      type: 'blur',
      params: { radius: 5 }
    };
    onClipUpdate(selectedClip.id, { effects: [...(selectedClip.effects || []), newEffect] });
  }, [selectedClip, onClipUpdate]);

  const handleAddPresetEffect = useCallback((preset) => {
    if (!selectedClip) return;
    const newEffect = {
      id: Date.now(),
      name: preset.name,
      enabled: true,
      type: preset.type,
      params: { ...preset.params }
    };
    onClipUpdate(selectedClip.id, { effects: [...(selectedClip.effects || []), newEffect] });
  }, [selectedClip, onClipUpdate]);

  // Keyboard navigation for tabs
  const handleTabKeyDown = useCallback((e, tabs, currentTab, onChange) => {
    const currentIndex = tabs.findIndex(t => t.toLowerCase() === currentTab);

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % tabs.length;
      onChange(tabs[nextIndex].toLowerCase());
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
      onChange(tabs[prevIndex].toLowerCase());
    }
  }, []);

  const mainTabs = ["Video", "Audio", "Speed", "Animate", "Adjust"];
  const subTabs = ["Basic", "Cutout", "Mask", "Canvas"];

  const hasClip = !!selectedClip;
  const clipEffects = selectedClip?.effects || [];
  const clipSpeed = Math.round(cp(selectedClip, 'speed') * 100);

  /* Tab icon mapping for visual richness */
  const tabIcons = { video: "movie", audio: "music_note", speed: "speed", animate: "animation", adjust: "tune" };

  return (
    <aside
      className="editor-right-panel"
      style={{ ...styles.rightPanel, ...styleProp }}
      role="complementary"
      aria-label="Inspector panel"
    >
      <style>{INSPECTOR_CSS}</style>

      {/* Panel header */}
      <div style={{
        height: "32px", display: "flex", alignItems: "center", padding: "0 14px",
        borderBottom: "1px solid rgba(117,170,219,0.04)",
        background: "rgba(15,23,42,0.3)",
      }}>
        <span style={{ fontSize: "10px", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "1.5px" }}>
          Inspector
        </span>
        {hasClip && (
          <span style={{
            marginLeft: "auto", fontSize: "9px", fontWeight: 500, color: "#75aadb",
            background: "rgba(117,170,219,0.1)", padding: "2px 8px", borderRadius: "10px",
          }}>
            {selectedClip?.name || "Clip"}
          </span>
        )}
      </div>

      {/* Main tabs — with icons */}
      <nav
        style={{
          display: "flex",
          borderBottom: "1px solid rgba(117,170,219,0.06)",
          height: "38px",
          flexShrink: 0,
          background: "rgba(15,23,42,0.2)",
        }}
        role="tablist"
        aria-label="Inspector categories"
        onKeyDown={(e) => handleTabKeyDown(e, mainTabs, rightTab, onRightTabChange)}
      >
        {mainTabs.map(t => (
          <button
            key={t}
            onClick={() => onRightTabChange(t.toLowerCase())}
            className={`inspector-tab ${rightTab === t.toLowerCase() ? 'active' : ''}`}
            style={{
              ...styles.ghost,
              flex: 1,
              fontSize: "9px",
              fontWeight: 700,
              color: rightTab === t.toLowerCase() ? "#75aadb" : "#4a5568",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1px",
            }}
            role="tab"
            aria-selected={rightTab === t.toLowerCase()}
            aria-controls={`panel-${t.toLowerCase()}`}
            tabIndex={rightTab === t.toLowerCase() ? 0 : -1}
          >
            <Icon i={tabIcons[t.toLowerCase()]} s={14} c={rightTab === t.toLowerCase() ? "#75aadb" : "#4a5568"} />
            <span style={{ letterSpacing: "0.5px" }}>{t}</span>
          </button>
        ))}
      </nav>

      {/* Sub tabs */}
      <nav
        style={{
          display: "flex",
          height: "30px",
          background: "rgba(8,10,14,0.5)",
          flexShrink: 0,
          borderBottom: "1px solid rgba(255,255,255,0.03)",
        }}
        role="tablist"
        aria-label="Inspector sub-categories"
        onKeyDown={(e) => handleTabKeyDown(e, subTabs, rightSubTab, onRightSubTabChange)}
      >
        {subTabs.map(t => (
          <button
            key={t}
            onClick={() => onRightSubTabChange(t.toLowerCase())}
            className={`inspector-subtab ${rightSubTab === t.toLowerCase() ? 'active' : ''}`}
            style={{
              ...styles.ghost,
              flex: 1,
              fontSize: "9px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: rightSubTab === t.toLowerCase() ? "#cbd5e1" : "#4a5568",
              background: rightSubTab === t.toLowerCase() ? "rgba(117,170,219,0.08)" : "transparent",
              borderBottom: rightSubTab === t.toLowerCase() ? "1px solid rgba(117,170,219,0.3)" : "1px solid transparent",
            }}
            role="tab"
            aria-selected={rightSubTab === t.toLowerCase()}
            tabIndex={rightSubTab === t.toLowerCase() ? 0 : -1}
          >
            {t}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px",
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}
        className="cs"
        id={`panel-${rightTab}`}
        role="tabpanel"
        aria-label={`${rightTab} settings`}
      >
        {/* Premium empty state */}
        {!hasClip && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              color: '#475569',
              textAlign: 'center',
              padding: '24px 16px',
            }}
          >
            <div style={{
              width: "64px", height: "64px", borderRadius: "16px",
              background: "linear-gradient(135deg, rgba(117,170,219,0.08) 0%, rgba(117,170,219,0.02) 100%)",
              border: "1px solid rgba(117,170,219,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "16px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            }}>
              <Icon i="touch_app" s={28} c="#3d4a5c" />
            </div>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', margin: '0 0 6px 0' }}>
              No clip selected
            </p>
            <p style={{ fontSize: '11px', color: '#3d4a5c', margin: '0 0 20px 0', lineHeight: 1.5 }}>
              Select a clip on the timeline to edit its properties
            </p>
            {/* Property preview hints */}
            <div style={{
              display: "flex", flexDirection: "column", gap: "8px", width: "100%",
              padding: "12px", borderRadius: "8px",
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.03)",
            }}>
              {[
                { icon: "tune", label: "Transform & Position" },
                { icon: "palette", label: "Filters & Color" },
                { icon: "speed", label: "Speed & Time" },
                { icon: "animation", label: "Keyframes & Animation" },
              ].map(hint => (
                <div key={hint.label} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "4px 0",
                }}>
                  <Icon i={hint.icon} s={14} c="#2d3748" />
                  <span style={{ fontSize: "10px", color: "#334155" }}>{hint.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === BASIC SUB-TAB CONTENT === */}
        {hasClip && rightSubTab === 'basic' && (
          <>
            {/* Video Tab Content */}
            {rightTab === 'video' && (
              <>
                {/* Filters Section */}
                <Section t="Filters">
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    {FILTER_PRESETS.map(f => (
                      <button
                        key={f.name}
                        onClick={() => update('filterName', f.name === 'None' ? null : f.name)}
                        style={{
                          background: cp(selectedClip, 'filterName') === f.name || (!cp(selectedClip, 'filterName') && f.name === 'None')
                            ? 'rgba(117, 170, 219, 0.2)' : 'rgba(30, 41, 59, 0.5)',
                          border: cp(selectedClip, 'filterName') === f.name || (!cp(selectedClip, 'filterName') && f.name === 'None')
                            ? '1px solid #75aadb' : '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '4px',
                          padding: '4px 10px',
                          color: cp(selectedClip, 'filterName') === f.name || (!cp(selectedClip, 'filterName') && f.name === 'None')
                            ? '#75aadb' : '#94a3b8',
                          fontSize: '10px',
                          fontWeight: 500,
                          cursor: 'pointer'
                        }}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                  <Slider
                    l="Strength"
                    value={cp(selectedClip, 'filterStrength')}
                    onChange={(val) => update('filterStrength', val)}
                    defaultValue={50}
                    disabled={!cp(selectedClip, 'filterName')}
                  />
                </Section>

                <Hr />

                {/* Effects Section */}
                <Section t="Effects">
                  <div
                    style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                    role="list"
                    aria-label="Applied effects"
                  >
                    {clipEffects.map((effect, index) => (
                      <EffectCard
                        key={effect.id}
                        number={index + 1}
                        name={effect.name}
                        enabled={effect.enabled}
                        onToggle={() => handleToggleEffect(effect.id)}
                        onEdit={() => {
                          // Toggle effect params — for now cycle through presets
                          const preset = EFFECT_PRESETS.find(p => p.name === effect.name);
                          if (preset) {
                            const newRadius = (effect.params?.radius || 5) === 5 ? 10 : 5;
                            const effects = clipEffects.map(e =>
                              e.id === effect.id ? { ...e, params: { ...e.params, radius: newRadius } } : e
                            );
                            onClipUpdate(selectedClip.id, { effects });
                          }
                        }}
                        onDelete={() => handleDeleteEffect(effect.id)}
                      />
                    ))}
                  </div>

                  {/* Add from presets */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                    {EFFECT_PRESETS.map(preset => (
                      <button
                        key={preset.name}
                        onClick={() => handleAddPresetEffect(preset)}
                        style={{
                          background: 'rgba(30, 41, 59, 0.5)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          color: '#64748b',
                          fontSize: '10px',
                          cursor: 'pointer'
                        }}
                      >
                        + {preset.name}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleAddEffect}
                    className="add-effect-btn"
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: 'transparent',
                      border: '1px dashed rgba(255, 255, 255, 0.1)',
                      borderRadius: '4px',
                      color: '#64748b',
                      fontSize: '11px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                    aria-label="Add new effect"
                  >
                    <Icon i="add" s={16} c="#64748b" />
                    Add Effect
                  </button>
                </Section>

                <Hr />

                {/* Position & Size Section */}
                <Section t="Position & Size">
                  <Slider
                    l="Zoom"
                    value={Math.round(cp(selectedClip, 'scale') * 100)}
                    onChange={(val) => update('scale', val / 100)}
                    defaultValue={100}
                    min={10}
                    max={300}
                  />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "4px" }}>
                    <SmallInput
                      l="Position X"
                      v={String(cp(selectedClip, 'positionX'))}
                      type="number"
                      onChange={(val) => update('positionX', Number(val) || 0)}
                    />
                    <SmallInput
                      l="Position Y"
                      v={String(cp(selectedClip, 'positionY'))}
                      type="number"
                      onChange={(val) => update('positionY', Number(val) || 0)}
                    />
                  </div>
                  <Slider
                    l="Rotation"
                    value={cp(selectedClip, 'rotation')}
                    onChange={(val) => update('rotation', val)}
                    min={-180}
                    max={180}
                    defaultValue={0}
                    unit="°"
                  />
                  <Slider
                    l="Opacity"
                    value={Math.round(cp(selectedClip, 'opacity') * 100)}
                    onChange={(val) => update('opacity', val / 100)}
                    defaultValue={100}
                  />
                </Section>

                <Hr />

                {/* Text Overlay Section */}
                <Section t="Text Overlay">
                  <SmallInput
                    l="Text"
                    v={cp(selectedClip, 'text') || ''}
                    onChange={(val) => update('text', val)}
                    placeholder="Enter text..."
                  />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "4px" }}>
                    <SmallInput
                      l="Font Size"
                      v={String(cp(selectedClip, 'textSize'))}
                      type="number"
                      onChange={(val) => update('textSize', Math.max(8, Math.min(200, Number(val) || 48)))}
                    />
                    <div>
                      <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px', fontWeight: 500 }}>Color</div>
                      <input
                        type="color"
                        value={cp(selectedClip, 'textColor') || '#ffffff'}
                        onChange={(e) => update('textColor', e.target.value)}
                        style={{
                          width: '100%', height: '28px', border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '4px', background: 'rgba(30,41,59,0.5)', cursor: 'pointer', padding: '2px'
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '6px', fontWeight: 500 }}>Position</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
                      {TEXT_POSITION_PRESETS.map(p => (
                        <button
                          key={p.value}
                          onClick={() => update('textPosition', p.value)}
                          title={p.label}
                          style={{
                            background: cp(selectedClip, 'textPosition') === p.value ? 'rgba(117,170,219,0.2)' : 'rgba(30,41,59,0.5)',
                            border: cp(selectedClip, 'textPosition') === p.value ? '1px solid #75aadb' : '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '4px', padding: '6px', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >
                          <Icon i={p.icon} s={14} c={cp(selectedClip, 'textPosition') === p.value ? '#75aadb' : '#64748b'} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "8px" }}>
                    <div>
                      <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px', fontWeight: 500 }}>Bg Color</div>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <input
                          type="color"
                          value={cp(selectedClip, 'textBgColor') || '#000000'}
                          onChange={(e) => update('textBgColor', e.target.value)}
                          disabled={!cp(selectedClip, 'textBgColor')}
                          style={{
                            width: '28px', height: '28px', border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '4px', background: 'rgba(30,41,59,0.5)', cursor: 'pointer', padding: '2px',
                            opacity: cp(selectedClip, 'textBgColor') ? 1 : 0.4,
                          }}
                        />
                        <button
                          onClick={() => update('textBgColor', cp(selectedClip, 'textBgColor') ? '' : '#000000')}
                          style={{
                            background: cp(selectedClip, 'textBgColor') ? 'rgba(117,170,219,0.15)' : 'rgba(30,41,59,0.5)',
                            border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px',
                            padding: '4px 8px', color: '#94a3b8', fontSize: '9px', cursor: 'pointer',
                          }}
                        >
                          {cp(selectedClip, 'textBgColor') ? 'On' : 'Off'}
                        </button>
                      </div>
                    </div>
                  </div>
                  {cp(selectedClip, 'text') && (
                    <div style={{
                      marginTop: '8px', padding: '8px 10px', borderRadius: '6px',
                      background: 'rgba(117,170,219,0.06)', border: '1px solid rgba(117,170,219,0.1)',
                      fontSize: '10px', color: '#75aadb', display: 'flex', alignItems: 'center', gap: '6px'
                    }}>
                      <Icon i="info" s={12} c="#75aadb" />
                      Text rendered during export via FFmpeg
                    </div>
                  )}
                </Section>

                <Hr />

                {/* Transition Section */}
                <Section t="Transition (to next clip)">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
                    {TRANSITION_PRESETS.map(t => (
                      <button
                        key={t.label}
                        onClick={() => update('transition', t.value)}
                        title={t.label}
                        style={{
                          background: cp(selectedClip, 'transition') === t.value ? 'rgba(117,170,219,0.2)' : 'rgba(30,41,59,0.5)',
                          border: cp(selectedClip, 'transition') === t.value ? '1px solid #75aadb' : '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '4px', padding: '6px 4px', cursor: 'pointer',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
                          fontSize: '9px', color: cp(selectedClip, 'transition') === t.value ? '#75aadb' : '#64748b',
                        }}
                      >
                        <Icon i={t.icon} s={14} c={cp(selectedClip, 'transition') === t.value ? '#75aadb' : '#64748b'} />
                        {t.label}
                      </button>
                    ))}
                  </div>
                  {cp(selectedClip, 'transition') && (
                    <Slider
                      l="Duration"
                      value={Math.round((cp(selectedClip, 'transitionDuration') || 1) * 10)}
                      onChange={(val) => update('transitionDuration', val / 10)}
                      min={2}
                      max={30}
                      defaultValue={10}
                      unit="s"
                      v={`${(cp(selectedClip, 'transitionDuration') || 1).toFixed(1)}s`}
                    />
                  )}
                </Section>
              </>
            )}

            {/* Audio Tab Content */}
            {rightTab === 'audio' && (
              <>
                <Section t="Volume">
                  <Slider
                    l="Volume"
                    value={Math.round(cp(selectedClip, 'volume') * 100)}
                    onChange={(val) => update('volume', val / 100)}
                    defaultValue={100}
                    min={0}
                    max={200}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#cbd5e1' }}>Mute</span>
                    <button
                      onClick={() => update('isMuted', !cp(selectedClip, 'isMuted'))}
                      style={{
                        background: cp(selectedClip, 'isMuted') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(30, 41, 59, 0.5)',
                        border: cp(selectedClip, 'isMuted') ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '4px',
                        padding: '4px 12px',
                        color: cp(selectedClip, 'isMuted') ? '#ef4444' : '#94a3b8',
                        fontSize: '11px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Icon i={cp(selectedClip, 'isMuted') ? 'volume_off' : 'volume_up'} s={14} c={cp(selectedClip, 'isMuted') ? '#ef4444' : '#94a3b8'} />
                      {cp(selectedClip, 'isMuted') ? 'Muted' : 'On'}
                    </button>
                  </div>
                </Section>

                <Hr />

                <Section t="Background Music">
                  <input
                    ref={bgMusicFileRef}
                    type="file"
                    accept="audio/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      if (e.target.files?.[0]) onImportBgMusic?.(e.target.files[0]);
                      e.target.value = '';
                    }}
                  />
                  {bgMusic ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '8px 10px', borderRadius: '6px',
                        background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.15)',
                      }}>
                        <Icon i="music_note" s={16} c="#34d399" />
                        <span style={{ flex: 1, fontSize: '11px', color: '#cbd5e1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {bgMusic.name}
                        </span>
                        <button
                          onClick={onRemoveBgMusic}
                          style={{
                            background: 'rgba(239,68,68,0.15)', border: 'none', borderRadius: '4px',
                            padding: '2px 6px', cursor: 'pointer', color: '#ef4444', fontSize: '10px',
                          }}
                          aria-label="Remove background music"
                        >
                          <Icon i="close" s={12} c="#ef4444" />
                        </button>
                      </div>
                      <Slider
                        l="Music Volume"
                        value={Math.round((bgMusic.volume ?? 0.3) * 100)}
                        onChange={(val) => onUpdateBgMusicVolume?.(val / 100)}
                        min={0}
                        max={100}
                        defaultValue={30}
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => bgMusicFileRef.current?.click()}
                      style={{
                        width: '100%', padding: '14px',
                        background: 'transparent',
                        border: '1px dashed rgba(52,211,153,0.3)',
                        borderRadius: '6px', color: '#34d399',
                        fontSize: '11px', fontWeight: 500,
                        cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', gap: '8px',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <Icon i="add" s={16} c="#34d399" />
                      Add Background Music
                    </button>
                  )}
                </Section>
              </>
            )}

            {/* Speed Tab Content */}
            {rightTab === 'speed' && (
              <>
                <Section t="Playback Speed">
                  <Slider
                    l="Speed"
                    value={clipSpeed}
                    onChange={(val) => update('speed', val / 100)}
                    min={25}
                    max={400}
                    defaultValue={100}
                  />
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap',
                    marginTop: '8px'
                  }}>
                    {SPEED_PRESETS.map(s => {
                      const pct = Math.round(s.value * 100);
                      return (
                        <button
                          key={s.label}
                          onClick={() => update('speed', s.value)}
                          style={{
                            background: clipSpeed === pct ? 'rgba(117, 170, 219, 0.2)' : 'rgba(30, 41, 59, 0.5)',
                            border: clipSpeed === pct ? '1px solid #75aadb' : '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '4px',
                            padding: '4px 12px',
                            color: clipSpeed === pct ? '#75aadb' : '#94a3b8',
                            fontSize: '11px',
                            fontWeight: 500,
                            cursor: 'pointer'
                          }}
                        >
                          {s.label}
                        </button>
                      );
                    })}
                  </div>
                </Section>

                <Hr />

                <Section t="Time Remapping">
                  <Row l="Duration" v={selectedClip.duration ? `${selectedClip.duration.toFixed(2)}s` : '--'} />
                  <Row l="Frames" v={selectedClip.duration ? String(Math.round(selectedClip.duration * 30)) : '--'} />
                </Section>
              </>
            )}

            {/* Animate Tab Content */}
            {rightTab === 'animate' && (
              <>
                <Section t="Keyframes">
                  <div
                    style={{
                      padding: '20px',
                      textAlign: 'center',
                      color: '#475569',
                      fontSize: '12px'
                    }}
                  >
                    <Icon i="animation" s={32} c="#334155" />
                    <p style={{ margin: '12px 0 4px 0' }}>No keyframes added</p>
                    <p style={{ fontSize: '11px', color: '#334155', margin: 0 }}>
                      Select a property and click the diamond icon to add keyframes
                    </p>
                  </div>
                </Section>

                <Hr />

                <Section t="Presets">
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px'
                  }}>
                    {ANIMATION_PRESETS.map(preset => {
                      const isActive = preset.key === 'fadeIn' ? cp(selectedClip, 'fadeIn') > 0
                        : preset.key === 'fadeOut' ? cp(selectedClip, 'fadeOut') > 0
                        : !!selectedClip[preset.key];
                      return (
                        <button
                          key={preset.name}
                          onClick={() => {
                            if (preset.key === 'fadeIn' || preset.key === 'fadeOut') {
                              update(preset.key, isActive ? 0 : preset.value);
                            } else {
                              update(preset.key, !isActive);
                            }
                          }}
                          style={{
                            background: isActive ? 'rgba(117, 170, 219, 0.2)' : 'rgba(30, 41, 59, 0.5)',
                            border: isActive ? '1px solid #75aadb' : '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '4px',
                            padding: '8px',
                            color: isActive ? '#75aadb' : '#94a3b8',
                            fontSize: '10px',
                            fontWeight: isActive ? 600 : 400,
                            cursor: 'pointer'
                          }}
                        >
                          {preset.name}
                        </button>
                      );
                    })}
                  </div>
                  {(cp(selectedClip, 'fadeIn') > 0 || cp(selectedClip, 'fadeOut') > 0) && (
                    <div style={{ marginTop: '8px' }}>
                      {cp(selectedClip, 'fadeIn') > 0 && (
                        <Slider
                          l="Fade In Duration"
                          value={cp(selectedClip, 'fadeIn') * 10}
                          onChange={(val) => update('fadeIn', val / 10)}
                          min={1}
                          max={50}
                          defaultValue={10}
                          unit="s"
                          v={`${cp(selectedClip, 'fadeIn').toFixed(1)}s`}
                        />
                      )}
                      {cp(selectedClip, 'fadeOut') > 0 && (
                        <Slider
                          l="Fade Out Duration"
                          value={cp(selectedClip, 'fadeOut') * 10}
                          onChange={(val) => update('fadeOut', val / 10)}
                          min={1}
                          max={50}
                          defaultValue={10}
                          unit="s"
                          v={`${cp(selectedClip, 'fadeOut').toFixed(1)}s`}
                        />
                      )}
                    </div>
                  )}
                </Section>
              </>
            )}

            {/* Adjust Tab Content */}
            {rightTab === 'adjust' && (
              <>
                <Section t="Color Correction">
                  <Slider
                    l="Brightness"
                    value={Math.round(cp(selectedClip, 'brightness') * 50 + 50)}
                    onChange={(val) => update('brightness', (val - 50) / 50)}
                    defaultValue={50}
                  />
                  <Slider
                    l="Contrast"
                    value={Math.round(cp(selectedClip, 'contrast') * 50 + 50)}
                    onChange={(val) => update('contrast', (val - 50) / 50)}
                    defaultValue={50}
                  />
                  <Slider
                    l="Saturation"
                    value={Math.round(cp(selectedClip, 'saturation') * 50)}
                    onChange={(val) => update('saturation', val / 50)}
                    defaultValue={50}
                  />
                  <Slider
                    l="Temperature"
                    value={Math.round(cp(selectedClip, 'temperature') * 50 + 50)}
                    onChange={(val) => update('temperature', (val - 50) / 50)}
                    defaultValue={50}
                  />
                </Section>

                <Hr />

                <Section t="Color Grading">
                  <ColorPicker
                    label="Shadows"
                    value={selectedClip.colorGrading?.shadows ?? '#1a1a2e'}
                    onChange={(val) => onClipUpdate(selectedClip.id, {
                      colorGrading: { ...(selectedClip.colorGrading || DEFAULT_CLIP_PROPERTIES.colorGrading), shadows: val }
                    })}
                  />
                  <ColorPicker
                    label="Midtones"
                    value={selectedClip.colorGrading?.midtones ?? '#4a4a5e'}
                    onChange={(val) => onClipUpdate(selectedClip.id, {
                      colorGrading: { ...(selectedClip.colorGrading || DEFAULT_CLIP_PROPERTIES.colorGrading), midtones: val }
                    })}
                  />
                  <ColorPicker
                    label="Highlights"
                    value={selectedClip.colorGrading?.highlights ?? '#ffffff'}
                    onChange={(val) => onClipUpdate(selectedClip.id, {
                      colorGrading: { ...(selectedClip.colorGrading || DEFAULT_CLIP_PROPERTIES.colorGrading), highlights: val }
                    })}
                  />
                </Section>
              </>
            )}
          </>
        )}

        {/* === CUTOUT SUB-TAB === */}
        {hasClip && rightSubTab === 'cutout' && (
          <ComingSoonPlaceholder
            icon="content_cut"
            title="Background Removal"
            description="Automatically remove or replace video backgrounds with AI-powered cutout tools"
          />
        )}

        {/* === MASK SUB-TAB === */}
        {hasClip && rightSubTab === 'mask' && (
          <ComingSoonPlaceholder
            icon="gradient"
            title="Masking Tools"
            description="Create custom shapes, feathered edges, and animated masks to reveal or hide parts of your video"
          />
        )}

        {/* === CANVAS SUB-TAB === */}
        {hasClip && rightSubTab === 'canvas' && (
          <Section t="Canvas Settings">
            <Row l="Resolution" v="1920 x 1080" />
            <Row l="Frame Rate" v="30 fps" />
            <Row l="Aspect Ratio" v="16:9" />
            <Hr />
            <ColorPicker
              label="Background Color"
              value="#000000"
              presets={['#000000', '#ffffff', '#0a0a0a', '#1a2332', '#75aadb', '#1e293b']}
            />
          </Section>
        )}
      </div>
    </aside>
  );
};

export default memo(InspectorPanel);
