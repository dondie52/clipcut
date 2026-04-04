import { memo, useState, useRef, useEffect, useCallback } from 'react';
import Icon from './Icon';
import { COLORS, FONTS, RADIUS, SHADOWS, Z_INDEX } from '../../constants/theme';

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
`;

/* ========== Message Component ========== */
const ChatMessage = memo(function ChatMessage({ msg }) {
  const isUser = msg.role === 'user';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start', gap: 4 }}>
      <div className={`ai-msg-bubble ${isUser ? 'ai-msg-user' : 'ai-msg-assistant'}`}>
        {msg.text}
      </div>
      {/* Action summary badges */}
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
      {/* Undo button after AI actions */}
      {msg.canUndo && msg.onUndo && (
        <button
          className="ai-undo-btn"
          onClick={msg.onUndo}
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '4px 10px', marginTop: 2,
            background: 'rgba(239,68,68,0.08)',
            border: `1px solid rgba(239,68,68,0.3)`,
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
const ThinkingIndicator = memo(function ThinkingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div className="ai-msg-bubble ai-msg-assistant" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 18px' }}>
        <div className="ai-thinking-dot" />
        <div className="ai-thinking-dot" />
        <div className="ai-thinking-dot" />
        <span style={{ marginLeft: 6, fontSize: 12, color: COLORS.TEXT_MUTED }}>Thinking...</span>
      </div>
    </div>
  );
});

/* ========== Main Panel ========== */
const AIChatPanel = memo(function AIChatPanel({
  isOpen,
  onClose,
  messages,
  isThinking,
  onSendMessage,
  isMobile = false,
}) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

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

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;
    onSendMessage(trimmed);
    setInput('');
  }, [input, isThinking, onSendMessage]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  if (!isOpen) return null;

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
        {messages.length === 0 && !isThinking && (
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
                    background: 'rgba(117,170,219,0.08)', border: `1px solid rgba(117,170,219,0.15)`,
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
        {isThinking && <ThinkingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div style={{
        padding: '12px', borderTop: `1px solid ${COLORS.BORDER_LIGHT}`,
        flexShrink: 0, display: 'flex', gap: 8, alignItems: 'flex-end',
      }}>
        <textarea
          ref={inputRef}
          className="ai-input-box"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask AI to edit your video..."
          rows={1}
          style={{
            flex: 1, resize: 'none', background: COLORS.BG_PANEL,
            border: `1px solid ${COLORS.BORDER_MEDIUM}`,
            borderRadius: 12, padding: '10px 14px',
            color: COLORS.TEXT_PRIMARY, fontSize: 13,
            fontFamily: FONTS.PRIMARY, lineHeight: 1.4,
            maxHeight: 100, overflowY: 'auto',
            transition: 'border-color 0.15s ease',
          }}
          onInput={e => {
            // Auto-resize textarea
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
