import { PIECES, EMPTY_CELL, GRID_WIDTH, GRID_HEIGHT } from './gameLogic';
import type { TetrominoType } from './gameLogic';

interface GameGridProps {
  grid: string[][];
  currentPiece: {
    type: TetrominoType;
    x: number;
    y: number;
    rotation: number;
  } | null;
}

export function GameGrid({ grid, currentPiece }: GameGridProps) {
  const renderCell = (row: number, col: number) => {
    // Check if this cell is part of the current falling piece
    const isCurrentPiece = currentPiece && isPartOfCurrentPiece(row, col, currentPiece);
    
    if (isCurrentPiece) {
      const pieceColor = PIECES[currentPiece.type].color;
      return (
        <div
          key={`${row}-${col}`}
          className={`w-5 h-5 border border-white/20 ${pieceColor} shadow-lg rounded-sm`}
        />
      );
    }
    
    // Check if there's a placed piece in this cell
    const cellValue = grid[row][col];
    if (cellValue && cellValue !== EMPTY_CELL) {
      const pieceColor = PIECES[cellValue as TetrominoType].color;
      return (
        <div
          key={`${row}-${col}`}
          className={`w-5 h-5 border border-white/20 ${pieceColor} shadow-lg opacity-90 rounded-sm`}
        />
      );
    }
    
    // Empty cell
    return (
      <div
        key={`${row}-${col}`}
        className="w-5 h-5 border border-slate-700/40 bg-slate-900/30"
      />
    );
  };

  const isPartOfCurrentPiece = (
    row: number, 
    col: number, 
    piece: { type: TetrominoType; x: number; y: number; rotation: number }
  ): boolean => {
    const shape = PIECES[piece.type].rotations[piece.rotation];
    
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c] && 
            piece.y + r === row && 
            piece.x + c === col) {
          return true;
        }
      }
    }
    return false;
  };

  // Show ghost piece (preview of where piece will land)
  const getGhostPiece = () => {
    if (!currentPiece) return null;
    
    let ghostY = currentPiece.y;
    while (ghostY < GRID_HEIGHT) {
      // Check if piece would collide at next position
      const shape = PIECES[currentPiece.type].rotations[currentPiece.rotation];
      let wouldCollide = false;
      
      for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
          if (shape[r][c]) {
            const gridX = currentPiece.x + c;
            const gridY = ghostY + r + 1;
            
            if (gridY >= GRID_HEIGHT || 
                (gridY >= 0 && grid[gridY][gridX] !== EMPTY_CELL)) {
              wouldCollide = true;
              break;
            }
          }
        }
        if (wouldCollide) break;
      }
      
      if (wouldCollide) break;
      ghostY++;
    }
    
    return { ...currentPiece, y: ghostY };
  };

  const ghostPiece = getGhostPiece();

  const isPartOfGhostPiece = (row: number, col: number): boolean => {
    if (!ghostPiece || !currentPiece) return false;
    if (ghostPiece.y === currentPiece.y) return false; // Don't show ghost if it's at the same position
    
    const shape = PIECES[ghostPiece.type].rotations[ghostPiece.rotation];
    
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c] && 
            ghostPiece.y + r === row && 
            ghostPiece.x + c === col) {
          return true;
        }
      }
    }
    return false;
  };

  const renderCellWithGhost = (row: number, col: number) => {
    const isCurrentPiece = currentPiece && isPartOfCurrentPiece(row, col, currentPiece);
    const isGhost = isPartOfGhostPiece(row, col);
    
    if (isCurrentPiece) {
      const pieceColor = PIECES[currentPiece.type].color;
      return (
        <div
          key={`${row}-${col}`}
          className={`w-6 h-6 border border-white/20 ${pieceColor} shadow-lg rounded-sm`}
        />
      );
    }
    
    if (isGhost) {
      const pieceColor = PIECES[ghostPiece!.type].color;
      return (
        <div
          key={`${row}-${col}`}
          className={`w-6 h-6 border border-teal-400/30 ${pieceColor.split(' ')[0]} opacity-20 rounded-sm`}
        />
      );
    }
    
    const cellValue = grid[row][col];
    if (cellValue && cellValue !== EMPTY_CELL) {
      const pieceColor = PIECES[cellValue as TetrominoType].color;
      return (
        <div
          key={`${row}-${col}`}
          className={`w-6 h-6 border border-white/20 ${pieceColor} shadow-lg opacity-90 rounded-sm`}
        />
      );
    }
    
    return (
      <div
        key={`${row}-${col}`}
        className="w-6 h-6 border border-slate-700/40 bg-slate-900/30"
      />
    );
  };

  return (
    <div className="relative">
      {/* Game border with modern styling */}
      <div className="border-4 border-teal-500/40 bg-slate-800/50 backdrop-blur-sm p-2 rounded-lg shadow-2xl">
        {/* Grid */}
        <div className="grid grid-cols-10 gap-0 bg-slate-900/70 border-2 border-teal-600/30 rounded">
          {grid.map((row, rowIndex) =>
            row.map((_, colIndex) => renderCellWithGhost(rowIndex, colIndex))
          )}
        </div>
      </div>
      
      {/* Grid coordinates overlay for development (hidden in production) */}
      <div className="absolute -left-8 top-0 text-xs text-gray-500 hidden">
        {Array(GRID_HEIGHT).fill(null).map((_, i) => (
          <div key={i} className="h-6 flex items-center">
            {i < 10 ? `0${i}` : i}
          </div>
        ))}
      </div>
    </div>
  );
}
