import { useRef, useState, useCallback, useMemo, useEffect, memo } from 'react';
import Icon from './Icon';
import { styles } from './styles';
import { SCROLLBAR_CSS } from './constants';
import { validateFiles, getAcceptString } from '../../utils/fileValidation';

/* ========== CSS ANIMATIONS ========== */
const MEDIA_PANEL_CSS = `
  ${SCROLLBAR_CSS}
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(117, 170, 219, 0.4); }
    50% { box-shadow: 0 0 0 8px rgba(117, 170, 219, 0); }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  .media-item {
    animation: fadeIn 0.3s ease forwards;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  
  .media-item:hover {
    transform: translateY(-2px);
  }
  
  .media-item:active {
    transform: translateY(0) scale(0.98);
  }
  
  .media-item-thumbnail {
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  
  .media-item:hover .media-item-thumbnail {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  }
  
  .media-item-overlay {
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  .media-item:hover .media-item-overlay {
    opacity: 1;
  }
  
  .import-btn {
    transition: all 0.2s ease;
  }
  
  .import-btn:hover:not(:disabled) {
    border-color: #75aadb !important;
    background: rgba(117, 170, 219, 0.08) !important;
    transform: translateY(-1px);
  }
  
  .import-btn:active:not(:disabled) {
    transform: translateY(0) scale(0.99);
  }
  
  .import-btn-dragover {
    animation: pulse-glow 1.5s ease-in-out infinite;
    border-color: #75aadb !important;
    background: rgba(117, 170, 219, 0.15) !important;
  }
  
  .tab-btn {
    transition: all 0.15s ease;
    position: relative;
  }
  
  .tab-btn::after {
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
  
  .tab-btn.active::after {
    transform: scaleX(1);
  }
  
  .view-toggle-btn {
    transition: all 0.15s ease;
    padding: 4px;
    border-radius: 4px;
  }
  
  .view-toggle-btn:hover {
    background: rgba(255, 255, 255, 0.08);
  }
  
  .remove-btn {
    transition: all 0.15s ease;
  }
  
  .remove-btn:hover {
    transform: scale(1.1);
    background: #dc2626 !important;
  }
  
  .thumbnail-loading {
    background: linear-gradient(90deg, #1a2332 25%, #2a3a4d 50%, #1a2332 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
  }
  
  .add-to-timeline-btn {
    opacity: 0;
    transform: translateY(4px);
    transition: all 0.2s ease;
  }
  
  .media-item:hover .add-to-timeline-btn {
    opacity: 1;
    transform: translateY(0);
  }
  
  .empty-state-icon {
    animation: fadeIn 0.5s ease;
  }
`;

/* ========== MEDIA ITEM COMPONENT ========== */
const MediaItem = memo(({
  item,
  isSelected,
  onSelect,
  onAddToTimeline,
  onRemove,
  onContextMenu,
  index
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const formatDuration = useCallback((seconds) => {
    if (!seconds || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);
  
  const handleDragStart = useCallback((e) => {
    setIsDragging(true);
    e.dataTransfer.setData('mediaItemId', item.id);
    e.dataTransfer.setData('mediaType', item.type || 'video');
    e.dataTransfer.effectAllowed = 'copy';
    
    // Create a custom drag image using safe DOM methods (no innerHTML to prevent XSS)
    const dragImage = document.createElement('div');
    dragImage.style.cssText = `
      background: #1a2332;
      border: 1px solid #75aadb;
      border-radius: 6px;
      padding: 8px 12px;
      color: white;
      font-size: 12px;
      font-family: 'Spline Sans', sans-serif;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    `;
    
    // Use textContent instead of innerHTML to prevent XSS
    const playIcon = document.createElement('span');
    playIcon.style.color = '#75aadb';
    playIcon.textContent = '▶';
    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = item.name; // Safe: textContent escapes HTML
    
    dragImage.appendChild(playIcon);
    dragImage.appendChild(nameSpan);
    
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 20, 20);
    
    // Remove the drag image after a short delay
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  }, [item.id, item.type, item.name]);
  
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAddToTimeline(item);
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      onRemove(item.id);
    }
  }, [item, onAddToTimeline, onRemove]);
  
  return (
    <div 
      onClick={() => onSelect(item.id)}
      onDoubleClick={() => onAddToTimeline(item)}
      onContextMenu={(e) => { e.preventDefault(); onContextMenu?.(e, item); }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="media-item"
      role="button"
      tabIndex={0}
      aria-label={`${item.name}, ${formatDuration(item.duration)}, ${item.width}x${item.height}. Double-click or press Enter to add to timeline.`}
      aria-selected={isSelected}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        cursor: 'pointer',
        position: 'relative',
        animationDelay: `${index * 50}ms`,
        opacity: isDragging ? 0.5 : 1,
        minWidth: 0,
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}
    >
      <div 
        className="media-item-thumbnail"
        style={{
          width: '100%',
          maxWidth: '100%',
          minWidth: 0,
          aspectRatio: '16/9',
          borderRadius: '6px',
          overflow: 'hidden',
          border: isSelected 
            ? '2px solid #75aadb' 
            : isHovered
              ? '1px solid rgba(117, 170, 219, 0.5)'
              : '1px solid rgba(255,255,255,0.06)',
          position: 'relative',
          background: '#0a0a0a',
          boxSizing: 'border-box',
          flexShrink: 0
        }}
      >
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.name}
            loading="lazy"
            draggable={false}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              objectFit: 'cover',
              display: 'block',
              pointerEvents: 'none'
            }}
          />
        ) : item.isProcessing ? (
          <div 
            className="thumbnail-loading"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%'
            }}
          />
        ) : (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a2332 0%, #0a0a0a 100%)'
          }}>
            <Icon i={item.type === 'audio' ? 'music_note' : 'movie'} s={24} c="#475569" />
          </div>
        )}
        
        {/* Duration badge */}
        <span style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          zIndex: 2,
          background: 'rgba(0,0,0,0.8)',
          fontSize: '9px',
          padding: '2px 6px',
          borderRadius: '3px',
          color: 'white',
          fontWeight: 500,
          letterSpacing: '0.5px',
          backdropFilter: 'blur(4px)'
        }}>
          {formatDuration(item.duration)}
        </span>
        
        {/* Hover overlay with actions */}
        <div 
          className="media-item-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '8px'
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToTimeline(item);
            }}
            className="add-to-timeline-btn"
            style={{
              background: '#75aadb',
              border: 'none',
              borderRadius: '4px',
              padding: '4px 10px',
              fontSize: '10px',
              fontWeight: 600,
              color: '#0a0a0a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            aria-label={`Add ${item.name} to timeline`}
          >
            <Icon i="add" s={12} c="#0a0a0a" />
            Add to Timeline
          </button>
        </div>
        
        {/* Processing indicator */}
        {item.isProcessing && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(2px)'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              border: '2px solid #75aadb',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
          </div>
        )}
        
        {/* Remove button (visible on hover/selected) */}
        {(isSelected || isHovered) && !item.isProcessing && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(item.id);
            }}
            className="remove-btn"
            style={{
              position: 'absolute',
              top: '4px',
              left: '4px',
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              background: 'rgba(239,68,68,0.9)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
            }}
            aria-label={`Remove ${item.name}`}
            title="Remove from media library"
          >
            <Icon i="close" s={12} c="white" />
          </button>
        )}
        
        {/* Type indicator for audio */}
        {item.type === 'audio' && (
          <div style={{
            position: 'absolute',
            bottom: '4px',
            left: '4px',
            background: 'rgba(117, 170, 219, 0.9)',
            borderRadius: '4px',
            padding: '2px 6px',
            display: 'flex',
            alignItems: 'center',
            gap: '3px'
          }}>
            <Icon i="music_note" s={10} c="white" />
            <span style={{ fontSize: '8px', fontWeight: 600, color: 'white' }}>AUDIO</span>
          </div>
        )}
      </div>
      
      <p style={{
        fontSize: '10px',
        color: isSelected ? '#75aadb' : isHovered ? '#cbd5e1' : '#94a3b8',
        margin: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontWeight: isSelected ? 500 : 400,
        transition: 'color 0.15s ease'
      }}>
        {item.name}
      </p>
      
      {/* Resolution info */}
      {item.width && item.height && (
        <p style={{
          fontSize: '9px',
          color: '#475569',
          margin: 0
        }}>
          {item.width}x{item.height}
        </p>
      )}
    </div>
  );
});

MediaItem.displayName = 'MediaItem';

/* ========== EMPTY STATE COMPONENT ========== */
const EmptyState = memo(() => (
  <div
    className="empty-state-icon"
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '220px',
      color: '#475569',
      textAlign: 'center',
      padding: '24px',
    }}
    role="status"
    aria-label="No media imported"
  >
    <div style={{
      width: '72px',
      height: '72px',
      borderRadius: '18px',
      background: 'linear-gradient(135deg, rgba(117,170,219,0.08) 0%, rgba(117,170,219,0.02) 100%)',
      border: '1px solid rgba(117,170,219,0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    }}>
      <Icon i="video_library" s={32} c="#3d4a5c" />
    </div>
    <p style={{
      fontSize: '13px',
      margin: '0 0 6px 0',
      fontWeight: 600,
      color: '#64748b'
    }}>
      No media yet
    </p>
    <p style={{
      fontSize: '11px',
      color: '#3d4a5c',
      margin: '0 0 16px 0',
      lineHeight: 1.5
    }}>
      Import video and audio to start editing
    </p>
    <div style={{ display: "flex", gap: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <Icon i="keyboard" s={12} c="#2d3748" />
        <span style={{ fontSize: "9px", color: "#334155" }}>Ctrl+I</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <Icon i="mouse" s={12} c="#2d3748" />
        <span style={{ fontSize: "9px", color: "#334155" }}>Drag & Drop</span>
      </div>
    </div>
  </div>
));

EmptyState.displayName = 'EmptyState';

/* ========== CONTEXT MENU ========== */
const ContextMenu = memo(({ x, y, item, onClose, onAddToTimeline, onRemove }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handle = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', handle);
    document.addEventListener('keydown', handleKey);
    return () => { document.removeEventListener('mousedown', handle); document.removeEventListener('keydown', handleKey); };
  }, [onClose]);

  const menuItems = [
    { label: 'Add to timeline', icon: 'add', action: () => { onAddToTimeline(item); onClose(); } },
    { label: 'Delete from project', icon: 'delete', action: () => { onRemove(item.id); onClose(); }, color: '#ef4444' },
  ];

  return (
    <div ref={ref} style={{
      position: 'fixed', left: x, top: y, zIndex: 9999,
      background: '#1a2332', border: '1px solid rgba(117,170,219,0.15)',
      borderRadius: '8px', padding: '4px 0', minWidth: '160px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
    }}>
      {menuItems.map(m => (
        <button key={m.label} onClick={m.action} style={{
          ...styles.ghost, width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
          padding: '6px 12px', fontSize: '11px', fontWeight: 500,
          color: m.color || '#cbd5e1', textAlign: 'left',
        }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(117,170,219,0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <Icon i={m.icon} s={14} c={m.color || '#64748b'} />
          {m.label}
        </button>
      ))}
    </div>
  );
});
ContextMenu.displayName = 'ContextMenu';

/* ========== MEDIA PANEL COMPONENT (LEFT SIDEBAR) ========== */
const MediaPanel = ({ 
  mediaTab, 
  onMediaTabChange,
  mediaItems = [],
  onImportMedia,
  onRemoveMedia,
  onAddToTimeline,
  selectedMediaId,
  onSelectMedia,
  isImporting = false,
  style: styleProp
}) => {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'video' | 'audio'
  const [contextMenu, setContextMenu] = useState(null); // { x, y, item }

  // Filter media items by search and type
  const filteredItems = useMemo(() => {
    let items = mediaItems;
    if (typeFilter !== 'all') {
      items = items.filter(i => i.type === typeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i => i.name?.toLowerCase().includes(q));
    }
    return items;
  }, [mediaItems, typeFilter, searchQuery]);

  const typeCounts = useMemo(() => ({
    all: mediaItems.length,
    video: mediaItems.filter(i => i.type === 'video').length,
    audio: mediaItems.filter(i => i.type === 'audio').length,
  }), [mediaItems]);
  
  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  
  const handleFileChange = useCallback((e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0 && onImportMedia) {
      const { validFiles, errors } = validateFiles(files, { allowedCategories: ['video', 'audio'] });
      if (errors.length > 0) {
        alert(`Some files were rejected:\n${errors.map(e => `${e.file}: ${e.error}`).join('\n')}`);
      }
      if (validFiles.length > 0) {
        onImportMedia(validFiles);
      }
    }
    // Reset input
    e.target.value = '';
  }, [onImportMedia]);
  
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  }, []);
  
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set to false if leaving the drop zone entirely
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOver(false);
    }
  }, []);
  
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const { validFiles, errors } = validateFiles(droppedFiles, { allowedCategories: ['video', 'audio'] });

    if (errors.length > 0) {
      alert(`Some files were rejected:\n${errors.map(e => `${e.file}: ${e.error}`).join('\n')}`);
    }

    if (validFiles.length > 0 && onImportMedia) {
      onImportMedia(validFiles);
    }
  }, [onImportMedia]);
  
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleImportClick();
    }
  }, [handleImportClick]);

  const handleContextMenu = useCallback((e, item) => {
    setContextMenu({ x: e.clientX, y: e.clientY, item });
  }, []);

  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  return (
    <aside
      className="editor-left-panel"
      style={{ ...styles.leftPanel, ...styleProp }}
      role="complementary"
      aria-label="Media panel"
    >
      <style>{MEDIA_PANEL_CSS}</style>

      {/* Panel header */}
      <div style={{
        height: "32px", display: "flex", alignItems: "center", padding: "0 14px",
        borderBottom: "1px solid rgba(117,170,219,0.04)",
        background: "rgba(15,23,42,0.3)",
      }}>
        <span style={{ fontSize: "10px", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "1.5px" }}>
          Media
        </span>
        {mediaItems.length > 0 && (
          <span style={{
            marginLeft: "auto", fontSize: "9px", fontWeight: 600, color: "#75aadb",
            background: "rgba(117,170,219,0.1)", padding: "2px 8px", borderRadius: "10px",
          }}>
            {mediaItems.length} {mediaItems.length === 1 ? "file" : "files"}
          </span>
        )}
      </div>

      <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "0" }} role="tablist" aria-label="Media sources">
            {["Local", "Library"].map(t => (
              <button
                key={t}
                onClick={() => onMediaTabChange(t.toLowerCase())}
                role="tab"
                aria-selected={mediaTab === t.toLowerCase()}
                aria-controls={`${t.toLowerCase()}-panel`}
                className={`tab-btn ${mediaTab === t.toLowerCase() ? 'active' : ''}`}
                style={{
                  ...styles.ghost,
                  fontSize: "11px",
                  fontWeight: 600,
                  padding: "4px 12px 6px",
                  color: mediaTab === t.toLowerCase() ? "#75aadb" : "#4a5568",
                }}
              >
                {t}
              </button>
            ))}
          </div>
          {mediaTab === 'local' && (
            <div style={{ display: "flex", gap: "2px" }} role="group" aria-label="View mode">
              <button
                onClick={() => setViewMode('list')}
                className="view-toggle-btn"
                style={{
                  ...styles.ghost,
                  background: viewMode === 'list' ? 'rgba(117,170,219,0.12)' : 'transparent',
                  borderRadius: "4px", padding: "4px",
                }}
                aria-label="List view"
                aria-pressed={viewMode === 'list'}
                title="List view"
              >
                <Icon i="list" s={16} c={viewMode === 'list' ? '#75aadb' : '#475569'} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className="view-toggle-btn"
                style={{
                  ...styles.ghost,
                  background: viewMode === 'grid' ? 'rgba(117,170,219,0.12)' : 'transparent',
                  borderRadius: "4px", padding: "4px",
                }}
                aria-label="Grid view"
                aria-pressed={viewMode === 'grid'}
                title="Grid view"
              >
                <Icon i="grid_view" s={16} c={viewMode === 'grid' ? '#75aadb' : '#475569'} />
              </button>
            </div>
          )}
        </div>

        {/* Search + type filters */}
        {mediaTab === 'local' && mediaItems.length > 0 && (
          <>
            <div style={{ position: 'relative' }}>
              <Icon i="search" s={14} c="#4a5568" style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder="Search media..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%', background: 'rgba(26,35,50,0.4)', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '6px', padding: '5px 8px 5px 28px', color: 'white', fontSize: '11px',
                  outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
                }}
                aria-label="Search imported media"
              />
            </div>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {[{ key: 'all', label: 'All' }, { key: 'video', label: 'Video' }, { key: 'audio', label: 'Audio' }].map(f => (
                <button
                  key={f.key}
                  onClick={() => setTypeFilter(f.key)}
                  style={{
                    ...styles.ghost,
                    fontSize: '9px', fontWeight: 600, padding: '2px 8px', borderRadius: '10px',
                    color: typeFilter === f.key ? '#e2e8f0' : '#4a5568',
                    background: typeFilter === f.key ? 'rgba(117,170,219,0.15)' : 'rgba(255,255,255,0.03)',
                    border: typeFilter === f.key ? '1px solid rgba(117,170,219,0.25)' : '1px solid transparent',
                  }}
                  aria-pressed={typeFilter === f.key}
                >
                  {f.label} ({typeCounts[f.key]})
                </button>
              ))}
            </div>
          </>
        )}

        {mediaTab === 'local' && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept={getAcceptString(['video', 'audio'])}
              multiple
              onChange={handleFileChange}
              style={{ display: 'none' }}
              aria-hidden="true"
            />

            <button
              onClick={handleImportClick}
              onKeyDown={handleKeyDown}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              disabled={isImporting}
              className={`import-btn ${dragOver ? 'import-btn-dragover' : ''}`}
              style={{
                ...styles.importBtn,
                padding: "12px",
                borderColor: dragOver ? '#75aadb' : 'rgba(117,170,219,0.12)',
                background: dragOver ? 'rgba(117,170,219,0.08)' : 'rgba(117,170,219,0.02)',
                opacity: isImporting ? 0.6 : 1,
                cursor: isImporting ? 'wait' : 'pointer',
                flexDirection: "row",
                gap: "10px",
                justifyContent: "center",
              }}
              aria-label={isImporting ? 'Importing media...' : 'Import media files'}
              title="Click to browse or drag & drop files"
            >
              {isImporting ? (
                <>
                  <div style={{
                    width: '20px', height: '20px',
                    border: '2px solid #75aadb', borderTopColor: 'transparent',
                    borderRadius: '50%', animation: 'spin 1s linear infinite',
                  }} />
                  <span style={{ fontSize: "11px", color: "#75aadb", fontWeight: 600 }}>Importing...</span>
                </>
              ) : (
                <>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "6px",
                    background: dragOver ? 'rgba(117,170,219,0.2)' : 'rgba(117,170,219,0.08)',
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid rgba(117,170,219,0.12)",
                    transition: "all 0.2s ease",
                  }}>
                    <Icon i={dragOver ? "file_download" : "add"} s={16} c={dragOver ? "#75aadb" : "#64748b"} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1px" }}>
                    <span style={{
                      fontSize: "11px", fontWeight: 600,
                      color: dragOver ? "#75aadb" : "#94a3b8",
                      transition: "all 0.2s ease",
                    }}>
                      {dragOver ? 'Release to import' : 'Import Media'}
                    </span>
                    <span style={{ fontSize: "9px", color: "#3d4a5c" }}>
                      Video, audio — drag & drop or click
                    </span>
                  </div>
                </>
              )}
            </button>
          </>
        )}
      </div>

      {mediaTab === 'local' ? (
        /* Media grid */
        <div
          style={{ flex: 1, overflowY: "auto", overflowX: "hidden", minWidth: 0, padding: "0 16px 16px" }}
          className="cs"
          role="tabpanel"
          id="local-panel"
          aria-label="Local media"
        >
          {mediaItems.length === 0 ? (
            <EmptyState />
          ) : filteredItems.length === 0 ? (
            <div style={{ padding: '24px 16px', textAlign: 'center' }}>
              <Icon i="search_off" s={28} c="#3d4a5c" />
              <p style={{ fontSize: '11px', color: '#4a5568', margin: '8px 0 0' }}>No matching media</p>
            </div>
          ) : (
            <div
              style={{
                display: viewMode === 'grid' ? "grid" : "flex",
                gridTemplateColumns: viewMode === 'grid' ? "1fr 1fr" : undefined,
                flexDirection: viewMode === 'list' ? 'column' : undefined,
                gap: "10px",
                minWidth: 0,
                width: "100%"
              }}
              role="list"
              aria-label="Imported media items"
            >
              {filteredItems.map((item, index) => (
                <MediaItem
                  key={item.id}
                  item={item}
                  isSelected={selectedMediaId === item.id}
                  onSelect={onSelectMedia}
                  onAddToTimeline={onAddToTimeline}
                  onRemove={onRemoveMedia}
                  onContextMenu={handleContextMenu}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Library tab placeholder */
        <div
          role="tabpanel"
          id="library-panel"
          aria-label="Community library"
          style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', padding: '32px 24px', textAlign: 'center'
          }}
        >
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            background: 'rgba(117, 170, 219, 0.08)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', marginBottom: '16px'
          }}>
            <Icon i="public" s={32} c="#475569" />
          </div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#cbd5e1', margin: '0 0 6px' }}>
            Community Templates
          </p>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px', lineHeight: 1.5 }}>
            Browse and use templates shared by<br />other ClipCut creators
          </p>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '6px 14px', borderRadius: '20px',
            background: 'rgba(117, 170, 219, 0.08)', border: '1px solid rgba(117, 170, 219, 0.15)',
            fontSize: '11px', fontWeight: 600, color: '#75aadb'
          }}>
            <Icon i="schedule" s={14} c="#75aadb" />
            Coming Soon
          </span>
        </div>
      )}

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x} y={contextMenu.y} item={contextMenu.item}
          onClose={closeContextMenu}
          onAddToTimeline={onAddToTimeline}
          onRemove={onRemoveMedia}
        />
      )}
    </aside>
  );
};

export default memo(MediaPanel);
