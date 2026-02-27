import { useRef, useState, useEffect, useCallback, memo } from 'react';
import Icon from './Icon';
import { styles } from './styles';
import { SCROLLBAR_CSS } from './constants';

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
  index
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isThumbnailLoaded, setIsThumbnailLoaded] = useState(false);

  useEffect(() => {
    setIsThumbnailLoaded(false);
  }, [item.thumbnail]);
  
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
        opacity: isDragging ? 0.5 : 1
      }}
    >
      <div 
        className="media-item-thumbnail"
        style={{
          aspectRatio: '16/9',
          borderRadius: '6px',
          overflow: 'hidden',
          border: isSelected 
            ? '2px solid #75aadb' 
            : isHovered
              ? '1px solid rgba(117, 170, 219, 0.5)'
              : '1px solid rgba(255,255,255,0.06)',
          position: 'relative',
          background: '#0a0a0a'
        }}
      >
        {(item.isProcessing || (item.thumbnail && !isThumbnailLoaded)) && (
          <div 
            className="thumbnail-loading"
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              inset: 0
            }}
          />
        )}

        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.name}
            loading="lazy"
            onLoad={() => setIsThumbnailLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              opacity: isThumbnailLoaded ? 1 : 0,
              transition: 'opacity 0.12s ease'
            }}
          />
        ) : !item.isProcessing ? (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a2332 0%, #0a0a0a 100%)'
          }}>
            <Icon i={item.type === 'audio' ? 'music_note' : 'movie'} s={24} c="#475569" />
          </div>
        ) : null}
        
        {/* Duration badge */}
        <span style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
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
      height: '200px',
      color: '#475569',
      textAlign: 'center',
      padding: '20px'
    }}
    role="status"
    aria-label="No media imported"
  >
    <div style={{
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: 'rgba(117, 170, 219, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16px'
    }}>
      <Icon i="video_library" s={36} c="#475569" />
    </div>
    <p style={{ 
      fontSize: '13px', 
      margin: '0 0 6px 0',
      fontWeight: 500,
      color: '#64748b'
    }}>
      No media imported
    </p>
    <p style={{ 
      fontSize: '11px', 
      color: '#475569', 
      margin: 0,
      lineHeight: 1.5
    }}>
      Click Import or drag & drop<br />
      video and audio files here
    </p>
  </div>
));

EmptyState.displayName = 'EmptyState';

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
  isImporting = false
}) => {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  
  const handleFileChange = useCallback((e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0 && onImportMedia) {
      onImportMedia(files);
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
    
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type.startsWith('video/') || file.type.startsWith('audio/')
    );
    
    if (files.length > 0 && onImportMedia) {
      onImportMedia(files);
    }
  }, [onImportMedia]);
  
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleImportClick();
    }
  }, [handleImportClick]);
  
  return (
    <aside 
      style={styles.leftPanel}
      role="complementary"
      aria-label="Media panel"
    >
      {/* Spinner animation */}
      <style>{MEDIA_PANEL_CSS}</style>
      
      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "16px" }} role="tablist" aria-label="Media sources">
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
                  fontSize: "12px",
                  fontWeight: 700,
                  paddingBottom: "6px",
                  color: mediaTab === t.toLowerCase() ? "#75aadb" : "#64748b",
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "4px" }} role="group" aria-label="View mode">
            <button
              onClick={() => setViewMode('list')}
              className="view-toggle-btn"
              style={{ 
                ...styles.ghost,
                background: viewMode === 'list' ? 'rgba(117, 170, 219, 0.15)' : 'transparent'
              }}
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
              title="List view"
            >
              <Icon i="list" s={18} c={viewMode === 'list' ? '#75aadb' : '#475569'} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className="view-toggle-btn"
              style={{ 
                ...styles.ghost,
                background: viewMode === 'grid' ? 'rgba(117, 170, 219, 0.15)' : 'transparent'
              }}
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
              title="Grid view"
            >
              <Icon i="grid_view" s={18} c={viewMode === 'grid' ? '#75aadb' : '#cbd5e1'} />
            </button>
          </div>
        </div>
        
        {/* Import button / Drop zone */}
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*,audio/*"
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
            borderColor: dragOver ? '#75aadb' : 'rgba(255,255,255,0.08)',
            background: dragOver ? 'rgba(117,170,219,0.1)' : 'transparent',
            opacity: isImporting ? 0.6 : 1,
            cursor: isImporting ? 'wait' : 'pointer'
          }}
          aria-label={isImporting ? 'Importing media...' : 'Import media files'}
          title="Click to browse or drag & drop files"
        >
          {isImporting ? (
            <>
              <div style={{
                width: '26px',
                height: '26px',
                border: '2px solid #75aadb',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <span style={{ fontSize: "12px", color: "#75aadb", fontWeight: 500 }}>Importing...</span>
            </>
          ) : (
            <>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: dragOver ? 'rgba(117, 170, 219, 0.2)' : 'rgba(100, 116, 139, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}>
                <Icon i={dragOver ? "file_download" : "add_circle"} s={24} c={dragOver ? "#75aadb" : "#64748b"} />
              </div>
              <span style={{ 
                fontSize: "12px", 
                color: dragOver ? "#75aadb" : "#64748b",
                fontWeight: dragOver ? 500 : 400,
                transition: 'all 0.2s ease'
              }}>
                {dragOver ? 'Release to import' : 'Import'}
              </span>
              <span style={{ 
                fontSize: "10px", 
                color: "#475569"
              }}>
                or drag & drop
              </span>
            </>
          )}
          {mediaItems.length > 0 && !isImporting && (
            <div style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              minWidth: "20px",
              height: "20px",
              background: "#75aadb",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: 700,
              color: "#0a0a0a",
              padding: "0 6px",
              boxShadow: '0 2px 8px rgba(117, 170, 219, 0.3)'
            }}>
              {mediaItems.length}
            </div>
          )}
        </button>
      </div>
      
      {/* Media grid */}
      <div 
        style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }} 
        className="cs"
        role="tabpanel"
        id={`${mediaTab}-panel`}
        aria-label={`${mediaTab} media`}
      >
        {mediaItems.length === 0 ? (
          <EmptyState />
        ) : (
          <div 
            style={{ 
              display: viewMode === 'grid' ? "grid" : "flex",
              gridTemplateColumns: viewMode === 'grid' ? "1fr 1fr" : undefined,
              flexDirection: viewMode === 'list' ? 'column' : undefined,
              gap: "10px" 
            }}
            role="list"
            aria-label="Imported media items"
          >
            {mediaItems.map((item, index) => (
              <MediaItem
                key={item.id}
                item={item}
                isSelected={selectedMediaId === item.id}
                onSelect={onSelectMedia}
                onAddToTimeline={onAddToTimeline}
                onRemove={onRemoveMedia}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default memo(MediaPanel);
