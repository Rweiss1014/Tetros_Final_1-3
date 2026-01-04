# How to Export from Figma Make to Storyline

This guide explains how to get your Tetris Training game from Figma Make into Articulate Storyline.

## Method 1: Direct Download (Recommended)

### Step 1: Download from Figma Make
1. In Figma Make, look for the **Download** or **Export** button
2. Download all project files as a ZIP
3. Extract the ZIP to a folder on your computer

### Step 2: Set Up Locally
```bash
# Navigate to the extracted folder
cd tetris-training

# Install dependencies
npm install

# Build for production
npm run build
```

### Step 3: Use in Storyline
The `dist` folder now contains everything you need:
- Copy the `dist` folder
- In Storyline: Insert → Web Object → Web object from folder
- Select the `dist` folder
- Done!

## Method 2: If You Can't Download

### Option A: Use Figma Make Preview URL
1. In Figma Make, click the preview/share button
2. Copy the preview URL
3. In Storyline: Insert → Web Object → Web object from URL
4. Paste the URL

⚠️ **Note:** This is temporary and only works while your Figma Make project is active.

### Option B: Deploy to a Web Host
1. Download project files from Figma Make
2. Run `npm install && npm run build`
3. Upload the `dist` folder contents to:
   - GitHub Pages
   - Netlify
   - Vercel
   - Your own web server
4. Use the hosted URL in Storyline

## Method 3: Manual File Creation

If you can't use npm/build tools:

### What You Need
You need these files from Figma Make:
- `App.tsx` and all `.tsx` files
- `components/` folder with all subfiles
- `styles/globals.css`
- `package.json`

### Build Process
```bash
# If Node.js is installed:
npm install
npm run build

# The dist folder is your web object
```

## Troubleshooting Export Issues

### "Can't Download Files"
- Try exporting individual files
- Contact Figma Make support
- Use Method 2 (preview URL) as temporary solution

### "npm Command Not Found"
- Install Node.js from https://nodejs.org
- Restart your terminal/command prompt
- Try the command again

### "Build Fails"
- Make sure you're in the correct folder
- Check that package.json exists
- Try: `rm -rf node_modules && npm install`
- Then: `npm run build`

### "Missing Files After Build"
- Check the `dist` folder exists
- Look for `dist/index.html`
- Look for `dist/assets` folder
- If missing, build failed - check error messages

## What's in the Build?

After `npm run build`, your `dist` folder contains:

```
dist/
├── index.html                    # Entry point (40-50KB)
├── assets/
│   ├── index-[hash].js          # Game code (400-500KB)
│   └── index-[hash].css         # Styles (50-100KB)
```

**Total size:** ~500KB - 1MB

## Verifying Your Build

### Quick Test
1. Navigate to the `dist` folder
2. Double-click `index.html`
3. Game should open in your browser
4. Test the controls work
5. Play until first quiz appears

### Full Test Checklist
- [ ] Game loads without errors
- [ ] Arrow keys work
- [ ] Pieces fall and stack
- [ ] Lines clear correctly
- [ ] Quiz appears after 5 lines
- [ ] High scores save
- [ ] Leaderboard opens

## Using the Build in Storyline

### Step-by-Step
1. **Open Storyline 360**
2. **Create/open a slide**
3. **Insert menu** → **Web Object**
4. **Choose:** "Web object from folder"
5. **Browse to** your `dist` folder
6. **Select** the `dist` folder (not individual files inside it)
7. **Set dimensions:**
   - Width: 1280
   - Height: 720
8. **Enable:** "Scale to fit"
9. **Click:** Insert

### Add Instructions
Add a text box to your slide:
```
🎮 GAME INSTRUCTIONS

Click the game area to begin.

Controls:
← → Move left/right
↑ Rotate piece
↓ Soft drop
SPACE Hard drop

Clear 5 lines to trigger quiz!
```

## Alternative: Copy/Paste Code

If you prefer not to use build tools:

⚠️ **Not Recommended** - The build process optimizes the code.

But if necessary:
1. Copy all files from Figma Make
2. Create an HTML file with React CDN
3. Inline all your components
4. This is complex and not optimal

**Better solution:** Use the build process or Method 2.

## Deployment Options

### For Permanent Hosting

#### GitHub Pages (Free)
```bash
npm run build
# Push dist folder to gh-pages branch
# Use URL in Storyline
```

#### Netlify (Free)
1. Drag `dist` folder to Netlify
2. Get your URL
3. Use in Storyline

#### Vercel (Free)
```bash
npm install -g vercel
cd dist
vercel
# Follow prompts
# Use provided URL
```

## File Checklist

Before importing to Storyline, ensure you have:

- [ ] `dist/index.html` exists
- [ ] `dist/assets` folder exists
- [ ] Files inside `dist/assets` include .js and .css
- [ ] Total size is reasonable (< 2MB)
- [ ] Test opening `index.html` works locally

## Need Help?

### Common Issues

**"I can't build locally"**
→ Use Method 2 (preview URL) or deploy to Netlify/Vercel

**"The dist folder is empty"**
→ Build failed - check for error messages

**"It works locally but not in Storyline"**
→ Check that you selected the folder, not individual files

**"Storyline won't import the folder"**
→ Try zipping the dist folder first, then import the ZIP

## Best Practice Workflow

1. ✅ Download all files from Figma Make
2. ✅ Save to a permanent location on your computer
3. ✅ Run `npm install && npm run build`
4. ✅ Test by opening `dist/index.html`
5. ✅ Import `dist` folder to Storyline
6. ✅ Test in Storyline preview
7. ✅ Save a backup of the `dist` folder
8. ✅ Publish your course

## Updates & Maintenance

### To Update the Game Later

1. Make changes in your code
2. Run `npm run build` again
3. Replace the web object in Storyline
4. Test thoroughly before republishing

### Version Control

Consider keeping:
- Source code folder (with all .tsx files)
- Built dist folder
- Backup ZIP of dist folder
- Notes on any customizations

## Final Checklist

Before using in production:

- [ ] Game tested locally
- [ ] Build is optimized (dist folder under 2MB)
- [ ] Instructions added to Storyline slide
- [ ] Tested in Storyline preview
- [ ] Tested in published output
- [ ] Works in target LMS
- [ ] Backup copy saved

---

## Quick Command Reference

```bash
# First time setup
npm install

# Build for Storyline
npm run build

# Test locally first
npm run dev

# Preview production build
npm run preview
```

---

**You're now ready to add Tetris Training to your Storyline course! 🚀**

For more help, see:
- [QUICK_START.md](QUICK_START.md) - Fast path to Storyline
- [STORYLINE_INSTRUCTIONS.md](STORYLINE_INSTRUCTIONS.md) - Detailed guide
- [STORYLINE_CHECKLIST.md](STORYLINE_CHECKLIST.md) - Testing checklist
