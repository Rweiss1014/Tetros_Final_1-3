import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Trash2, RotateCcw } from 'lucide-react';
import { HighScoreManager, formatScore } from './highScoreLogic';
import type { HighScoreEntry } from './highScoreLogic';

interface LeaderboardDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
}

export function LeaderboardDialog({ trigger, open: controlledOpen, onClose }: LeaderboardDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [scores, setScores] = useState<HighScoreEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const highScoreManager = HighScoreManager.getInstance();

  // Use controlled open state if provided, otherwise use internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = controlledOpen !== undefined ? (value: boolean) => {
    if (!value && onClose) onClose();
  } : setInternalOpen;

  const loadScores = async () => {
    setIsLoading(true);
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const loadedScores = highScoreManager.getHighScores();
    setScores(loadedScores);
    setIsLoading(false);
  };

  const handleClearScores = async () => {
    if (confirm('Are you sure you want to clear all high scores? This cannot be undone.')) {
      highScoreManager.clearHighScores();
      await loadScores();
    }
  };

  const handleGenerateSample = async () => {
    if (confirm('Generate sample high scores? This will replace existing scores.')) {
      highScoreManager.generateSampleScores();
      await loadScores();
    }
  };

  useEffect(() => {
    if (open) {
      loadScores();
    }
  }, [open]);

  const getRankEmoji = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "🏅";
  };

  const defaultTrigger = (
    <Button 
      className="px-6 py-2 text-lg bg-teal-600 hover:bg-teal-700 border-2 border-teal-500 text-white transition-all shadow-lg"
    >
      LEADERBOARD
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Only show trigger if not in controlled mode or if trigger is explicitly provided */}
      {(controlledOpen === undefined || trigger) && (
        <DialogTrigger asChild>
          {trigger || defaultTrigger}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-2xl bg-white border-gray-200 max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-teal-700">
            🏆 HIGH SCORES 🏆
          </DialogTitle>
          <DialogDescription className="sr-only">
            View and manage the high scores leaderboard
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex gap-2 justify-center">
            <Button
              onClick={loadScores}
              disabled={isLoading}
              size="sm"
              variant="outline"
              className="text-xs bg-gray-100 border-gray-300 text-gray-700"
            >
              {isLoading ? 'LOADING...' : 'REFRESH'}
            </Button>
            <Button
              onClick={handleGenerateSample}
              disabled={isLoading}
              size="sm"
              variant="outline"
              className="text-xs bg-gray-100 border-gray-300 text-gray-700"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              SAMPLE DATA
            </Button>
            <Button
              onClick={handleClearScores}
              disabled={isLoading || scores.length === 0}
              size="sm"
              variant="outline"
              className="text-xs bg-red-50 border-red-300 text-red-700 hover:bg-red-100"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              CLEAR ALL
            </Button>
          </div>

          {/* Leaderboard */}
          <div className="bg-gradient-to-br from-gray-50 to-teal-50 border border-gray-200 rounded-lg">
            <div className="p-3 border-b border-gray-200 bg-teal-600 rounded-t-lg">
              <div className="grid grid-cols-4 gap-4 text-xs text-white">
                <div>RANK</div>
                <div>PLAYER</div>
                <div className="text-right">SCORE</div>
                <div className="text-right">DETAILS</div>
              </div>
            </div>
            
            <ScrollArea className="h-80">
              <div className="p-2">
                {isLoading ? (
                  <div className="text-center py-8 text-gray-600">
                    Loading scores...
                  </div>
                ) : scores.length === 0 ? (
                  <div className="text-center py-8 space-y-2">
                    <div className="text-gray-600">No high scores yet!</div>
                    <div className="text-gray-500 text-sm">Be the first to set a record.</div>
                  </div>
                ) : (
                  scores.map((entry, index) => {
                    const rank = index + 1;
                    
                    return (
                      <div
                        key={entry.id}
                        className={`grid grid-cols-4 gap-4 items-center p-2 rounded-lg mb-1 ${
                          rank <= 3 
                            ? 'bg-gradient-to-r from-yellow-50 to-teal-50 border border-teal-200' 
                            : 'bg-white hover:bg-gray-50 border border-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getRankEmoji(rank)}</span>
                          <span className="text-sm text-gray-600">
                            #{rank}
                          </span>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-800 truncate">
                            {entry.playerName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {entry.date}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm text-teal-600">
                            {formatScore(entry.score)}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-xs text-gray-600">
                            Level {entry.level}
                          </div>
                          <div className="text-xs text-gray-600">
                            {entry.lines} lines
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Stats */}
          {scores.length > 0 && (
            <div className="bg-gradient-to-br from-gray-50 to-teal-50 border border-gray-200 p-3 rounded-lg">
              <div className="grid grid-cols-3 gap-4 text-center text-xs">
                <div>
                  <div className="text-gray-600">TOTAL PLAYERS</div>
                  <div className="text-gray-800">{scores.length}</div>
                </div>
                <div>
                  <div className="text-gray-600">HIGHEST SCORE</div>
                  <div className="text-teal-600">{formatScore(scores[0]?.score || 0)}</div>
                </div>
                <div>
                  <div className="text-gray-600">HIGHEST LEVEL</div>
                  <div className="text-teal-600">{Math.max(...scores.map(s => s.level))}</div>
                </div>
              </div>
            </div>
          )}

          {/* Close Button */}
          <div className="flex justify-center">
            <Button
              onClick={() => setOpen(false)}
              className="px-8 bg-teal-600 hover:bg-teal-700 text-white"
            >
              CLOSE
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}