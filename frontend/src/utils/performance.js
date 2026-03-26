/**
 * Performance Monitoring Utilities
 * Tracks Core Web Vitals, page load times, video processing times, and API response times
 * @module utils/performance
 */

/**
 * Performance metric types
 */
export const METRIC_TYPES = {
  // Core Web Vitals
  LCP: 'lcp', // Largest Contentful Paint
  FID: 'fid', // First Input Delay
  CLS: 'cls', // Cumulative Layout Shift
  FCP: 'fcp', // First Contentful Paint
  TTFB: 'ttfb', // Time to First Byte
  
  // Page Load
  PAGE_LOAD: 'page_load',
  ROUTE_CHANGE: 'route_change',
  
  // Video Processing
  VIDEO_TRIM: 'video_trim',
  VIDEO_SPLIT: 'video_split',
  VIDEO_MERGE: 'video_merge',
  VIDEO_EXPORT: 'video_export',
  VIDEO_THUMBNAIL: 'video_thumbnail',
  VIDEO_PREVIEW: 'video_preview',
  
  // API Calls
  API_REQUEST: 'api_request',
  API_UPLOAD: 'api_upload',
  API_DOWNLOAD: 'api_download',
  
  // User Interactions
  USER_INTERACTION: 'user_interaction',
};

/**
 * Performance rating thresholds (in milliseconds)
 */
export const PERFORMANCE_THRESHOLDS = {
  // Core Web Vitals thresholds (from web.dev)
  LCP: { good: 2500, needsImprovement: 4000 },
  FID: { good: 100, needsImprovement: 300 },
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FCP: { good: 1800, needsImprovement: 3000 },
  TTFB: { good: 800, needsImprovement: 1800 },
  
  // Page load
  PAGE_LOAD: { good: 3000, needsImprovement: 5000 },
  
  // Video processing (per minute of video)
  VIDEO_TRIM: { good: 30000, needsImprovement: 60000 }, // 30s per minute
  VIDEO_EXPORT: { good: 120000, needsImprovement: 240000 }, // 2min per 5min video
};

/**
 * Get performance rating (good, needs-improvement, poor)
 * @param {string} metricType - Metric type
 * @param {number} value - Metric value
 * @returns {string} Rating
 */
export function getPerformanceRating(metricType, value) {
  const thresholds = PERFORMANCE_THRESHOLDS[metricType];
  if (!thresholds) return 'unknown';
  
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.needsImprovement) return 'needs-improvement';
  return 'poor';
}

/**
 * Performance metric storage
 */
class PerformanceMonitor {
  constructor() {
    this.metrics = [];
    this.observers = new Map();
    this.isEnabled = typeof window !== 'undefined' && 'PerformanceObserver' in window;
    
    if (this.isEnabled) {
      this.initCoreWebVitals();
    }
  }

  /**
   * Initialize Core Web Vitals observers
   */
  initCoreWebVitals() {
    // LCP (Largest Contentful Paint)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordMetric(METRIC_TYPES.LCP, lastEntry.renderTime || lastEntry.loadTime, {
          element: lastEntry.element?.tagName || 'unknown',
          url: lastEntry.url || '',
        });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.set('lcp', lcpObserver);
    } catch (e) {
      console.warn('[Performance] LCP observer not supported:', e);
    }

    // FID (First Input Delay)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.recordMetric(METRIC_TYPES.FID, entry.processingStart - entry.startTime, {
            eventType: entry.name,
            target: entry.target?.tagName || 'unknown',
          });
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.set('fid', fidObserver);
    } catch (e) {
      console.warn('[Performance] FID observer not supported:', e);
    }

    // CLS (Cumulative Layout Shift)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        // Record CLS periodically
        this.recordMetric(METRIC_TYPES.CLS, clsValue, {
          sources: entries.length,
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.set('cls', clsObserver);
    } catch (e) {
      console.warn('[Performance] CLS observer not supported:', e);
    }

    // FCP (First Contentful Paint)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.recordMetric(METRIC_TYPES.FCP, entry.startTime, {});
          }
        });
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
      this.observers.set('fcp', fcpObserver);
    } catch (e) {
      console.warn('[Performance] FCP observer not supported:', e);
    }

    // TTFB (Time to First Byte)
    try {
      const ttfbObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            const ttfb = entry.responseStart - entry.requestStart;
            this.recordMetric(METRIC_TYPES.TTFB, ttfb, {
              url: entry.name,
            });
          }
        });
      });
      ttfbObserver.observe({ entryTypes: ['navigation'] });
      this.observers.set('ttfb', ttfbObserver);
    } catch (e) {
      console.warn('[Performance] TTFB observer not supported:', e);
    }
  }

  /**
   * Record a performance metric
   * @param {string} type - Metric type
   * @param {number} value - Metric value (in milliseconds, except CLS which is a score)
   * @param {Object} metadata - Additional metadata
   */
  recordMetric(type, value, metadata = {}) {
    if (!this.isEnabled) return;

    const metric = {
      type,
      value,
      rating: getPerformanceRating(type, value),
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.pathname : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      ...metadata,
    };

    this.metrics.push(metric);

    // Keep only last 100 metrics to prevent memory issues
    if (this.metrics.length > 100) {
      this.metrics.shift();
    }

    // Log in development
    if (import.meta.env.DEV) {
      console.log(`[Performance] ${type}: ${value.toFixed(2)}ms (${metric.rating})`, metadata);
    }

    // Dispatch custom event for listeners
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('performance-metric', { detail: metric })
      );
    }
  }

  /**
   * Start timing an operation
   * @param {string} operationId - Unique operation ID
   * @param {string} type - Metric type
   * @param {Object} metadata - Additional metadata
   * @returns {Function} Stop function
   */
  startTiming(operationId, type, metadata = {}) {
    const startTime = performance.now();
    const startMark = `perf_${operationId}_start`;

    if (this.isEnabled) {
      performance.mark(startMark);
    }

    return (additionalMetadata = {}) => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      const endMark = `perf_${operationId}_end`;

      if (this.isEnabled) {
        performance.mark(endMark);
        performance.measure(`perf_${operationId}`, startMark, endMark);
      }

      this.recordMetric(type, duration, {
        ...metadata,
        ...additionalMetadata,
        operationId,
      });

      return duration;
    };
  }

  /**
   * Measure page load time
   * @param {string} route - Route path
   */
  measurePageLoad(route) {
    if (!this.isEnabled || typeof window === 'undefined') return;

    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        this.recordMetric(METRIC_TYPES.PAGE_LOAD, loadTime, {
          route,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
          domInteractive: navigation.domInteractive - navigation.fetchStart,
        });
      }
    }, { once: true });
  }

  /**
   * Measure route change time
   * @param {string} fromRoute - Previous route
   * @param {string} toRoute - New route
   * @param {number} duration - Duration in milliseconds
   */
  measureRouteChange(fromRoute, toRoute, duration) {
    this.recordMetric(METRIC_TYPES.ROUTE_CHANGE, duration, {
      fromRoute,
      toRoute,
    });
  }

  /**
   * Get all metrics
   * @param {string} [type] - Filter by metric type
   * @returns {Array} Array of metrics
   */
  getMetrics(type = null) {
    if (type) {
      return this.metrics.filter((m) => m.type === type);
    }
    return [...this.metrics];
  }

  /**
   * Get metrics summary
   * @returns {Object} Summary statistics
   */
  getSummary() {
    const summary = {};

    Object.values(METRIC_TYPES).forEach((type) => {
      const typeMetrics = this.metrics.filter((m) => m.type === type);
      if (typeMetrics.length > 0) {
        const values = typeMetrics.map((m) => m.value);
        summary[type] = {
          count: typeMetrics.length,
          avg: values.reduce((a, b) => a + b, 0) / values.length,
          min: Math.min(...values),
          max: Math.max(...values),
          latest: typeMetrics[typeMetrics.length - 1],
        };
      }
    });

    return summary;
  }

  /**
   * Clear all metrics
   */
  clear() {
    this.metrics = [];
  }

  /**
   * Cleanup observers
   */
  cleanup() {
    this.observers.forEach((observer) => {
      try {
        observer.disconnect();
      } catch (e) {
        // Ignore errors
      }
    });
    this.observers.clear();
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

/**
 * Track video processing operation
 * @param {string} operationType - Operation type (trim, split, merge, export, etc.)
 * @param {Function} operation - Async operation function
 * @param {Object} metadata - Additional metadata
 * @returns {Promise} Operation result
 */
export async function trackVideoOperation(operationType, operation, metadata = {}) {
  const operationId = `${operationType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const stopTiming = performanceMonitor.startTiming(operationId, operationType, {
    ...metadata,
    operation: operationType,
  });

  try {
    const result = await operation();
    stopTiming({ success: true });
    return result;
  } catch (error) {
    stopTiming({ success: false, error: error.message });
    throw error;
  }
}

/**
 * Track API request
 * @param {string} endpoint - API endpoint
 * @param {Function} request - Async request function
 * @param {Object} metadata - Additional metadata
 * @returns {Promise} Request result
 */
export async function trackAPIRequest(endpoint, request, metadata = {}) {
  const operationId = `api_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const stopTiming = performanceMonitor.startTiming(operationId, METRIC_TYPES.API_REQUEST, {
    endpoint,
    ...metadata,
  });

  try {
    const result = await request();
    stopTiming({ success: true });
    return result;
  } catch (error) {
    stopTiming({ success: false, error: error.message, statusCode: error.status });
    throw error;
  }
}

/**
 * Track file upload
 * @param {string} filename - File name
 * @param {number} fileSize - File size in bytes
 * @param {Function} upload - Async upload function
 * @param {Object} metadata - Additional metadata
 * @returns {Promise} Upload result
 */
export async function trackFileUpload(filename, fileSize, upload, metadata = {}) {
  const operationId = `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const stopTiming = performanceMonitor.startTiming(operationId, METRIC_TYPES.API_UPLOAD, {
    filename,
    fileSize,
    ...metadata,
  });

  try {
    const result = await upload();
    const duration = stopTiming({ success: true });
    // Calculate upload speed
    const speed = fileSize / (duration / 1000); // bytes per second
    performanceMonitor.recordMetric(METRIC_TYPES.API_UPLOAD, duration, {
      filename,
      fileSize,
      speed,
      ...metadata,
    });
    return result;
  } catch (error) {
    stopTiming({ success: false, error: error.message });
    throw error;
  }
}

/**
 * Track user interaction
 * @param {string} interactionType - Type of interaction (click, input, etc.)
 * @param {string} target - Target element or action
 * @param {Object} metadata - Additional metadata
 */
export function trackUserInteraction(interactionType, target, metadata = {}) {
  performanceMonitor.recordMetric(METRIC_TYPES.USER_INTERACTION, 0, {
    interactionType,
    target,
    ...metadata,
  });
}

// Initialize page load measurement
if (typeof window !== 'undefined') {
  performanceMonitor.measurePageLoad(window.location.pathname);
}
