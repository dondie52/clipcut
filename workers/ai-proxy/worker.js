/**
 * ClipCut AI Proxy Worker
 * Proxies requests from the browser to Cloudflare Workers AI, adding CORS headers.
 *
 * Deploy: cd workers/ai-proxy && npx wrangler deploy
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method !== 'POST') {
      return Response.json({ error: 'Method not allowed' }, { status: 405, headers: CORS_HEADERS });
    }

    try {
      const { prompt, image } = await request.json();

      if (!prompt || !image) {
        return Response.json({ error: 'Missing prompt or image' }, { status: 400, headers: CORS_HEADERS });
      }

      const result = await env.AI.run('@cf/llava-hf/llava-1.5-7b-hf', {
        prompt,
        image: new Uint8Array(image),
      });

      return Response.json({ result }, { headers: CORS_HEADERS });
    } catch (err) {
      console.error('Worker AI error:', err);
      return Response.json(
        { error: err.message || 'AI inference failed' },
        { status: 500, headers: CORS_HEADERS }
      );
    }
  },
};
