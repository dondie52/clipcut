/**
 * Generate PWA icons from SVG
 * Run with: node scripts/generate-icons.mjs
 */

import sharp from 'sharp';
import { readFile } from 'fs/promises';
import { join } from 'path';

const ICONS_DIR = './public/icons';
const SVG_PATH = join(ICONS_DIR, 'icon.svg');

const SIZES = [192, 512];

async function generateIcons() {
  console.log('🎨 Generating PWA icons...');
  
  try {
    const svgBuffer = await readFile(SVG_PATH);
    
    for (const size of SIZES) {
      const outputPath = join(ICONS_DIR, `icon-${size}.png`);
      
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generated icon-${size}.png`);
    }
    
    // Generate favicon
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile('./public/favicon.png');
    
    console.log('✅ Generated favicon.png');
    console.log('\n✨ Done!');
    
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
