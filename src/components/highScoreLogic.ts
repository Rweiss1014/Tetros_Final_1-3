export interface HighScoreEntry {
  id: string;
  playerName: string;
  score: number;
  level: number;
  lines: number;
  date: string;
  timestamp: number;
}

export interface HighScoreStats {
  rank: number;
  isTop3: boolean;
  isNewRecord: boolean;
  totalPlayers: number;
}

const HIGH_SCORE_STORAGE_KEY = 'tetris_high_scores';
const MAX_HIGH_SCORES = 10;

export class HighScoreManager {
  private static instance: HighScoreManager;
  
  static getInstance(): HighScoreManager {
    if (!HighScoreManager.instance) {
      HighScoreManager.instance = new HighScoreManager();
    }
    return HighScoreManager.instance;
  }

  // Load high scores from localStorage
  getHighScores(): HighScoreEntry[] {
    try {
      const stored = localStorage.getItem(HIGH_SCORE_STORAGE_KEY);
      if (!stored) return [];
      
      const scores: HighScoreEntry[] = JSON.parse(stored);
      return this.sortScores(scores).slice(0, MAX_HIGH_SCORES);
    } catch (error) {
      console.error('Error loading high scores:', error);
      return [];
    }
  }

  // Save high scores to localStorage
  private saveHighScores(scores: HighScoreEntry[]): void {
    try {
      const sortedScores = this.sortScores(scores).slice(0, MAX_HIGH_SCORES);
      localStorage.setItem(HIGH_SCORE_STORAGE_KEY, JSON.stringify(sortedScores));
    } catch (error) {
      console.error('Error saving high scores:', error);
    }
  }

  // Sort scores by score descending, then by date ascending (earlier = better for same score)
  private sortScores(scores: HighScoreEntry[]): HighScoreEntry[] {
    return [...scores].sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score; // Higher score first
      }
      return a.timestamp - b.timestamp; // Earlier date first for same score
    });
  }

  // Add a new high score and return stats
  addHighScore(playerName: string, score: number, level: number, lines: number): {
    entry: HighScoreEntry;
    stats: HighScoreStats;
    updatedScores: HighScoreEntry[];
  } {
    const currentScores = this.getHighScores();
    const timestamp = Date.now();
    
    const newEntry: HighScoreEntry = {
      id: `${timestamp}-${Math.random().toString(36).substr(2, 9)}`,
      playerName: playerName.trim() || 'Anonymous',
      score,
      level,
      lines,
      date: new Date().toLocaleDateString(),
      timestamp
    };

    // Add new score and sort
    const allScores = [...currentScores, newEntry];
    const sortedScores = this.sortScores(allScores);
    
    // Calculate stats
    const rank = sortedScores.findIndex(entry => entry.id === newEntry.id) + 1;
    const isTop3 = rank <= 3;
    const isNewRecord = rank === 1;
    const totalPlayers = Math.max(currentScores.length + 1, rank);

    // Keep only top scores
    const finalScores = sortedScores.slice(0, MAX_HIGH_SCORES);
    this.saveHighScores(finalScores);

    const stats: HighScoreStats = {
      rank,
      isTop3,
      isNewRecord,
      totalPlayers
    };

    return {
      entry: newEntry,
      stats,
      updatedScores: finalScores
    };
  }

  // Check if a score qualifies for the leaderboard
  isQualifyingScore(score: number): boolean {
    const scores = this.getHighScores();
    if (scores.length < MAX_HIGH_SCORES) return true;
    return score > scores[scores.length - 1].score;
  }

  // Get rank for a specific score (without adding it)
  getScoreRank(score: number): number {
    const scores = this.getHighScores();
    let rank = 1;
    
    for (const entry of scores) {
      if (score > entry.score) break;
      rank++;
    }
    
    return rank;
  }

  // Clear all high scores (for testing/reset)
  clearHighScores(): void {
    localStorage.removeItem(HIGH_SCORE_STORAGE_KEY);
  }

  // Generate sample high scores for demo
  generateSampleScores(): void {
    const sampleScores: Omit<HighScoreEntry, 'id' | 'timestamp'>[] = [
      { playerName: 'TETRIS_MASTER', score: 125000, level: 15, lines: 150, date: '12/20/2024' },
      { playerName: 'BLOCK_BUSTER', score: 98500, level: 12, lines: 120, date: '12/19/2024' },
      { playerName: 'LINE_CLEARER', score: 87200, level: 11, lines: 105, date: '12/18/2024' },
      { playerName: 'PUZZLE_PRO', score: 75300, level: 10, lines: 95, date: '12/17/2024' },
      { playerName: 'TETRONIMO', score: 68900, level: 9, lines: 85, date: '12/16/2024' },
      { playerName: 'STACK_ATTACK', score: 55600, level: 8, lines: 75, date: '12/15/2024' },
      { playerName: 'ROTATE_KING', score: 45200, level: 7, lines: 65, date: '12/14/2024' },
      { playerName: 'DROP_ZONE', score: 38700, level: 6, lines: 55, date: '12/13/2024' },
    ];

    const scores: HighScoreEntry[] = sampleScores.map((score, index) => ({
      ...score,
      id: `sample-${index}`,
      timestamp: Date.now() - (index * 24 * 60 * 60 * 1000) // Spread over days
    }));

    this.saveHighScores(scores);
  }
}

// Formatting utilities
export const formatScore = (score: number): string => {
  return score.toLocaleString();
};

export const formatRank = (rank: number): string => {
  const lastDigit = rank % 10;
  const lastTwoDigits = rank % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `${rank}th`;
  }
  
  switch (lastDigit) {
    case 1: return `${rank}st`;
    case 2: return `${rank}nd`;
    case 3: return `${rank}rd`;
    default: return `${rank}th`;
  }
};