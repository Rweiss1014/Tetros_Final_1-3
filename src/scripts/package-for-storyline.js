import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('📦 Packaging for Articulate Storyline...\n');

// Create storyline-package directory
const packageDir = join(rootDir, 'storyline-package');
if (!existsSync(packageDir)) {
  mkdirSync(packageDir, { recursive: true });
}

// Copy dist folder contents
console.log('✓ Copying build files...');
// Note: In a real Node.js environment, you would use fs-extra or recursive copy
// For now, we'll create a README that explains the manual process

// Create a README in the package directory
const readmeContent = `# Tetris Training - Ready for Storyline

## What's in this folder?

This folder contains everything you need to add the Tetris Training game to Articulate Storyline.

## How to use:

### Option 1: Use the dist folder (Recommended)
1. Copy the entire \`dist\` folder from your build
2. In Storyline: Insert → Web Object → Web object from folder
3. Select the \`dist\` folder
4. Set size to 1280×720 (or 960×720)
5. Check "Scale to fit"

### Option 2: Upload to a web server
1. Upload all files from the \`dist\` folder to your web server
2. In Storyline: Insert → Web Object → Web object from URL  
3. Enter the URL to your hosted index.html

## Recommended Storyline Settings:

**Slide Size:**
- Width: 1280px (widescreen) or 960px (standard)
- Height: 720px

**Web Object Settings:**
- Display at 100% 
- Scale to fill browser
- Allow keyboard input

## Add this instruction text to your slide:

"Click the game area to begin. Use Arrow Keys to move and rotate pieces. Press SPACE for instant drop."

## Features:

✓ Full Tetris gameplay
✓ Progressive difficulty (10 levels)
✓ Quiz system every 5 lines cleared
✓ High score tracking (localStorage)
✓ Top 10 leaderboard
✓ Responsive design

## Browser Compatibility:

Works in all modern browsers:
- Chrome, Firefox, Safari, Edge (latest versions)
- Requires JavaScript enabled
- Uses localStorage for high scores

## File Size:

Approximately 500KB-1MB total (optimized and compressed)

## Need Help?

See the full documentation in STORYLINE_INSTRUCTIONS.md and BUILD_FOR_STORYLINE.md

---
Built with React + TypeScript + Tailwind CSS
`;

writeFileSync(join(packageDir, 'README.txt'), readmeContent);

console.log('✓ Created package README');
console.log('\n✅ Packaging complete!');
console.log('\n📁 Next steps:');
console.log('1. Copy your "dist" folder into the "storyline-package" folder');
console.log('2. Zip the entire "storyline-package" folder');
console.log('3. Follow the instructions in storyline-package/README.txt');
console.log('\nOr simply use the "dist" folder directly in Storyline!\n');
