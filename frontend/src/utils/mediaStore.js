/**
 * Media Store — IndexedDB-backed persistence for project media files.
 *
 * Blob URLs expire when the page closes. This store keeps the actual bytes
 * in IndexedDB so projects saved to localStorage can reload their media
 * across sessions. Each entry is keyed by `${projectId}/${mediaId}`.
 */

const DB_NAME = 'clipcut-media';
const DB_VERSION = 1;
const STORE_NAME = 'media';

let dbPromise = null;

function openDB() {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.warn('[MediaStore] Failed to open database');
      dbPromise = null;
      reject(request.error);
    };

    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'key' });
        store.createIndex('projectId', 'projectId', { unique: false });
      }
    };
  });

  return dbPromise;
}

/**
 * Store a media blob in IndexedDB.
 * @param {string} projectId
 * @param {string} mediaId
 * @param {File|Blob} blob
 * @param {Object} meta — { name, type, duration, width, height }
 */
export async function storeMedia(projectId, mediaId, blob, meta = {}) {
  const db = await openDB();
  const key = `${projectId}/${mediaId}`;
  const arrayBuffer = await blob.arrayBuffer();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put({
      key,
      projectId,
      mediaId,
      buffer: arrayBuffer,
      mime: blob.type || meta.type || 'video/mp4',
      name: meta.name || 'media',
      size: blob.size,
      storedAt: Date.now(),
    });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/**
 * Retrieve a media blob from IndexedDB.
 * @param {string} projectId
 * @param {string} mediaId
 * @returns {Promise<{file: File, blobUrl: string}|null>}
 */
export async function loadMedia(projectId, mediaId) {
  const db = await openDB();
  const key = `${projectId}/${mediaId}`;

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).get(key);

    req.onsuccess = () => {
      const record = req.result;
      if (!record) return resolve(null);

      const blob = new Blob([record.buffer], { type: record.mime });
      const file = new File([blob], record.name, { type: record.mime });
      const blobUrl = URL.createObjectURL(blob);
      resolve({ file, blobUrl });
    };
    req.onerror = () => reject(req.error);
  });
}

/**
 * Delete all media for a project.
 * @param {string} projectId
 */
export async function deleteProjectMedia(projectId) {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const index = store.index('projectId');
    const req = index.openCursor(IDBKeyRange.only(projectId));

    req.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      }
    };
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
