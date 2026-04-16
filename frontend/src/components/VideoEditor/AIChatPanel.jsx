import { memo, useState, useRef, useEffect, useCallback } from 'react';
import Icon from './Icon';
import { COLORS, FONTS, RADIUS } from '../../constants/theme';

/* ========== CSS ========== */
const AI_CHAT_CSS = `
  @keyframes aiPulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
  @keyframes aiSlideIn {
    from { transform: translateX(100%); }
    to   { transform: translateX(0); }
  }
  @keyframes aiSlideOut {
    from { transform: translateX(0); }
    to   { transform: translateX(100%); }
  }
  @keyframes micPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
    50% { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
  }
  .ai-chat-panel { animation: aiSlideIn 0.25s cubic-bezier(0.32, 0.72, 0, 1); }
  .ai-chat-panel.closing { animation: aiSlideOut 0.2s ease forwards; }
  .ai-thinking-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: ${COLORS.PRIMARY_BLUE};
    animation: aiPulse 1.2s ease-in-out infinite;
  }
  .ai-thinking-dot:nth-child(2) { animation-delay: 0.2s; }
  .ai-thinking-dot:nth-child(3) { animation-delay: 0.4s; }
  .ai-msg-bubble {
    max-width: 85%;
    padding: 10px 14px;
    border-radius: 14px;
    font-size: 13px;
    line-height: 1.5;
    word-break: break-word;
  }
  .ai-msg-user {
    background: ${COLORS.PRIMARY_BLUE};
    color: #fff;
    border-bottom-right-radius: 4px;
    align-self: flex-end;
  }
  .ai-msg-assistant {
    background: ${COLORS.BG_CARD};
    color: ${COLORS.TEXT_SECONDARY};
    border-bottom-left-radius: 4px;
    align-self: flex-start;
  }
  .ai-input-box:focus {
    outline: none;
    border-color: ${COLORS.PRIMARY_BLUE} !important;
  }
  .ai-send-btn:hover:not(:disabled) {
    background: ${COLORS.PRIMARY_BLUE_DARK} !important;
  }
  .ai-undo-btn:hover {
    background: rgba(239,68,68,0.15) !important;
    border-color: ${COLORS.ERROR} !important;
  }
  .ai-mic-btn.listening {
    animation: micPulse 1.5s ease-in-out infinite;
    background: rgba(239,68,68,0.15) !important;
  }
  .ai-quick-chip:hover {
    background: rgba(117,170,219,0.18) !important;
    border-color: rgba(117,170,219,0.4) !important;
  }
  .ai-suggestion-card:hover {
    background: rgba(117,170,219,0.08) !important;
    border-color: rgba(117,170,219,0.25) !important;
  }
`;

const QUICK_ACTIONS = [
  { label: 'Auto-edit', prompt: 'add captions, remove silence, and apply cinematic filter' },
  { label: 'Captions', prompt: 'add captions' },
  { label: 'Remove silence', prompt: 'remove silence' },
  { label: 'Make vertical', prompt: 'make it vertical for TikTok' },
  { label: 'Highlights', prompt: 'find the best 60 seconds' },
];

/* ========== Message Component ========== */
const ChatMessage = memo(function ChatMessage({ msg }) {
  const isUser = msg.role === 'user';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start', gap: 4 }}>
      <div className={`ai-msg-bubble ${isUser ? 'ai-msg-user' : 'ai-msg-assistant'}`}>
        {msg.text}
      </div>
      {msg.actions && msg.actions.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, padding: '0 4px' }}>
          {msg.actions.map((a, i) => (
            <span key={i} style={{
              fontSize: 11, padding: '2px 8px', borderRadius: 10,
              background: 'rgba(117,170,219,0.12)', color: COLORS.PRIMARY_BLUE,
              fontFamily: FONTS.PRIMARY,
            }}>
              {a}
            </span>
          ))}
        </div>
      )}
      {msg.openMedia && (
        <button
          onClick={msg.openMedia}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', marginTop: 4,
            background: 'rgba(117,170,219,0.1)',
            border: `1px solid ${COLORS.PRIMARY_BLUE}`,
            borderRadius: 8, cursor: 'pointer',
            color: COLORS.PRIMARY_BLUE, fontSize: 12,
            fontFamily: FONTS.PRIMARY, transition: 'all 0.15s ease',
          }}
        >
          <Icon i="perm_media" s={14} c={COLORS.PRIMARY_BLUE} />
          Open Media
        </button>
      )}
      {msg.canUndo && msg.onUndo && (
        <button
          className="ai-undo-btn"
          onClick={msg.onUndo}
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '4px 10px', marginTop: 2,
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 8, cursor: 'pointer',
            color: COLORS.ERROR, fontSize: 11,
            fontFamily: FONTS.PRIMARY, transition: 'all 0.15s ease',
          }}
        >
          <Icon i="undo" s={13} c={COLORS.ERROR} />
          Undo AI Edit
        </button>
      )}
    </div>
  );
});

/* ========== Thinking Indicator ========== */
const ThinkingIndicator = memo(function ThinkingIndicator({ slowHint = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
      <div className="ai-msg-bubble ai-msg-assistant" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 18px' }}>
        <div className="ai-thinking-dot" />
        <div className="ai-thinking-dot" />
        <div className="ai-thinking-dot" />
        <span style={{ marginLeft: 6, fontSize: 12, color: COLORS.TEXT_MUTED }}>Thinking...</span>
      </div>
      {slowHint && (
        <div style={{ padding: '0 4px', fontSize: 11, color: COLORS.TEXT_SECONDARY, fontFamily: FONTS.PRIMARY, fontStyle: 'italic' }}>
          This can take up to 30 seconds on a cold start…
        </div>
      )}
    </div>
  );
});

/* ========== Suggestion Card ========== */
const SuggestionCard = memo(function SuggestionCard({ suggestion, onApply }) {
  return (
    <button
      className="ai-suggestion-card"
      onClick={() => onApply(suggestion)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        width: '100%', padding: '10px 12px', textAlign: 'left',
        background: 'rgba(117,170,219,0.04)',
        border: '1px solid rgba(117,170,219,0.12)',
        borderRadius: 10, cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
    >
      <div style={{
        width: 32, height: 32, borderRadius: 8, flexShrink: 0,
        background: 'rgba(117,170,219,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon i={suggestion.icon} s={16} c={COLORS.PRIMARY_BLUE} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.TEXT_PRIMARY, fontFamily: FONTS.PRIMARY }}>
          {suggestion.title}
        </div>
        <div style={{ fontSize: 11, color: COLORS.TEXT_MUTED, fontFamily: FONTS.PRIMARY, marginTop: 1 }}>
          {suggestion.description}
        </div>
      </div>
      <Icon i="arrow_forward" s={14} c={COLORS.TEXT_MUTED} />
    </button>
  );
});

/* ========== Main Panel ========== */
const AIChatPanel = memo(function AIChatPanel({
  isOpen,
  onClose,
  messages,
  isThinking,
  slowHint = false,
  onSendMessage,
  suggestions = [],
  onApplySuggestion,
  isMobile = false,
}) {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const hasShownWelcomeRef = useRef(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // Show welcome message on first open per session (mobile only)
  useEffect(() => {
    if (isOpen && isMobile && !hasShownWelcomeRef.current && messages.length === 0) {
      hasShownWelcomeRef.current = true;
      setShowWelcome(true);
    }
  }, [isOpen, isMobile, messages.length]);

  // Hide welcome once the user sends a message
  useEffect(() => {
    if (messages.length > 0) setShowWelcome(false);
  }, [messages.length]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isThinking]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Cleanup speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }
    };
  }, []);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;
    onSendMessage(trimmed);
    setInput('');
    // Reset textarea height
    if (inputRef.current) inputRef.current.style.height = 'auto';
  }, [input, isThinking, onSendMessage]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  // Voice input via Web Speech API
  const toggleVoice = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return; // Not supported

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(r => r[0].transcript)
        .join('');
      setInput(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.onerror = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);

    // Auto-stop after 5 seconds of silence
    setTimeout(() => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }, 8000);
  }, [isListening]);

  const handleQuickAction = useCallback((prompt) => {
    if (isThinking) return;
    onSendMessage(prompt);
  }, [isThinking, onSendMessage]);

  const handleSuggestionApply = useCallback((suggestion) => {
    if (onApplySuggestion) {
      onApplySuggestion(suggestion);
    } else {
      // Fallback: send as a prompt
      onSendMessage(suggestion.title);
    }
  }, [onApplySuggestion, onSendMessage]);

  if (!isOpen) return null;

  const hasSpeechAPI = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const panelWidth = isMobile ? '100%' : '360px';

  const content = (
    <>
      <style>{AI_CHAT_CSS}</style>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', borderBottom: `1px solid ${COLORS.BORDER_LIGHT}`,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon i="auto_awesome" s={18} c={COLORS.PRIMARY_BLUE} />
          <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.TEXT_PRIMARY, fontFamily: FONTS.PRIMARY }}>
            AI Editor
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 32, borderRadius: RADIUS.MD,
            transition: 'background 0.15s ease',
          }}
          aria-label="Close AI panel"
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <Icon i="close" s={18} c={COLORS.TEXT_MUTED} />
        </button>
      </div>

      {/* Messages area */}
      <div style={{
        flex: '1 1 0%', overflowY: 'auto', overflowX: 'hidden',
        padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 12,
        minHeight: 0,
      }} className="cs">
        {/* Suggestions section (shown when there are suggestions and few messages) */}
        {suggestions.length > 0 && messages.length < 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.TEXT_MUTED, fontFamily: FONTS.PRIMARY, textTransform: 'uppercase', letterSpacing: '0.5px', padding: '0 4px' }}>
              Suggestions
            </span>
            {suggestions.map(s => (
              <SuggestionCard key={s.id} suggestion={s} onApply={handleSuggestionApply} />
            ))}
          </div>
        )}

        {/* Welcome message — mobile only, first open per session */}
        {showWelcome && messages.length === 0 && (
          <div className="ai-msg-bubble ai-msg-assistant" style={{ alignSelf: 'flex-start' }}>
            Hi! I'm your AI video editor. Try 'add captions' or 'remove silence'. What would you like to do?
          </div>
        )}

        {/* Empty state — only when no messages AND no suggestions AND no welcome */}
        {messages.length === 0 && !isThinking && suggestions.length === 0 && !showWelcome && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 12, padding: '40px 16px', textAlign: 'center' }}>
            <Icon i="auto_awesome" s={40} c="rgba(117,170,219,0.25)" />
            <span style={{ fontSize: 14, color: COLORS.TEXT_MUTED, fontFamily: FONTS.PRIMARY, lineHeight: 1.6 }}>
              Tell me what to do with your video.
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
              {['Add captions', 'Remove silence', 'Make it cinematic', 'Speed up 2x'].map(hint => (
                <button
                  key={hint}
                  onClick={() => { setInput(hint); inputRef.current?.focus(); }}
                  style={{
                    background: 'rgba(117,170,219,0.08)', border: '1px solid rgba(117,170,219,0.15)',
                    borderRadius: 20, padding: '6px 14px', cursor: 'pointer',
                    color: COLORS.PRIMARY_BLUE, fontSize: 12, fontFamily: FONTS.PRIMARY,
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(117,170,219,0.15)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(117,170,219,0.08)'; }}
                >
                  {hint}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <ChatMessage key={msg.id || i} msg={msg} />
        ))}
        {isThinking && <ThinkingIndicator slowHint={slowHint} />}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick action chips — horizontal scroll, no wrap */}
      <div style={{
        padding: isMobile ? '6px 16px 0' : '6px 12px 0', flexShrink: 0,
        display: 'flex', flexWrap: 'nowrap', gap: 6,
        overflowX: 'auto', overflowY: 'hidden',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
      }}>
        {QUICK_ACTIONS.map(qa => (
          <button
            key={qa.label}
            className="ai-quick-chip"
            onClick={() => handleQuickAction(qa.prompt)}
            disabled={isThinking}
            style={{
              whiteSpace: 'nowrap', flexShrink: 0,
              padding: '4px 10px', borderRadius: 14,
              background: 'rgba(117,170,219,0.06)',
              border: '1px solid rgba(117,170,219,0.15)',
              color: COLORS.PRIMARY_BLUE, fontSize: 11, fontFamily: FONTS.PRIMARY,
              cursor: isThinking ? 'not-allowed' : 'pointer',
              opacity: isThinking ? 0.5 : 1,
              transition: 'all 0.15s ease',
            }}
          >
            {qa.label}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div style={{
        padding: '8px 12px 12px', borderTop: `1px solid ${COLORS.BORDER_LIGHT}`,
        flexShrink: 0, display: 'flex', gap: 6, alignItems: 'flex-end',
        marginTop: 4,
      }}>
        {/* Voice input button */}
        {hasSpeechAPI && (
          <button
            className={`ai-mic-btn${isListening ? ' listening' : ''}`}
            onClick={toggleVoice}
            style={{
              width: isMobile ? 44 : 32, height: isMobile ? 44 : 32,
              minWidth: isMobile ? 44 : 32, minHeight: isMobile ? 44 : 32,
              borderRadius: RADIUS.MD, border: 'none', cursor: 'pointer',
              background: isListening ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.04)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s ease', flexShrink: 0,
            }}
            aria-label={isListening ? 'Stop listening' : 'Voice input'}
            title={isListening ? 'Stop listening' : 'Voice input'}
          >
            <Icon i={isListening ? 'mic' : 'mic_none'} s={isMobile ? 22 : 16} c={isListening ? COLORS.ERROR : COLORS.TEXT_MUTED} />
          </button>
        )}
        <textarea
          ref={inputRef}
          className="ai-input-box"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? 'Listening...' : 'Ask AI to edit your video...'}
          rows={1}
          style={{
            flex: 1, resize: 'none', background: COLORS.BG_PANEL,
            border: `1px solid ${isListening ? COLORS.ERROR : COLORS.BORDER_MEDIUM}`,
            borderRadius: 12, padding: '10px 14px',
            color: COLORS.TEXT_PRIMARY, fontSize: 13,
            fontFamily: FONTS.PRIMARY, lineHeight: 1.4,
            maxHeight: 100, overflowY: 'auto',
            transition: 'border-color 0.15s ease',
          }}
          onInput={e => {
            e.target.style.height = 'auto';
            e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
          }}
        />
        <button
          className="ai-send-btn"
          onClick={handleSend}
          disabled={!input.trim() || isThinking}
          style={{
            width: isMobile ? 48 : 36, height: isMobile ? 48 : 36,
            minWidth: isMobile ? 48 : 36, minHeight: isMobile ? 48 : 36,
            borderRadius: RADIUS.MD, border: 'none', cursor: 'pointer',
            background: input.trim() && !isThinking ? COLORS.PRIMARY_BLUE : COLORS.BG_CARD,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.15s ease',
            opacity: !input.trim() || isThinking ? 0.5 : 1,
            flexShrink: 0,
          }}
          aria-label="Send message"
        >
          <Icon i="send" s={isMobile ? 22 : 18} c={input.trim() && !isThinking ? '#fff' : COLORS.TEXT_MUTED} />
        </button>
      </div>
    </>
  );

  // Desktop: side panel
  if (!isMobile) {
    return (
      <div
        className="ai-chat-panel"
        style={{
          width: panelWidth, flexShrink: 0,
          display: 'flex', flexDirection: 'column',
          background: COLORS.BG_SECONDARY, height: '100%',
          borderLeft: `1px solid ${COLORS.BORDER_LIGHT}`,
          overflow: 'hidden',
        }}
        role="complementary"
        aria-label="AI editing assistant"
      >
        {content}
      </div>
    );
  }

  // Mobile: rendered inside BottomSheet by parent
  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column',
        height: '100%', minHeight: 0,
      }}
      role="complementary"
      aria-label="AI editing assistant"
    >
      {content}
    </div>
  );
});

AIChatPanel.displayName = 'AIChatPanel';

export default AIChatPanel;
