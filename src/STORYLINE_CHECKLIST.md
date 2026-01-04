# Storyline Integration Checklist

Use this checklist to ensure your Tetris Training game is properly integrated into Articulate Storyline.

## Pre-Build Checklist

- [ ] All quiz questions are appropriate for your audience
- [ ] Questions are in `/components/questionBank.ts`
- [ ] Game difficulty is appropriate (check lines per level)
- [ ] Colors match your brand (if customized)
- [ ] You have Node.js installed (if building locally)

## Build Process

- [ ] Run `npm install` to install dependencies
- [ ] Run `npm run build` to create production files
- [ ] Verify `dist` folder was created
- [ ] Check `dist/index.html` exists
- [ ] Check `dist/assets` folder has JS and CSS files
- [ ] Test by opening `dist/index.html` in a browser

## Storyline Setup

### Slide Configuration
- [ ] Slide size: 1280×720 (widescreen) or 960×720 (standard)
- [ ] Background color set (or transparent if overlaying)
- [ ] Sufficient space for 1280×720 web object

### Web Object Import
- [ ] Insert → Web Object → Web object from folder
- [ ] Selected entire `dist` folder (not just index.html)
- [ ] Web object dimensions: 1280×720 or 960×720
- [ ] "Scale to fit" option enabled
- [ ] Web object centered on slide
- [ ] Web object set to display on timeline entry

### Instructions Added
- [ ] Text box with keyboard controls added
- [ ] Instructions are visible and clear:
  - "Click the game to begin"
  - "Use Arrow Keys to play"
  - "Press SPACE for instant drop"
- [ ] Instructions positioned clearly (top or bottom of slide)
- [ ] Instructions are on a layer above the web object

## Testing in Storyline

### Preview Mode Testing
- [ ] Game loads completely
- [ ] Click inside game area works
- [ ] Arrow keys control the pieces (←→↑↓)
- [ ] Spacebar does hard drop
- [ ] Pieces fall automatically
- [ ] Lines clear when complete
- [ ] Score increases correctly
- [ ] Level indicator updates
- [ ] Next piece preview shows

### Quiz System Testing
- [ ] Clear exactly 5 lines
- [ ] Quiz dialog appears
- [ ] Quiz questions display correctly
- [ ] Can select answers
- [ ] "Submit Answer" button works
- [ ] Explanation appears after submission
- [ ] "Next Question" button works
- [ ] All 3 questions complete
- [ ] Results screen shows correct count (e.g., 2/3)
- [ ] Bonus points added to score
- [ ] Game resumes after quiz

### Persistence Testing
- [ ] Play game and get a high score
- [ ] Close preview
- [ ] Open preview again
- [ ] High score is still shown
- [ ] Leaderboard button works
- [ ] Top 10 scores display

### Game Over Testing
- [ ] Let pieces stack to top
- [ ] "GAME OVER" appears
- [ ] Final score shows
- [ ] Can enter name for high score (if qualifying)
- [ ] Name saves to leaderboard
- [ ] Can view results
- [ ] "Play Again" restarts correctly

## Published Course Testing

### After Publishing
- [ ] Export/publish course from Storyline
- [ ] Upload to LMS (if applicable)
- [ ] Test in target browser (Chrome)
- [ ] Test in target browser (Firefox)
- [ ] Test in target browser (Safari)
- [ ] Test in target browser (Edge)
- [ ] Test on Windows desktop
- [ ] Test on Mac desktop
- [ ] Test on iPad (if required)

### In Published Environment
- [ ] Game loads without errors
- [ ] Keyboard controls work
- [ ] High scores save and persist
- [ ] Quiz system works
- [ ] Leaderboard displays
- [ ] No console errors (check browser DevTools)

## LMS-Specific Testing (if applicable)

- [ ] Game loads in LMS player
- [ ] No cross-origin errors
- [ ] localStorage works (high scores save)
- [ ] Keyboard events not blocked by LMS
- [ ] No focus issues
- [ ] Completes course properly
- [ ] Works in LMS on multiple devices

## Accessibility Check (Optional)

- [ ] Instructions clearly visible
- [ ] Sufficient color contrast
- [ ] Text is readable
- [ ] Quiz questions readable
- [ ] Consider adding keyboard shortcut reference
- [ ] Consider adding text alternatives

## Performance Check

- [ ] Game loads within 3 seconds
- [ ] No lag during gameplay
- [ ] Smooth animations
- [ ] Quiz transitions are smooth
- [ ] No memory leaks (test extended play session)
- [ ] File size under 2MB (check dist folder size)

## Documentation for Learners

- [ ] Instructions on how to start game
- [ ] Keyboard controls explained
- [ ] How to access leaderboard
- [ ] What happens at level up (quiz)
- [ ] High score system explained
- [ ] Estimated time to complete (if relevant)

## Final Checks

- [ ] Game fits course theme/branding
- [ ] Difficulty appropriate for audience
- [ ] Questions aligned with learning objectives
- [ ] Tested by someone unfamiliar with game
- [ ] All stakeholders reviewed
- [ ] Backup copy of dist folder saved

## Optional: Tracking Setup

If you want to track scores in Storyline variables:

- [ ] JavaScript triggers created in Storyline
- [ ] Variables created for score, level, lines
- [ ] Communication between web object and Storyline tested
- [ ] Data passes correctly to Storyline
- [ ] Storyline can send data to LMS (if needed)

## Known Limitations

✓ **Aware that:**
- [ ] High scores only persist per-browser, per-device
- [ ] No cross-device synchronization
- [ ] localStorage can be cleared by learner
- [ ] Keyboard controls required (not touch-friendly)
- [ ] Must click into game area first
- [ ] Some LMS may block localStorage
- [ ] Game requires JavaScript enabled

## Support Resources Prepared

- [ ] Link to QUICK_START.md saved
- [ ] Link to STORYLINE_INSTRUCTIONS.md saved
- [ ] Link to troubleshooting guide saved
- [ ] Contact info for technical support (if needed)

---

## Sign-Off

**Tested by:** ________________  
**Date:** ________________  
**Storyline Version:** ________________  
**LMS (if applicable):** ________________  
**Status:** ☐ Ready for learners ☐ Needs fixes

---

**Notes/Issues Found:**

____________________________________________
____________________________________________
____________________________________________
____________________________________________

