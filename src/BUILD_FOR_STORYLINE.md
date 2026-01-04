# Build Instructions for Storyline Integration

## Step-by-Step Guide

### 1. Download Your Project Files

First, you need to download all the files from this Figma Make project to your local computer.

### 2. Set Up Your Development Environment

If you haven't already, install Node.js from https://nodejs.org/ (LTS version recommended)

### 3. Install Dependencies

Open a terminal in your project folder and run:
```bash
npm install
```

### 4. Build for Production

Run the build command:
```bash
npm run build
```

This creates a `dist` folder with optimized, production-ready files.

### 5. What You'll Get

After building, your `dist` folder will contain:
```
dist/
├── index.html          # Main entry point
├── assets/
│   ├── index-[hash].js     # Compiled JavaScript
│   ├── index-[hash].css    # Compiled styles
│   └── [other assets]
```

### 6. Import to Storyline

#### Method 1: Local Folder (Recommended)
1. Open your Storyline project
2. Go to **Insert** → **Web Object**
3. Select **Web Object from folder**
4. Browse to and select your `dist` folder
5. Set size: **1280px × 720px** (widescreen) or **960px × 720px** (standard)
6. Check "Scale to fit"
7. Click Insert

#### Method 2: Hosted URL
1. Upload the contents of the `dist` folder to a web server
2. In Storyline: **Insert** → **Web Object** → **Web object from URL**
3. Enter the URL to your hosted `index.html`
4. Set the same size settings as Method 1

### 7. Add Instructions to Your Slide

Add a text box on your Storyline slide with:
> **"Click the game area and use Arrow Keys to play. Press SPACE for hard drop."**

### 8. Preview and Test

1. **Preview in Storyline**: Click the Preview button
2. **Test keyboard**: Ensure arrow keys and spacebar work
3. **Test quiz**: Play until you clear 5 lines to trigger the first quiz
4. **Test persistence**: Close preview, reopen - high scores should remain

### 9. Publish Your Course

Publish your Storyline course as usual. The web object will be embedded automatically.

## Alternative: Quick Test Without Building

If you just want to test the game first:

1. In this Figma Make environment, use the preview button
2. Copy the URL from your browser
3. Use that URL as a temporary web object in Storyline
4. Note: This is only for testing; for production, use the build method above

## Optimal Settings for Storyline

### Slide Properties
- **Player size**: 1280 × 720 (16:9 widescreen)
- **Scale player to fill browser**: Yes
- **Display at user's current browser size**: Yes

### Web Object Properties
- **Width**: 1240px (leaves room for margins)
- **Height**: 700px
- **Scale to fit**: ✅ Checked
- **Center on slide**: ✅ Checked

## File Size Considerations

The built game is approximately:
- **Total size**: ~500KB - 1MB (compressed)
- **JavaScript**: ~300-500KB
- **CSS**: ~50-100KB
- **No external images**: All UI is code-based

This is small enough for smooth loading in most LMS environments.

## Browser Requirements

Works in all browsers supported by Storyline 360:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Data Persistence

The game uses **localStorage** to save:
- High scores (top 10)
- Player names
- Statistics

**Important**: 
- Data is stored per-browser, per-device
- Clearing browser data will reset high scores
- Each learner will have their own localStorage on their device
- Scores don't sync between devices or learners

## Need to Update the Game?

1. Make changes in Figma Make
2. Download updated files
3. Run `npm run build` again
4. Replace the web object in Storyline with the new `dist` folder

## Troubleshooting

### "Web object doesn't load"
- Ensure you selected the entire `dist` folder, not just index.html
- Check that the `assets` subfolder is included

### "Controls don't respond"
- Add instruction to click the game first
- Check that your LMS allows keyboard events

### "High scores don't save"
- Check if localStorage is enabled in browser/LMS
- Some LMS platforms block localStorage for security

### "Game looks wrong/cut off"
- Adjust web object dimensions in Storyline
- Try different scale settings
- Ensure your slide is 16:9 ratio (1280×720)

## Questions?

The game is completely self-contained with no external dependencies, API calls, or server requirements. Once built, it runs entirely in the browser.
