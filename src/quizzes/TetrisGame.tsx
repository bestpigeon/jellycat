import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "motion/react";
import { RefreshCcw, Gamepad2, ArrowLeft, ArrowRight, ArrowDown, RotateCw } from "lucide-react";

const ROWS = 20;
const COLS = 10;
const TICK_RATE = 800; // ms

// Define Tetromino shapes and their colors
const TETROMINOES = {
  I: { shape: [[1, 1, 1, 1]], color: "bg-sky-300" },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: "bg-indigo-300" },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: "bg-orange-300" },
  O: { shape: [[1, 1], [1, 1]], color: "bg-yellow-300" },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: "bg-emerald-300" },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: "bg-purple-300" },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: "bg-rose-300" },
};

type TetrominoType = keyof typeof TETROMINOES;
const PIECES = Object.keys(TETROMINOES) as TetrominoType[];

interface Cell {
  filled: boolean;
  color: string;
}

const createEmptyBoard = () => Array.from({ length: ROWS }, () => Array(COLS).fill({ filled: false, color: "" }));

const randomTetromino = () => {
  const type = PIECES[Math.floor(Math.random() * PIECES.length)];
  return { type, ...TETROMINOES[type] };
};

export function TetrisGame() {
  const [board, setBoard] = useState<Cell[][]>(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState(randomTetromino());
  const [pos, setPos] = useState({ r: 0, c: 3 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Use refs for latest state inside interval
  const stateRef = useRef({ board, currentPiece, pos, gameOver, isPaused });
  useEffect(() => {
    stateRef.current = { board, currentPiece, pos, gameOver, isPaused };
  }, [board, currentPiece, pos, gameOver, isPaused]);

  useEffect(() => {
    window.history.replaceState({}, '', `?quiz=tetris`);
  }, []);

  const checkCollision = (rOffset: number, dcOffset: number, pieceShape: number[][], boardState: Cell[][], currentPos: {r: number, c: number}) => {
    for (let r = 0; r < pieceShape.length; r++) {
      for (let c = 0; c < pieceShape[r].length; c++) {
        if (pieceShape[r][c]) {
          const newR = currentPos.r + r + rOffset;
          const newC = currentPos.c + c + dcOffset;
          if (newR >= ROWS || newC < 0 || newC >= COLS || (newR >= 0 && boardState[newR][newC].filled)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const mergePiece = () => {
    const { board, currentPiece, pos } = stateRef.current;
    const newBoard = board.map(row => [...row]);
    let gameLost = false;

    for (let r = 0; r < currentPiece.shape.length; r++) {
      for (let c = 0; c < currentPiece.shape[r].length; c++) {
        if (currentPiece.shape[r][c]) {
          const targetR = pos.r + r;
          if (targetR < 0) {
            gameLost = true;
          } else {
            newBoard[targetR][pos.c + c] = { filled: true, color: currentPiece.color };
          }
        }
      }
    }

    if (gameLost) {
      setGameOver(true);
      return;
    }

    // Clear lines
    let linesCleared = 0;
    const clearedBoard = newBoard.filter(row => {
      const isFull = row.every(cell => cell.filled);
      if (isFull) linesCleared++;
      return !isFull;
    });

    while (clearedBoard.length < ROWS) {
      clearedBoard.unshift(Array(COLS).fill({ filled: false, color: "" }));
    }

    if (linesCleared > 0) {
      setScore(s => s + linesCleared * 100);
    }

    setBoard(clearedBoard);
    setCurrentPiece(randomTetromino());
    setPos({ r: -2, c: 3 }); // Start slightly above board to drop in
  };

  const movePiece = (dr: number, dc: number) => {
    const { gameOver, isPaused, currentPiece, board, pos } = stateRef.current;
    if (gameOver || isPaused) return;
    if (!checkCollision(dr, dc, currentPiece.shape, board, pos)) {
      setPos(prev => ({ r: prev.r + dr, c: prev.c + dc }));
    } else if (dr > 0) {
      // Hit bottom or another piece
      mergePiece();
    }
  };

  const rotatePiece = () => {
    const { gameOver, isPaused, currentPiece, board, pos } = stateRef.current;
    if (gameOver || isPaused) return;
    
    // Transpose and reverse rows
    const rotatedShape = currentPiece.shape[0].map((_, i) =>
      currentPiece.shape.map(row => row[i]).reverse()
    );

    if (!checkCollision(0, 0, rotatedShape, board, pos)) {
      setCurrentPiece({ ...currentPiece, shape: rotatedShape });
    }
  };

  const hardDrop = () => {
    const { gameOver, isPaused, currentPiece, board, pos } = stateRef.current;
    if (gameOver || isPaused) return;
    let dr = 0;
    while (!checkCollision(dr + 1, 0, currentPiece.shape, board, pos)) {
      dr++;
    }
    setPos(prev => ({ r: prev.r + dr, c: prev.c }));
    setTimeout(mergePiece, 50); 
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === "ArrowLeft") movePiece(0, -1);
      if (e.key === "ArrowRight") movePiece(0, 1);
      if (e.key === "ArrowDown") movePiece(1, 0);
      if (e.key === "ArrowUp") rotatePiece();
      if (e.key === " ") hardDrop();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      movePiece(1, 0);
    }, TICK_RATE);
    return () => clearInterval(interval);
  }, []);

  const restart = () => {
    setBoard(createEmptyBoard());
    setCurrentPiece(randomTetromino());
    setPos({ r: 0, c: 3 });
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  // Render combined board (fixed blocks + falling piece)
  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    
    // 1. Add current falling piece FIRST
    for (let r = 0; r < currentPiece.shape.length; r++) {
      for (let c = 0; c < currentPiece.shape[r].length; c++) {
        if (currentPiece.shape[r][c]) {
          const targetR = pos.r + r;
          if (targetR >= 0 && targetR < ROWS && pos.c + c >= 0 && pos.c + c < COLS) {
            displayBoard[targetR][pos.c + c] = { filled: true, color: currentPiece.color };
          }
        }
      }
    }

    // 2. Add current piece shadow (ghost piece)
    let shadowDr = 0;
    while (!checkCollision(shadowDr + 1, 0, currentPiece.shape, board, pos)) {
      shadowDr++;
    }
    
    // Only draw ghost if it's not perfectly overlapping with the active piece
    if (shadowDr > 0) {
      for (let r = 0; r < currentPiece.shape.length; r++) {
        for (let c = 0; c < currentPiece.shape[r].length; c++) {
          if (currentPiece.shape[r][c]) {
            const shadowR = pos.r + r + shadowDr;
            if (shadowR >= 0 && shadowR < ROWS && pos.c + c >= 0 && pos.c + c < COLS) {
              // Only draw ghost if the cell isn't already occupied by the active piece or a fixed block
              if (!displayBoard[shadowR][pos.c + c].filled) {
                 displayBoard[shadowR][pos.c + c] = { filled: false, color: "bg-slate-200" }; 
              }
            }
          }
        }
      }
    }

    return displayBoard;
  };

  return (
    <div className="w-full max-w-lg mx-auto relative pt-8 sm:pt-0 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2rem] p-4 sm:p-8 shadow-sm border border-slate-100 flex flex-col items-center"
      >
        <div className="flex items-center justify-between w-full mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-500 flex items-center justify-center">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif leading-tight">Tetris</h1>
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

        <div className="relative bg-slate-50 p-2 sm:p-3 rounded-xl border border-slate-100 shadow-inner">
          <div className="grid grid-cols-10 gap-0.5 sm:gap-1 bg-slate-200 border border-slate-200 p-0.5">
            {renderBoard().map((row, r) => 
              row.map((cell, c) => (
                <div 
                  key={`${r}-${c}`} 
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-sm ${cell.color || 'bg-white'}`}
                />
              ))
            )}
          </div>

          {gameOver && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl flex-col gap-4">
              <h2 className="text-3xl font-bold text-slate-900 font-serif">Game Over</h2>
              <p className="text-slate-600 font-medium">Score: {score}</p>
              <button
                onClick={restart}
                className="px-6 py-2.5 bg-indigo-500 text-white rounded-full font-bold hover:bg-indigo-600 transition-colors shadow-md"
              >
                Play Again
              </button>
            </div>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="mt-8 grid grid-cols-3 gap-2 w-full max-w-[240px] mx-auto sm:hidden">
           <div className="col-span-3 flex justify-center mb-2">
             <button onClick={rotatePiece} className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center active:bg-slate-200">
               <RotateCw className="w-6 h-6 text-slate-700" />
             </button>
           </div>
           <button onClick={() => movePiece(0, -1)} className="h-14 bg-slate-100 rounded-xl flex items-center justify-center active:bg-slate-200">
             <ArrowLeft className="w-6 h-6 text-slate-700" />
           </button>
           <button onClick={() => movePiece(1, 0)} className="h-14 bg-slate-100 rounded-xl flex items-center justify-center active:bg-slate-200">
             <ArrowDown className="w-6 h-6 text-slate-700" />
           </button>
           <button onClick={() => movePiece(0, 1)} className="h-14 bg-slate-100 rounded-xl flex items-center justify-center active:bg-slate-200">
             <ArrowRight className="w-6 h-6 text-slate-700" />
           </button>
        </div>
        
        <div className="mt-8 p-4 bg-indigo-50 rounded-xl text-sm text-slate-600 text-left border border-indigo-100 w-full max-w-sm">
          <p className="font-bold text-slate-800 mb-2">How to play:</p>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="font-bold text-indigo-500 min-w-[70px]">Desktop:</span>
              <span>Use <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-xs">←</kbd> <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-xs">→</kbd> to move, <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-xs">↑</kbd> to rotate, and <kbd className="px-3 py-0.5 bg-white border border-slate-200 rounded text-xs">Space</kbd> to drop.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-indigo-500 min-w-[70px]">Mobile:</span>
              <span>Use the buttons below the board to move and rotate the pieces.</span>
            </div>
            <p className="pt-1 border-t border-indigo-100/50">Fill an entire horizontal line with blocks to clear it and score points!</p>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
