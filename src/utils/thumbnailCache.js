/**
 * Thumbnail Cache using IndexedDB
 * Caches generated video thumbnails for faster subsequent access
 */

const DB_NAME = 'clipcut-thumbnails';
const DB_VERSION = 1;
const STORE_NAME = 'thumbnails';

let dbPromise = null;

/**
 * Open the IndexedDB database
 * @returns {Promise<IDBDatabase>}
 */
function openDB() {
  if (dbPromise) return dbPromise;
  
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => {
      console.warn('[ThumbnailCache] Failed to open database');
      reject(request.error);
    };
    
    request.onsuccess = () => {
      resolve(request.result);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Create object store for thumbnails
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('videoId', 'videoId', { unique: false });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
  
  return dbPromise;
}

/**
 * Generate a cache key for a thumbnail
 * @param {string} videoId - Video identifier (filename or hash)
 * @param {number} time - Time in seconds
 * @returns {string} Cache key
 */
function getCacheKey(videoId, time) {
  return `${videoId}_t${Math.floor(time * 10)}`;
}

/**
 * Get a cached thumbnail
 * @param {string} videoId - Video identifier
 * @param {number} time - Time in seconds
 * @returns {Promise<Blob|null>} Thumbnail blob or null if not cached
 */
export async function getCachedThumbnail(videoId, time) {
  try {
    const db = await openDB();
    const key = getCacheKey(videoId, time);
    
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);
      
      request.onsuccess = () => {
        const result = request.result;
        if (result && result.data) {
          resolve(new Blob([result.data], { type: 'image/jpeg' }));
        } else {
          resolve(null);
        }
      };
      
      request.onerror = () => resolve(null);
    });
  } catch (error) {
    console.warn('[ThumbnailCache] Error getting cached thumbnail:', error);
    return null;
  }
}

/**
 * Cache a thumbnail
 * @param {string} videoId - Video identifier
 * @param {number} time - Time in seconds
 * @param {Blob} thumbnailBlob - Thumbnail blob to cache
 */
export async function cacheThumbnail(videoId, time, thumbnailBlob) {
  try {
    const db = await openDB();
    const key = getCacheKey(videoId, time);
    
    // Convert blob to ArrayBuffer for storage
    const arrayBuffer = await thumbnailBlob.arrayBuffer();
    
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      store.put({
        id: key,
        videoId,
        time,
        data: arrayBuffer,
        timestamp: Date.now(),
      });
      
      transaction.oncomplete = () => resolve(true);
      transaction.onerror = () => resolve(false);
    });
  } catch (error) {
    console.warn('[ThumbnailCache] Error caching thumbnail:', error);
  }
}

/**
 * Clear all cached thumbnails for a video
 * @param {string} videoId - Video identifier
 */
export async function clearVideoThumbnails(videoId) {
  try {
    const db = await openDB();
    
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('videoId');
      const request = index.openCursor(IDBKeyRange.only(videoId));
      
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          store.delete(cursor.primaryKey);
          cursor.continue();
        }
      };
      
      transaction.oncomplete = () => resolve(true);
      transaction.onerror = () => resolve(false);
    });
  } catch (error) {
    console.warn('[ThumbnailCache] Error clearing thumbnails:', error);
  }
}

/**
 * Clear old cached thumbnails (older than maxAge)
 * @param {number} maxAge - Maximum age in milliseconds (default: 7 days)
 */
export async function clearOldThumbnails(maxAge = 7 * 24 * 60 * 60 * 1000) {
  try {
    const db = await openDB();
    const cutoff = Date.now() - maxAge;
    
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('timestamp');
      const request = index.openCursor(IDBKeyRange.upperBound(cutoff));
      
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          store.delete(cursor.primaryKey);
          cursor.continue();
        }
      };
      
      transaction.oncomplete = () => {
        console.log('[ThumbnailCache] Cleared old thumbnails');
        resolve(true);
      };
      transaction.onerror = () => resolve(false);
    });
  } catch (error) {
    console.warn('[ThumbnailCache] Error clearing old thumbnails:', error);
  }
}

/**
 * Clear all cached thumbnails
 */
export async function clearAllThumbnails() {
  try {
    const db = await openDB();
    
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      store.clear();
      
      transaction.oncomplete = () => {
        console.log('[ThumbnailCache] Cleared all thumbnails');
        resolve(true);
      };
      transaction.onerror = () => resolve(false);
    });
  } catch (error) {
    console.warn('[ThumbnailCache] Error clearing all thumbnails:', error);
  }
}

/**
 * Get cache statistics
 * @returns {Promise<{count: number, estimatedSize: number}>}
 */
export async function getCacheStats() {
  try {
    const db = await openDB();
    
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.count();
      
      request.onsuccess = () => {
        resolve({
          count: request.result,
          estimatedSize: 0, // Would need to iterate to calculate
        });
      };
      
      request.onerror = () => resolve({ count: 0, estimatedSize: 0 });
    });
  } catch (error) {
    return { count: 0, estimatedSize: 0 };
  }
}
