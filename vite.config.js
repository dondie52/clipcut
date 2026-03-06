import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import { VitePWA } from 'vite-plugin-pwa'

/**
 * Security headers for both development and production
 */
const securityHeaders = {
  // Required for SharedArrayBuffer (FFmpeg WASM)
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'credentialless',
  // Security headers
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' blob: https://www.googletagmanager.com https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://*.supabase.co; media-src 'self' blob: https://*.supabase.co; connect-src 'self' blob: https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://*.sentry.io https://unpkg.com https://generativelanguage.googleapis.com https://api.cloudflare.com https://*.workers.dev http://localhost:*; worker-src 'self' blob:; child-src 'self' blob:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
}

/**
 * Check if running bundle analysis
 */
const isAnalyze = process.env.ANALYZE === 'true'

export default defineConfig({
  plugins: [
    react(),
    // PWA with Service Worker
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['images/*.webp', 'images/*.jpeg'],
      manifest: {
        name: 'ClipCut - Video Editor',
        short_name: 'ClipCut',
        description: 'Free, open-source video editor for content creators',
        theme_color: '#75AADB',
        background_color: '#0a0a0a',
        display: 'standalone',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        // Cache strategies
        runtimeCaching: [
          {
            // Cache static assets (JS, CSS)
            urlPattern: /^https:\/\/.*\.(js|css)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-assets',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            // Cache images
            urlPattern: /^https:\/\/.*\.(png|jpg|jpeg|webp|svg|gif)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            // Cache Google Fonts
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          {
            // Cache Google Font files
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          {
            // Cache FFmpeg WASM files (large, cache for longer)
            urlPattern: /^https:\/\/unpkg\.com\/@ffmpeg\/core.*\.(js|wasm)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'ffmpeg-wasm',
              expiration: {
                maxEntries: 5,
                maxAgeSeconds: 60 * 60 * 24 * 90, // 90 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // Network-first for API calls to Supabase
            urlPattern: /^https:\/\/.*supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-api',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 5, // 5 minutes
              },
            },
          },
        ],
        // Pre-cache app shell
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        // Don't cache service worker itself
        navigateFallback: null,
        // Clean up old caches
        cleanupOutdatedCaches: true,
      },
      devOptions: {
        enabled: false, // Disable in development
      },
    }),
    // Gzip compression for production builds
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Only compress files > 1KB
      deleteOriginFile: false,
    }),
    // Brotli compression for production builds (better compression ratio)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
    // Bundle visualizer (only when ANALYZE=true)
    isAnalyze && visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
      template: 'treemap', // 'sunburst' | 'treemap' | 'network'
    }),
  ].filter(Boolean),
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util']
  },
  server: {
    headers: securityHeaders,
    proxy: {
      '/api/cf-ai': {
        target: 'https://api.cloudflare.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cf-ai/, ''),
      },
    },
  },
  preview: {
    headers: securityHeaders
  },
  build: {
    // Generate source maps only in development
    sourcemap: process.env.NODE_ENV !== 'production',
    // Minify for production
    minify: 'esbuild',
    // Target modern browsers for better security
    target: 'es2020',
    // Chunk size warning limit (500KB)
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Prevent leaking internal paths
        assetFileNames: 'assets/[hash][extname]',
        chunkFileNames: 'assets/[hash].js',
        entryFileNames: 'assets/[hash].js',
        // Manual chunk splitting for optimal caching
        manualChunks: (id) => {
          // Vendor chunk: React and React-DOM
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/scheduler')) {
            return 'vendor-react'
          }
          // Router chunk: React Router
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router'
          }
          // Supabase chunk: Supabase client and dependencies
          if (id.includes('node_modules/@supabase')) {
            return 'vendor-supabase'
          }
          // FFmpeg chunk: FFmpeg WASM and utilities
          if (id.includes('node_modules/@ffmpeg')) {
            return 'vendor-ffmpeg'
          }
        },
      }
    }
  }
})
