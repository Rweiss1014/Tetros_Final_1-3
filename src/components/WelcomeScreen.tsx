import { Gamepad2, Brain, Zap, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { soundEffects } from './soundEffects';

interface WelcomeScreenProps {
  onStartGame: () => void;
  highScore: number;
}

export function WelcomeScreen({ onStartGame, highScore }: WelcomeScreenProps) {
  const handleStart = () => {
    soundEffects.click();
    onStartGame();
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border-2 border-teal-400/30 rounded-lg p-8 shadow-2xl max-w-2xl mx-auto">
      <div className="text-center space-y-6">
        {/* Title */}
        <div>
          <h1 className="text-teal-300 text-5xl mb-2">TETRIS TRAINING</h1>
          <p className="text-white/70">Test your skills. Train your mind.</p>
        </div>

        {/* High Score */}
        {highScore > 0 && (
          <div className="bg-teal-900/30 border border-teal-400/20 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-white/90">Best Score:</span>
              <span className="text-teal-300">{highScore.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="bg-teal-600/20 p-3 rounded-lg">
              <Gamepad2 className="w-6 h-6 text-teal-300" />
            </div>
            <div className="text-white/90 text-sm">Classic Tetris</div>
            <div className="text-white/60 text-xs">Clear lines to win</div>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="bg-teal-600/20 p-3 rounded-lg">
              <Brain className="w-6 h-6 text-teal-300" />
            </div>
            <div className="text-white/90 text-sm">5 Questions</div>
            <div className="text-white/60 text-xs">Answer to earn points</div>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="bg-teal-600/20 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-teal-300" />
            </div>
            <div className="text-white/90 text-sm">Speed Matters</div>
            <div className="text-white/60 text-xs">Faster = more points</div>
          </div>
        </div>

        {/* Controls Guide */}
        <div className="bg-slate-800/50 border border-teal-400/20 rounded-lg p-4 text-left">
          <h3 className="text-teal-300 mb-3 text-center">HOW TO PLAY</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-slate-700 border border-teal-400/30 rounded text-xs text-white">←</kbd>
              <kbd className="px-2 py-1 bg-slate-700 border border-teal-400/30 rounded text-xs text-white">→</kbd>
              <span className="text-white/70">Move</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-slate-700 border border-teal-400/30 rounded text-xs text-white">↑</kbd>
              <span className="text-white/70">Rotate</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-slate-700 border border-teal-400/30 rounded text-xs text-white">↓</kbd>
              <span className="text-white/70">Soft Drop</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-slate-700 border border-teal-400/30 rounded text-xs text-white">SPACE</kbd>
              <span className="text-white/70">Hard Drop</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <Button
            onClick={handleStart}
            className="w-full bg-teal-600 hover:bg-teal-500 text-white py-6 text-lg transition-all duration-200 shadow-lg hover:shadow-teal-500/50"
          >
            <Gamepad2 className="w-5 h-5 mr-2" />
            Start Game
          </Button>
        </div>

        {/* Tips */}
        <div className="text-white/50 text-xs pt-4 border-t border-teal-400/10">
          💡 Clear lines to trigger questions. Answer all 5 questions to complete the game!
        </div>
      </div>
    </div>
  );
}
