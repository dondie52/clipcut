/**
 * Global toast notification system.
 *
 * Usage:
 *   import { toast } from './components/Toast'
 *   toast.error('Something went wrong')
 *   toast.success('Saved!')
 *   toast.info('Heads up...')
 *
 * Mount <ToastContainer /> once near the app root.
 * @module components/Toast
 */

import { useSyncExternalStore, useEffect } from 'react'

const DEFAULT_DURATION_MS = 4500

let nextId = 1
let toasts = []
const listeners = new Set()

const emit = () => {
  toasts = [...toasts]
  listeners.forEach((l) => l())
}

const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const getSnapshot = () => toasts

const dismiss = (id) => {
  toasts = toasts.filter((t) => t.id !== id)
  emit()
}

const push = (message, type, opts = {}) => {
  const id = nextId++
  const duration = opts.duration ?? DEFAULT_DURATION_MS
  toasts = [...toasts, { id, message: String(message), type }]
  emit()
  if (duration > 0) {
    setTimeout(() => dismiss(id), duration)
  }
  return id
}

export const toast = {
  error: (message, opts) => push(message, 'error', opts),
  success: (message, opts) => push(message, 'success', opts),
  info: (message, opts) => push(message, 'info', opts),
  dismiss,
}

const COLOURS = {
  error: { border: 'rgba(229, 99, 99, 0.45)', accent: '#e56363', icon: 'error' },
  success: { border: 'rgba(117, 170, 219, 0.45)', accent: '#75AADB', icon: 'check_circle' },
  info: { border: 'rgba(117, 170, 219, 0.35)', accent: '#75AADB', icon: 'info' },
}

const CONTAINER_STYLE = {
  position: 'fixed',
  top: '16px',
  right: '16px',
  zIndex: 10002,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  pointerEvents: 'none',
  maxWidth: 'calc(100vw - 32px)',
  fontFamily: "'Spline Sans', sans-serif",
}

const toastStyle = (type) => ({
  pointerEvents: 'auto',
  background: '#1a2332',
  border: `1px solid ${COLOURS[type].border}`,
  borderLeft: `3px solid ${COLOURS[type].accent}`,
  borderRadius: '10px',
  padding: '12px 14px 12px 12px',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
  fontSize: '13px',
  color: 'rgba(255,255,255,0.9)',
  minWidth: '260px',
  maxWidth: '380px',
  animation: 'clipcutToastIn 180ms ease-out',
})

const ICON_STYLE = (type) => ({
  fontFamily: 'Material Symbols Outlined',
  color: COLOURS[type].accent,
  fontSize: '20px',
  lineHeight: 1,
  flexShrink: 0,
  marginTop: '1px',
})

const MESSAGE_STYLE = {
  flex: 1,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  lineHeight: 1.4,
}

const DISMISS_STYLE = {
  background: 'none',
  border: 'none',
  color: 'rgba(255,255,255,0.45)',
  cursor: 'pointer',
  padding: '0 0 0 4px',
  lineHeight: 1,
  fontSize: '18px',
  fontFamily: 'Material Symbols Outlined',
  flexShrink: 0,
}

export const ToastContainer = () => {
  const items = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  useEffect(() => {
    if (typeof document === 'undefined') return
    if (document.getElementById('clipcut-toast-keyframes')) return
    const style = document.createElement('style')
    style.id = 'clipcut-toast-keyframes'
    style.textContent = `@keyframes clipcutToastIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }`
    document.head.appendChild(style)
  }, [])

  if (items.length === 0) return null

  return (
    <div style={CONTAINER_STYLE} aria-live="polite" aria-atomic="false">
      {items.map((t) => (
        <div key={t.id} style={toastStyle(t.type)} role={t.type === 'error' ? 'alert' : 'status'}>
          <span style={ICON_STYLE(t.type)} aria-hidden="true">{COLOURS[t.type].icon}</span>
          <span style={MESSAGE_STYLE}>{t.message}</span>
          <button
            type="button"
            style={DISMISS_STYLE}
            onClick={() => dismiss(t.id)}
            aria-label="Dismiss notification"
          >
            close
          </button>
        </div>
      ))}
    </div>
  )
}

export default ToastContainer
