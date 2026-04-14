#!/usr/bin/env node

/**
 * Performance Budget Checker
 * Validates build output against performance-budget.json
 */

import { readFileSync, statSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { gzipSync } from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

/**
 * Load performance budget configuration
 */
function loadBudget() {
  try {
    const budgetPath = join(rootDir, 'performance-budget.json');
    const budgetContent = readFileSync(budgetPath, 'utf-8');
    return JSON.parse(budgetContent);
  } catch (error) {
    console.error('Failed to load performance-budget.json:', error.message);
    process.exit(1);
  }
}

/**
 * Get file size in KB
 */
function getFileSize(filePath) {
  try {
    const stats = statSync(filePath);
    return stats.size / 1024; // Convert to KB
  } catch (error) {
    return 0;
  }
}

/**
 * Get all JS files in dist/assets, sized by their gzipped output.
 *
 * The budget in performance-budget.json is expressed as gzipped KB (see the
 * "(gzipped)" descriptions on every bundleSize entry), so we read the .js.gz
 * emitted by vite-plugin-compression instead of the raw .js byte count. Files
 * smaller than the compression plugin's threshold (1KB) have no .gz sibling;
 * for those we gzip on the fly so the check still represents over-the-wire
 * size for every chunk.
 */
function getBundleFiles() {
  const distDir = join(rootDir, 'dist');
  const assetsDir = join(distDir, 'assets');

  try {
    const files = readdirSync(assetsDir);
    return files
      .filter(file => file.endsWith('.js'))
      .map(file => {
        const jsPath = join(assetsDir, file);
        const gzPath = `${jsPath}.gz`;
        const gzSize = getFileSize(gzPath);
        let size = gzSize;
        if (size === 0) {
          // No pre-compressed sibling (file below plugin threshold) — gzip on
          // the fly so we still measure transfer size.
          try {
            const raw = readFileSync(jsPath);
            size = gzipSync(raw).length / 1024;
          } catch {
            size = getFileSize(jsPath); // last-resort fallback
          }
        }
        return { name: file, path: jsPath, size };
      })
      .sort((a, b) => b.size - a.size);
  } catch (error) {
    console.warn('dist/assets directory not found. Run build first.');
    return [];
  }
}

/**
 * Identify the initial bundle from the built index.html.
 *
 * Vite emits exactly one <script type="module" src="/assets/xxx.js"> for the
 * entry point, plus <link rel="modulepreload" href="/assets/yyy.js"> for its
 * synchronous dependencies. Everything else (route chunks, vendor chunks
 * behind React.lazy, worker chunks) is lazy and shouldn't count toward the
 * "initial bundle" budget.
 *
 * Previously this script treated files[0] (the biggest chunk) as the entry,
 * which is wrong in any code-split app: the biggest chunk is usually a lazy
 * route (here, LongToShorts + TFJS). That produced false-positive failures
 * like "Initial bundle exceeds limit: 288KB" when the real critical path
 * was ~115KB.
 */
function getInitialChunkNames() {
  try {
    const html = readFileSync(join(rootDir, 'dist', 'index.html'), 'utf-8');
    const names = new Set();
    const scriptRe = /<script\b[^>]*\bsrc="([^"]+\.js)"/g;
    const preloadRe = /<link\b[^>]*\brel="modulepreload"[^>]*\bhref="([^"]+\.js)"/g;
    let m;
    while ((m = scriptRe.exec(html)) !== null) names.add(m[1].split('/').pop());
    while ((m = preloadRe.exec(html)) !== null) names.add(m[1].split('/').pop());
    return names;
  } catch {
    return new Set();
  }
}

/**
 * Check bundle sizes against budget
 */
function checkBundleSizes(budget, files) {
  const errors = [];
  const warnings = [];

  // Initial bundle = the entry script + its modulepreloaded dependencies
  // (what actually downloads on first paint). Fall back to files[0] only if
  // the HTML isn't parseable, to stay useful during local dev.
  const initialNames = getInitialChunkNames();
  const initialFiles = initialNames.size > 0
    ? files.filter(f => initialNames.has(f.name))
    : [files[0]].filter(Boolean);
  const initialSize = initialFiles.reduce((sum, f) => sum + f.size, 0);
  const initialListing = initialFiles.map(f => f.name).join(', ') || 'n/a';

  if (initialFiles.length > 0) {
    const limit = budget.bundleSize.initial.limit;
    const warning = budget.bundleSize.initial.warning || limit * 0.9;

    if (initialSize > limit) {
      errors.push(`Initial bundle exceeds limit: ${initialSize.toFixed(2)}KB > ${limit}KB (entry + preloads: ${initialListing})`);
    } else if (initialSize > warning) {
      warnings.push(`Initial bundle approaching limit: ${initialSize.toFixed(2)}KB > ${warning}KB (entry + preloads: ${initialListing})`);
    }
  }

  // Check total bundle size
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  const totalLimit = budget.bundleSize.total.limit;
  const totalWarning = budget.bundleSize.total.warning || totalLimit * 0.9;

  if (totalSize > totalLimit) {
    errors.push(`Total bundle size exceeds limit: ${totalSize.toFixed(2)}KB > ${totalLimit}KB`);
  } else if (totalSize > totalWarning) {
    warnings.push(`Total bundle size approaching limit: ${totalSize.toFixed(2)}KB > ${totalWarning}KB`);
  }

  // Check per-route chunks (exclude vendor chunks and initial-path chunks)
  const routeChunks = files.filter(file =>
    !file.name.includes('vendor') &&
    !initialNames.has(file.name)
  );

  const perRouteLimit = budget.bundleSize.perRoute.limit;
  const perRouteWarning = budget.bundleSize.perRoute.warning || perRouteLimit * 0.9;

  routeChunks.forEach(file => {
    if (file.size > perRouteLimit) {
      errors.push(`Route chunk exceeds limit: ${file.name} (${file.size.toFixed(2)}KB > ${perRouteLimit}KB)`);
    } else if (file.size > perRouteWarning) {
      warnings.push(`Route chunk approaching limit: ${file.name} (${file.size.toFixed(2)}KB > ${perRouteWarning}KB)`);
    }
  });
  
  // Check vendor chunks
  const vendorChunks = {
    react: files.find(f => f.name.includes('vendor-react')),
    router: files.find(f => f.name.includes('vendor-router')),
    supabase: files.find(f => f.name.includes('vendor-supabase')),
    ffmpeg: files.find(f => f.name.includes('vendor-ffmpeg')),
  };
  
  Object.entries(budget.bundleSize.vendor).forEach(([name, config]) => {
    const chunk = vendorChunks[name];
    if (chunk) {
      const limit = config.limit;
      if (chunk.size > limit) {
        errors.push(`Vendor chunk ${name} exceeds limit: ${chunk.size.toFixed(2)}KB > ${limit}KB`);
      }
    }
  });
  
  return { errors, warnings, summary: { totalSize, initialSize } };
}

/**
 * Main function
 */
function main() {
  console.log('🔍 Checking performance budget...\n');
  
  const budget = loadBudget();
  const files = getBundleFiles();
  
  if (files.length === 0) {
    console.log('⚠️  No bundle files found. Run `npm run build` first.');
    process.exit(0);
  }
  
  console.log(`Found ${files.length} bundle files (sizes shown gzipped):\n`);
  files.forEach(file => {
    console.log(`  ${file.name}: ${file.size.toFixed(2)}KB`);
  });
  console.log('');
  
  const { errors, warnings, summary } = checkBundleSizes(budget, files);
  
  // Print summary
  console.log('📊 Bundle Size Summary (gzipped):');
  console.log(`  Total: ${summary.totalSize.toFixed(2)}KB`);
  console.log(`  Initial: ${summary.initialSize.toFixed(2)}KB\n`);
  
  // Print warnings
  if (warnings.length > 0) {
    console.log('⚠️  Warnings:');
    warnings.forEach(warning => console.log(`  - ${warning}`));
    console.log('');
  }
  
  // Print errors
  if (errors.length > 0) {
    console.log('❌ Errors (budget exceeded):');
    errors.forEach(error => console.log(`  - ${error}`));
    console.log('');
    console.log('💡 Consider:');
    console.log('  - Code splitting');
    console.log('  - Tree shaking');
    console.log('  - Lazy loading');
    console.log('  - Removing unused dependencies');
    process.exit(1);
  }
  
  console.log('✅ All bundle sizes within budget!');
  process.exit(0);
}

main();
