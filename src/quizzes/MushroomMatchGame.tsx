import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { RefreshCcw, TreePine } from "lucide-react";

const GRID_SIZE = 8;
const NUM_TYPES = 6;

interface Tile {
  id: string;
  type: number;
}

let nextId = 0;
const getId = () => `tile-${nextId++}`;

const createRandomTile = (): Tile => ({
  id: getId(),
  type: Math.floor(Math.random() * NUM_TYPES)
});

const createsMatch = (board: Tile[][], currentRow: Tile[], r: number, c: number, type: number) => {
  // Check horizontal matches to the left (using the currently building row)
  if (c >= 2 && currentRow[c-1]?.type === type && currentRow[c-2]?.type === type) {
    return true;
  }
  // Check vertical matches upwards (using the previously completed rows in board)
  if (r >= 2 && board[r-1]?.[c]?.type === type && board[r-2]?.[c]?.type === type) {
    return true;
  }
  return false;
};

const generateBoard = (): Tile[][] => {
  const board: Tile[][] = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    const row: Tile[] = [];
    for (let c = 0; c < GRID_SIZE; c++) {
      let tile = createRandomTile();
      // Ensure no initial matches
      while (createsMatch(board, row, r, c, tile.type)) {
        tile = createRandomTile();
      }
      row.push(tile);
    }
    board.push(row);
  }
  return board;
};

const findMatches = (board: Tile[][]) => {
  const matched = new Set<string>();

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE - 2; c++) {
      const type = board[r][c].type;
      if (type === -1) continue;
      if (board[r][c+1].type === type && board[r][c+2].type === type) {
        matched.add(`${r},${c}`);
        matched.add(`${r},${c+1}`);
        matched.add(`${r},${c+2}`);
        let k = c + 3;
        while (k < GRID_SIZE && board[r][k].type === type) {
          matched.add(`${r},${k}`);
          k++;
        }
      }
    }
  }

  for (let c = 0; c < GRID_SIZE; c++) {
    for (let r = 0; r < GRID_SIZE - 2; r++) {
      const type = board[r][c].type;
      if (type === -1) continue;
      if (board[r+1][c].type === type && board[r+2][c].type === type) {
        matched.add(`${r},${c}`);
        matched.add(`${r+1},${c}`);
        matched.add(`${r+2},${c}`);
        let k = r + 3;
        while (k < GRID_SIZE && board[k][c].type === type) {
          matched.add(`${k},${c}`);
          k++;
        }
      }
    }
  }

  return matched;
};

export function MushroomMatchGame() {
  const [board, setBoard] = useState<Tile[][]>([]);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<{r: number, c: number} | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    window.history.replaceState({}, '', `?quiz=mushroom-match`);
    setBoard(generateBoard());
  }, []);

  const processMatches = async (currentBoard: Tile[][], currentScore: number) => {
    let matches = findMatches(currentBoard);
    let newBoard = currentBoard.map(row => [...row]);
    let newScore = currentScore;
    
    if (matches.size === 0) {
      setIsProcessing(false);
      return;
    }

    setIsProcessing(true);

    while (matches.size > 0) {
      newScore += matches.size * 10;
      setScore(newScore);

      // 1. Mark matched tiles as empty (-1) to animate them popping
      matches.forEach(key => {
        const [r, c] = key.split(',').map(Number);
        newBoard[r][c] = { id: getId(), type: -1 }; 
      });
      setBoard([...newBoard]);
      
      await new Promise(resolve => setTimeout(resolve, 250)); 

      // 2. Drop tiles down and fill top with new tiles
      for (let c = 0; c < GRID_SIZE; c++) {
        let emptySpaces = 0;
        for (let r = GRID_SIZE - 1; r >= 0; r--) {
          if (newBoard[r][c].type === -1) {
            emptySpaces++;
          } else if (emptySpaces > 0) {
            newBoard[r + emptySpaces][c] = newBoard[r][c];
            newBoard[r][c] = { id: getId(), type: -1 };
          }
        }
        for (let r = 0; r < emptySpaces; r++) {
          newBoard[r][c] = createRandomTile();
        }
      }
      
      setBoard([...newBoard]);
      await new Promise(resolve => setTimeout(resolve, 300)); 
      
      matches = findMatches(newBoard);
    }
    
    setIsProcessing(false);
  };

  const handleTileClick = async (r: number, c: number) => {
    if (isProcessing) return;

    if (!selected) {
      setSelected({ r, c });
      return;
    }

    const isAdjacent = 
      (Math.abs(selected.r - r) === 1 && selected.c === c) ||
      (Math.abs(selected.c - c) === 1 && selected.r === r);

    if (!isAdjacent) {
      setSelected({ r, c }); 
      return;
    }

    setIsProcessing(true);
    setSelected(null);

    // Swap
    const newBoard = board.map(row => [...row]);
    const temp = newBoard[r][c];
    newBoard[r][c] = newBoard[selected.r][selected.c];
    newBoard[selected.r][selected.c] = temp;
    setBoard(newBoard);

    await new Promise(resolve => setTimeout(resolve, 250));

    const matches = findMatches(newBoard);
    if (matches.size > 0) {
      processMatches(newBoard, score);
    } else {
      // Revert swap if no matches
      const revertBoard = newBoard.map(row => [...row]);
      const temp2 = revertBoard[r][c];
      revertBoard[r][c] = revertBoard[selected.r][selected.c];
      revertBoard[selected.r][selected.c] = temp2;
      setBoard(revertBoard);
      setIsProcessing(false);
    }
  };

  const restart = () => {
    if (isProcessing) return;
    setBoard(generateBoard());
    setScore(0);
    setSelected(null);
  };

  return (
    <div className="w-full max-w-lg mx-auto relative pt-8 sm:pt-0">
      {board.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] p-4 sm:p-8 shadow-sm border border-slate-100 text-center"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">
                <TreePine className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif leading-tight">Mushroom Match</h1>
                <p className="text-sm font-medium text-slate-500">Score: {score}</p>
              </div>
            </div>
            <button 
              onClick={restart}
              className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
            >
              <RefreshCcw className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-slate-50 p-2 sm:p-3 rounded-2xl mx-auto w-fit shadow-inner">
            <div className="grid grid-cols-8 gap-1 sm:gap-1.5">
              {board.map((row, r) => 
                row.map((tile, c) => {
                  const isSelected = selected?.r === r && selected?.c === c;
                  return (
                    <motion.div
                      layout
                      key={tile.id}
                      onClick={() => handleTileClick(r, c)}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: tile.type === -1 ? 0 : 1, scale: tile.type === -1 ? 0.5 : 1 }}
                      className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-2xl sm:text-3xl cursor-pointer rounded-xl transition-colors select-none ${
                        isSelected 
                          ? 'bg-orange-200 shadow-md ring-2 ring-orange-400 z-10' 
                          : 'bg-white shadow-sm hover:bg-orange-50'
                      }`}
                    >
                      {tile.type !== -1 && (
                        <span 
                          style={{ filter: `hue-rotate(${tile.type * 60}deg)` }} 
                          className="drop-shadow-sm pointer-events-none"
                        >
                          🍄
                        </span>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
