/**
 * Service Worker Registration Utility
 * Handles PWA service worker registration and updates
 */

/**
 * Register the service worker
 * @param {Object} options - Registration options
 * @param {Function} options.onNeedRefresh - Called when new content is available
 * @param {Function} options.onOfflineReady - Called when app is ready for offline use
 * @param {Function} options.onRegistered - Called when SW is registered
 * @param {Function} options.onError - Called on registration error
 */
export function registerSW(options = {}) {
  const {
    onNeedRefresh = () => {},
    onOfflineReady = () => {},
    onRegistered = () => {},
    onError = () => {},
  } = options;

  // Only register in production
  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });

        onRegistered(registration);

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000); // Every hour

        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content available
                onNeedRefresh();
              } else if (newWorker.state === 'activated') {
                // Ready for offline use
                onOfflineReady();
              }
            });
          }
        });

        // If already active, we're ready for offline
        if (registration.active) {
          onOfflineReady();
        }

        console.log('[SW] Service worker registered');
      } catch (error) {
        console.error('[SW] Registration failed:', error);
        onError(error);
      }
    });
  }
}

/**
 * Unregister the service worker
 */
export async function unregisterSW() {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    await registration.unregister();
    console.log('[SW] Service worker unregistered');
  }
}

/**
 * Check if the app is running as a PWA (installed)
 */
export function isPWA() {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true;
}

/**
 * Check if service worker is supported
 */
export function isServiceWorkerSupported() {
  return 'serviceWorker' in navigator;
}

/**
 * Get the current service worker registration
 */
export async function getRegistration() {
  if ('serviceWorker' in navigator) {
    return await navigator.serviceWorker.getRegistration();
  }
  return null;
}

/**
 * Force update the service worker
 */
export async function forceUpdate() {
  const registration = await getRegistration();
  if (registration) {
    await registration.update();
  }
}

/**
 * Skip waiting and activate new service worker immediately
 */
export async function skipWaiting() {
  const registration = await getRegistration();
  if (registration?.waiting) {
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    window.location.reload();
  }
}
