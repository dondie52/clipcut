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

/* ─── Route: POST /transcribe ──────────────────────────────── */
async function handleTranscribe(request, env) {
  const audioData = await request.arrayBuffer();
  const byteLength = audioData.byteLength;

  if (!byteLength) {
    return jsonResponse({ error: 'Empty audio data' }, 400);
  }

  console.log(`[transcribe] Received ${byteLength} bytes (${(byteLength / 1024).toFixed(1)} KB)`);

  try {
    // Chunks are now 10s (~320 KB) so the spread array stays manageable.
    // Previous 25s chunks (~800 KB) caused OOM/timeout on Workers AI.
    const result = await env.AI.run('@cf/openai/whisper', {
      audio: [...new Uint8Array(audioData)],
    });

    console.log('[transcribe] Whisper OK, words:', result?.words?.length ?? 0,
      ', vtt length:', result?.vtt?.length ?? 0);
    return jsonResponse({ result });
  } catch (err) {
    console.error(`[transcribe] Whisper failed (${byteLength} bytes):`, err.message, err.stack);
    return jsonResponse(
      { error: `Whisper inference failed: ${err.message}`, audioSize: byteLength },
      500
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
          return await handleTranscribe(request, env);
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
