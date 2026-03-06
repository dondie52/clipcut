#!/bin/bash
# Deployment script for ClipCut AI Proxy Worker
# This script handles Node version and guides through subdomain registration

set -e

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Use Node 20
nvm use 20 || nvm install 20 && nvm use 20

echo "🚀 Deploying ClipCut AI Proxy Worker..."
echo ""

# Try to deploy
if npx wrangler deploy 2>&1 | tee /tmp/wrangler-deploy.log; then
    echo ""
    echo "✅ Deployment successful!"
    WORKER_URL=$(grep -oP 'https://[^\.]+\.workers\.dev' /tmp/wrangler-deploy.log | head -1 || echo "")
    if [ -n "$WORKER_URL" ]; then
        echo "Worker URL: $WORKER_URL"
        echo ""
        echo "Add this to your .env file:"
        echo "VITE_AI_WORKER_URL=$WORKER_URL"
    fi
else
    echo ""
    echo "⚠️  Deployment failed. This usually means you need to register a workers.dev subdomain."
    echo ""
    echo "To fix this:"
    echo "1. Visit: https://dash.cloudflare.com/f6b435492b840fd0446eba35ac22e8f1/workers/onboarding"
    echo "2. Register your workers.dev subdomain"
    echo "3. Run this script again: ./deploy.sh"
    echo ""
    exit 1
fi
