# ClipCut AI Proxy Worker

This Cloudflare Worker proxies requests from the browser to Cloudflare Workers AI, enabling the "Long to Shorts" feature in ClipCut.

## Prerequisites

- Node.js 20+ (use `nvm use 20` if you have nvm)
- Cloudflare account (free tier works)
- Wrangler CLI (installed via npx)

## Deployment

### Step 1: Register workers.dev Subdomain

**This step must be done manually through the Cloudflare dashboard:**

1. Visit: https://dash.cloudflare.com/f6b435492b840fd0446eba35ac22e8f1/workers/onboarding
2. Register your workers.dev subdomain (e.g., `yourname.workers.dev`)
3. Complete the registration process

### Step 2: Deploy the Worker

Once the subdomain is registered, run:

```bash
cd workers/ai-proxy
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 20
npx wrangler deploy
```

Or use the deployment script:

```bash
./deploy.sh
```

### Step 3: Add Worker URL to .env

After deployment, wrangler will output a URL like:
```
https://clipcut-ai-proxy.yourname.workers.dev
```

Add this to your `.env` file in the project root:

```env
VITE_AI_WORKER_URL=https://clipcut-ai-proxy.yourname.workers.dev
```

### Step 4: Restart Dev Server

```bash
npm run dev
```

The warning should disappear and the "Analyze with AI" button will work.

## How It Works

The worker receives POST requests with video frame images and prompts, forwards them to Cloudflare Workers AI using the `@cf/llava-hf/llava-1.5-7b-hf` model, and returns analysis results for video segments.

## Free Tier Limits

- 10,000 requests/day on Cloudflare Workers free tier
- Sufficient for development and moderate usage
