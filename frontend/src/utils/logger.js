/**
 * Structured Logger Utility
 * Provides leveled, structured logs with metadata.
 * @module utils/logger
 */

const LOG_LEVELS = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const DEFAULT_LEVEL = import.meta.env.DEV ? 'debug' : 'info';
const envLevel = import.meta.env.VITE_LOG_LEVEL?.toLowerCase();
const activeLevel = LOG_LEVELS[envLevel] ? envLevel : DEFAULT_LEVEL;

const serializeError = (error) => {
  if (!error) return null;
  return {
    name: error.name,
    message: error.message,
    stack: error.stack,
  };
};

const createLogEntry = (level, message, metadata = {}) => ({
  timestamp: new Date().toISOString(),
  level,
  message,
  app: 'clipcut',
  env: import.meta.env.MODE,
  metadata: {
    ...metadata,
    error: metadata.error instanceof Error ? serializeError(metadata.error) : metadata.error,
  },
});

const shouldLog = (level) => LOG_LEVELS[level] >= LOG_LEVELS[activeLevel];

const emitLog = (entry) => {
  const output = JSON.stringify(entry);

  if (entry.level === 'error') {
    console.error(output);
    return;
  }

  if (entry.level === 'warn') {
    console.warn(output);
    return;
  }

  if (entry.level === 'debug') {
    console.debug(output);
    return;
  }

  console.log(output);
};

export const logger = {
  level: activeLevel,

  debug(message, metadata) {
    if (!shouldLog('debug')) return;
    emitLog(createLogEntry('debug', message, metadata));
  },

  info(message, metadata) {
    if (!shouldLog('info')) return;
    emitLog(createLogEntry('info', message, metadata));
  },

  warn(message, metadata) {
    if (!shouldLog('warn')) return;
    emitLog(createLogEntry('warn', message, metadata));
  },

  error(message, metadata) {
    if (!shouldLog('error')) return;
    emitLog(createLogEntry('error', message, metadata));
  },
};

export { LOG_LEVELS };
