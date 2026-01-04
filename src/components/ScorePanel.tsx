interface ScorePanelProps {
  score: number;
  level: number;
  lines: number;
  highScore?: number;
}

export function ScorePanel({ score, level, lines, highScore = 0 }: ScorePanelProps) {
  const formatNumber = (num: number, digits: number = 6) => {
    return num.toString().padStart(digits, '0');
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border-2 border-teal-400/30 p-3 rounded-lg shadow-lg min-w-[180px]">
      <h2 className="text-teal-300 mb-2 text-center">SCORE</h2>
      
      <div className="space-y-2">
        {/* Score Display */}
        <div className="bg-slate-900/50 border border-teal-500/30 p-2 rounded-md shadow-inner">
          <div className="text-teal-400 text-center tracking-wider">
            {formatNumber(score, 8)}
          </div>
        </div>

        {/* Level Display */}
        <div>
          <div className="text-white/80 text-sm mb-1">LEVEL</div>
          <div className="bg-slate-900/50 border border-teal-500/30 p-1.5 rounded-md shadow-inner">
            <div className="text-teal-400 text-center">
              {formatNumber(level, 2)}
            </div>
          </div>
        </div>

        {/* Lines Display */}
        <div>
          <div className="text-white/80 text-sm mb-1">LINES</div>
          <div className="bg-slate-900/50 border border-teal-500/30 p-1.5 rounded-md shadow-inner">
            <div className="text-teal-400 text-center">
              {formatNumber(lines, 3)}
            </div>
          </div>
        </div>

        {/* High Score Display */}
        <div>
          <div className="text-white/80 text-sm mb-1">HIGH</div>
          <div className="bg-slate-900/50 border border-teal-500/30 p-1.5 rounded-md shadow-inner">
            <div className={`text-center ${
              score > 0 && score >= highScore ? 'text-yellow-400 animate-pulse' : 'text-yellow-400'
            }`}>
              {formatNumber(highScore, 6)}
            </div>
          </div>
          {score > 0 && score >= highScore && (
            <div className="text-xs text-yellow-400 text-center mt-1 animate-pulse">
              NEW RECORD!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
