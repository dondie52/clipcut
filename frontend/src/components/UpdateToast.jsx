import { useRegisterSW } from 'virtual:pwa-register/react'

const TOAST_STYLE = {
  position: 'fixed',
  bottom: '72px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10001,
  background: '#1a2332',
  border: '1px solid rgba(117,170,219,0.3)',
  borderRadius: '10px',
  padding: '10px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
  fontFamily: "'Spline Sans', sans-serif",
  fontSize: '13px',
  color: 'rgba(255,255,255,0.85)',
  maxWidth: 'calc(100vw - 32px)',
}

const RELOAD_BTN_STYLE = {
  background: '#75AADB',
  color: '#0a0a0a',
  border: 'none',
  borderRadius: '6px',
  padding: '6px 14px',
  fontWeight: 700,
  fontSize: '12px',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  fontFamily: 'inherit',
}

const DISMISS_BTN_STYLE = {
  background: 'none',
  border: 'none',
  color: 'rgba(255,255,255,0.4)',
  cursor: 'pointer',
  padding: '4px',
  lineHeight: 1,
  fontSize: '18px',
  fontFamily: 'Material Symbols Outlined',
}

/**
 * Shows a toast when a new service worker is waiting to activate.
 * Clicking "Reload" sends skipWaiting and refreshes the page.
 */
const UpdateToast = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW()

  if (!needRefresh) return null

  return (
    <div style={TOAST_STYLE} role="alert">
      <span>New version available</span>
      <button style={RELOAD_BTN_STYLE} onClick={() => updateServiceWorker(true)}>
        Reload
      </button>
      <button
        style={DISMISS_BTN_STYLE}
        onClick={() => setNeedRefresh(false)}
        aria-label="Dismiss update notification"
      >
        close
      </button>
    </div>
  )
}

export default UpdateToast
