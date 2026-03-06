#!/usr/bin/env node
/**
 * Script to register a workers.dev subdomain via Cloudflare API
 * This is a workaround for non-interactive deployment
 */

import { execSync } from 'child_process';

try {
  console.log('Attempting to register workers.dev subdomain...');
  
  // Get account ID from wrangler
  const whoamiOutput = execSync('npx wrangler whoami --json', { encoding: 'utf-8' });
  const whoami = JSON.parse(whoamiOutput);
  const accountId = whoami.account_id || Object.values(whoami.accounts || {})[0]?.id;
  
  if (!accountId) {
    console.error('Could not determine account ID');
    process.exit(1);
  }
  
  console.log(`Account ID: ${accountId}`);
  console.log('\nTo register your workers.dev subdomain, please visit:');
  console.log(`https://dash.cloudflare.com/${accountId}/workers/onboarding\n`);
  console.log('After registering, you can deploy with: npx wrangler deploy');
  
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
