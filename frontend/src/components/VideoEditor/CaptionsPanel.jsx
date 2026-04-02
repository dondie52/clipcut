import { memo, useState, useCallback } from 'react';
import Icon from './Icon';
import {
  CAPTION_STYLES,
  generateCaptionClips,
  parseManualTranscript,
} from '../../services/captionGenerator';

const STYLE_KEYS = Object.keys(CAPTION_STYLES);

const WORKER_URL = typeof import.meta !== 'undefined'
  ? import.meta.env?.VITE_TRANSCRIPT_WORKER_URL || ''
  : '';

const CaptionsPanel = memo(function CaptionsPanel({
  clips,
  onAddClip,
  onSetClips,
  currentTime,
  mediaItems,
}) {
  const [selectedStyle, setSelectedStyle] = useState('classic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ stage: '', pct: 0 });
  const [error, setError] = useState('');
  const [manualText, setManualText] = useState('');

  const captionClipCount = clips.filter(c => c.isCaption).length;
  const hasWorker = !!WORKER_URL;

  // Find the first video media item with a file for transcription
  const videoMedia = mediaItems?.find(m => m.type === 'video' && m.file);
  const videoDuration = videoMedia?.duration || 0;

  const handleAutoGenerate = useCallback(async () => {
    if (!videoMedia?.file || !hasWorker) return;
    setIsGenerating(true);
    setError('');
    setProgress({ stage: 'extracting', pct: 0 });

    try {
      const captionClips = await generateCaptionClips(
        videoMedia.file,
        WORKER_URL,
        selectedStyle,
        (stage, pct) => setProgress({ stage, pct }),
      );
      for (const clip of captionClips) {
        onAddClip(clip);
      }
    } catch (e) {
      console.error('[Captions] Auto-generate failed:', e);
      setError(e.message || 'Failed to generate captions');
    } finally {
      setIsGenerating(false);
    }
  }, [videoMedia, hasWorker, selectedStyle, onAddClip]);

  const handleManualGenerate = useCallback(() => {
    if (!manualText.trim()) return;
    setError('');
    const dur = videoDuration || 30; // fallback 30s if unknown
    const captionClips = parseManualTranscript(manualText, dur, selectedStyle);
    for (const clip of captionClips) {
      onAddClip(clip);
    }
    setManualText('');
  }, [manualText, videoDuration, selectedStyle, onAddClip]);

  const handleClearCaptions = useCallback(() => {
    onSetClips(prev => prev.filter(c => !c.isCaption));
  }, [onSetClips]);

  const stageLabel = {
    extracting: 'Extracting audio...',
    transcribing: 'Transcribing speech...',
    grouping: 'Generating captions...',
    done: 'Done!',
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
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
                  padding: '10px 8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
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
          disabled={isGenerating || !videoMedia}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            background: isGenerating ? 'rgba(117,170,219,0.1)' : 'linear-gradient(135deg, #75aadb 0%, #5a8fc0 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 16px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: isGenerating || !videoMedia ? 'not-allowed' : 'pointer',
            opacity: isGenerating || !videoMedia ? 0.6 : 1,
            transition: 'all 0.15s ease',
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
          <p style={{ fontSize: '10px', color: '#64748b', margin: 0 }}>
            {stageLabel[progress.stage] || 'Processing...'}
          </p>
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

      {/* Tip */}
      <p style={{ fontSize: '9px', color: '#3d4a5c', margin: '4px 0 0', lineHeight: 1.5 }}>
        Captions appear as text clips on track V3. Select any caption on the timeline to edit its text, timing, or style in the inspector.
      </p>
    </div>
  );
});

export default CaptionsPanel;
