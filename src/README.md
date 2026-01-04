# Tetris Training Game for Articulate Storyline

A fully-featured Tetris game with integrated quiz-based e-learning, designed to be embedded in Articulate Storyline 360 courses.

![Tetris Training](https://img.shields.io/badge/Version-1.0.0-teal)
![Built with React](https://img.shields.io/badge/React-18-blue)
![Storyline Ready](https://img.shields.io/badge/Storyline-Ready-green)

## 🎮 Features

### Game Mechanics
- **Classic Tetris gameplay** - 10×20 grid with 7 piece types
- **Progressive difficulty** - 10 levels with increasing speed
- **Full controls** - Arrow keys for movement/rotation, spacebar for hard drop
- **Smart collision detection** - Precise piece placement
- **Line clearing** - Remove completed rows for points
- **Scoring system** - Points multiply with level

### E-Learning Integration
- **Quiz system** - Triggers every 5 lines cleared
- **Scenario-based questions** - Professional training scenarios
- **Immediate feedback** - Explanations after each answer
- **Performance bonus** - Earn extra points for quiz accuracy
- **Progress tracking** - See upcoming quiz requirements

### Persistence & Competition
- **High score tracking** - Top 10 leaderboard
- **Local storage** - Scores persist between sessions
- **Player names** - Personalized leaderboard entries
- **Statistics** - Track performance over time

### Professional Design
- **Teal/gray theme** - Clean, modern appearance
- **Responsive layout** - Adapts to container size
- **Pixel-perfect** - Retro arcade aesthetic meets modern design
- **Professional UI** - Training-focused interface

## 🚀 Quick Start

### For Storyline Users

**1. Build the application:**
```bash
npm install
npm run build
```

**2. Import to Storyline:**
- Insert → Web Object → Web object from folder
- Select the `dist` folder
- Set size: 1280×720
- Enable "Scale to fit"

**3. Add instructions to your slide:**
> "Click the game to begin. Use Arrow Keys and SPACE bar to play."

**Done!** See [QUICK_START.md](QUICK_START.md) for detailed instructions.

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get up and running in 3 steps
- **[STORYLINE_INSTRUCTIONS.md](STORYLINE_INSTRUCTIONS.md)** - Complete integration guide
- **[BUILD_FOR_STORYLINE.md](BUILD_FOR_STORYLINE.md)** - Detailed build process
- **[STORYLINE_CHECKLIST.md](STORYLINE_CHECKLIST.md)** - Integration checklist

## 🎯 How It Works

### Gameplay Flow
1. **Start game** - Click Play to begin
2. **Clear lines** - Stack pieces to complete rows
3. **Level up** - Every 5 lines triggers a quiz
4. **Answer questions** - 3 training questions appear
5. **Earn bonus** - Get extra points for correct answers
6. **Continue** - Game resumes with increased difficulty
7. **Game over** - Stack reaches top, submit high score

### Quiz System
- **Frequency:** Every 5 lines cleared
- **Questions:** 3 per level
- **Format:** Multiple choice with scenarios
- **Feedback:** Immediate with explanations
- **Bonus:** 100 × Level × Accuracy × 2

### Scoring
- **1 Line:** 40 × Level
- **2 Lines:** 100 × Level
- **3 Lines:** 300 × Level
- **4 Lines (Tetris):** 1,200 × Level
- **Hard Drop:** +2 points per cell
- **Quiz Bonus:** Up to 600+ points at higher levels

## 🛠️ Technical Details

### Built With
- **React 18** - UI framework
- **TypeScript** - Type-safe code
- **Tailwind CSS v4** - Styling
- **Vite** - Build tool
- **shadcn/ui** - Component library
- **lucide-react** - Icons

### Browser Support
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Requirements
- JavaScript enabled
- localStorage support (for high scores)
- Keyboard input support

### File Size
- **Total:** ~500KB - 1MB (optimized)
- **Load time:** < 3 seconds on standard connections
- **No external dependencies** - Fully self-contained

## 📁 Project Structure

```
tetris-training/
├── App.tsx                          # Main application
├── components/
│   ├── GameGrid.tsx                 # Game board display
│   ├── GameControls.tsx             # Play/pause/reset buttons
│   ├── ScorePanel.tsx               # Score display
│   ├── NextPiecePreview.tsx         # Next piece indicator
│   ├── LevelUpQuizDialog.tsx        # Quiz interface
│   ├── GameOverDialog.tsx           # Game over screen
│   ├── HighScoreResultDialog.tsx    # High score entry
│   ├── LeaderboardDialog.tsx        # Top 10 display
│   ├── gameLogic.ts                 # Game mechanics
│   ├── highScoreLogic.ts            # Score tracking
│   ├── questionBank.ts              # Quiz questions
│   └── ui/                          # shadcn components
├── styles/
│   └── globals.css                  # Global styles
├── dist/                            # Build output (after npm run build)
└── [documentation files]
```

## 🎨 Customization

### Modify Quiz Questions
Edit `/components/questionBank.ts`:
```typescript
{
  id: 'custom-1',
  category: 'Your Category',
  question: 'Your question?',
  scenario: 'Optional scenario context',
  options: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
  correctAnswer: 0,
  explanation: 'Explanation of correct answer'
}
```

### Adjust Difficulty
Edit `/App.tsx` line 190:
```typescript
const newLevel = Math.floor(newLines / 5) + 1; // Change 5 to adjust
```

### Change Colors
The teal theme uses:
- Primary: `#0D9488` (teal-600)
- Accent: `#14B8A6` (teal-500)
- Background: slate-800 to teal-900 gradient

## 🧪 Testing

### Development
```bash
npm run dev        # Start dev server
```

### Production Build
```bash
npm run build      # Build for production
npm run preview    # Preview production build
```

### Testing in Storyline
1. Build the app
2. Import as web object
3. Test in preview mode
4. Publish and test in LMS

See [STORYLINE_CHECKLIST.md](STORYLINE_CHECKLIST.md) for complete testing procedure.

## 🐛 Troubleshooting

### Controls Don't Work
**Solution:** Learners must click inside the game area first to give it focus.

### High Scores Don't Save
**Solution:** Check if localStorage is enabled in browser/LMS settings.

### Game Doesn't Fit
**Solution:** Set web object to 1280×720 and enable "Scale to fit" option.

### Quiz Doesn't Appear
**Solution:** Ensure you've cleared exactly 5 lines. Check the "Lines to Next" counter.

## 📊 Learning Outcomes

This game helps learners practice:
- ✅ Problem-solving under pressure
- ✅ Spatial reasoning
- ✅ Quick decision-making
- ✅ Knowledge retention (via quizzes)
- ✅ Performance tracking
- ✅ Goal achievement

## 🔒 Data & Privacy

- **No external API calls** - Fully self-contained
- **No server required** - Runs entirely in browser
- **No data collection** - No analytics or tracking
- **localStorage only** - Data stays on user's device
- **No personal data** - Only stores player names and scores locally

## 📜 License

MIT License - Feel free to modify and use in your courses.

## 🤝 Contributing

This is a Storyline-ready package. To modify:
1. Edit the code in Figma Make or locally
2. Test changes with `npm run dev`
3. Build with `npm run build`
4. Replace web object in Storyline

## 📞 Support

For questions or issues:
- Check the documentation files in this repo
- Review the troubleshooting section
- Test in preview mode before publishing

## 🎓 Use Cases

Perfect for:
- ✅ Training course gamification
- ✅ Knowledge reinforcement
- ✅ Break activities in long courses
- ✅ Skill assessment with engagement
- ✅ Competition-based learning
- ✅ Microlearning sessions

## 🚦 Version History

**v1.0.0** - Initial release
- Full Tetris mechanics
- Integrated quiz system  
- High score tracking
- Storyline-ready build
- Professional teal theme

---

**Ready to enhance your Storyline courses with game-based learning?**

Start with [QUICK_START.md](QUICK_START.md) →

Built with ❤️ for e-learning professionals
