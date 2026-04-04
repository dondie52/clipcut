/**
 * ClipCut AI Proxy Worker
 * Routes:
 *   POST /            — Frame analysis (LLaVA vision + Llama JSON)
 *   POST /transcribe  — Audio transcription (Whisper)
 *   POST /score       — Transcript scoring  (Llama structured JSON)
 *
 * Deploy: cd workers/ai-proxy && npx wrangler deploy
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(data, status = 200) {
  return Response.json(data, { status, headers: CORS_HEADERS });
}

const WHISPER_UPSTREAM = 'https://abstracts-feb-impacts-oldest.trycloudflare.com/transcribe';
const UPSTREAM_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes — long videos on CPU

/* ─── Route: POST /transcribe ──────────────────────────────── */
async function handleTranscribe(request) {
  const audioData = await request.arrayBuffer();
  const byteLength = audioData.byteLength;

  if (!byteLength) {
    return jsonResponse({ error: 'Empty audio data' }, 400);
  }

  console.log(`[transcribe] Proxying ${byteLength} bytes (${(byteLength / 1024).toFixed(1)} KB) to upstream Whisper`);

  try {
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), UPSTREAM_TIMEOUT_MS);

    const upstream = await fetch(WHISPER_UPSTREAM, {
      method: 'POST',
      headers: { 'Content-Type': 'application/octet-stream' },
      body: audioData,
      signal: ac.signal,
    });

    clearTimeout(timer);

    if (!upstream.ok) {
      const errBody = await upstream.text().catch(() => '');
      console.error(`[transcribe] Upstream returned ${upstream.status}:`, errBody);
      return jsonResponse(
        { error: `Upstream Whisper error (${upstream.status})`, detail: errBody },
        upstream.status >= 500 ? 502 : upstream.status
      );
    }

    const data = await upstream.json();
    console.log('[transcribe] Upstream OK, keys:', Object.keys(data));

    // Flask server already returns { result: { text, words, language } }
    // so pass through directly — no extra wrapping needed
    return jsonResponse(data);
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error(`[transcribe] Upstream timed out after ${UPSTREAM_TIMEOUT_MS / 1000}s`);
      return jsonResponse({ error: 'Upstream Whisper server timed out' }, 504);
    }
    console.error(`[transcribe] Proxy failed:`, err.message);
    return jsonResponse(
      { error: `Failed to reach Whisper server: ${err.message}` },
      502
    );
  }
}

/* ─── Route: POST /score ───────────────────────────────────── */
async function handleScore(request, env) {
  const { prompt } = await request.json();
  if (!prompt) {
    return jsonResponse({ error: 'Missing prompt' }, 400);
  }

  const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
    messages: [
      { role: 'system', content: 'You output ONLY valid JSON. No markdown, no explanation, no extra text.' },
      { role: 'user', content: prompt },
    ],
  });

  return jsonResponse({ result });
}

/* ─── Route: POST / (existing frame analysis) ──────────────── */
async function handleFrameAnalysis(request, env) {
  const { prompt, image } = await request.json();

  if (!prompt) {
    return jsonResponse({ error: 'Missing prompt' }, 400);
  }

  let result;

  if (image) {
    // Step 1: LLaVA describes the image
    const imageBytes = new Uint8Array(image);
    const visionResult = await env.AI.run('@cf/llava-hf/llava-1.5-7b-hf', {
      prompt: 'Describe what is happening in this video frame in 1-2 sentences.',
      image: [...imageBytes],
    });

    const description = visionResult?.description || visionResult?.response || String(visionResult);

    // Step 2: Llama reformats into structured JSON
    const structuredResult = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        {
          role: 'system',
          content: 'You output ONLY valid JSON. No extra text, no markdown, no explanation.',
        },
        {
          role: 'user',
          content: `A video frame was described as: "${description}"

The original request was: ${prompt}

Based on the description, respond with ONLY this JSON (no other text):
{"description":"brief description of what is happening","engagementScore":N}

Where engagementScore is 1-10 rating of how engaging this moment would be for a short-form video (TikTok/Reels). Consider action, emotion, visual interest, and surprise factor.`,
        },
      ],
    });

    const text = structuredResult?.response || '';
    result = { response: text };
  } else {
    result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [{ role: 'user', content: prompt }],
    });
  }

  return jsonResponse({ result });
}

/* ─── Entry point ──────────────────────────────────────────── */
export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405);
    }

    try {
      const url = new URL(request.url);
      const path = url.pathname.replace(/\/+$/, ''); // strip trailing slashes

      switch (path) {
        case '/transcribe':
          return await handleTranscribe(request);
        case '/score':
          return await handleScore(request, env);
        default:
          return await handleFrameAnalysis(request, env);
      }
    } catch (err) {
      console.error('Worker AI error:', err.message, err.stack);
      return jsonResponse(
        { error: err.message || 'AI inference failed', details: String(err) },
        500
      );
    }
  },
};
