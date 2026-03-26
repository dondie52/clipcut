#!/usr/bin/env node

/**
 * Performance Budget Checker
 * Validates build output against performance-budget.json
 */

import { readFileSync, statSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

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
 * Get all JS files in dist/assets
 */
function getBundleFiles() {
  const distDir = join(rootDir, 'dist');
  const assetsDir = join(distDir, 'assets');
  
  try {
    const files = readdirSync(assetsDir);
    return files
      .filter(file => file.endsWith('.js'))
      .map(file => ({
        name: file,
        path: join(assetsDir, file),
        size: getFileSize(join(assetsDir, file))
      }))
      .sort((a, b) => b.size - a.size);
  } catch (error) {
    console.warn('dist/assets directory not found. Run build first.');
    return [];
  }
}

/**
 * Check bundle sizes against budget
 */
function checkBundleSizes(budget, files) {
  const errors = [];
  const warnings = [];
  
  // Find initial bundle (usually the largest entry point)
  const initialBundle = files[0];
  if (initialBundle) {
    const limit = budget.bundleSize.initial.limit;
    const warning = budget.bundleSize.initial.warning || limit * 0.9;
    
    if (initialBundle.size > limit) {
      errors.push(`Initial bundle exceeds limit: ${initialBundle.size.toFixed(2)}KB > ${limit}KB (${initialBundle.name})`);
    } else if (initialBundle.size > warning) {
      warnings.push(`Initial bundle approaching limit: ${initialBundle.size.toFixed(2)}KB > ${warning}KB (${initialBundle.name})`);
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
  
  // Check per-route chunks (exclude vendor chunks)
  const routeChunks = files.filter(file => 
    !file.name.includes('vendor') && 
    file.name !== initialBundle?.name
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
  
  return { errors, warnings, summary: { totalSize, initialSize: initialBundle?.size || 0 } };
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
  
  console.log(`Found ${files.length} bundle files:\n`);
  files.forEach(file => {
    console.log(`  ${file.name}: ${file.size.toFixed(2)}KB`);
  });
  console.log('');
  
  const { errors, warnings, summary } = checkBundleSizes(budget, files);
  
  // Print summary
  console.log('📊 Bundle Size Summary:');
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
