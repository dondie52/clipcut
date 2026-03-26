#!/bin/bash
# Complete deployment script - run this after registering your workers.dev subdomain
# This script will deploy the worker and update your .env file automatically

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Use Node 20
nvm use 20 || (nvm install 20 && nvm use 20)

echo "🚀 Deploying ClipCut AI Proxy Worker..."
echo ""

cd "$SCRIPT_DIR"

# Deploy and capture output
DEPLOY_OUTPUT=$(npx wrangler deploy 2>&1) || {
    echo "❌ Deployment failed!"
    echo ""
    echo "$DEPLOY_OUTPUT" | grep -A 5 "ERROR\|WARNING" || echo "$DEPLOY_OUTPUT"
    echo ""
    echo "Make sure you've registered your workers.dev subdomain at:"
    echo "https://dash.cloudflare.com/f6b435492b840fd0446eba35ac22e8f1/workers/onboarding"
    exit 1
}

# Extract worker URL from output
WORKER_URL=$(echo "$DEPLOY_OUTPUT" | grep -oP 'https://[^\.\s]+\.workers\.dev' | head -1)

if [ -z "$WORKER_URL" ]; then
    # Try alternative pattern
    WORKER_URL=$(echo "$DEPLOY_OUTPUT" | grep -oP 'https://clipcut-ai-proxy[^\.\s]*\.workers\.dev' | head -1)
fi

if [ -n "$WORKER_URL" ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo "Worker URL: $WORKER_URL"
    echo ""
    
    # Update .env file
    ENV_FILE="$PROJECT_ROOT/.env"
    if [ -f "$ENV_FILE" ]; then
        if grep -q "^VITE_AI_WORKER_URL=" "$ENV_FILE"; then
            # Update existing entry
            sed -i "s|^VITE_AI_WORKER_URL=.*|VITE_AI_WORKER_URL=$WORKER_URL|" "$ENV_FILE"
            echo "✅ Updated VITE_AI_WORKER_URL in .env"
        else
            # Add new entry
            echo "" >> "$ENV_FILE"
            echo "VITE_AI_WORKER_URL=$WORKER_URL" >> "$ENV_FILE"
            echo "✅ Added VITE_AI_WORKER_URL to .env"
        fi
    else
        echo "⚠️  .env file not found. Please add manually:"
        echo "VITE_AI_WORKER_URL=$WORKER_URL"
    fi
    
    echo ""
    echo "🎉 Setup complete! Restart your dev server to use the AI features."
else
    echo ""
    echo "⚠️  Could not extract worker URL from deployment output."
    echo "Please check the output above and add VITE_AI_WORKER_URL to your .env file manually."
    echo "$DEPLOY_OUTPUT"
fi
