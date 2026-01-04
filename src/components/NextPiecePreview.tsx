import { PIECES } from './gameLogic';
import type { TetrominoType } from './gameLogic';

interface NextPiecePreviewProps {
  piece: TetrominoType;
}

export function NextPiecePreview({ piece }: NextPiecePreviewProps) {
  const currentPiece = PIECES[piece];
  
  if (!currentPiece) return null;

  const { color, rotations } = currentPiece;
  const shape = rotations[0]; // Always show first rotation

  return (
    <div className="bg-white/10 backdrop-blur-sm border-2 border-teal-400/30 p-3 rounded-lg shadow-lg min-w-[180px]">
      <h3 className="text-teal-300 mb-2 text-center">NEXT</h3>
      
      <div className="bg-slate-900/50 border border-teal-500/30 p-3 rounded-md shadow-inner">
        <div className="flex justify-center">
          <div className="inline-grid gap-0" style={{ 
            gridTemplateColumns: `repeat(${Math.max(...shape.map(row => row.length))}, 1fr)` 
          }}>
            {shape.map((row, rowIndex) => 
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-4 h-4 ${
                    cell 
                      ? `${color} shadow-lg border border-white/20 rounded-sm` 
                      : 'bg-transparent'
                  }`}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Show all pieces for reference */}
      <div className="mt-4">
        <div className="text-white/60 text-xs mb-2 text-center">PIECES</div>
        <div className="grid grid-cols-4 gap-1">
          {Object.entries(PIECES).map(([pieceName, pieceData]) => (
            <div 
              key={pieceName}
              className={`aspect-square border ${
                pieceName === piece 
                  ? 'border-teal-400 bg-teal-900/30' 
                  : 'border-teal-600/20 bg-slate-900/30'
              } p-1 rounded flex items-center justify-center`}
            >
              <div className="grid gap-0" style={{ 
                gridTemplateColumns: `repeat(${Math.max(...pieceData.rotations[0].map(row => row.length))}, 1fr)` 
              }}>
                {pieceData.rotations[0].map((row, rowIndex) => 
                  row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`w-1 h-1 ${
                        cell 
                          ? pieceData.color.split(' ')[0] 
                          : 'bg-transparent'
                      }`}
                    />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
