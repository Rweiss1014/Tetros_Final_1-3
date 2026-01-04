# Embedding Tetris Training in Articulate Storyline

This guide explains how to export your Tetris Training game as a Web Object for use in Articulate Storyline.

## Quick Steps

### 1. Build the Application

In your terminal, run:
```bash
npm run build
```

This creates a `dist` folder with all the compiled files.

### 2. Prepare for Storyline

The `dist` folder will contain:
- `index.html` - Main entry point
- `assets/` folder - CSS, JS, and other resources

### 3. Import to Storyline

**Option A: Direct Folder Import**
1. In Storyline, go to **Insert > Web Object**
2. Choose **Web Object from folder**
3. Select the entire `dist` folder
4. Set dimensions (recommended: 1280px × 720px or 960px × 720px)
5. Click OK

**Option B: Hosted Version**
1. Upload the `dist` folder contents to a web server
2. In Storyline, choose **Web Object from URL**
3. Enter the URL to your `index.html`

## Recommended Settings

### Slide Size
- **Standard**: 960px wide × 720px tall
- **Widescreen**: 1280px wide × 720px tall

### Web Object Settings
- ✅ Display at 100% of slide area
- ✅ Allow objects to resize to fill browser
- ✅ Scale to fit (maintain aspect ratio)

## Features That Work in Storyline

✅ Full gameplay with keyboard controls
✅ Score tracking and high scores (saved in browser localStorage)
✅ Quiz system with immediate feedback
✅ Leaderboard system
✅ Responsive to container size

## Important Notes

### LocalStorage
- High scores are saved in the browser's localStorage
- Data persists between sessions for the same learner
- Each learner on the same computer will see the same leaderboard
- Scores don't sync across different computers/browsers

### Keyboard Controls
- Ensure learners know they need to click on the game first to activate keyboard controls
- Arrow keys and spacebar are required for gameplay

### Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled

## Optional: Communication with Storyline

If you need the game to communicate scores back to Storyline, you can use this JavaScript in a Storyline trigger:

```javascript
// Get the score from the web object
var player = GetPlayer();
var webObject = document.querySelector('iframe'); // Adjust selector as needed

// You would need to add postMessage events to the game
// Then listen here and set Storyline variables
```

## Troubleshooting

**Game doesn't load:**
- Check that all files from the `dist` folder are included
- Ensure the folder structure is preserved (index.html at root, assets in subfolder)

**Controls don't work:**
- Learner must click inside the game area first to focus it
- Add an instruction on your Storyline slide: "Click the game to begin"

**Scores don't save:**
- LocalStorage must be enabled in the browser
- Some LMS environments may block localStorage

**Game appears too small/large:**
- Adjust the web object dimensions in Storyline
- The game uses responsive design and will adapt

## Testing

1. Test in Storyline Preview mode first
2. Test in a published course
3. Test in your actual LMS environment
4. Verify keyboard controls work in all environments

## Support

The game is self-contained and doesn't require external APIs or services. All functionality works offline once loaded.
