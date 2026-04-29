/**
 * File Validation Utility
 * MIME type checking, file extension validation, and file size limits
 * @module utils/fileValidation
 */

/**
 * Allowed file types by category with MIME types and extensions
 */
const FILE_TYPES = {
  video: {
    mimeTypes: ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska'],
    extensions: ['.mp4', '.webm', '.mov', '.avi', '.mkv'],
    label: 'Video',
  },
  audio: {
    mimeTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/webm', 'audio/aac', 'audio/flac'],
    extensions: ['.mp3', '.wav', '.ogg', '.m4a', '.webm', '.aac', '.flac'],
    label: 'Audio',
  },
  image: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    extensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
    label: 'Image',
  },
};

/**
 * File size limits by category (in bytes)
 */
const SIZE_LIMITS = {
  video: 500 * 1024 * 1024,   // 500MB
  audio: 100 * 1024 * 1024,   // 100MB
  image: 25 * 1024 * 1024,    // 25MB
  avatar: 5 * 1024 * 1024,    // 5MB
  thumbnail: 5 * 1024 * 1024, // 5MB
  default: 500 * 1024 * 1024, // 500MB
};

/**
 * Get the file extension from a filename
 * @param {string} filename
 * @returns {string} Lowercase extension including dot
 */
function getExtension(filename) {
  if (!filename || typeof filename !== 'string') return '';
  const lastDot = filename.lastIndexOf('.');
  if (lastDot === -1) return '';
  return filename.slice(lastDot).toLowerCase();
}

/**
 * Detect file category from MIME type
 * @param {string} mimeType
 * @returns {string|null} 'video', 'audio', 'image', or null
 */
function detectCategory(mimeType) {
  if (!mimeType) return null;
  for (const [category, config] of Object.entries(FILE_TYPES)) {
    if (config.mimeTypes.includes(mimeType)) return category;
  }
  return null;
}

/**
 * Detect file category from extension
 * @param {string} filename
 * @returns {string|null} 'video', 'audio', 'image', or null
 */
function detectCategoryFromExtension(filename) {
  const ext = getExtension(filename);
  if (!ext) return null;
  for (const [category, config] of Object.entries(FILE_TYPES)) {
    if (config.extensions.includes(ext)) return category;
  }
  return null;
}

/**
 * Get all allowed MIME types across all categories
 * @returns {string[]}
 */
export function getAllAllowedMimeTypes() {
  return Object.values(FILE_TYPES).flatMap(config => config.mimeTypes);
}

/**
 * Get all allowed extensions across all categories
 * @returns {string[]}
 */
export function getAllAllowedExtensions() {
  return Object.values(FILE_TYPES).flatMap(config => config.extensions);
}

/**
 * Format bytes into human-readable string
 * @param {number} bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${units[i]}`;
}

/**
 * Validate a file's MIME type
 * @param {File} file - File to validate
 * @param {string[]} [allowedCategories] - Categories to allow ('video', 'audio', 'image'). Defaults to all.
 * @returns {{ valid: boolean, error?: string, category?: string }}
 */
export function validateFileType(file, allowedCategories) {
  if (!file || !file.name) {
    return { valid: false, error: 'No file provided' };
  }

  const categories = allowedCategories || Object.keys(FILE_TYPES);
  const allowedMimeTypes = categories.flatMap(cat => FILE_TYPES[cat]?.mimeTypes || []);
  const allowedExtensions = categories.flatMap(cat => FILE_TYPES[cat]?.extensions || []);

  // Check MIME type
  const mimeValid = allowedMimeTypes.includes(file.type);

  // Check extension as a secondary check
  const ext = getExtension(file.name);
  const extValid = allowedExtensions.includes(ext);

  // Both must match to prevent MIME spoofing
  if (!mimeValid && !extValid) {
    const allowedLabels = categories.map(c => FILE_TYPES[c]?.label).filter(Boolean).join(', ');
    return {
      valid: false,
      error: `Unsupported file format. Allowed types: ${allowedLabels} (${allowedExtensions.join(', ')})`,
    };
  }

  // Warn if MIME and extension don't agree (possible spoofing)
  if (mimeValid && !extValid) {
    // MIME is valid but extension isn't — allow but note category from MIME
    const category = detectCategory(file.type);
    return { valid: true, category };
  }

  if (!mimeValid && extValid) {
    // Extension is valid but MIME isn't — classify via extension for import workflows.
    // Browsers often omit MIME type for some audio formats (e.g., m4a on Linux).
    const category = detectCategoryFromExtension(file.name);
    return { valid: true, category };
  }

  const category = detectCategory(file.type);
  return { valid: true, category };
}

/**
 * Infer file category robustly from MIME first, then extension.
 * Useful when browsers omit or misreport MIME metadata.
 * @param {File|{name?: string, type?: string}} file
 * @returns {string|null} 'video', 'audio', 'image', or null
 */
export function inferFileCategory(file) {
  if (!file) return null;
  const fromMime = detectCategory(file.type);
  if (fromMime) return fromMime;
  return detectCategoryFromExtension(file.name || '');
}

/**
 * Validate file size against limits
 * @param {File} file - File to validate
 * @param {string} [category] - File category for specific limits. Defaults to 'default'.
 * @param {number} [customLimit] - Optional custom size limit in bytes
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateFileSize(file, category, customLimit) {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  const limit = customLimit || SIZE_LIMITS[category] || SIZE_LIMITS.default;

  if (file.size > limit) {
    return {
      valid: false,
      error: `File is too large (${formatFileSize(file.size)}). Maximum size: ${formatFileSize(limit)}`,
    };
  }

  if (file.size === 0) {
    return { valid: false, error: 'File is empty' };
  }

  return { valid: true };
}

/**
 * Validate a file for upload (type + size)
 * @param {File} file - File to validate
 * @param {Object} [options]
 * @param {string[]} [options.allowedCategories] - Allowed categories
 * @param {string} [options.category] - Specific category for size limit
 * @param {number} [options.maxSize] - Custom max size in bytes
 * @returns {{ valid: boolean, error?: string, category?: string }}
 */
export function validateFile(file, options = {}) {
  const { allowedCategories, category, maxSize } = options;

  // Validate type
  const typeResult = validateFileType(file, allowedCategories);
  if (!typeResult.valid) return typeResult;

  // Validate size using detected or specified category
  const sizeCategory = category || typeResult.category || 'default';
  const sizeResult = validateFileSize(file, sizeCategory, maxSize);
  if (!sizeResult.valid) return sizeResult;

  return { valid: true, category: typeResult.category };
}

/**
 * Validate multiple files
 * @param {FileList|File[]} files
 * @param {Object} [options] - Same options as validateFile
 * @returns {{ valid: boolean, errors: Array<{file: string, error: string}>, validFiles: File[] }}
 */
export function validateFiles(files, options = {}) {
  const errors = [];
  const validFiles = [];

  const fileArray = Array.from(files);

  for (const file of fileArray) {
    const result = validateFile(file, options);
    if (result.valid) {
      validFiles.push(file);
    } else {
      errors.push({ file: file.name, error: result.error });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    validFiles,
  };
}

/**
 * Check if a file appears to be a media file based on MIME type
 * @param {File} file
 * @returns {boolean}
 */
export function isMediaFile(file) {
  return validateFileType(file).valid;
}

/**
 * Get the accept string for file input elements
 * @param {string[]} [categories] - Categories to include
 * @returns {string} Accept attribute value
 */
export function getAcceptString(categories) {
  const cats = categories || Object.keys(FILE_TYPES);
  return cats
    .flatMap(cat => FILE_TYPES[cat]?.mimeTypes || [])
    .join(',');
}

export { FILE_TYPES, SIZE_LIMITS };
