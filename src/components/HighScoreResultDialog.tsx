import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { formatScore, formatRank } from './highScoreLogic';
import type { HighScoreEntry, HighScoreStats } from './highScoreLogic';

interface HighScoreResultDialogProps {
  open: boolean;
  playerEntry: HighScoreEntry | null;
  stats: HighScoreStats | null;
  leaderboard: HighScoreEntry[];
  onClose: () => void;
  onPlayAgain: () => void;
}

export function HighScoreResultDialog({ 
  open, 
  playerEntry, 
  stats, 
  leaderboard,
  onClose, 
  onPlayAgain 
}: HighScoreResultDialogProps) {
  if (!playerEntry || !stats) return null;

  const getCongratulationsMessage = () => {
    if (stats.isNewRecord) {
      return {
        title: "🥇 NEW RECORD! 🥇",
        message: "You've set a new high score record!",
        className: "text-yellow-600"
      };
    } else if (stats.isTop3) {
      return {
        title: `🏆 TOP ${stats.rank}! 🏆`,
        message: "Incredible performance! You're in the top 3!",
        className: "text-orange-600"
      };
    } else {
      return {
        title: `✨ Rank ${formatRank(stats.rank)}! ✨`,
        message: `Great job! You placed ${formatRank(stats.rank)} out of ${stats.totalPlayers} players.`,
        className: "text-teal-600"
      };
    }
  };

  const congratulations = getCongratulationsMessage();

  const getRankBadgeVariant = (rank: number) => {
    if (rank === 1) return "default"; // Gold
    if (rank === 2) return "secondary"; // Silver  
    if (rank === 3) return "outline"; // Bronze
    return "secondary";
  };

  const getRankEmoji = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "🏅";
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-2xl bg-white border-gray-200 max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className={`text-2xl text-center ${congratulations.className}`}>
            {congratulations.title}
          </DialogTitle>
          <p className="text-center text-gray-700 text-sm mt-2">
            {congratulations.message}
          </p>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Player's Achievement */}
          <div className="bg-gradient-to-br from-gray-50 to-teal-50 border-2 border-teal-200 p-4 rounded-lg">
            <div className="text-center">
              <div className="text-gray-600 text-sm mb-2">YOUR ACHIEVEMENT</div>
              <div className="flex items-center justify-center gap-3 mb-3">
                <Badge 
                  variant={getRankBadgeVariant(stats.rank)}
                  className="text-lg px-3 py-1"
                >
                  {getRankEmoji(stats.rank)} {formatRank(stats.rank)} PLACE
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-gray-600 text-xs">SCORE</div>
                  <div className="text-teal-600 text-lg">{formatScore(playerEntry.score)}</div>
                </div>
                <div>
                  <div className="text-gray-600 text-xs">LEVEL</div>
                  <div className="text-teal-600 text-lg">{playerEntry.level}</div>
                </div>
                <div>
                  <div className="text-gray-600 text-xs">LINES</div>
                  <div className="text-teal-600 text-lg">{playerEntry.lines}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-gradient-to-br from-gray-50 to-teal-50 border border-gray-200 rounded-lg">
            <div className="p-3 border-b border-teal-200 bg-teal-600 rounded-t-lg">
              <h3 className="text-white text-center">🏆 LEADERBOARD 🏆</h3>
            </div>
            <ScrollArea className="h-64">
              <div className="p-2">
                {leaderboard.map((entry, index) => {
                  const rank = index + 1;
                  const isPlayerEntry = entry.id === playerEntry.id;
                  
                  return (
                    <div
                      key={entry.id}
                      className={`flex items-center justify-between p-2 rounded-lg mb-1 ${
                        isPlayerEntry 
                          ? 'bg-teal-100 border-2 border-teal-500' 
                          : 'bg-white hover:bg-gray-50 border border-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 text-center">
                          <span className="text-sm">
                            {getRankEmoji(rank)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className={`text-sm ${isPlayerEntry ? 'text-teal-700' : 'text-gray-800'}`}>
                            {entry.playerName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {entry.date}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm ${isPlayerEntry ? 'text-teal-700' : 'text-teal-600'}`}>
                          {formatScore(entry.score)}
                        </div>
                        <div className="text-xs text-gray-600">
                          Lv.{entry.level} • {entry.lines}L
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onPlayAgain}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
            >
              PLAY AGAIN
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700"
            >
              CLOSE
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}