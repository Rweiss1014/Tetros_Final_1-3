import { Clock } from 'lucide-react';

interface GameTimerProps {
  seconds: number;
}

export function GameTimer({ seconds }: GameTimerProps) {
  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-sm border-2 border-teal-400/50 rounded-lg px-4 py-1.5 shadow-lg">
      <div className="flex items-center justify-center gap-2">
        <Clock className="w-4 h-4 text-teal-400" />
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-teal-300">TIME</span>
          <span className="text-white font-mono tracking-wider">
            {formatTime(seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
