import { memo, useState, useCallback, useMemo } from 'react';
import Icon from './Icon';
import { STICKER_PRESETS, DEFAULT_CLIP_PROPERTIES } from './constants';

let _stickerId = 0;
const genStickerId = () => `sticker-${Date.now()}-${(++_stickerId).toString(36)}`;

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'smileys', label: 'Smileys' },
  { id: 'hands', label: 'Hands' },
  { id: 'symbols', label: 'Symbols' },
  { id: 'objects', label: 'Objects' },
  { id: 'arrows', label: 'Arrows' },
];

const MobileStickerPanel = memo(function MobileStickerPanel({ onAddClip, currentTime }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    let items = STICKER_PRESETS;
    if (category !== 'all') items = items.filter(s => s.category === category);
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(s => s.label.toLowerCase().includes(q) || s.emoji.includes(q));
    }
    return items;
  }, [search, category]);

  const addSticker = useCallback((sticker) => {
    onAddClip({
      ...DEFAULT_CLIP_PROPERTIES,
      id: genStickerId(),
      type: 'sticker',
      name: sticker.label,
      text: sticker.emoji,
      textSize: 72,
      textPosition: 'center',
      startTime: currentTime || 0,
      duration: 5,
      track: 1,
    });
  }, [onAddClip, currentTime]);

  return (
    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Search bar */}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search stickers..."
          style={{
            width: '100%', padding: '8px 12px 8px 32px', borderRadius: '8px',
            background: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.08)',
            color: '#e2e8f0', fontSize: '13px', fontFamily: "'Spline Sans', sans-serif",
            outline: 'none',
          }}
        />
        {/* Position the search icon absolutely */}
        <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <Icon i="search" s={16} c="#475569" />
        </div>
      </div>

      {/* Category filter */}
      <div style={{
        display: 'flex', gap: '4px', overflowX: 'auto',
        WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', paddingBottom: '2px',
      }}>
        {CATEGORIES.map(c => {
          const active = category === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              style={{
                flex: '0 0 auto', padding: '4px 12px', borderRadius: '12px', cursor: 'pointer',
                background: active ? 'rgba(117,170,219,0.15)' : 'transparent',
                border: active ? '1px solid rgba(117,170,219,0.3)' : '1px solid rgba(255,255,255,0.06)',
                color: active ? '#75aadb' : '#94a3b8',
                fontSize: '11px', fontWeight: 500,
                transition: 'all 0.15s ease',
              }}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Emoji grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px',
        maxHeight: '35vh', overflowY: 'auto', WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
      }}>
        {filtered.map((sticker, idx) => (
          <button
            key={`${sticker.emoji}-${idx}`}
            onClick={() => addSticker(sticker)}
            title={sticker.label}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '2px', padding: '8px 4px', borderRadius: '8px', cursor: 'pointer',
              background: 'rgba(255,255,255,0.02)', border: '1px solid transparent',
              transition: 'all 0.1s ease', fontSize: '28px', lineHeight: 1,
            }}
          >
            <span>{sticker.emoji}</span>
            <span style={{ fontSize: '8px', color: '#64748b', lineHeight: 1.2 }}>{sticker.label}</span>
          </button>
        ))}
        {filtered.length === 0 && (
          <div style={{
            gridColumn: '1 / -1', textAlign: 'center', padding: '24px 0',
            color: '#475569', fontSize: '12px',
          }}>
            No stickers found
          </div>
        )}
      </div>
    </div>
  );
});

export default MobileStickerPanel;
