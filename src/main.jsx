import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register'
import { initErrorAlerts, logger } from './utils'

initErrorAlerts()

// Register service worker with auto-update
if (import.meta.env.PROD) {
  registerSW({
    onNeedRefresh() {
      // Optionally show a prompt to the user about the update
      logger.info('[PWA] New content available, refresh to update')
    },
    onOfflineReady() {
      logger.info('[PWA] App ready to work offline')
    },
    onRegistered(registration) {
      logger.info('[PWA] Service worker registered')
      // Check for updates every hour
      if (registration) {
        setInterval(() => {
          registration.update()
        }, 60 * 60 * 1000)
      }
    },
    onRegisterError(error) {
      logger.error('[PWA] Service worker registration failed', { error })
    },
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
