import { useState, useEffect, useCallback, useRef } from 'react';
import { GameGrid } from './components/GameGrid';
import { NextPiecePreview } from './components/NextPiecePreview';
import { ScorePanel } from './components/ScorePanel';
import { GameControls } from './components/GameControls';
import { GameTimer } from './components/GameTimer';
import { GameOverDialog } from './components/GameOverDialog';
import { GameCompleteDialog } from './components/GameCompleteDialog';
import { QuestionDialog } from './components/QuestionDialog';
import { VolumeControl } from './components/VolumeControl';
import { WelcomeScreen } from './components/WelcomeScreen';
import { PIECES, EMPTY_CELL, GRID_WIDTH, GRID_HEIGHT } from './components/gameLogic';
import { HighScoreManager } from './components/highScoreLogic';
import { soundEffects } from './components/soundEffects';
import { getRandomQuestion, calculateQuestionPoints, type Question } from './components/questionService';
import type { GameState, TetrominoType } from './components/gameLogic';
import type { HighScoreEntry, HighScoreStats } from './components/highScoreLogic';

const INITIAL_GAME_STATE: GameState = {
  grid: Array(GRID_HEIGHT).fill(null).map(() => Array(GRID_WIDTH).fill(EMPTY_CELL)),
  currentPiece: null,
  nextPiece: 'T',
  score: 0,
  level: 1,
  lines: 0,
  linesInCurrentLevel: 0,
  gameOver: false,
  isPlaying: false
};

type GamePhase = 'menu' | 'question' | 'playing' | 'gameOver' | 'gameComplete';

const TOTAL_QUESTIONS = 5; // 5 questions total to complete the game

export default function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [gamePhase, setGamePhase] = useState<GamePhase>('menu');
  
  // Question tracking
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([]);
  
  // Timer tracking
  const [gameTime, setGameTime] = useState<number>(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const dropIntervalRef = useRef<number>(1000);
  const highScoreManager = HighScoreManager.getInstance();
  const gamePhaseRef = useRef<GamePhase>(gamePhase);
  const isPlayingRef = useRef<boolean>(gameState.isPlaying);
  const usedQuestionIdsRef = useRef<string[]>(usedQuestionIds);

  const loadNextQuestion = useCallback(async () => {
    try {
      const nextQuestion = await getRandomQuestion(usedQuestionIdsRef.current);
      setCurrentQuestion(nextQuestion);
      setUsedQuestionIds(prev => [...prev, String(nextQuestion.id)]);
      setGamePhase('question');
      setGameState(prev => ({ ...prev, isPlaying: false }));
    } catch (error) {
      console.error('Failed to load question', error);
    }
  }, []);

  const startQuestionFlow = useCallback(() => {
    setQuestionsAnswered(0);
    setUsedQuestionIds([]);
    usedQuestionIdsRef.current = [];
    dropIntervalRef.current = 1000;
    loadNextQuestion().catch(() => {});
  }, [loadNextQuestion]);

  // Generate random piece
  const getRandomPiece = useCallback((): TetrominoType => {
    const pieces: TetrominoType[] = ['I', 'O', 'T', 'L', 'J', 'S', 'Z'];
    return pieces[Math.floor(Math.random() * pieces.length)];
  }, []);

  // Spawn new piece
  const spawnNewPiece = useCallback((state: GameState): GameState => {
    const pieceType = state.nextPiece;
    const newPiece = {
      type: pieceType,
      x: Math.floor(GRID_WIDTH / 2) - 1,
      y: 0,
      rotation: 0
    };

    // Check if new piece overlaps with existing blocks (game over condition)
    const piece = PIECES[pieceType];
    const shape = piece.rotations[0];
    
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c] && state.grid[newPiece.y + r]?.[newPiece.x + c] !== EMPTY_CELL) {
          return { ...state, gameOver: true, isPlaying: false };
        }
      }
    }

    return {
      ...state,
      currentPiece: newPiece,
      nextPiece: getRandomPiece()
    };
  }, [getRandomPiece]);

  // Check collision
  const checkCollision = useCallback((
    grid: string[][],
    piece: { type: TetrominoType; x: number; y: number; rotation: number },
    deltaX: number = 0,
    deltaY: number = 0,
    deltaRotation: number = 0
  ): boolean => {
    const newX = piece.x + deltaX;
    const newY = piece.y + deltaY;
    const newRotation = (piece.rotation + deltaRotation) % 4;
    
    const shape = PIECES[piece.type].rotations[newRotation];

    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const gridX = newX + c;
          const gridY = newY + r;

          // Check boundaries
          if (gridX < 0 || gridX >= GRID_WIDTH || gridY >= GRID_HEIGHT) {
            return true;
          }

          // Check collision with existing blocks
          if (gridY >= 0 && grid[gridY][gridX] !== EMPTY_CELL) {
            return true;
          }
        }
      }
    }

    return false;
  }, []);

  // Place piece in grid
  const placePiece = useCallback((
    grid: string[][],
    piece: { type: TetrominoType; x: number; y: number; rotation: number }
  ): string[][] => {
    const newGrid = grid.map(row => [...row]);
    const shape = PIECES[piece.type].rotations[piece.rotation];

    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const gridX = piece.x + c;
          const gridY = piece.y + r;
          if (gridY >= 0 && gridY < GRID_HEIGHT && gridX >= 0 && gridX < GRID_WIDTH) {
            newGrid[gridY][gridX] = piece.type;
          }
        }
      }
    }

    return newGrid;
  }, []);

  // Clear completed lines
  const clearLines = useCallback((grid: string[][]): { newGrid: string[][]; linesCleared: number } => {
    const newGrid = [...grid];
    let linesCleared = 0;

    for (let row = GRID_HEIGHT - 1; row >= 0; row--) {
      if (newGrid[row].every(cell => cell !== EMPTY_CELL)) {
        newGrid.splice(row, 1);
        newGrid.unshift(Array(GRID_WIDTH).fill(EMPTY_CELL));
        linesCleared++;
        row++; // Check the same row again since we shifted everything down
      }
    }

    return { newGrid, linesCleared };
  }, []);

  // Calculate score
  const calculateScore = useCallback((linesCleared: number, level: number): number => {
    const basePoints = [0, 40, 100, 300, 1200];
    return basePoints[linesCleared] * level;
  }, []);

  // Move piece
  const movePiece = useCallback((direction: 'left' | 'right' | 'down' | 'rotate' | 'hardDrop') => {
    let shouldAskQuestion = false;

    setGameState(prevState => {
      if (!prevState.isPlaying || !prevState.currentPiece || prevState.gameOver) {
        return prevState;
      }

      let newState = { ...prevState };
      const { currentPiece, grid } = newState;

      switch (direction) {
        case 'left':
          if (!checkCollision(grid, currentPiece, -1, 0)) {
            newState.currentPiece = { ...currentPiece, x: currentPiece.x - 1 };
            soundEffects.move();
          }
          break;

        case 'right':
          if (!checkCollision(grid, currentPiece, 1, 0)) {
            newState.currentPiece = { ...currentPiece, x: currentPiece.x + 1 };
            soundEffects.move();
          }
          break;

        case 'down':
          if (!checkCollision(grid, currentPiece, 0, 1)) {
            newState.currentPiece = { ...currentPiece, y: currentPiece.y + 1 };
          } else {
            // Piece has landed
            soundEffects.land();
            
            const newGrid = placePiece(grid, currentPiece);
            const { newGrid: clearedGrid, linesCleared } = clearLines(newGrid);
            const scoreIncrease = calculateScore(linesCleared, newState.level);
            const newLines = newState.lines + linesCleared;
            const newLinesInLevel = newState.linesInCurrentLevel + linesCleared;

            // Play sound based on lines cleared
            if (linesCleared === 4) {
              soundEffects.tetris();
            } else if (linesCleared > 0) {
              soundEffects.lineClear(linesCleared);
            }

            newState = {
              ...newState,
              grid: clearedGrid,
              currentPiece: null,
              score: newState.score + scoreIncrease,
              lines: newLines,
              linesInCurrentLevel: newLinesInLevel
            };

            // Check if a line was cleared - trigger question
            if (linesCleared > 0) {
              shouldAskQuestion = true;
              newState.isPlaying = false; // Pause game for question
            } else {
              // No lines cleared - spawn new piece normally
              newState = spawnNewPiece(newState);
            }
          }
          break;

        case 'rotate':
          if (!checkCollision(grid, currentPiece, 0, 0, 1)) {
            newState.currentPiece = {
              ...currentPiece,
              rotation: (currentPiece.rotation + 1) % 4
            };
            soundEffects.rotate();
          }
          break;

        case 'hardDrop':
          let dropDistance = 0;
          while (!checkCollision(grid, currentPiece, 0, dropDistance + 1)) {
            dropDistance++;
          }
          soundEffects.hardDrop();
          
          newState.currentPiece = { ...currentPiece, y: currentPiece.y + dropDistance };
          // Force immediate placement
          const newGridHD = placePiece(newState.grid, newState.currentPiece);
          const { newGrid: clearedGridHD, linesCleared: linesClearedHD } = clearLines(newGridHD);
          const scoreIncreaseHD = calculateScore(linesClearedHD, newState.level) + dropDistance * 2;
          const newLinesHD = newState.lines + linesClearedHD;
          const newLinesInLevelHD = newState.linesInCurrentLevel + linesClearedHD;

          // Play sound based on lines cleared
          if (linesClearedHD === 4) {
            soundEffects.tetris();
          } else if (linesClearedHD > 0) {
            soundEffects.lineClear(linesClearedHD);
          } else {
            soundEffects.land();
          }

          newState = {
            ...newState,
            grid: clearedGridHD,
            currentPiece: null,
            score: newState.score + scoreIncreaseHD,
            lines: newLinesHD,
            linesInCurrentLevel: newLinesInLevelHD
          };

          // Check if a line was cleared - trigger question
          if (linesClearedHD > 0) {
            shouldAskQuestion = true;
            newState.isPlaying = false; // Pause game for question
          } else {
            newState = spawnNewPiece(newState);
          }
          break;
      }

      return newState;
    });

    if (shouldAskQuestion) {
      loadNextQuestion().catch(() => {});
    }
  }, [checkCollision, placePiece, clearLines, calculateScore, spawnNewPiece, loadNextQuestion]);

  // Handle game over
  useEffect(() => {
    if (gameState.gameOver && gamePhase === 'playing') {
      soundEffects.gameOver();
      setGamePhase('gameOver');
    }
  }, [gameState.gameOver, gamePhase]);

  // Handle question completion
  const handleQuestionComplete = useCallback((isCorrect: boolean, timeElapsed: number) => {
    // Calculate points based on correctness and speed
    const points = calculateQuestionPoints(isCorrect, timeElapsed);
    
    setGameState(prevState => {
      const newState = {
        ...prevState,
        score: Math.max(0, prevState.score + points) // Don't go below 0
      };
      
      // Increment questions answered
      setQuestionsAnswered(prev => prev + 1);
      
      // Check if all questions have been answered
      if (questionsAnswered + 1 >= TOTAL_QUESTIONS) {
        // Game completed!
        setGamePhase('gameComplete');
        return { ...newState, isPlaying: false };
      } else {
        // Continue playing
        soundEffects.resume();
        setGamePhase('playing');
        return spawnNewPiece({ ...newState, isPlaying: true });
      }
    });
  }, [spawnNewPiece, questionsAnswered]);

  // Update refs when gamePhase or isPlaying changes
  useEffect(() => {
    gamePhaseRef.current = gamePhase;
    isPlayingRef.current = gameState.isPlaying;
    usedQuestionIdsRef.current = usedQuestionIds;
  }, [gamePhase, gameState.isPlaying, usedQuestionIds]);

  // Keyboard controls - using refs to prevent re-registration
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gamePhaseRef.current !== 'playing' || !isPlayingRef.current) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          movePiece('left');
          break;
        case 'ArrowRight':
          event.preventDefault();
          movePiece('right');
          break;
        case 'ArrowDown':
          event.preventDefault();
          movePiece('down');
          break;
        case 'ArrowUp':
          event.preventDefault();
          movePiece('rotate');
          break;
        case ' ':
          event.preventDefault();
          movePiece('hardDrop');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePiece]);

  // Game loop for automatic piece dropping
  useEffect(() => {
    if (gamePhase === 'playing' && gameState.isPlaying && !gameState.gameOver) {
      gameLoopRef.current = setInterval(() => {
        movePiece('down');
      }, dropIntervalRef.current);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gamePhase, gameState.isPlaying, gameState.gameOver, movePiece]);

  // Game timer - runs when playing
  useEffect(() => {
    if (gamePhase === 'playing' && gameState.isPlaying && !gameState.gameOver) {
      timerIntervalRef.current = setInterval(() => {
        setGameTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [gamePhase, gameState.isPlaying, gameState.gameOver]);

  // Start/pause game
  const togglePlay = useCallback(() => {
    if (gamePhase === 'menu') {
      setGamePhase('playing');
    }
    
    setGameState(prevState => {
      const willBePlaying = !prevState.isPlaying;
      
      // Play appropriate sound
      if (willBePlaying) {
        soundEffects.resume();
      } else {
        soundEffects.pause();
      }
      
      if (!prevState.currentPiece && !prevState.gameOver) {
        // Starting new game or resuming
        const newState = { ...prevState, isPlaying: willBePlaying };
        return prevState.currentPiece ? newState : spawnNewPiece(newState);
      }
      return { ...prevState, isPlaying: willBePlaying };
    });
  }, [gamePhase, spawnNewPiece]);

  // Reset game
  const resetGame = useCallback(() => {
    soundEffects.click();
    setGameState({
      ...INITIAL_GAME_STATE,
      nextPiece: getRandomPiece()
    });
    setGamePhase('menu');
    setQuestionsAnswered(0);
    setCurrentQuestion(null);
    setUsedQuestionIds([]);
    usedQuestionIdsRef.current = [];
    setGameTime(0);
    dropIntervalRef.current = 1000;
  }, [getRandomPiece]);

  // Play again from high score results
  const handlePlayAgain = useCallback(() => {
    resetGame();
    setTimeout(() => {
      startQuestionFlow();
    }, 100);
  }, [resetGame, startQuestionFlow]);

  // Handle game over restart
  const handleGameOverRestart = useCallback(() => {
    resetGame();
    setTimeout(() => {
      startQuestionFlow();
    }, 100);
  }, [resetGame, startQuestionFlow]);

  const isQualifyingScore = highScoreManager.isQualifyingScore(gameState.score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-teal-900 flex items-center justify-center p-2">
      <VolumeControl />
      
      {/* Welcome Screen - shown when in menu phase */}
      {gamePhase === 'menu' && (
        <WelcomeScreen
          onStartGame={() => {
            // Start with first question (async)
            startQuestionFlow();
          }}
          highScore={highScoreManager.getHighScores()[0]?.score || 0}
        />
      )}

      {/* Game View - shown when playing */}
      {gamePhase !== 'menu' && (
        <div className="flex gap-3 max-w-6xl w-full">
          {/* Left Panel - Score and Stats */}
          <div className="flex flex-col gap-3">
            <ScorePanel 
              score={gameState.score}
              level={gameState.level}
              lines={gameState.lines}
              linesInCurrentLevel={gameState.linesInCurrentLevel}
              highScore={highScoreManager.getHighScores()[0]?.score || 0}
            />
            <NextPiecePreview piece={gameState.nextPiece} />
          </div>

          {/* Main Game Area */}
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl text-white tracking-wider drop-shadow-lg">TETRIS TRAINING</h1>
            {gameState.gameOver && gamePhase === 'playing' && (
              <div className="text-red-400">GAME OVER</div>
            )}
            <GameGrid 
            grid={gameState.grid}
            currentPiece={gameState.currentPiece}
          />
          <GameTimer seconds={gameTime} />
          <GameControls 
            isPlaying={gameState.isPlaying}
            gameOver={gameState.gameOver}
            onTogglePlay={togglePlay}
            onReset={resetGame}
            gamePhase={gamePhase}
          />
        </div>

        {/* Right Panel - Instructions and Leaderboard */}
        <div className="flex flex-col gap-3">
          <div className="bg-white/10 backdrop-blur-sm border-2 border-teal-400/30 p-3 rounded-lg shadow-lg">
            <h3 className="text-teal-300 mb-2">CONTROLS</h3>
            <div className="text-white/90 text-sm space-y-1">
              <div>← → Move</div>
              <div>↓ Soft Drop</div>
              <div>↑ Rotate</div>
              <div>SPACE Hard Drop</div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border-2 border-teal-400/30 p-4 rounded-lg shadow-lg">
            <h3 className="text-teal-300 mb-3">HOW TO PLAY</h3>
            <div className="text-white/90 text-sm space-y-2">
              <div>• Answer questions quickly</div>
              <div>• Clear lines to trigger questions</div>
              <div>• Faster = More points</div>
              <div className="pt-2 border-t border-teal-400/20 text-teal-300">
                ⚡ Speed matters! Wrong answer = -50 pts
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border-2 border-teal-400/30 p-4 rounded-lg shadow-lg">
            <h3 className="text-teal-300 mb-3">TRAINING PROGRESS</h3>
            <div className="text-white/90 text-sm space-y-2">
              <div className="flex justify-between items-center">
                <span>Questions Answered:</span>
                <span className="text-teal-300">{questionsAnswered} / {TOTAL_QUESTIONS}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Lines:</span>
                <span className="text-teal-300">
                  {gameState.lines}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Current Score:</span>
                <span className="text-teal-300">
                  {gameState.score.toLocaleString()}
                </span>
              </div>
              <div className="pt-2 border-t border-teal-400/20">
                <div className="text-xs text-white/70 mb-1">
                  {questionsAnswered >= TOTAL_QUESTIONS 
                    ? 'All questions complete!'
                    : `Clear a line to get question ${questionsAnswered + 1}!`
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* Question Dialog */}
      {currentQuestion && (
        <QuestionDialog
          open={gamePhase === 'question'}
          question={currentQuestion}
          questionNumber={questionsAnswered + 1}
          totalQuestions={TOTAL_QUESTIONS}
          onComplete={handleQuestionComplete}
        />
      )}

      {/* Game Complete Dialog */}
      <GameCompleteDialog
        open={gamePhase === 'gameComplete'}
        score={gameState.score}
        totalLines={gameState.lines}
        onPlayAgain={handlePlayAgain}
      />

      {/* Game Over Dialog */}
      <GameOverDialog
        open={gamePhase === 'gameOver'}
        score={gameState.score}
        level={gameState.level}
        lines={gameState.lines}
        onRestart={handleGameOverRestart}
      />
    </div>
  );
}
