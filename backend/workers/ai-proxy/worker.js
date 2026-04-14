/**
 * ClipCut AI Proxy Worker
 * Routes:
 *   POST /            — Frame analysis (LLaVA vision + Llama JSON)
 *   POST /transcribe  — Audio transcription (Whisper)
 *   POST /score       — Transcript scoring  (Llama structured JSON)
 *   POST /edit        — Intent parsing (natural language → structured edit actions)
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

/* ─── Route: POST /edit ────────────────────────────────────── */
const VALID_ACTION_TYPES = new Set([
  'add_captions', 'remove_captions', 'remove_silence', 'cut_clip', 'split_clip',
  'add_text', 'apply_filter', 'change_speed', 'add_music',
  // Phase 2 — ML-powered actions
  'remove_filler_words', 'detect_scenes', 'auto_highlight',
  'smart_crop', 'beat_sync', 'zoom_to_speaker', 'remove_boring',
]);

const EDIT_SYSTEM_PROMPT = `You are a friendly video editing assistant called ClipCut AI.
You handle TWO types of user messages:

1. CONVERSATION — greetings, questions, or messages that are NOT editing commands.
   Respond with EXACTLY this JSON (no extra text):
   {"type":"chat","message":"your friendly reply here"}
   Keep replies short (1-2 sentences). You can suggest editing actions the user can try.

2. EDIT COMMANDS — requests to modify the video (add captions, remove silence, etc.).
   Respond with EXACTLY this JSON (no extra text):
   {"type":"actions","actions":[...array of action objects...]}
   Each action has a "type" and "params" object. Valid types and their params:
   - add_captions: style (classic|boxed|modern|minimal)
   - remove_captions: (no params) — deletes all existing caption clips from the timeline. Use this when the user says "remove captions", "delete captions", "get rid of captions", "no captions", or similar. Never map removal requests to add_captions.
   - remove_silence: threshold (-60 to -20, default -40 dB), minDuration (0.1-2.0, default 0.5 sec)
   - cut_clip: from (seconds), to (seconds)
   - split_clip: at (seconds)
   - add_text: text (string), position (top|center|bottom), duration (seconds)
   - apply_filter: name (cinematic|vintage|bw|warm|cool|90s|sepia)
   - change_speed: speed (0.5|1|1.5|2|4)
   - add_music: genre (chill|epic|happy|sad|energetic)
   - remove_filler_words: fillers (optional array like ['um','uh','like','you know'])
   - detect_scenes: sensitivity (low|medium|high, default medium)
   - auto_highlight: duration (seconds, default 30)
   - smart_crop: aspect (9:16|1:1|4:5, default 9:16)
   - beat_sync: sensitivity (0.5-3.0, default 1.5)
   - zoom_to_speaker: zoomFactor (1.1-2.0, default 1.3)
   - remove_boring: threshold (1-10 engagement score, default 4)

Context about the video will be provided. Use it to make smart defaults.
Return ONLY valid JSON. No markdown fences, no explanation, no extra text.`;

async function handleEdit(request, env) {
  const body = await request.json();
  const { prompt, context, history } = body;

  if (!prompt || typeof prompt !== 'string') {
    return jsonResponse({ error: 'Missing or invalid prompt' }, 400);
  }

  // Build context-enriched system prompt
  let systemPrompt = EDIT_SYSTEM_PROMPT;
  if (context) {
    const parts = [`duration=${context.duration}s`, `clips=${context.clipCount}`, `playhead=${context.currentTime}s`];
    if (context.hasAudio) parts.push('hasAudio=true');
    if (context.hasCaptions) parts.push('hasCaptions=true');
    if (context.filters) parts.push(`filters=[${context.filters}]`);
    if (context.tracks) parts.push(`tracks=${context.tracks}`);
    systemPrompt += `\n\nCurrent timeline state: ${parts.join(', ')}`;
  }

  // Build messages array with conversation history (last 10 turns max)
  const messages = [{ role: 'system', content: systemPrompt }];

  if (Array.isArray(history) && history.length > 0) {
    // Include last 10 messages (5 user + 5 assistant turns)
    const recent = history.slice(-10);
    for (const msg of recent) {
      if (msg.role === 'user' || msg.role === 'assistant') {
        messages.push({ role: msg.role, content: String(msg.content || '').slice(0, 500) });
      }
    }
  }

  messages.push({ role: 'user', content: prompt });

  const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', { messages });

  const raw = result?.response || '';

  // Parse JSON from the response, stripping any accidental markdown fences
  let parsed;
  try {
    const cleaned = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
    parsed = JSON.parse(cleaned);
  } catch (parseErr) {
    // LLM returned unparseable text — treat it as a conversational reply
    console.log('[edit] LLM returned non-JSON, treating as chat:', raw.slice(0, 120));
    return jsonResponse({ type: 'chat', message: raw.trim() || "I'm not sure what you mean. Try something like 'add captions' or 'remove silence'." });
  }

  // Handle conversational response: {type: "chat", message: "..."}
  if (parsed && parsed.type === 'chat' && typeof parsed.message === 'string') {
    console.log('[edit] Chat response');
    return jsonResponse({ type: 'chat', message: parsed.message });
  }

  // Handle edit actions — either {type: "actions", actions: [...]} or bare [...]
  const rawActions = Array.isArray(parsed) ? parsed
    : (parsed?.type === 'actions' && Array.isArray(parsed?.actions)) ? parsed.actions
    : null;

  if (!rawActions) {
    // LLM returned valid JSON but not in expected shape — treat as chat
    const fallbackMsg = typeof parsed?.message === 'string' ? parsed.message
      : "I'm not sure what you mean. Try something like 'add captions' or 'remove silence'.";
    return jsonResponse({ type: 'chat', message: fallbackMsg });
  }

  // Validate and sanitize each action
  const validated = rawActions
    .filter(a => a && typeof a === 'object' && VALID_ACTION_TYPES.has(a.type))
    .map(a => ({ type: a.type, params: a.params || {} }));

  if (validated.length === 0) {
    return jsonResponse({ type: 'chat', message: "I couldn't find a matching edit action. Try 'add captions', 'remove silence', or 'make it vertical'." });
  }

  console.log(`[edit] Parsed ${validated.length} action(s):`, validated.map(a => a.type));

  return jsonResponse({ type: 'actions', actions: validated });
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
        case '/edit':
          return await handleEdit(request, env);
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
