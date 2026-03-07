import React, { useEffect, useState, useMemo } from "react";
import { motion } from "motion/react";
import { Home, RefreshCcw, LayoutGrid } from "lucide-react";

// 20 diverse Sudoku puzzles
const PUZZLES = [
  // 1
  [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ],
  // 2
  [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0]
  ],
  // 3
  [
    [1, 0, 0, 4, 8, 9, 0, 0, 6],
    [7, 3, 0, 0, 0, 0, 0, 4, 0],
    [0, 0, 0, 0, 0, 1, 2, 9, 5],
    [0, 0, 7, 1, 2, 0, 6, 0, 0],
    [5, 0, 0, 7, 0, 3, 0, 0, 8],
    [0, 0, 6, 0, 9, 5, 7, 0, 0],
    [9, 1, 4, 6, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 3, 7],
    [8, 0, 0, 5, 1, 2, 0, 0, 4]
  ],
  // 4
  [
    [0, 2, 0, 6, 0, 8, 0, 0, 0],
    [5, 8, 0, 0, 0, 9, 7, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0, 0],
    [3, 7, 0, 0, 0, 0, 5, 0, 0],
    [6, 0, 0, 0, 0, 0, 0, 0, 4],
    [0, 0, 8, 0, 0, 0, 0, 1, 3],
    [0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 9, 8, 0, 0, 0, 3, 6],
    [0, 0, 0, 3, 0, 6, 0, 9, 0]
  ],
  // 5
  [
    [0, 0, 0, 0, 0, 0, 0, 1, 2],
    [0, 0, 0, 0, 3, 5, 0, 0, 0],
    [0, 0, 0, 6, 0, 0, 0, 7, 0],
    [7, 0, 0, 0, 0, 0, 3, 0, 0],
    [0, 0, 0, 4, 0, 0, 8, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0, 0],
    [0, 8, 0, 0, 0, 0, 0, 4, 0],
    [0, 5, 0, 0, 0, 0, 6, 0, 0]
  ],
  // 6
  [
    [0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 6, 0, 0, 0, 0, 3],
    [0, 7, 4, 0, 8, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 2],
    [0, 8, 0, 0, 4, 0, 0, 1, 0],
    [6, 0, 0, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 7, 8, 0],
    [5, 0, 0, 0, 0, 9, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 4, 0]
  ],
  // 7
  [
    [9, 0, 0, 0, 8, 0, 3, 0, 0],
    [0, 0, 0, 2, 5, 0, 7, 0, 0],
    [0, 2, 0, 3, 0, 0, 0, 0, 4],
    [2, 9, 4, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 5, 6, 2],
    [7, 0, 0, 0, 0, 4, 0, 5, 0],
    [0, 0, 3, 0, 2, 8, 0, 0, 0],
    [0, 0, 5, 0, 3, 0, 0, 0, 9]
  ],
  // 8
  [
    [0, 4, 0, 0, 0, 0, 0, 5, 0],
    [0, 0, 1, 0, 0, 0, 6, 0, 0],
    [0, 8, 0, 0, 0, 0, 0, 9, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 7, 0],
    [0, 0, 5, 0, 0, 0, 3, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 4, 0]
  ],
  // 9
  [
    [0, 0, 6, 0, 0, 0, 0, 0, 0],
    [0, 8, 0, 0, 5, 4, 2, 0, 0],
    [0, 4, 0, 0, 9, 0, 0, 7, 0],
    [0, 0, 7, 9, 0, 0, 3, 0, 0],
    [0, 0, 0, 0, 8, 0, 0, 0, 0],
    [0, 0, 4, 0, 0, 2, 1, 0, 0],
    [0, 9, 0, 0, 7, 0, 0, 5, 0],
    [0, 0, 8, 1, 3, 0, 0, 4, 0],
    [0, 0, 0, 0, 0, 0, 6, 0, 0]
  ],
  // 10
  [
    [3, 0, 0, 0, 0, 0, 0, 0, 8],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [8, 0, 0, 0, 0, 0, 0, 0, 3]
  ],
  // 11
  [
    [4, 0, 0, 0, 0, 0, 8, 0, 5],
    [0, 3, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 7, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 6, 0],
    [0, 0, 0, 0, 8, 0, 4, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 6, 0, 3, 0, 7, 0],
    [5, 0, 0, 2, 0, 0, 0, 0, 0],
    [1, 0, 4, 0, 0, 0, 0, 0, 0]
  ],
  // 12
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 8, 5],
    [0, 0, 1, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 7, 0, 0, 0],
    [0, 0, 4, 0, 0, 0, 1, 0, 0],
    [0, 9, 0, 0, 0, 0, 0, 0, 0],
    [5, 0, 0, 0, 0, 0, 0, 7, 3],
    [0, 0, 2, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0, 9]
  ],
  // 13
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  // 14
  [
    [8, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 6, 0, 0, 0, 0, 0],
    [0, 7, 0, 0, 9, 0, 2, 0, 0],
    [0, 5, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 0, 0, 4, 5, 7, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 3, 0],
    [0, 0, 1, 0, 0, 0, 0, 6, 8],
    [0, 0, 8, 5, 0, 0, 0, 1, 0],
    [0, 9, 0, 0, 0, 0, 4, 0, 0]
  ],
  // 15
  [
    [0, 0, 4, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  // 16
  [
    [0, 8, 0, 4, 0, 2, 0, 6, 0],
    [0, 3, 4, 0, 0, 0, 9, 1, 0],
    [9, 6, 0, 0, 0, 0, 0, 8, 4],
    [0, 0, 0, 2, 1, 6, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3, 5, 7, 0, 0, 0],
    [8, 4, 0, 0, 0, 0, 0, 7, 5],
    [0, 2, 6, 0, 0, 0, 1, 3, 0],
    [0, 9, 0, 7, 0, 1, 0, 4, 0]
  ],
  // 17
  [
    [8, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 6, 0, 0, 0, 0, 0],
    [0, 7, 0, 0, 9, 0, 2, 0, 0],
    [0, 5, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 0, 0, 4, 5, 7, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 3, 0],
    [0, 0, 1, 0, 0, 0, 0, 6, 8],
    [0, 0, 8, 5, 0, 0, 0, 1, 0],
    [0, 9, 0, 0, 0, 0, 4, 0, 0]
  ],
  // 18
  [
    [0, 4, 0, 0, 0, 0, 0, 5, 0],
    [0, 0, 1, 0, 0, 0, 6, 0, 0],
    [0, 8, 0, 0, 0, 0, 0, 9, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 7, 0],
    [0, 0, 5, 0, 0, 0, 3, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 4, 0]
  ],
  // 19
  [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ],
  // 20
  [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0]
  ]
];

export function SudokuGame({ onBack }: { onBack: () => void }) {
  const [puzzleIndex, setPuzzleIndex] = useState(0);

  // Store the initial puzzle to check against later
  const initialBoard = useMemo(() => PUZZLES[puzzleIndex].map(row => [...row]), [puzzleIndex]);
  const [board, setBoard] = useState(initialBoard.map(row => [...row]));
  const [selectedCell, setSelectedCell] = useState<{ r: number, c: number } | null>(null);

  useEffect(() => {
    window.history.replaceState({}, '', `?quiz=sudoku`);
  }, []);

  // Sync board when puzzleIndex changes
  useEffect(() => {
    setBoard(initialBoard.map(row => [...row]));
    setSelectedCell(null);
  }, [initialBoard]);

  const handleNumberClick = (num: number) => {
    if (selectedCell) {
      // Only allow changing empty cells from the ORIGINAL puzzle
      if (initialBoard[selectedCell.r][selectedCell.c] === 0) {
        const newBoard = board.map(row => [...row]);
        newBoard[selectedCell.r][selectedCell.c] = num;
        setBoard(newBoard);
      }
    }
  };

  const loadNewPuzzle = () => {
    let newIndex = puzzleIndex;
    while (newIndex === puzzleIndex) {
      newIndex = Math.floor(Math.random() * PUZZLES.length);
    }
    setPuzzleIndex(newIndex);
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative pt-8 sm:pt-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-sm border border-slate-100"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-500 flex-shrink-0">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-serif">
              Cozy Sudoku
            </h1>
          </div>
          <button 
            onClick={loadNewPuzzle} 
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-full hover:bg-slate-200 transition-colors"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>New Puzzle</span>
          </button>
        </div>

        {/* Board */}
        <div className="mb-8 w-full max-w-[400px] mx-auto bg-slate-200 p-1 rounded-xl shadow-inner">
          <div className="grid grid-cols-9 gap-[1px]">
            {board.map((row, r) => 
              row.map((cell, c) => {
                const isSelected = selectedCell?.r === r && selectedCell?.c === c;
                const isOriginal = initialBoard[r][c] !== 0;
                // Add borders for 3x3 grids
                const borderRight = c === 2 || c === 5 ? 'border-r-2 border-slate-300' : '';
                const borderBottom = r === 2 || r === 5 ? 'border-b-2 border-slate-300' : '';

                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => setSelectedCell({ r, c })}
                    className={`aspect-square flex items-center justify-center text-lg sm:text-xl font-medium transition-colors ${borderRight} ${borderBottom} ${
                      isSelected 
                        ? 'bg-blue-200 text-blue-900' 
                        : isOriginal 
                          ? 'bg-white text-slate-900' 
                          : 'bg-slate-50 text-blue-600'
                    } ${!isOriginal && !isSelected ? 'hover:bg-blue-50' : ''}`}
                  >
                    {cell !== 0 ? cell : ''}
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-5 sm:grid-cols-9 gap-2 max-w-[400px] mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="aspect-square sm:aspect-auto sm:py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-bold text-lg transition-colors active:scale-95"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleNumberClick(0)}
            className="aspect-square sm:aspect-auto sm:py-3 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-xl font-bold text-sm transition-colors active:scale-95 col-span-1 sm:col-span-9"
          >
            Clear
          </button>
        </div>
      </motion.div>
    </div>
  );
}
