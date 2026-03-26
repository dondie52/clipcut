/**
 * Image Optimization Script
 * Converts images to WebP format and optimizes them
 * Run with: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, parse } from 'path';
import { existsSync } from 'fs';

const INPUT_DIR = './public/images';
const OUTPUT_DIR = './public/images';
const WEBP_QUALITY = 80;

async function optimizeImages() {
  console.log('🖼️  Image Optimization Script');
  console.log('================================');
  
  try {
    const files = await readdir(INPUT_DIR);
    const imageFiles = files.filter(file => 
      /\.(jpe?g|png|gif)$/i.test(file) && !file.endsWith('.webp')
    );
    
    if (imageFiles.length === 0) {
      console.log('No images to optimize.');
      return;
    }
    
    console.log(`Found ${imageFiles.length} images to convert\n`);
    
    let totalOriginal = 0;
    let totalOptimized = 0;
    
    for (const file of imageFiles) {
      const inputPath = join(INPUT_DIR, file);
      const { name } = parse(file);
      const outputPath = join(OUTPUT_DIR, `${name}.webp`);
      
      // Get original file size
      const originalStats = await stat(inputPath);
      const originalSize = originalStats.size;
      totalOriginal += originalSize;
      
      // Convert to WebP
      await sharp(inputPath)
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputPath);
      
      // Get new file size
      const newStats = await stat(outputPath);
      const newSize = newStats.size;
      totalOptimized += newSize;
      
      const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
      console.log(`✅ ${file} → ${name}.webp (${formatBytes(originalSize)} → ${formatBytes(newSize)}, ${savings}% smaller)`);
    }
    
    console.log('\n================================');
    console.log(`Total: ${formatBytes(totalOriginal)} → ${formatBytes(totalOptimized)}`);
    console.log(`Savings: ${formatBytes(totalOriginal - totalOptimized)} (${((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1)}%)`);
    
  } catch (error) {
    console.error('Error optimizing images:', error);
    process.exit(1);
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1024 / 1024).toFixed(1) + ' MB';
}

optimizeImages();
