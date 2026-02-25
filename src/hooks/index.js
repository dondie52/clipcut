/**
 * Custom React Hooks
 * @module hooks
 * 
 * This module exports all custom hooks used in the application.
 * Hooks encapsulate reusable stateful logic that can be shared across components.
 */

// FFmpeg integration hook for video processing
export { useFFmpeg, default as useFFmpegDefault } from './useFFmpeg';

// Performance monitoring hook
export { usePerformance, useRoutePerformance } from './usePerformance';
