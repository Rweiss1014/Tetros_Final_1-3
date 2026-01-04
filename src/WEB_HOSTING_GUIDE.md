# Tetris Training - Web Hosting Guide

## Quick Deploy to Your Website

### Option 1: Build and Upload (Recommended)

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Upload the 'dist' folder to your web server
```

Your `dist` folder contains:
- `index.html` - Main entry point
- `assets/` - All compiled JavaScript and CSS

Simply upload everything in the `dist` folder to your web hosting.

### Option 2: Deploy to Free Hosting

#### Netlify (Easiest)
1. Create account at https://netlify.com
2. Drag and drop your `dist` folder
3. Get instant URL like `your-tetris.netlify.app`

#### Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. In your project: `npm run build`
3. Deploy: `cd dist && vercel`
4. Follow prompts

#### GitHub Pages
1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select branch and `/dist` folder
4. Get URL like `username.github.io/tetris-training`

### Option 3: Quick Test Locally

```bash
npm run dev
```

Opens at `http://localhost:3000`

## Game Features

✨ **3 Challenging Levels**
- Level 1: 1000ms drop speed
- Level 2: 600ms drop speed (Faster!)
- Level 3: 300ms drop speed (Lightning fast!)

🎓 **Quiz Integration**
- 3 questions per level
- Earn bonus points for correct answers
- Perfect quiz = Maximum reward

🏆 **Complete All Levels**
- Clear 30 total lines (10 per level)
- Epic victory celebration
- Automatic high score entry

🔊 **Sound Effects**
- Retro 8-bit style sounds
- Volume control
- Mute option

## Game Configuration

### Want to Customize?

**Change Difficulty:**
Edit `/App.tsx` lines 31-32:
```typescript
const MAX_LEVEL = 3; // Number of levels
const LINES_PER_LEVEL = 10; // Lines to level up
```

**Adjust Speed:**
Edit `/App.tsx` line 220:
```typescript
dropIntervalRef.current = Math.max(300, 1000 - (newLevel - 1) * 350);
// Format: Math.max(min_speed, start_speed - (level - 1) * speed_decrease)
```

**Modify Questions:**
Edit `/components/questionBank.ts` to add your own scenario-based questions.

## File Size

**Production Build:** ~500KB - 1MB total
- Optimized JavaScript
- Minified CSS
- No external dependencies

Perfect for fast loading on any website!

## Browser Compatibility

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+

Requires:
- JavaScript enabled
- Web Audio API support (for sounds)
- localStorage (for high scores)

## Embed in Existing Website

Add to your HTML:

```html
<iframe 
  src="https://your-domain.com/tetris-training/" 
  width="1280" 
  height="720"
  frameborder="0"
  allow="autoplay"
  style="border: none; max-width: 100%;"
></iframe>
```

## SEO & Metadata

The game includes:
- Proper title tags
- Meta descriptions
- Responsive viewport settings

Feel free to customize `/index.html` for your branding.

## Analytics Integration

Add Google Analytics to `/index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

## Custom Domain

After deploying to Netlify/Vercel:
1. Buy domain (e.g., from Namecheap)
2. Add domain in hosting dashboard
3. Update DNS records
4. Your game at `tetris.yourdomain.com`

## SSL/HTTPS

All modern hosting (Netlify, Vercel, GitHub Pages) provides free SSL.

For custom hosting:
- Use Let's Encrypt (free)
- Or your hosting provider's SSL

## Performance Tips

✅ **Already Optimized:**
- Code splitting
- Minification
- Asset compression
- Tree shaking

🚀 **Optional Enhancements:**
- Enable gzip on your server
- Add CDN (Cloudflare free tier)
- Use browser caching headers

## Troubleshooting

**Sounds don't work:**
- Check browser allows autoplay
- User must interact with page first (click to start)
- Check volume control in top-right

**High scores don't persist:**
- localStorage must be enabled
- Private/incognito mode may block

**Game doesn't load:**
- Check all files in dist folder uploaded
- Verify index.html at root
- Check browser console for errors

## Support

The game is completely self-contained:
- ✅ No backend required
- ✅ No database needed
- ✅ No API calls
- ✅ Works offline (after first load)

## License

MIT License - Free to use and modify for your website.

## Updates

To update the game after changes:
1. Make your edits
2. Run `npm run build`
3. Replace old dist folder on server
4. Clear browser cache

---

**Ready to host your Tetris Training game? Let's go! 🚀**

Build command: `npm install && npm run build`
