import { Button } from './ui/button';

interface GameControlsProps {
  isPlaying: boolean;
  gameOver: boolean;
  gamePhase: 'menu' | 'playing' | 'quiz' | 'gameOver' | 'highScoreEntry' | 'highScoreResults';
  onTogglePlay: () => void;
  onReset: () => void;
}

export function GameControls({ isPlaying, gameOver, gamePhase, onTogglePlay, onReset }: GameControlsProps) {
  const getPlayButtonText = () => {
    if (gamePhase === 'menu') return 'START GAME';
    if (isPlaying) return 'PAUSE';
    if (gameOver) return 'GAME OVER';
    return 'RESUME';
  };

  const getStatusText = () => {
    switch (gamePhase) {
      case 'menu':
        return 'READY TO PLAY';
      case 'playing':
        return isPlaying ? 'PLAYING' : 'PAUSED';
      case 'quiz':
        return 'QUIZ TIME';
      case 'gameOver':
        return 'GAME OVER';
      case 'highScoreEntry':
        return 'ENTERING SCORE';
      case 'highScoreResults':
        return 'VIEWING RESULTS';
      default:
        return 'READY';
    }
  };

  const getStatusColor = () => {
    switch (gamePhase) {
      case 'menu':
        return 'bg-teal-400';
      case 'playing':
        return isPlaying ? 'bg-green-400 animate-pulse' : 'bg-yellow-400';
      case 'quiz':
        return 'bg-teal-400 animate-pulse';
      case 'gameOver':
        return 'bg-red-600';
      case 'highScoreEntry':
        return 'bg-purple-400 animate-pulse';
      case 'highScoreResults':
        return 'bg-yellow-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex gap-2 items-center">
        <Button
          onClick={onTogglePlay}
          disabled={gameOver || gamePhase === 'quiz' || gamePhase === 'highScoreEntry' || gamePhase === 'highScoreResults'}
          className={`px-4 py-1.5 border-2 transition-all shadow-lg ${
            gamePhase === 'menu'
              ? 'bg-teal-600 hover:bg-teal-700 border-teal-500 text-white'
              : isPlaying 
                ? 'bg-red-600 hover:bg-red-700 border-red-500 text-white' 
                : 'bg-green-600 hover:bg-green-700 border-green-500 text-white'
          } ${(gameOver || gamePhase === 'quiz' || gamePhase === 'highScoreEntry' || gamePhase === 'highScoreResults') ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {getPlayButtonText()}
        </Button>
        
        <Button
          onClick={onReset}
          disabled={gamePhase === 'quiz' || gamePhase === 'highScoreEntry' || gamePhase === 'highScoreResults'}
          className={`px-4 py-1.5 bg-slate-600 hover:bg-slate-700 border-2 border-slate-500 text-white transition-all shadow-lg ${
            (gamePhase === 'quiz' || gamePhase === 'highScoreEntry' || gamePhase === 'highScoreResults') ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          RESET
        </Button>
      </div>

      {/* Game Status */}
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${getStatusColor()} shadow-lg`} />
        <span className="text-white/90 text-xs">
          {getStatusText()}
        </span>
      </div>
    </div>
  );
}
