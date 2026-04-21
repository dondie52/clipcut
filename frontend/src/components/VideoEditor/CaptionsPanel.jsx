import { memo, useState, useCallback } from 'react';
import Icon from './Icon';
import { useMobile } from '../../hooks/useMobile';
import {
  CAPTION_STYLES,
  generateCaptionClips,
  parseManualTranscript,
  findClipsForSource,
} from '../../services/captionGenerator';

const STYLE_KEYS = Object.keys(CAPTION_STYLES);

const WORKER_URL = typeof import.meta !== 'undefined'
  ? import.meta.env?.VITE_TRANSCRIPT_WORKER_URL || ''
  : '';

/** Same idea as previewSrc: timeline “video” clips are anything that is not audio/text (see TimelineClip). */
function isTranscribableTimelineClip(c) {
  if (!c || c.isCaption) return false;
  if (c.type === 'audio' || c.type === 'text') return false;
  if (c.type === 'sticker') return false;
  return !!(c.file || c.blobUrl);
}

const formatStartTime = (t) => {
  const s = Math.max(0, t || 0);
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

const CaptionsPanel = memo(function CaptionsPanel({
  clips,
  onAddClip,
  onSetClips,
  currentTime,
  mediaItems,
  selectedClip,
  selectedClipId,
  onSelectClip,
  onClipUpdate,
}) {
  const isMobile = useMobile();
  const [selectedStyle, setSelectedStyle] = useState('classic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ stage: '', pct: 0, detail: null });
  const [error, setError] = useState('');
  const [manualText, setManualText] = useState('');
  const [abortController, setAbortController] = useState(null);

  const captionClipCount = clips.filter(c => c.isCaption).length;
  const hasWorker = !!WORKER_URL;

  // Prefer media library; else selected timeline clip; else first transcribable clip (must match preview — type may be omitted on older clips)
  const videoFromMedia = mediaItems?.find(m => m.type === 'video' && (m.file || m.blobUrl));
  const videoFromClip = (selectedClip && isTranscribableTimelineClip(selectedClip))
    ? selectedClip
    : clips?.find(isTranscribableTimelineClip);
  const videoSourceEntry = videoFromMedia || videoFromClip;
  const videoDuration = videoSourceEntry?.duration || 0;
  const videoSource = videoSourceEntry && (videoSourceEntry.file || videoSourceEntry.blobUrl);
  const buttonDisabled = isGenerating || !videoSource;

  const handleCancel = useCallback(() => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
    setIsGenerating(false);
    setProgress({ stage: '', pct: 0 });
    setError('Caption generation was cancelled.');
  }, [abortController]);

  const handleAutoGenerate = useCallback(async () => {
    if (!hasWorker) {
      setError('Set VITE_TRANSCRIPT_WORKER_URL to enable auto-captions.');
      return;
    }
    if (!videoSource) {
      setError('Import a video into the media library first (auto-captions need the source file or blob).');
      return;
    }

    const ac = new AbortController();
    setAbortController(ac);
    setIsGenerating(true);
    setError('');
    setProgress({ stage: 'extracting', pct: 0 });

    try {
      // Check for cancellation before starting
      if (ac.signal.aborted) return;

      // Caption only the audio the user kept on the timeline — any clip
      // referencing this source gets captions mapped into its trimmed window.
      // If the source is only in the media library (no timeline clip yet),
      // `videoClipsForSource` is empty and captions fall back to source-time
      // positioning, matching the old behavior.
      const videoClipsForSource = findClipsForSource(videoSourceEntry, clips);

      const captionClips = await generateCaptionClips(
        videoSource,
        WORKER_URL,
        selectedStyle,
        (stage, pct, detail) => {
          if (ac.signal.aborted) return;
          setProgress({ stage, pct, detail: detail || null });
        },
        videoClipsForSource,
      );

      if (ac.signal.aborted) return;

      console.log('[Captions] Adding', captionClips.length, 'clips to timeline (batched)');
      onSetClips(prev => [...prev, ...captionClips]);
      if (captionClips.length === 0) {
        setError('No captions were generated. The video may have no detectable speech.');
      }
    } catch (e) {
      if (ac.signal.aborted) return; // User cancelled — don't show error
      console.error('[Captions] Auto-generate failed:', e);

      let msg;
      if (e?.message === 'TRANSCRIPTION_FAILED') {
        msg = e.detail || 'Transcription failed for all audio chunks. Check your internet connection and worker URL.';
      } else if (e?.message?.includes('no audio track') || e?.message?.includes('unsupported codec')) {
        msg = 'This video has no audio track or uses an unsupported format. Use the manual transcript option below.';
      } else if (e?.message?.includes('blob URL') || e?.message?.includes('re-importing')) {
        msg = 'Failed to read the video file. Try re-importing the video.';
      } else if (e?.message?.includes('No speech detected')) {
        msg = 'No speech detected in the video. Use the manual transcript option below.';
      } else {
        msg = e.message || 'Failed to generate captions. Check the console for details.';
      }
      setError(msg);
    } finally {
      setIsGenerating(false);
      setAbortController(null);
    }
  }, [videoSource, hasWorker, selectedStyle, onSetClips, videoFromMedia, videoFromClip, videoSourceEntry, clips]);

  const handleManualGenerate = useCallback(() => {
    if (!manualText.trim()) return;
    setError('');
    const dur = videoDuration || 30; // fallback 30s if unknown
    const captionClips = parseManualTranscript(manualText, dur, selectedStyle);
    onSetClips(prev => [...prev, ...captionClips]);
    setManualText('');
  }, [manualText, videoDuration, selectedStyle, onSetClips]);

  const handleClearCaptions = useCallback(() => {
    onSetClips(prev => prev.filter(c => !c.isCaption));
  }, [onSetClips]);

  const getStageLabel = () => {
    const { stage, pct, detail } = progress;
    switch (stage) {
      case 'extracting':
        return pct > 0 ? `Extracting audio... ${pct}%` : 'Extracting audio...';
      case 'transcribing':
        if (detail?.totalChunks > 1) {
          return `Transcribing... chunk ${detail.chunk}/${detail.totalChunks}`;
        }
        return 'Transcribing speech...';
      case 'grouping':
        return 'Generating captions...';
      case 'done':
        return 'Done!';
      default:
        return 'Processing...';
    }
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '12px',
      padding: '14px', height: '100%', overflowY: 'auto',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <Icon i="closed_caption" s={20} c="#75aadb" />
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>Auto Captions</span>
      </div>

      {/* Style Selector */}
      <div>
        <p style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px' }}>
          Caption Style
        </p>
        <div style={isMobile ? {
          display: 'flex', gap: '8px', overflowX: 'auto',
          WebkitOverflowScrolling: 'touch', paddingBottom: '4px',
          scrollbarWidth: 'none',
        } : { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          {STYLE_KEYS.map(key => {
            const style = CAPTION_STYLES[key];
            const isActive = selectedStyle === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedStyle(key)}
                style={{
                  background: isActive ? 'rgba(117,170,219,0.15)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isActive ? 'rgba(117,170,219,0.4)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: '8px',
                  padding: isMobile ? '8px 12px' : '10px 8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  ...(isMobile ? { flex: '0 0 auto', minWidth: '120px' } : {}),
                }}
              >
                {/* Style preview */}
                <div style={{
                  background: '#0a0a0a',
                  borderRadius: '4px',
                  padding: '8px 6px',
                  marginBottom: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '32px',
                }}>
                  <span style={{
                    color: style.textColor,
                    fontSize: '11px',
                    fontWeight: style.textBold ? 700 : 400,
                    fontFamily: style.textFontFamily,
                    background: style.textBgColor || 'transparent',
                    padding: style.textBgColor ? '2px 6px' : '0',
                    borderRadius: '2px',
                  }}>
                    Sample text
                  </span>
                </div>
                <p style={{ fontSize: '11px', fontWeight: 600, color: '#e2e8f0', margin: '0 0 2px' }}>
                  {style.name}
                </p>
                <p style={{ fontSize: '9px', color: '#64748b', margin: 0 }}>
                  {style.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Auto-Generate Button */}
      {hasWorker && (
        <button
          onClick={handleAutoGenerate}
          disabled={buttonDisabled}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            background: isGenerating ? 'rgba(117,170,219,0.1)' : 'linear-gradient(135deg, #75aadb 0%, #5a8fc0 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: isMobile ? '12px' : '8px',
            padding: isMobile ? '14px 16px' : '10px 16px',
            fontSize: isMobile ? '14px' : '12px',
            fontWeight: 600,
            cursor: buttonDisabled ? 'not-allowed' : 'pointer',
            opacity: buttonDisabled ? 0.6 : 1,
            transition: 'all 0.15s ease',
            width: isMobile ? '100%' : undefined,
          }}
        >
          <Icon i={isGenerating ? "hourglass_empty" : "auto_awesome"} s={16} c="#fff" />
          {isGenerating ? 'Generating...' : 'Auto-Generate Captions'}
        </button>
      )}

      {/* Progress */}
      {isGenerating && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{
            height: '3px', borderRadius: '2px',
            background: 'rgba(117,170,219,0.15)',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', borderRadius: '2px',
              background: '#75aadb',
              width: `${progress.pct}%`,
              transition: 'width 0.3s ease',
            }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '10px', color: '#64748b', margin: 0 }}>
              {getStageLabel()}
            </p>
            <button
              onClick={handleCancel}
              style={{
                background: 'none',
                border: 'none',
                padding: '2px 6px',
                fontSize: '10px',
                fontWeight: 600,
                color: '#ef4444',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* No worker notice */}
      {!hasWorker && (
        <div style={{
          background: 'rgba(117,170,219,0.06)',
          border: '1px solid rgba(117,170,219,0.12)',
          borderRadius: '8px',
          padding: '10px 12px',
        }}>
          <p style={{ fontSize: '10px', color: '#75aadb', margin: '0 0 4px', fontWeight: 600 }}>
            Auto-generate requires API configuration
          </p>
          <p style={{ fontSize: '9px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
            Set VITE_TRANSCRIPT_WORKER_URL in .env to enable AI transcription. You can still paste a transcript manually below.
          </p>
        </div>
      )}

      {/* Divider */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        margin: '4px 0',
      }}>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
        <span style={{ fontSize: '9px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {hasWorker ? 'or paste transcript' : 'paste transcript'}
        </span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* Manual Transcript Input */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <textarea
          value={manualText}
          onChange={e => setManualText(e.target.value)}
          placeholder="Paste your transcript here... Sentences will be split into individual caption clips."
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px',
            padding: '10px',
            color: '#e2e8f0',
            fontSize: '11px',
            fontFamily: "'Spline Sans', sans-serif",
            minHeight: '80px',
            resize: 'vertical',
            outline: 'none',
          }}
        />
        <button
          onClick={handleManualGenerate}
          disabled={!manualText.trim()}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            background: manualText.trim() ? 'rgba(117,170,219,0.15)' : 'rgba(255,255,255,0.03)',
            color: manualText.trim() ? '#75aadb' : '#475569',
            border: `1px solid ${manualText.trim() ? 'rgba(117,170,219,0.3)' : 'rgba(255,255,255,0.06)'}`,
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '11px',
            fontWeight: 600,
            cursor: manualText.trim() ? 'pointer' : 'not-allowed',
            transition: 'all 0.15s ease',
          }}
        >
          <Icon i="text_fields" s={14} c={manualText.trim() ? '#75aadb' : '#475569'} />
          Generate from Text
        </button>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: '6px',
          padding: '8px 10px',
          fontSize: '10px',
          color: '#ef4444',
        }}>
          {error}
        </div>
      )}

      {/* Caption count + Clear */}
      {captionClipCount > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 10px',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '6px',
          border: '1px solid rgba(255,255,255,0.04)',
        }}>
          <span style={{ fontSize: '10px', color: '#94a3b8' }}>
            {captionClipCount} caption{captionClipCount !== 1 ? 's' : ''} on timeline
          </span>
          <button
            onClick={handleClearCaptions}
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '4px',
              padding: '3px 8px',
              fontSize: '10px',
              fontWeight: 600,
              color: '#ef4444',
              cursor: 'pointer',
            }}
          >
            Clear All
          </button>
        </div>
      )}

      {/* Mobile: Compact editor when a caption is selected */}
      {isMobile && selectedClip?.isCaption && onClipUpdate && (
        <div style={{
          background: 'rgba(117,170,219,0.06)', borderRadius: '8px',
          border: '1px solid rgba(117,170,219,0.12)', padding: '10px',
          display: 'flex', flexDirection: 'column', gap: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#75aadb' }}>Edit Caption</span>
            <button onClick={() => onSelectClip?.(null)} style={{
              background: 'none', border: 'none', color: '#64748b', fontSize: '10px', cursor: 'pointer',
            }}>Done</button>
          </div>
          <textarea
            value={selectedClip.text || ''}
            onChange={(e) => onClipUpdate(selectedClip.id, { text: e.target.value })}
            rows={2}
            style={{
              width: '100%', padding: '8px', borderRadius: '6px',
              background: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#e2e8f0', fontSize: '13px', fontFamily: "'Spline Sans', sans-serif",
              outline: 'none', resize: 'none',
            }}
          />
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input type="color" value={selectedClip.textColor || '#ffffff'}
              onChange={(e) => onClipUpdate(selectedClip.id, { textColor: e.target.value })}
              style={{ width: '36px', height: '36px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', flexShrink: 0 }}
            />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '9px', color: '#64748b' }}>Size: {selectedClip.textSize || 36}</span>
              <input type="range" min={16} max={120} value={selectedClip.textSize || 36}
                onChange={(e) => onClipUpdate(selectedClip.id, { textSize: Number(e.target.value) })}
                style={{ width: '100%', accentColor: '#75aadb' }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '9px', color: '#64748b' }}>Start (s)</span>
              <input type="number" step="0.1" min="0"
                value={(selectedClip.startTime ?? 0).toFixed(1)}
                onChange={(e) => onClipUpdate(selectedClip.id, { startTime: Math.max(0, parseFloat(e.target.value) || 0) })}
                style={{
                  width: '100%', padding: '6px', borderRadius: '4px', marginTop: '2px',
                  background: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#e2e8f0', fontSize: '12px', outline: 'none',
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '9px', color: '#64748b' }}>End (s)</span>
              <input type="number" step="0.1" min="0"
                value={((selectedClip.startTime || 0) + (selectedClip.duration || 0)).toFixed(1)}
                onChange={(e) => {
                  const end = Math.max(0, parseFloat(e.target.value) || 0);
                  onClipUpdate(selectedClip.id, { duration: Math.max(0.1, end - (selectedClip.startTime || 0)) });
                }}
                style={{
                  width: '100%', padding: '6px', borderRadius: '4px', marginTop: '2px',
                  background: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#e2e8f0', fontSize: '12px', outline: 'none',
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile: Tappable caption list */}
      {isMobile && captionClipCount > 0 && onSelectClip && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <p style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', margin: '0 0 4px' }}>
            Captions ({captionClipCount})
          </p>
          <div style={{ maxHeight: '120px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {clips.filter(c => c.isCaption).map(cap => (
              <button
                key={cap.id}
                onClick={() => onSelectClip(cap.id)}
                style={{
                  background: selectedClipId === cap.id ? 'rgba(117,170,219,0.15)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${selectedClipId === cap.id ? 'rgba(117,170,219,0.4)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: '8px', padding: '8px 10px',
                  textAlign: 'left', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '11px', color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                  {cap.text}
                </span>
                <span style={{ fontSize: '9px', color: '#64748b', flexShrink: 0, marginLeft: '8px' }}>
                  {formatStartTime(cap.startTime)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tip */}
      <p style={{ fontSize: '9px', color: '#3d4a5c', margin: '4px 0 0', lineHeight: 1.5 }}>
        {isMobile
          ? 'Tap a caption above to edit. Captions appear on track V2.'
          : 'Captions appear as text clips on track V2. Select any caption on the timeline to edit its text, timing, or style in the inspector.'
        }
      </p>
    </div>
  );
});

export default CaptionsPanel;
