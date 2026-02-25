import { useState, useCallback, memo } from 'react';
import Icon from './Icon';
import { styles } from './styles';
import { SCROLLBAR_CSS } from './constants';
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
`;

/* ========== INSPECTOR PANEL COMPONENT (RIGHT SIDEBAR) ========== */
const InspectorPanel = ({ 
  rightTab, 
  onRightTabChange, 
  rightSubTab, 
  onRightSubTabChange,
  selectedClip,
  onClipUpdate
}) => {
  // Local state for inspector values
  const [filterName, setFilterName] = useState('90s');
  const [filterStrength, setFilterStrength] = useState(50);
  const [effects, setEffects] = useState([
    { id: 1, name: 'Motion Blur', enabled: true }
  ]);
  const [zoom, setZoom] = useState(50);
  const [positionX, setPositionX] = useState('0');
  const [positionY, setPositionY] = useState('0');
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [volume, setVolume] = useState(100);
  const [speed, setSpeed] = useState(100);
  
  // Effect handlers
  const handleToggleEffect = useCallback((effectId) => {
    setEffects(prev => prev.map(e => 
      e.id === effectId ? { ...e, enabled: !e.enabled } : e
    ));
  }, []);
  
  const handleDeleteEffect = useCallback((effectId) => {
    setEffects(prev => prev.filter(e => e.id !== effectId));
  }, []);
  
  const handleAddEffect = useCallback(() => {
    const newEffect = {
      id: Date.now(),
      name: 'New Effect',
      enabled: true
    };
    setEffects(prev => [...prev, newEffect]);
  }, []);
  
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
  
  return (
    <aside 
      style={styles.rightPanel}
      role="complementary"
      aria-label="Inspector panel"
    >
      <style>{INSPECTOR_CSS}</style>
      
      {/* Main tabs */}
      <nav 
        style={{
          display: "flex",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          height: "40px",
          flexShrink: 0
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
              fontSize: "10px",
              fontWeight: 700,
              color: rightTab === t.toLowerCase() ? "#75aadb" : "#64748b",
            }}
            role="tab"
            aria-selected={rightTab === t.toLowerCase()}
            aria-controls={`panel-${t.toLowerCase()}`}
            tabIndex={rightTab === t.toLowerCase() ? 0 : -1}
          >
            {t}
          </button>
        ))}
      </nav>
      
      {/* Sub tabs */}
      <nav 
        style={{
          display: "flex",
          height: "32px",
          background: "rgba(15,23,42,0.5)",
          flexShrink: 0
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
              color: rightSubTab === t.toLowerCase() ? "white" : "#64748b",
              background: rightSubTab === t.toLowerCase() ? "rgba(30,41,59,0.8)" : "transparent",
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
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }} 
        className="cs"
        id={`panel-${rightTab}`}
        role="tabpanel"
        aria-label={`${rightTab} settings`}
      >
        {/* Video Tab Content */}
        {rightTab === 'video' && (
          <>
            {/* Filters Section */}
            <Section t="Filters">
              <Row 
                l="Name" 
                v={filterName} 
                vc="#75aadb" 
                editable 
                onChange={setFilterName}
              />
              <Slider 
                l="Strength" 
                value={filterStrength}
                onChange={setFilterStrength}
                defaultValue={50}
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
                {effects.map((effect, index) => (
                  <EffectCard
                    key={effect.id}
                    number={index + 1}
                    name={effect.name}
                    enabled={effect.enabled}
                    onToggle={() => handleToggleEffect(effect.id)}
                    onEdit={() => {}}
                    onDelete={() => handleDeleteEffect(effect.id)}
                  />
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
                value={zoom}
                onChange={setZoom}
                defaultValue={50}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "4px" }}>
                <SmallInput 
                  l="Position X" 
                  v={positionX}
                  type="number"
                  onChange={setPositionX}
                />
                <SmallInput 
                  l="Position Y" 
                  v={positionY}
                  type="number"
                  onChange={setPositionY}
                />
              </div>
              <Slider 
                l="Rotation" 
                value={rotation}
                onChange={setRotation}
                min={-180}
                max={180}
                defaultValue={0}
                unit="°"
              />
              <Slider 
                l="Opacity" 
                value={opacity}
                onChange={setOpacity}
                defaultValue={100}
              />
            </Section>
          </>
        )}
        
        {/* Audio Tab Content */}
        {rightTab === 'audio' && (
          <>
            <Section t="Volume">
              <Slider 
                l="Volume" 
                value={volume}
                onChange={setVolume}
                defaultValue={100}
              />
              <Row l="Mute" v="Off" />
            </Section>
            
            <Hr />
            
            <Section t="Audio Effects">
              <div 
                style={{
                  padding: '20px',
                  textAlign: 'center',
                  color: '#475569',
                  fontSize: '12px'
                }}
              >
                <Icon i="music_note" s={32} c="#334155" />
                <p style={{ margin: '12px 0 0 0' }}>No audio effects applied</p>
              </div>
            </Section>
          </>
        )}
        
        {/* Speed Tab Content */}
        {rightTab === 'speed' && (
          <>
            <Section t="Playback Speed">
              <Slider 
                l="Speed" 
                value={speed}
                onChange={setSpeed}
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
                {[25, 50, 100, 150, 200].map(s => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    style={{
                      background: speed === s ? 'rgba(117, 170, 219, 0.2)' : 'rgba(30, 41, 59, 0.5)',
                      border: speed === s ? '1px solid #75aadb' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '4px',
                      padding: '4px 12px',
                      color: speed === s ? '#75aadb' : '#94a3b8',
                      fontSize: '11px',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                  >
                    {s}%
                  </button>
                ))}
              </div>
            </Section>
            
            <Hr />
            
            <Section t="Time Remapping">
              <Row l="Duration" v="00:05.00" />
              <Row l="Frames" v="150" />
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
                {['Fade In', 'Fade Out', 'Scale Up', 'Slide Left'].map(preset => (
                  <button
                    key={preset}
                    style={{
                      background: 'rgba(30, 41, 59, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '4px',
                      padding: '8px',
                      color: '#94a3b8',
                      fontSize: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </Section>
          </>
        )}
        
        {/* Adjust Tab Content */}
        {rightTab === 'adjust' && (
          <>
            <Section t="Color Correction">
              <Slider l="Brightness" defaultValue={50} />
              <Slider l="Contrast" defaultValue={50} />
              <Slider l="Saturation" defaultValue={50} />
              <Slider l="Temperature" defaultValue={50} />
            </Section>
            
            <Hr />
            
            <Section t="Color Grading">
              <ColorPicker label="Shadows" value="#1a1a2e" />
              <ColorPicker label="Midtones" value="#4a4a5e" />
              <ColorPicker label="Highlights" value="#ffffff" />
            </Section>
          </>
        )}
        
        {/* Empty state for no clip selected */}
        {!selectedClip && (
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              color: '#475569',
              textAlign: 'center',
              padding: '20px'
            }}
          >
            <Icon i="select_all" s={36} c="#334155" />
            <p style={{ fontSize: '12px', margin: '12px 0 4px 0' }}>
              Select a clip to edit
            </p>
            <p style={{ fontSize: '11px', color: '#334155', margin: 0 }}>
              Properties will appear here
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default memo(InspectorPanel);
