/**
 * Transcript-based clip scoring pipeline for Long to Shorts
 *
 * Pipeline:
 *  1. Extract audio from video  (Web Audio API → 16 kHz mono WAV)
 *  2. Chunk WAV + transcribe     (Cloudflare Workers AI Whisper)
 *  3. Build sentences             (punctuation + pause detection)
 *  4. Generate candidate segments (sliding window at sentence boundaries)
 *  5. Score candidates            (client-side metrics + one batched LLM call)
 *  6. Rank, deduplicate, select   (top N non-overlapping segments)
 *
 * Falls back gracefully:
 *  - If Whisper returns no words → parse VTT for segment-level timestamps
 *  - If no speech detected → throws 'NO_SPEECH' so caller can use frame analysis
 */

// ─── Constants ────────────────────────────────────────────────
const SAMPLE_RATE = 16000;
const CHANNELS = 1;
const BITS_PER_SAMPLE = 16;
const BYTES_PER_SECOND = SAMPLE_RATE * CHANNELS * (BITS_PER_SAMPLE / 8); // 32 000
const CHUNK_SECONDS = 10;          // Keep chunks small to avoid OOM in Workers AI (10s ≈ 320 KB)
const WAV_HEADER_SIZE = 44;
const PAUSE_THRESHOLD = 0.7;       // seconds gap → sentence boundary
const TRANSCRIBE_CONCURRENCY = 3;  // parallel Whisper requests (small 10s chunks)
const SENTENCE_ENDINGS = /[.!?]$/;

// ═══════════════════════════════════════════════════════════════
//  SECTION 1 — Audio extraction (Web Audio API — no FFmpeg needed)
// ═══════════════════════════════════════════════════════════════

const MAX_EXTRACT_DURATION = 600; // 10 min safety cap (in seconds)

/**
 * Resolve a video source (File, Blob, or blob URL string) into an
 * ArrayBuffer for Web Audio API decoding.
 */
async function resolveToArrayBuffer(videoFile) {
  if (videoFile instanceof File || videoFile instanceof Blob) {
    console.log('[Captions] resolveToArrayBuffer: File/Blob',
      { size: videoFile.size, name: videoFile.name || '(blob)', type: videoFile.type });
    if (videoFile.size === 0) throw new Error('Video file is empty (0 bytes)');
    return videoFile.arrayBuffer();
  }

  if (typeof videoFile === 'string') {
    console.log('[Captions] resolveToArrayBuffer: fetching blob URL', videoFile.slice(0, 80));
    const res = await fetch(videoFile);
    if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
    const buf = await res.arrayBuffer();
    if (buf.byteLength === 0) throw new Error('Blob URL resolved to 0 bytes — it may have been revoked');
    console.log('[Captions] resolveToArrayBuffer: fetched', buf.byteLength, 'bytes');
    return buf;
  }

  throw new Error('Unsupported video source type: ' + typeof videoFile);
}

/**
 * Build a WAV file (Uint8Array with 44-byte header + PCM data) from
 * an Int16Array of samples.  Output format matches what downstream
 * chunkWav() and computeRmsPerSecond() expect.
 */
function buildWav(pcmSamples) {
  const pcmBytes = new Uint8Array(pcmSamples.buffer, pcmSamples.byteOffset, pcmSamples.byteLength);
  const header = createWavHeader(pcmBytes.length);
  const wav = new Uint8Array(header.length + pcmBytes.length);
  wav.set(header, 0);
  wav.set(pcmBytes, header.length);
  return wav;
}

/**
 * Extract audio from a video file using the native Web Audio API.
 * Returns a Uint8Array in 16 kHz mono 16-bit WAV format (same layout
 * that downstream chunkWav / computeRmsPerSecond expect).
 *
 * @param {File|Blob|string} videoFile — video file, blob, or blob URL
 * @param {Function} onExtractionProgress — optional (pct: number) => void
 * @returns {Promise<Uint8Array>} WAV data
 */
export async function extractAudio(videoFile, onExtractionProgress) {
  // 1. Read the video into an ArrayBuffer
  console.log('[Captions] Step 1/3: Reading video file...');
  if (onExtractionProgress) onExtractionProgress(5);

  let arrayBuffer;
  try {
    arrayBuffer = await resolveToArrayBuffer(videoFile);
  } catch (err) {
    throw new Error(`Failed to read video file: ${err.message}`);
  }
  console.log('[Captions] Video loaded:', Math.round(arrayBuffer.byteLength / 1024), 'KB');
  if (onExtractionProgress) onExtractionProgress(20);

  // 2. Decode audio — try Web Audio API first, fall back to FFmpeg WASM
  //    (Firefox/Zen can't decodeAudioData from MP4 video containers)
  console.log('[Captions] Step 2/3: Decoding audio (Web Audio API)...');
  let audioBuffer;
  let useFFmpegFallback = false;
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)({
      sampleRate: SAMPLE_RATE,
    });
    audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    await audioCtx.close();
  } catch (err) {
    console.warn('[Captions] Web Audio API failed:', err.name, err.message, '— trying FFmpeg fallback');
    useFFmpegFallback = true;
  }

  if (useFFmpegFallback) {
    return await extractAudioViaFFmpeg(videoFile, onExtractionProgress);
  }

  console.log('[Captions] Decoded:', audioBuffer.duration.toFixed(1) + 's,',
    audioBuffer.numberOfChannels, 'ch,', audioBuffer.sampleRate, 'Hz');
  if (onExtractionProgress) onExtractionProgress(60);

  // 3. Convert to 16-bit PCM mono WAV
  console.log('[Captions] Step 3/3: Converting to 16-bit PCM WAV...');

  // Get first channel (mono) and cap at MAX_EXTRACT_DURATION
  const maxSamples = MAX_EXTRACT_DURATION * SAMPLE_RATE;
  const channelData = audioBuffer.getChannelData(0);
  const sampleCount = Math.min(channelData.length, maxSamples);

  const pcm = new Int16Array(sampleCount);
  for (let i = 0; i < sampleCount; i++) {
    // Clamp float32 [-1, 1] → int16 [-32768, 32767]
    const s = Math.max(-1, Math.min(1, channelData[i]));
    pcm[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  if (onExtractionProgress) onExtractionProgress(80);

  const wav = buildWav(pcm);
  console.log('[Captions] Audio extracted:', Math.round(wav.length / 1024), 'KB WAV',
    '(' + (sampleCount / SAMPLE_RATE).toFixed(1) + 's)');

  if (wav.length <= WAV_HEADER_SIZE) {
    throw new Error('Audio decoding produced no samples — the video may have no audio track');
  }
  if (onExtractionProgress) onExtractionProgress(100);

  return wav;
}

/**
 * FFmpeg WASM fallback for audio extraction.
 * Used when Web Audio API can't decode the video container (e.g. Firefox/Zen + MP4).
 */
async function extractAudioViaFFmpeg(videoFile, onExtractionProgress) {
  console.log('[Captions] FFmpeg fallback: loading FFmpeg WASM...');
  if (onExtractionProgress) onExtractionProgress(25);

  const {
    loadFFmpeg, writeFile, readFile, cleanup,
    exec: ffmpegExec,
    setProgressCallback, clearProgressCallback,
  } = await import('./ffmpeg');

  await loadFFmpeg();
  console.log('[Captions] FFmpeg loaded');
  if (onExtractionProgress) onExtractionProgress(35);

  const inputName = 'caption_input.mp4';
  const outputName = 'caption_audio.wav';

  // Resolve source to something FFmpeg can consume
  let source = videoFile;
  if (typeof videoFile === 'string') {
    const res = await fetch(videoFile);
    if (!res.ok) throw new Error(`Failed to fetch video from blob URL (${res.status})`);
    source = new Uint8Array(await res.arrayBuffer());
  }

  await writeFile(inputName, source);
  console.log('[Captions] FFmpeg fallback: extracting audio...');

  if (onExtractionProgress) {
    setProgressCallback(({ progress }) => {
      onExtractionProgress(35 + Math.min(progress, 100) * 0.55);
    });
  }

  try {
    await ffmpegExec([
      '-i', inputName,
      '-vn',
      '-acodec', 'pcm_s16le',
      '-ar', String(SAMPLE_RATE),
      '-ac', String(CHANNELS),
      '-t', String(MAX_EXTRACT_DURATION),
      outputName,
    ]);

    const wavData = await readFile(outputName);
    console.log('[Captions] FFmpeg fallback: extracted', Math.round(wavData.length / 1024), 'KB WAV');

    if (wavData.length <= WAV_HEADER_SIZE) {
      throw new Error('Audio decoding produced no samples — the video may have no audio track');
    }

    if (onExtractionProgress) onExtractionProgress(100);
    return wavData instanceof Uint8Array ? wavData : new Uint8Array(wavData);
  } finally {
    clearProgressCallback();
    await cleanup().catch(() => {});
  }
}

// ═══════════════════════════════════════════════════════════════
//  SECTION 2 — WAV chunking
// ═══════════════════════════════════════════════════════════════

function createWavHeader(dataSize) {
  const buf = new ArrayBuffer(WAV_HEADER_SIZE);
  const v = new DataView(buf);
  const writeStr = (off, s) => { for (let i = 0; i < s.length; i++) v.setUint8(off + i, s.charCodeAt(i)); };

  writeStr(0, 'RIFF');
  v.setUint32(4, 36 + dataSize, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  v.setUint32(16, 16, true);                              // chunk size
  v.setUint16(20, 1, true);                               // PCM
  v.setUint16(22, CHANNELS, true);
  v.setUint32(24, SAMPLE_RATE, true);
  v.setUint32(28, BYTES_PER_SECOND, true);
  v.setUint16(32, CHANNELS * (BITS_PER_SAMPLE / 8), true);
  v.setUint16(34, BITS_PER_SAMPLE, true);
  writeStr(36, 'data');
  v.setUint32(40, dataSize, true);

  return new Uint8Array(buf);
}

export function chunkWav(wavData, chunkSec = CHUNK_SECONDS) {
  const pcm = wavData.slice(WAV_HEADER_SIZE);
  const bytesPerChunk = chunkSec * BYTES_PER_SECOND;
  const chunks = [];
  const offsets = [];  // seconds offset for each chunk

  for (let off = 0; off < pcm.length; off += bytesPerChunk) {
    const slice = pcm.slice(off, Math.min(off + bytesPerChunk, pcm.length));
    const header = createWavHeader(slice.length);
    const wav = new Uint8Array(header.length + slice.length);
    wav.set(header, 0);
    wav.set(slice, header.length);

    chunks.push(wav);
    offsets.push(off / BYTES_PER_SECOND);
  }

  return { chunks, offsets };
}

// ═══════════════════════════════════════════════════════════════
//  SECTION 2b — Audio energy (RMS per second)
// ═══════════════════════════════════════════════════════════════

/**
 * Compute RMS energy per second from raw WAV data.
 * Returns Float64Array where index = second, value = RMS amplitude.
 * Used to detect emphasis, loudness peaks, and monotone segments.
 */
export function computeRmsPerSecond(wavData) {
  const pcm = wavData.slice(WAV_HEADER_SIZE);
  const samples = new Int16Array(pcm.buffer, pcm.byteOffset, Math.floor(pcm.byteLength / 2));
  const totalSeconds = Math.ceil(samples.length / SAMPLE_RATE);
  const rms = new Float64Array(totalSeconds);

  for (let sec = 0; sec < totalSeconds; sec++) {
    const start = sec * SAMPLE_RATE;
    const end = Math.min(start + SAMPLE_RATE, samples.length);
    let sumSq = 0;
    for (let i = start; i < end; i++) {
      sumSq += samples[i] * samples[i];
    }
    rms[sec] = Math.sqrt(sumSq / (end - start));
  }

  return rms;
}

// ═══════════════════════════════════════════════════════════════
//  SECTION 3 — Transcription (Whisper via worker)
// ═══════════════════════════════════════════════════════════════

/**
 * Transcribe one audio chunk via /transcribe-fast (Cloudflare Whisper Turbo, GPU).
 * Throws a user-friendly error on any failure — no fallback path.
 */
async function transcribeChunk(chunkData, workerUrl) {
  let res;
  try {
    res = await fetch(`${workerUrl}/transcribe-fast`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/octet-stream' },
      body: chunkData,
    });
  } catch (err) {
    console.error('[Captions] Network error reaching transcription service:', err.message);
    throw new Error('Transcription failed — could not reach the server. Check your connection and try again.');
  }

  if (res.ok) {
    const json = await res.json();
    return json.result;
  }

  const status = res.status;
  const body = await res.text().catch(() => '');
  console.error(`[Captions] Transcription failed (${status}):`, body.slice(0, 200));

  if (status === 413) {
    throw new Error('Audio chunk is too large. Please try again with a shorter clip.');
  }
  if (status >= 500) {
    throw new Error('Transcription service temporarily unavailable. Please try again in a moment.');
  }
  throw new Error(`Transcription failed (${status}). Please try again with a shorter clip.`);
}

/** Parse a WebVTT string into approximate word objects. */
function parseVtt(vtt, offsetSec) {
  const words = [];
  const lines = vtt.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/([\d:.]+)\s*-->\s*([\d:.]+)/);
    if (!m) continue;
    const text = (lines[i + 1] || '').trim();
    if (!text) continue;

    const start = parseVttTime(m[1]) + offsetSec;
    const end   = parseVttTime(m[2]) + offsetSec;
    const wds   = text.split(/\s+/);
    const dur   = (end - start) / wds.length;

    wds.forEach((w, j) => {
      words.push({ word: w, start: start + j * dur, end: start + (j + 1) * dur });
    });
  }
  return words;
}

function parseVttTime(s) {
  const p = s.split(':');
  if (p.length === 3) return +p[0] * 3600 + +p[1] * 60 + parseFloat(p[2]);
  if (p.length === 2) return +p[0] * 60 + parseFloat(p[1]);
  return parseFloat(s);
}

/**
 * Transcribe a full video file → array of { word, start, end }.
 * Chunks audio and runs Whisper in parallel batches.
 */
/** Max audio size we'll send to Whisper (25 MB total across all chunks) */
const MAX_AUDIO_BYTES = 25 * 1024 * 1024;

export async function transcribeVideo(videoFile, workerUrl, onProgress) {
  const baseUrl = String(workerUrl || '').replace(/\/+$/, '');
  if (!baseUrl) {
    // Keep the import local so this module stays tree-shakeable for non-AI consumers.
    const { WORKER_URL_NOT_SET_ERROR } = await import('./workerConfig');
    throw new Error(WORKER_URL_NOT_SET_ERROR);
  }
  console.log('[Captions] transcribeVideo started', { workerUrl: baseUrl });

  // 1. Extract audio (with progress reporting)
  if (onProgress) onProgress('extracting', 0);
  let wavData;
  try {
    wavData = await extractAudio(videoFile, (pct) => {
      if (onProgress) onProgress('extracting', pct);
    });
  } catch (err) {
    console.error('[Captions] Audio extraction failed:', err.message);
    if (err.message.includes('no audio track') || err.message.includes('unsupported audio codec')) {
      throw new Error('This video has no audio track or uses an unsupported codec. Use the manual transcript option instead.');
    }
    if (err.message.includes('no samples')) {
      throw new Error('This video has no audio track. Use the manual transcript option instead.');
    }
    if (err.message.includes('blob URL') || err.message.includes('revoked')) {
      throw new Error('Failed to read the video file. Try re-importing the video.');
    }
    throw new Error(`Failed to extract audio from video: ${err.message}`);
  }

  // 1b. Check audio size — Whisper has a 25 MB limit per request
  const audioSizeMB = (wavData.length / (1024 * 1024)).toFixed(1);
  console.log(`[Captions] Audio size: ${audioSizeMB} MB (limit: 25 MB per chunk)`);
  if (wavData.length > MAX_AUDIO_BYTES * 10) {
    // >250 MB of raw audio — likely a very long video, warn but continue (chunks are small)
    console.warn('[Captions] Very large audio — chunking will produce many requests');
  }

  // 1c. Compute per-second RMS energy (cheap, before chunking discards raw PCM)
  const rmsPerSecond = computeRmsPerSecond(wavData);

  // 2. Chunk
  const { chunks, offsets } = chunkWav(wavData);
  console.log(`[Captions] WAV chunked into ${chunks.length} chunks (${CHUNK_SECONDS}s each)`);
  if (onProgress) onProgress('transcribing', 0, { chunk: 0, totalChunks: chunks.length });

  // 3. Transcribe in parallel batches
  const allWords = [];
  let chunksSucceeded = 0;
  let chunksFailed = 0;
  let lastChunkError = '';

  for (let i = 0; i < chunks.length; i += TRANSCRIBE_CONCURRENCY) {
    const batch = chunks.slice(i, i + TRANSCRIBE_CONCURRENCY);
    const batchOffsets = offsets.slice(i, i + TRANSCRIBE_CONCURRENCY);

    const results = await Promise.all(
      batch.map((chunk, j) =>
        transcribeChunk(chunk, baseUrl)
          .then(r => ({ result: r, offset: batchOffsets[j] }))
          .catch(err => {
            chunksFailed++;
            lastChunkError = err.body || err.message;
            console.warn(`[Transcript] Chunk ${i + j} failed (${chunk.length} bytes):`,
              err.message, err.body ? `— worker: ${err.body}` : '');
            return null;
          })
      )
    );

    for (const item of results) {
      if (!item) continue;
      chunksSucceeded++;
      const { result, offset } = item;

      if (result?.words?.length) {
        for (const w of result.words) {
          allWords.push({
            word: w.word,
            start: (w.start || 0) + offset,
            end:   (w.end   || 0) + offset,
          });
        }
      } else if (result?.vtt) {
        allWords.push(...parseVtt(result.vtt, offset));
      } else if (result?.text) {
        // Worker returned text but no word-level timing — split into synthetic words
        // based on even distribution across the chunk duration
        console.warn('[Captions] Chunk returned text but no words/vtt — synthesising word timing from text');
        const chunkDuration = CHUNK_SECONDS;
        const words = result.text.trim().split(/\s+/).filter(Boolean);
        if (words.length > 0) {
          const wordDur = chunkDuration / words.length;
          words.forEach((w, wi) => {
            allWords.push({
              word: w,
              start: offset + wi * wordDur,
              end:   offset + (wi + 1) * wordDur,
            });
          });
        }
      } else {
        console.warn('[Captions] Chunk succeeded but returned no usable data:', JSON.stringify(result).slice(0, 200));
      }
    }

    if (onProgress) {
      const done = Math.min(i + batch.length, chunks.length);
      onProgress('transcribing', Math.round((done / chunks.length) * 100), {
        chunk: done,
        totalChunks: chunks.length,
      });
    }
  }

  console.log(`[Transcript] Transcription complete: ${allWords.length} words, ` +
    `${chunksSucceeded}/${chunks.length} chunks succeeded, ${chunksFailed} failed`);

  // If ALL chunks failed, the API is broken — don't report as "no speech"
  if (chunksFailed > 0 && chunksSucceeded === 0) {
    throw Object.assign(
      new Error('TRANSCRIPTION_FAILED'),
      { detail: `All ${chunksFailed} chunks returned errors. Last: ${lastChunkError}` }
    );
  }

  return { words: allWords, rmsPerSecond };
}

// ═══════════════════════════════════════════════════════════════
//  SECTION 4 — Sentence building
// ═══════════════════════════════════════════════════════════════

/**
 * Group words into sentences using punctuation + pause detection.
 * Each sentence: { text, start, end, words[], pauseAfter }
 */
export function buildSentences(words) {
  if (!words.length) return [];

  const sentences = [];
  let buf = [];

  for (let i = 0; i < words.length; i++) {
    buf.push(words[i]);

    const wordText = words[i].word.trim();
    const nextGap  = i < words.length - 1 ? words[i + 1].start - words[i].end : 999;
    const isEnd    = SENTENCE_ENDINGS.test(wordText) || nextGap > PAUSE_THRESHOLD || i === words.length - 1;

    if (isEnd && buf.length) {
      sentences.push({
        text:       buf.map(w => w.word).join(' ').trim(),
        start:      buf[0].start,
        end:        buf[buf.length - 1].end,
        words:      buf,
        pauseAfter: nextGap,
      });
      buf = [];
    }
  }

  return sentences;
}

// ═══════════════════════════════════════════════════════════════
//  SECTION 5 — Candidate segment generation
// ═══════════════════════════════════════════════════════════════

/**
 * Sliding window over sentences → candidate segments ≈ clipDuration.
 * Each candidate starts and ends at a sentence boundary.
 */
export function buildCandidates(sentences, clipDuration, videoDuration) {
  if (!sentences.length) return [];

  const minDur = Math.max(10, clipDuration * 0.5);
  const maxDur = clipDuration * 1.3;
  const step   = clipDuration * 0.5; // half-overlap sliding window
  const candidates = [];
  const seen = new Set(); // dedupe by startSentenceIdx

  for (let windowStart = 0; windowStart < videoDuration - minDur; windowStart += step) {
    // Find first sentence starting at or after windowStart
    const startIdx = sentences.findIndex(s => s.start >= windowStart);
    if (startIdx === -1 || seen.has(startIdx)) continue;
    seen.add(startIdx);

    // Extend to fill clipDuration
    let endIdx = startIdx;
    while (endIdx < sentences.length - 1 && sentences[endIdx + 1].end - sentences[startIdx].start <= clipDuration) {
      endIdx++;
    }

    // Trim back if overshot
    while (endIdx > startIdx && sentences[endIdx].end - sentences[startIdx].start > maxDur) {
      endIdx--;
    }

    const dur = sentences[endIdx].end - sentences[startIdx].start;
    if (dur < minDur || dur > maxDur) continue;

    const segSentences = sentences.slice(startIdx, endIdx + 1);
    candidates.push({
      startSeconds:     round2(sentences[startIdx].start),
      endSeconds:       round2(sentences[endIdx].end),
      text:             segSentences.map(s => s.text).join(' '),
      sentences:        segSentences,
      startSentenceIdx: startIdx,
      endSentenceIdx:   endIdx,
    });
  }

  return candidates;
}

function round2(n) { return Math.round(n * 100) / 100; }

// ═══════════════════════════════════════════════════════════════
//  SECTION 6 — Scoring
// ═══════════════════════════════════════════════════════════════

/* --- Client-side scores (no API call) --- */

function scoreBoundaryQuality(candidate, allSentences) {
  let s = 0;
  s += 3; // starts at sentence boundary (always true by construction)
  s += 3; // ends   at sentence boundary (always true by construction)

  // Starts after a natural pause
  if (candidate.startSentenceIdx > 0) {
    const prev = allSentences[candidate.startSentenceIdx - 1];
    if (prev && prev.pauseAfter > PAUSE_THRESHOLD) s += 2;
  } else {
    s += 1; // beginning of video is fine
  }

  // Ends before a natural pause
  const last = candidate.sentences[candidate.sentences.length - 1];
  if (last.pauseAfter > PAUSE_THRESHOLD) s += 2;

  return s; // 0-10
}

/**
 * Score audio emphasis: how energetic / dynamic this segment sounds
 * relative to the video average. Uses per-second RMS energy.
 */
function scoreAudioEmphasis(candidate, rmsPerSecond) {
  if (!rmsPerSecond || !rmsPerSecond.length) return 5;

  const startSec = Math.max(0, Math.floor(candidate.startSeconds));
  const endSec   = Math.min(rmsPerSecond.length, Math.ceil(candidate.endSeconds));
  const slice    = rmsPerSecond.slice(startSec, endSec);
  if (!slice.length) return 5;

  // Segment average energy
  const segAvg = slice.reduce((a, b) => a + b, 0) / slice.length;

  // Overall video average energy
  const overallAvg = rmsPerSecond.reduce((a, b) => a + b, 0) / rmsPerSecond.length;
  if (overallAvg === 0) return 5;

  // Ratio: how much louder/quieter than average (1.0 = same)
  const ratio = segAvg / overallAvg;

  // Dynamic range within segment (coefficient of variation)
  const variance = slice.reduce((sum, v) => sum + (v - segAvg) ** 2, 0) / slice.length;
  const cv = segAvg > 0 ? Math.sqrt(variance) / segAvg : 0;

  // Base 5, boost for louder-than-average (+3 max), boost for dynamism (+2 max)
  let score = 5;
  score += Math.min(3, (ratio - 1) * 4);
  score += Math.min(2, cv * 3);

  return Math.max(1, Math.min(10, Math.round(score)));
}

function scoreCompleteness(candidate) {
  let s = 5;
  const text = candidate.text;
  const first = text.split(/\s+/)[0]?.toLowerCase() || '';

  // Starts with a clear subject / topic word → bonus
  const starters = ['i', 'we', 'the', 'this', 'when', 'if', 'you', 'what', 'how', 'why', 'here', 'there', 'one', 'let', 'my', 'it'];
  if (starters.includes(first)) s += 2;

  // Starts with filler word → penalty (weak opening)
  const fillers = ['um', 'uh', 'like', 'yeah', 'well', 'okay', 'ok', 'right', 'anyway'];
  if (fillers.includes(first)) s -= 2;

  // Starts with conjunction → mid-thought penalty
  const conjunctions = ['and', 'but', 'or', 'also', 'however', 'although', 'though'];
  if (conjunctions.includes(first)) s -= 1;

  // Ends with sentence-ending punctuation
  if (SENTENCE_ENDINGS.test(text.trim().slice(-1))) s += 2;

  // Ends without punctuation AND last sentence is very short → awkward cutoff
  const lastSentence = candidate.sentences[candidate.sentences.length - 1];
  if (!SENTENCE_ENDINGS.test(text.trim().slice(-1)) && lastSentence.words.length < 4) s -= 1;

  // Multiple sentences = more complete thought
  if (candidate.sentences.length >= 2) s += 1;

  return Math.max(1, Math.min(10, s));
}

/* --- LLM batch scoring (one API call) --- */

async function scoreCandidatesWithLLM(candidates, workerUrl) {
  const numbered = candidates
    .map((c, i) => `Segment ${i + 1}: "${c.text.slice(0, 300)}"`)
    .join('\n\n');

  const prompt = `You are rating transcript segments from a video for short-form content (TikTok/Reels/Shorts).

For each segment, score from 1 to 10:
- hook: Does the opening grab attention immediately?
- clarity: Is the content self-contained and clear without extra context?
- emotion: How emotionally engaging is the content?

${numbered}

Respond with ONLY a JSON array, one object per segment, in order:
[{"hook":7,"clarity":8,"emotion":6},{"hook":5,"clarity":7,"emotion":4}]`;

  try {
    const res = await fetch(`${workerUrl}/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) throw new Error(`Score API ${res.status}`);

    const data = await res.json();
    const text = data?.result?.response || '';
    const match = text.match(/\[[\s\S]*\]/);

    if (match) {
      const parsed = JSON.parse(match[0]);
      if (Array.isArray(parsed) && parsed.length >= candidates.length) {
        return parsed.slice(0, candidates.length).map(s => ({
          hook:    clamp(s.hook),
          clarity: clamp(s.clarity),
          emotion: clamp(s.emotion),
        }));
      }
    }
  } catch (err) {
    console.warn('[Transcript] LLM scoring failed, using defaults:', err.message);
  }

  // Fallback: neutral scores
  return candidates.map(() => ({ hook: 5, clarity: 5, emotion: 5 }));
}

function clamp(n) { return typeof n === 'number' ? Math.max(1, Math.min(10, Math.round(n))) : 5; }

/* --- Composite scoring --- */

const WEIGHTS = {
  hook:            0.25,
  clarity:         0.15,
  emotion:         0.15,
  completeness:    0.20,
  boundaryQuality: 0.15,
  audioEmphasis:   0.10,
};

function compositeScore(llm, client) {
  return Math.round(
    (llm.hook               * WEIGHTS.hook +
     llm.clarity            * WEIGHTS.clarity +
     llm.emotion            * WEIGHTS.emotion +
     client.completeness    * WEIGHTS.completeness +
     client.boundaryQuality * WEIGHTS.boundaryQuality +
     client.audioEmphasis   * WEIGHTS.audioEmphasis) * 10
  );
}

function buildReason(llm, client) {
  const best = [
    llm.hook    >= 7 && 'strong hook',
    llm.clarity >= 7 && 'clear message',
    llm.emotion >= 7 && 'emotionally engaging',
    client.completeness >= 8 && 'complete thought',
    client.boundaryQuality >= 8 && 'clean boundaries',
    client.audioEmphasis >= 7 && 'high energy audio',
  ].filter(Boolean);

  if (best.length) return best.join(', ').replace(/^./, c => c.toUpperCase());
  return `Score: hook ${llm.hook}, clarity ${llm.clarity}, emotion ${llm.emotion}`;
}

// ═══════════════════════════════════════════════════════════════
//  SECTION 7 — Hook title generation
// ═══════════════════════════════════════════════════════════════

/**
 * Generate a short, catchy hook title from a transcript snippet.
 * Purely client-side — no API call needed.
 *
 * Examples:
 *   "Most people fail at startups because they build products nobody needs."
 *   → "Why Most Startups Fail"
 *
 *   "The secret to getting fit is consistency, not intensity."
 *   → "The Secret to Getting Fit"
 */
export function generateHookTitle(text) {
  if (!text || text.length < 10) return '';

  const clean = text.trim().replace(/\s+/g, ' ');
  const firstSentence = clean.split(/[.!?]/)[0]?.trim() || clean;

  // Try pattern-based hook extraction
  const patterns = [
    // "X because Y" → "Why X"
    { re: /^(.{5,40}?)\s+because\b/i, fmt: (m) => `Why ${capitalize(m[1])}` },
    // "The secret/key/trick to X is Y" → "The Secret to X"
    { re: /^(the\s+(?:secret|key|trick)\s+to\s+.{5,30}?)\s+is\b/i, fmt: (m) => capitalize(m[1]) },
    // "How to X" → keep as-is
    { re: /^(how\s+to\s+.{5,40}?)(?:\s+[-–—]|\s*$)/i, fmt: (m) => capitalize(m[1]) },
    // "If you X, then Y" → "What Happens When You X"
    { re: /^if\s+you\s+(.{5,35}?),/i, fmt: (m) => `What Happens When You ${capitalize(m[1])}` },
    // "You need to / You should / You have to" → "Why You Need to X"
    { re: /^you\s+(?:need|should|have)\s+to\s+(.{5,35})/i, fmt: (m) => `Why You Need to ${capitalize(m[1])}` },
    // "Most people / Nobody / Everyone" → use first N words
    { re: /^((?:most|nobody|everyone|people)\s+.{5,35}?)(?:\s+because|\s+but|\s*$)/i, fmt: (m) => capitalize(m[1]) },
    // Question → keep the question
    { re: /^(.{5,50}\?)/, fmt: (m) => capitalize(m[1]) },
  ];

  for (const { re, fmt } of patterns) {
    const match = firstSentence.match(re);
    if (match) {
      const title = fmt(match).replace(/[.!?,;:]+$/, '');
      if (title.length >= 8 && title.length <= 60) return title;
    }
  }

  // Fallback: use first ~6 meaningful words
  const words = firstSentence.split(/\s+/).slice(0, 6);
  const fallback = capitalize(words.join(' ')).replace(/[.!?,;:]+$/, '');
  return fallback.length > 60 ? fallback.slice(0, 57) + '...' : fallback;
}

function capitalize(s) {
  return s.replace(/\b\w/g, c => c.toUpperCase());
}

// ═══════════════════════════════════════════════════════════════
//  SECTION 8 — Ranking + deduplication + main entry point
// ═══════════════════════════════════════════════════════════════

/**
 * Compute bigram overlap ratio between two texts (0–1).
 * Used to detect near-duplicate transcript segments.
 */
function textSimilarity(a, b) {
  const bigrams = (s) => {
    const words = s.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);
    const set = new Set();
    for (let i = 0; i < words.length - 1; i++) set.add(words[i] + ' ' + words[i + 1]);
    return set;
  };

  const setA = bigrams(a);
  const setB = bigrams(b);
  if (setA.size === 0 || setB.size === 0) return 0;

  let overlap = 0;
  for (const bg of setA) if (setB.has(bg)) overlap++;

  return overlap / Math.min(setA.size, setB.size);
}

function deduplicateSegments(segments) {
  const sorted = [...segments].sort((a, b) => b.score - a.score);
  const selected = [];

  for (const seg of sorted) {
    const dur = seg.endSeconds - seg.startSeconds;

    const isDuplicate = selected.some(s => {
      // Time overlap check (>50% overlap)
      const oStart = Math.max(s.startSeconds, seg.startSeconds);
      const oEnd   = Math.min(s.endSeconds,   seg.endSeconds);
      if (Math.max(0, oEnd - oStart) / dur > 0.5) return true;

      // Transcript similarity check (>60% bigram overlap)
      if (seg.transcriptSnippet && s.transcriptSnippet) {
        if (textSimilarity(seg.transcriptSnippet, s.transcriptSnippet) > 0.6) return true;
      }

      return false;
    });

    if (!isDuplicate) selected.push(seg);
  }

  return selected;
}

// ═══════════════════════════════════════════════════════════════
//  SECTION 9 — Smart clip length adjustment
// ═══════════════════════════════════════════════════════════════

/**
 * Adjust segment start/end to align with natural sentence boundaries.
 * Prefers clips in the 20–45s range. Extends or shrinks to avoid
 * cutting mid-sentence.
 */
function adjustToNaturalBoundaries(candidate, allSentences, clipDuration, videoDuration) {
  let { startSeconds, endSeconds, startSentenceIdx, endSentenceIdx } = candidate;
  const dur = endSeconds - startSeconds;

  // Already in ideal range (20–45s) and on sentence boundaries → keep as-is
  if (dur >= 20 && dur <= 45) return { startSeconds, endSeconds };

  // Too short (<20s): try extending endSeconds to the next sentence boundary
  if (dur < 20 && endSentenceIdx < allSentences.length - 1) {
    for (let i = endSentenceIdx + 1; i < allSentences.length; i++) {
      const newEnd = round2(allSentences[i].end);
      if (newEnd - startSeconds >= 20) {
        endSeconds = Math.min(newEnd, videoDuration);
        if (endSeconds - startSeconds <= 45) break;
      }
      if (newEnd - startSeconds > 45) break;
    }
  }

  // Too long (>45s): try shrinking by dropping trailing sentences
  if (endSeconds - startSeconds > 45 && endSentenceIdx > startSentenceIdx) {
    for (let i = endSentenceIdx; i > startSentenceIdx; i--) {
      const newEnd = round2(allSentences[i - 1].end);
      if (newEnd - startSeconds >= 20) {
        endSeconds = newEnd;
        break;
      }
    }
  }

  // Ensure minimum duration and valid range
  endSeconds = Math.min(endSeconds, videoDuration);
  if (endSeconds - startSeconds < 10) endSeconds = Math.min(startSeconds + clipDuration, videoDuration);

  return { startSeconds: round2(startSeconds), endSeconds: round2(endSeconds) };
}

/**
 * Main pipeline entry point.
 *
 * @param {File}     videoFile
 * @param {number}   videoDuration  — total video length in seconds
 * @param {string}   workerUrl      — Cloudflare Worker base URL
 * @param {number}   clipDuration   — target clip length (15 | 30 | 60)
 * @param {Function} onProgress     — (phase, percent) callback
 * @returns {Promise<Array>}  segments sorted by score descending
 * @throws  'NO_SPEECH' if video has no detectable speech
 */
export async function analyzeTranscript(videoFile, videoDuration, workerUrl, clipDuration = 30, onProgress = null) {
  const baseUrl = workerUrl.replace(/\/+$/, '');
  console.log('[Transcript] analyzeTranscript started',
    { videoDuration, clipDuration, workerUrl: baseUrl });

  // 1. Transcribe (also returns per-second RMS energy for audio scoring)
  const { words, rmsPerSecond } = await transcribeVideo(videoFile, baseUrl, onProgress);

  if (words.length === 0) {
    console.warn('[Transcript] No words returned — throwing NO_SPEECH');
    throw new Error('NO_SPEECH');
  }

  console.log(`[Transcript] Transcription succeeded: ${words.length} words`);

  // 2. Build sentences
  if (onProgress) onProgress('building', 0);
  const sentences = buildSentences(words);
  if (sentences.length === 0) throw new Error('NO_SPEECH');

  console.log(`[Transcript] ${sentences.length} sentences detected`);

  // 3. Generate candidates
  const allCandidates = buildCandidates(sentences, clipDuration, videoDuration);
  if (allCandidates.length === 0) throw new Error('NO_CANDIDATES');

  console.log(`[Transcript] Candidate segments built: ${allCandidates.length}`);

  // 4. Client-side scores (fast, no API)
  const clientScores = allCandidates.map(c => ({
    boundaryQuality: scoreBoundaryQuality(c, sentences),
    completeness:    scoreCompleteness(c),
    audioEmphasis:   scoreAudioEmphasis(c, rmsPerSecond),
  }));

  // 5. Pre-filter: keep top 10 by client score for LLM scoring
  const MAX_LLM = 10;
  let indicesToScore = allCandidates.map((_, i) => i);
  if (indicesToScore.length > MAX_LLM) {
    indicesToScore.sort((a, b) => {
      const sa = clientScores[a].boundaryQuality + clientScores[a].completeness + clientScores[a].audioEmphasis;
      const sb = clientScores[b].boundaryQuality + clientScores[b].completeness + clientScores[b].audioEmphasis;
      return sb - sa;
    });
    indicesToScore = indicesToScore.slice(0, MAX_LLM);
  }

  const candidatesForLLM = indicesToScore.map(i => allCandidates[i]);

  // 6. LLM scoring (one batched call)
  if (onProgress) onProgress('scoring', 0);
  console.log(`[Transcript] Scoring ${candidatesForLLM.length} candidates with LLM...`);
  const llmScores = await scoreCandidatesWithLLM(candidatesForLLM, baseUrl);
  console.log('[Transcript] LLM scoring complete');
  if (onProgress) onProgress('scoring', 100);

  // 7. Build final scored segments with hook titles + smart boundaries
  const scored = indicesToScore.map((origIdx, j) => {
    const c     = allCandidates[origIdx];
    const llm   = llmScores[j];
    const cs    = clientScores[origIdx];
    const score = compositeScore(llm, cs);

    // Collect all words for this segment (used for subtitle timing in Phase 5)
    const segWords = c.sentences.flatMap(s => s.words);

    // Smart clip length: adjust to natural sentence boundaries (prefer 20-45s)
    let { startSeconds, endSeconds } = adjustToNaturalBoundaries(
      c, sentences, clipDuration, videoDuration
    );

    return {
      startSeconds,
      endSeconds,
      label:            c.sentences[0].text.slice(0, 80),
      hookTitle:        generateHookTitle(c.text),
      reason:           buildReason(llm, cs),
      score,
      transcriptSnippet: c.text,
      words:            segWords,
    };
  });

  // 8. Deduplicate by overlap + transcript similarity, sort by score
  const maxSegments = Math.min(10, Math.max(2, Math.floor(videoDuration / clipDuration)));
  const final = deduplicateSegments(scored).slice(0, maxSegments);

  // Sort chronologically for user-friendly display
  final.sort((a, b) => a.startSeconds - b.startSeconds);

  console.log(`[Transcript] Final segments selected: ${final.length}`,
    final.map(s => ({ start: s.startSeconds, end: s.endSeconds, score: s.score, label: s.label.slice(0, 40) })));
  return final;
}

/**
 * Human-readable error messages for transcript pipeline errors.
 */
export function getTranscriptErrorMessage(error) {
  const messages = {
    NO_SPEECH:              'No speech detected in the video. Falling back to visual analysis.',
    NO_CANDIDATES:          'Could not form any segments from the transcript. You can add segments manually.',
    TRANSCRIPTION_FAILED:   'Transcription API failed for all audio chunks. Check worker logs. Falling back to visual analysis.',
  };
  return messages[error.message] || `Transcript analysis failed: ${error.message}`;
}
