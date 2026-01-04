# Quick Start: Add Tetris Training to Storyline

## Fastest Path to Storyline (3 Steps!)

### Step 1: Build the App
```bash
npm install
npm run build
```

### Step 2: Import to Storyline
1. Open Storyline 360
2. **Insert** → **Web Object** → **Web object from folder**
3. Select your **`dist`** folder
4. Set dimensions: **1280 × 720**
5. Click **Insert**

### Step 3: Add Instructions
Add a text box to your slide:
> "Click the game to begin. Use ↑↓←→ Arrow Keys and SPACE bar."

**Done! 🎉**

---

## What You Get

✅ **Full Tetris game** with classic mechanics  
✅ **Quiz system** - triggers every 5 lines cleared  
✅ **10 progressive levels** - speeds up as you advance  
✅ **High score tracking** - saved locally per learner  
✅ **Top 10 leaderboard** - persistent rankings  
✅ **Professional training theme** - teal/gray color scheme  

---

## Gameplay Details

### Controls
- **←→** Move left/right
- **↑** Rotate piece
- **↓** Soft drop (faster falling)
- **SPACE** Hard drop (instant placement)

### Scoring
- Clear lines to earn points
- Points multiply with level
- Complete quizzes for bonus points
- Perfect quiz = maximum bonus!

### Level Progression
- Every 5 lines cleared = level up
- Each level up = quiz appears
- Answer 3 training questions
- Game resumes with bonus points added

### Quiz System
- 3 questions per level
- Multiple choice format
- Immediate feedback
- Scenario-based learning
- Bonus calculation: 100 × Level × Accuracy × 2

---

## Customization Options

### Want Different Questions?
Edit `/components/questionBank.ts` to add your own questions

### Want Different Colors?
Edit `/App.tsx` and component files to change the teal theme

### Want Different Difficulty?
Edit `/components/gameLogic.ts` to adjust:
- Grid size (default: 10×20)
- Level speed progression
- Lines per level (default: 5)

---

## Technical Details

**Tech Stack:**
- React 18 + TypeScript
- Tailwind CSS v4
- Vite build tool
- shadcn/ui components
- No external API calls
- No server required

**File Size:** ~500KB-1MB total  
**Browser:** All modern browsers  
**Storage:** Uses localStorage for high scores  

---

## File Structure

```
dist/                    ← Use this folder in Storyline
├── index.html          ← Entry point
└── assets/
    ├── index-[hash].js ← Game code
    └── index-[hash].css ← Styles
```

---

## Troubleshooting

**Problem:** Controls don't work  
**Solution:** Remind learners to click inside the game first

**Problem:** High scores don't save  
**Solution:** Check if LMS allows localStorage

**Problem:** Game doesn't fit  
**Solution:** Adjust web object size to 1280×720

**Problem:** Can't see full game  
**Solution:** Enable "Scale to fit" in web object properties

---

## Testing Checklist

Before publishing:
- [ ] Game loads in Storyline preview
- [ ] Arrow keys work after clicking game
- [ ] Quiz appears after 5 lines cleared
- [ ] High scores save and persist
- [ ] Leaderboard displays correctly
- [ ] Game works in published output
- [ ] Works in your LMS environment

---

## Need More Help?

📄 **Full Documentation:**
- `STORYLINE_INSTRUCTIONS.md` - Detailed integration guide
- `BUILD_FOR_STORYLINE.md` - Complete build process

📧 **Questions about:**
- Customizing questions? → See `questionBank.ts`
- Changing game mechanics? → See `gameLogic.ts`
- Modifying appearance? → See component files + `globals.css`

---

## Updates & Modifications

To update the game after making changes:
1. Make your edits in the code
2. Run `npm run build` again
3. Replace the web object in Storyline
4. Test in preview mode

The game is fully self-contained - no external dependencies!

---

**Ready to train your learners? Let's go! 🎮📚**
