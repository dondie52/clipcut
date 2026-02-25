/**
 * useFFmpeg Hook
 * React hook for FFmpeg.wasm integration with components
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { 
  loadFFmpeg, 
  isFFmpegLoaded, 
  setProgressCallback, 
  clearProgressCallback,
  preloadFFmpeg,
  subscribeToLoadingState,
  cancelCurrentOperation,
  createAbortController,
  isAbortError,
  clearAllFiles,
  getMemoryUsage,
  isMemoryLimitExceeded,
  formatBytes
} from '../services/ffmpeg';
import * as videoOperations from '../services/videoOperations';
import * as audioOperations from '../services/audioOperations';
import * as effects from '../services/effects';

/**
 * Custom hook for using FFmpeg in React components
 * Handles loading state, progress tracking, and error management
 * 
 * @returns {Object} FFmpeg hook interface
 */
export function useFFmpeg() {
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(isFFmpegLoaded());
  const [progress, setProgress] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [currentOperation, setCurrentOperation] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);
  
  const isMounted = useRef(true);
  const operationControllerRef = useRef(null);
  
  // Cleanup on unmount and subscribe to loading state changes
  useEffect(() => {
    isMounted.current = true;
    
    // Subscribe to FFmpeg loading state changes
    const unsubscribe = subscribeToLoadingState((state) => {
      if (isMounted.current) {
        setLoadProgress(state.loadProgress);
        if (state.error) {
          setError(state.error);
        }
      }
    });
    
    return () => {
      isMounted.current = false;
      clearProgressCallback();
      unsubscribe();
    };
  }, []);
  
  /**
   * Initialize FFmpeg
   * Call this before using any FFmpeg operations
   */
  const initialize = useCallback(async () => {
    if (isFFmpegLoaded()) {
      setIsReady(true);
      return true;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await loadFFmpeg();
      if (isMounted.current) {
        setIsReady(true);
        setIsLoading(false);
      }
      return true;
    } catch (err) {
      if (isMounted.current) {
        setError(err.message || 'Failed to load FFmpeg');
        setIsLoading(false);
      }
      return false;
    }
  }, []);
  
  /**
   * Progress handler for FFmpeg operations
   */
  const handleProgress = useCallback(({ progress: prog }) => {
    if (isMounted.current) {
      setProgress(prog);
    }
  }, []);
  
  /**
   * Wrapper for FFmpeg operations with error handling and progress tracking
   */
  const executeOperation = useCallback(async (operationName, operationFn) => {
    if (!isFFmpegLoaded()) {
      const loaded = await initialize();
      if (!loaded) {
        throw new Error('FFmpeg not loaded');
      }
    }
    
    setCurrentOperation(operationName);
    setProgress(0);
    setError(null);
    setIsCancelling(false);

    const controller = createAbortController();
    operationControllerRef.current = controller;
    
    try {
      const result = await operationFn(handleProgress, controller.signal);
      if (isMounted.current) {
        setProgress(100);
        setCurrentOperation(null);
      }
      return result;
    } catch (err) {
      if (isMounted.current) {
        if (isAbortError(err) || controller.signal.aborted) {
          setError(`${operationName} cancelled.`);
        } else {
          setError(err.message || `Failed to ${operationName}`);
        }
        setCurrentOperation(null);
      }
      throw err;
    } finally {
      if (operationControllerRef.current === controller) {
        operationControllerRef.current = null;
      }
      if (isMounted.current) {
        setIsCancelling(false);
      }
    }
  }, [initialize, handleProgress]);
  
  // Video Operations
  const trimVideo = useCallback(async (file, startTime, duration) => {
    return executeOperation('trim video', (onProgress, signal) => 
      videoOperations.trimVideo(file, startTime, duration, onProgress, signal)
    );
  }, [executeOperation]);
  
  const splitVideo = useCallback(async (file, splitTime) => {
    return executeOperation('split video', (onProgress, signal) => 
      videoOperations.splitVideo(file, splitTime, onProgress, signal)
    );
  }, [executeOperation]);
  
  const mergeClips = useCallback(async (clips) => {
    return executeOperation('merge clips', (onProgress, signal) => 
      videoOperations.mergeClips(clips, onProgress, signal)
    );
  }, [executeOperation]);
  
  const exportVideo = useCallback(async (file, resolution) => {
    return executeOperation('export video', (onProgress, signal) => 
      videoOperations.exportVideo(file, resolution, onProgress, signal)
    );
  }, [executeOperation]);
  
  const getVideoInfo = useCallback(async (file) => {
    return videoOperations.getVideoInfo(file);
  }, []);
  
  const generateThumbnail = useCallback(async (file, time = 0) => {
    // Thumbnail generation is now browser-based (fast), no need for FFmpeg
    return videoOperations.generateThumbnail(file, time);
  }, []);

  const convertToWebFormat = useCallback(async (file) => {
    return executeOperation('convert to web format', (onProgress, signal) => 
      videoOperations.convertFormat(file, 'mp4', onProgress, signal)
    );
  }, [executeOperation]);
  
  // Audio Operations
  const mixAudio = useCallback(async (videoFile, audioFile, volume = 0.3) => {
    return executeOperation('mix audio', (onProgress, signal) => 
      audioOperations.mixAudio(videoFile, audioFile, volume, onProgress, signal)
    );
  }, [executeOperation]);
  
  const adjustVolume = useCallback(async (file, volumeLevel) => {
    return executeOperation('adjust volume', (onProgress, signal) => 
      audioOperations.adjustVolume(file, volumeLevel, onProgress, signal)
    );
  }, [executeOperation]);
  
  const muteAudio = useCallback(async (file) => {
    return executeOperation('mute audio', (onProgress, signal) => 
      audioOperations.muteAudio(file, onProgress, signal)
    );
  }, [executeOperation]);
  
  const extractAudio = useCallback(async (file, format = 'mp3') => {
    return executeOperation('extract audio', (onProgress, signal) => 
      audioOperations.extractAudio(file, format, onProgress, signal)
    );
  }, [executeOperation]);
  
  // Effects Operations
  const addTextOverlay = useCallback(async (file, text, options = {}) => {
    return executeOperation('add text', (onProgress, signal) => 
      effects.addTextOverlay(file, text, options, onProgress, signal)
    );
  }, [executeOperation]);
  
  const addTransition = useCallback(async (clip1, clip2, type = 'fade', duration = 1) => {
    return executeOperation('add transition', (onProgress, signal) => 
      effects.addTransition(clip1, clip2, type, duration, onProgress, signal)
    );
  }, [executeOperation]);
  
  const changeSpeed = useCallback(async (file, speed) => {
    return executeOperation('change speed', (onProgress, signal) => 
      effects.changeSpeed(file, speed, onProgress, signal)
    );
  }, [executeOperation]);
  
  const addFade = useCallback(async (file, fadeIn, fadeOut, duration) => {
    return executeOperation('add fade', (onProgress, signal) => 
      effects.addFade(file, fadeIn, fadeOut, duration, onProgress, signal)
    );
  }, [executeOperation]);
  
  const rotateVideo = useCallback(async (file, degrees) => {
    return executeOperation('rotate video', (onProgress, signal) => 
      effects.rotateVideo(file, degrees, onProgress, signal)
    );
  }, [executeOperation]);
  
  const flipVideo = useCallback(async (file, direction) => {
    return executeOperation('flip video', (onProgress, signal) => 
      effects.flipVideo(file, direction, onProgress, signal)
    );
  }, [executeOperation]);
  
  const cropVideo = useCallback(async (file, cropArea) => {
    return executeOperation('crop video', (onProgress, signal) => 
      effects.cropVideo(file, cropArea, onProgress, signal)
    );
  }, [executeOperation]);
  
  const adjustBrightnessContrast = useCallback(async (file, brightness, contrast) => {
    return executeOperation('adjust colors', (onProgress, signal) => 
      effects.adjustBrightnessContrast(file, brightness, contrast, onProgress, signal)
    );
  }, [executeOperation]);
  
  /**
   * Clear any error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);
  
  /**
   * Reset progress state
   */
  const resetProgress = useCallback(() => {
    setProgress(0);
    setCurrentOperation(null);
  }, []);
  
  /**
   * Preload FFmpeg WASM files to cache
   * Call this to warm up before the user needs FFmpeg
   */
  const preload = useCallback(async () => {
    await preloadFFmpeg();
  }, []);

  /**
   * Cancel the current FFmpeg operation
   */
  const cancelOperation = useCallback(() => {
    setIsCancelling(true);
    cancelCurrentOperation();
    if (isMounted.current) {
      setProgress(0);
      setError('Cancelling operation...');
    }
  }, []);

  /**
   * Clear all files from FFmpeg's virtual file system
   * Useful for freeing memory after large operations
   */
  const clearMemory = useCallback(async () => {
    await clearAllFiles();
  }, []);

  /**
   * Get current memory usage information
   */
  const getMemoryInfo = useCallback(() => {
    const usage = getMemoryUsage();
    const limitExceeded = isMemoryLimitExceeded();
    return {
      usage,
      usageFormatted: formatBytes(usage),
      limitExceeded,
    };
  }, []);

  return {
    // State
    isLoading,
    isReady,
    progress,
    loadProgress,
    error,
    currentOperation,
    isCancelling,
    
    // Core
    initialize,
    preload,
    clearError,
    resetProgress,
    cancelOperation,
    clearMemory,
    getMemoryInfo,
    
    // Video Operations
    trimVideo,
    splitVideo,
    mergeClips,
    exportVideo,
    getVideoInfo,
    generateThumbnail,
    convertToWebFormat,
    
    // Audio Operations
    mixAudio,
    adjustVolume,
    muteAudio,
    extractAudio,
    
    // Effects
    addTextOverlay,
    addTransition,
    changeSpeed,
    addFade,
    rotateVideo,
    flipVideo,
    cropVideo,
    adjustBrightnessContrast,
    
    // Constants
    resolutions: videoOperations.RESOLUTIONS,
    textPositions: effects.TEXT_POSITIONS,
    transitionTypes: effects.TRANSITION_TYPES
  };
}

export default useFFmpeg;
