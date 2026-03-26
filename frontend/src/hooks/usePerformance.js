/**
 * usePerformance Hook
 * React hook for performance tracking in components
 * @module hooks/usePerformance
 */

import { useEffect, useCallback, useRef } from 'react';
import {
  performanceMonitor,
  METRIC_TYPES,
  trackVideoOperation,
  trackAPIRequest,
  trackFileUpload,
  trackUserInteraction,
} from '../utils/performance';

/**
 * Hook for performance monitoring in React components
 * @param {Object} options - Hook options
 * @param {string} [options.componentName] - Component name for tracking
 * @param {boolean} [options.trackMount] - Track component mount time
 * @param {boolean} [options.trackInteractions] - Track user interactions
 * @returns {Object} Performance tracking utilities
 */
export function usePerformance(options = {}) {
  const {
    componentName = 'Unknown',
    trackMount = true,
    trackInteractions = true,
  } = options;

  const mountTimeRef = useRef(null);
  const routeStartTimeRef = useRef(null);

  // Track component mount time
  useEffect(() => {
    if (trackMount) {
      mountTimeRef.current = performance.now();
      const stopTiming = performanceMonitor.startTiming(
        `component_${componentName}_mount`,
        METRIC_TYPES.PAGE_LOAD,
        { component: componentName, event: 'mount' }
      );

      return () => {
        stopTiming({ event: 'unmount' });
      };
    }
  }, [componentName, trackMount]);

  // Track route changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      routeStartTimeRef.current = performance.now();
      const currentRoute = window.location.pathname;

      return () => {
        if (routeStartTimeRef.current) {
          const duration = performance.now() - routeStartTimeRef.current;
          performanceMonitor.measureRouteChange(
            currentRoute,
            window.location.pathname,
            duration
          );
        }
      };
    }
  }, []);

  // Track user interactions
  useEffect(() => {
    if (!trackInteractions) return;

    const handleClick = (e) => {
      const target = e.target;
      trackUserInteraction('click', target.tagName || 'unknown', {
        component: componentName,
        id: target.id || '',
        className: target.className || '',
      });
    };

    const handleInput = (e) => {
      const target = e.target;
      trackUserInteraction('input', target.tagName || 'unknown', {
        component: componentName,
        id: target.id || '',
        type: target.type || '',
      });
    };

    document.addEventListener('click', handleClick, true);
    document.addEventListener('input', handleInput, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('input', handleInput, true);
    };
  }, [componentName, trackInteractions]);

  /**
   * Track a custom operation
   * @param {string} operationName - Operation name
   * @param {Function} operation - Async operation
   * @param {Object} metadata - Additional metadata
   * @returns {Promise} Operation result
   */
  const trackOperation = useCallback(
    async (operationName, operation, metadata = {}) => {
      return trackVideoOperation(
        operationName,
        operation,
        {
          component: componentName,
          ...metadata,
        }
      );
    },
    [componentName]
  );

  /**
   * Track an API call
   * @param {string} endpoint - API endpoint
   * @param {Function} request - Async request function
   * @param {Object} metadata - Additional metadata
   * @returns {Promise} Request result
   */
  const trackAPI = useCallback(
    async (endpoint, request, metadata = {}) => {
      return trackAPIRequest(
        endpoint,
        request,
        {
          component: componentName,
          ...metadata,
        }
      );
    },
    [componentName]
  );

  /**
   * Track a file upload
   * @param {string} filename - File name
   * @param {number} fileSize - File size in bytes
   * @param {Function} upload - Async upload function
   * @param {Object} metadata - Additional metadata
   * @returns {Promise} Upload result
   */
  const trackUpload = useCallback(
    async (filename, fileSize, upload, metadata = {}) => {
      return trackFileUpload(
        filename,
        fileSize,
        upload,
        {
          component: componentName,
          ...metadata,
        }
      );
    },
    [componentName]
  );

  /**
   * Track a user interaction manually
   * @param {string} interactionType - Type of interaction
   * @param {string} target - Target element or action
   * @param {Object} metadata - Additional metadata
   */
  const trackInteraction = useCallback(
    (interactionType, target, metadata = {}) => {
      trackUserInteraction(interactionType, target, {
        component: componentName,
        ...metadata,
      });
    },
    [componentName]
  );

  /**
   * Get performance metrics for this component
   * @param {string} [type] - Filter by metric type
   * @returns {Array} Array of metrics
   */
  const getMetrics = useCallback(
    (type = null) => {
      const allMetrics = performanceMonitor.getMetrics(type);
      return allMetrics.filter(
        (m) => m.component === componentName || m.metadata?.component === componentName
      );
    },
    [componentName]
  );

  /**
   * Get performance summary
   * @returns {Object} Summary statistics
   */
  const getSummary = useCallback(() => {
    return performanceMonitor.getSummary();
  }, []);

  return {
    trackOperation,
    trackAPI,
    trackUpload,
    trackInteraction,
    getMetrics,
    getSummary,
    performanceMonitor,
  };
}

/**
 * Hook for tracking route performance
 * @param {string} routeName - Route name
 * @returns {Object} Route tracking utilities
 */
export function useRoutePerformance(routeName) {
  const routeStartTimeRef = useRef(null);

  useEffect(() => {
    routeStartTimeRef.current = performance.now();

    return () => {
      if (routeStartTimeRef.current) {
        const duration = performance.now() - routeStartTimeRef.current;
        performanceMonitor.recordMetric(METRIC_TYPES.ROUTE_CHANGE, duration, {
          route: routeName,
        });
      }
    };
  }, [routeName]);

  return {
    getRouteDuration: () => {
      if (routeStartTimeRef.current) {
        return performance.now() - routeStartTimeRef.current;
      }
      return 0;
    },
  };
}

export default usePerformance;
