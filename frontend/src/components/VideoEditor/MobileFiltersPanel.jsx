import { memo } from 'react';
import Icon from './Icon';
import { Slider } from './InspectorComponents';
import { FILTER_PRESETS } from './constants';

const cp = (clip, key) => clip?.[key] ?? clip?.properties?.[key];

const GRADIENT_BG = 'linear-gradient(135deg, #75aadb 0%, #1a2332 50%, #e2e8f0 100%)';

const MobileFiltersPanel = memo(function MobileFiltersPanel({ selectedClip, onClipUpdate }) {
  const hasClip = !!selectedClip;
  const update = (key, val) => onClipUpdate(selectedClip.id, { [key]: val });

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
          <Icon i="filter_vintage" s={24} c="#3d4a5c" />
        </div>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', margin: '0 0 4px 0' }}>No clip selected</p>
        <p style={{ fontSize: '11px', color: '#3d4a5c', margin: 0 }}>Select a clip on the timeline to apply filters</p>
      </div>
    );
  }

  const activeFilter = cp(selectedClip, 'filterName');

  return (
    <div>
      {/* Sticky horizontal scrollable filter row — stays pinned while the strength slider scrolls below */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 2, background: '#0e1218',
        display: 'flex', gap: '10px', overflowX: 'auto',
        padding: '12px 12px 12px',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none',
      }}>
        {FILTER_PRESETS.map(f => {
          const isActive = activeFilter === f.name || (!activeFilter && f.name === 'None');
          return (
            <button
              key={f.name}
              onClick={() => update('filterName', f.name === 'None' ? null : f.name)}
              style={{
                flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '6px', background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              }}
            >
              {/* Filter preview swatch */}
              <div style={{
                width: '56px', height: '56px', borderRadius: '10px',
                background: GRADIENT_BG,
                filter: f.css || 'none',
                border: isActive ? '2px solid #75aadb' : '2px solid rgba(255,255,255,0.08)',
                boxShadow: isActive ? '0 0 8px rgba(117,170,219,0.3)' : 'none',
                transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
              }} />
              <span style={{
                fontSize: '10px', fontWeight: isActive ? 600 : 400,
                color: isActive ? '#75aadb' : '#94a3b8',
                whiteSpace: 'nowrap',
              }}>
                {f.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter strength slider */}
      {activeFilter && (
        <div style={{ padding: '12px' }}>
          <Slider
            l="Strength"
            value={cp(selectedClip, 'filterStrength') ?? 50}
            onChange={(val) => update('filterStrength', val)}
            defaultValue={50}
          />
        </div>
      )}
    </div>
  );
});

export default MobileFiltersPanel;
