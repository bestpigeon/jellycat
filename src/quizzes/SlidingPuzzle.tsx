import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useDragControls } from "motion/react";
import { Home, RefreshCcw, Trophy, Puzzle, ArrowRight } from "lucide-react";

const GRID_SIZE = 6;
const CELL_SIZE = 50; // px

type Direction = "h" | "v";

interface Block {
  id: string;
  r: number;
  c: number;
  len: number;
  dir: Direction;
  color: string;
}

const LEVELS: Block[][] = [
  // Level 1: Easy
  [
    { id: "target", r: 2, c: 0, len: 2, dir: "h", color: "bg-rose-500" },
    { id: "v1", r: 0, c: 2, len: 2, dir: "v", color: "bg-slate-300" },
    { id: "v2", r: 0, c: 5, len: 3, dir: "v", color: "bg-slate-300" },
    { id: "h1", r: 3, c: 2, len: 2, dir: "h", color: "bg-slate-300" },
    { id: "h2", r: 5, c: 2, len: 3, dir: "h", color: "bg-slate-300" },
    { id: "v3", r: 3, c: 4, len: 2, dir: "v", color: "bg-slate-300" },
    { id: "v4", r: 4, c: 0, len: 2, dir: "v", color: "bg-slate-300" },
  ],
  // Level 2: Medium
  [
    { id: "target", r: 2, c: 1, len: 2, dir: "h", color: "bg-rose-500" },
    { id: "v1", r: 0, c: 0, len: 3, dir: "v", color: "bg-slate-300" },
    { id: "v2", r: 0, c: 3, len: 2, dir: "v", color: "bg-slate-300" },
    { id: "v3", r: 0, c: 4, len: 3, dir: "v", color: "bg-slate-300" },
    { id: "v4", r: 0, c: 5, len: 2, dir: "v", color: "bg-slate-300" },
    { id: "h1", r: 3, c: 1, len: 2, dir: "h", color: "bg-slate-300" },
    { id: "h2", r: 4, c: 1, len: 2, dir: "h", color: "bg-slate-300" },
    { id: "v5", r: 3, c: 3, len: 3, dir: "v", color: "bg-slate-300" },
    { id: "h3", r: 5, c: 4, len: 2, dir: "h", color: "bg-slate-300" },
  ],
  // Level 3: Hard
  [
    { id: "target", r: 2, c: 0, len: 2, dir: "h", color: "bg-rose-500" },
    { id: "v1", r: 0, c: 2, len: 2, dir: "v", color: "bg-slate-300" },
    { id: "v2", r: 0, c: 3, len: 3, dir: "v", color: "bg-slate-300" },
    { id: "h1", r: 0, c: 4, len: 2, dir: "h", color: "bg-slate-300" },
    { id: "v3", r: 1, c: 4, len: 2, dir: "v", color: "bg-slate-300" },
    { id: "v4", r: 1, c: 5, len: 3, dir: "v", color: "bg-slate-300" },
    { id: "h2", r: 3, c: 0, len: 2, dir: "h", color: "bg-slate-300" },
    { id: "h3", r: 3, c: 3, len: 2, dir: "h", color: "bg-slate-300" },
    { id: "v5", r: 4, c: 2, len: 2, dir: "v", color: "bg-slate-300" },
    { id: "h4", r: 5, c: 3, len: 3, dir: "h", color: "bg-slate-300" },
  ]
];

export function SlidingPuzzle({ onBack }: { onBack: () => void }) {
  const [levelIndex, setLevelIndex] = useState(0);
  const [blocks, setBlocks] = useState<Block[]>(() => LEVELS[0].map(b => ({ ...b })));
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.history.replaceState({}, '', `?quiz=sliding-puzzle`);
  }, []);

  const initializeGame = (idx: number = levelIndex) => {
    setBlocks(LEVELS[idx].map(b => ({ ...b })));
    setMoves(0);
    setIsWon(false);
    setLevelIndex(idx);
  };

  const nextLevel = () => {
    const nextIdx = (levelIndex + 1) % LEVELS.length;
    initializeGame(nextIdx);
  };

  const isSpaceOccupied = (r: number, c: number, excludeId: string, currentBlocks: Block[]) => {
    // Exit path for target block
    if (excludeId === "target" && r === 2 && c === 6) return false;
    
    if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) return true;
    
    return currentBlocks.some(b => {
      if (b.id === excludeId) return false;
      if (b.dir === "h") {
        return b.r === r && c >= b.c && c < b.c + b.len;
      } else {
        return b.c === c && r >= b.r && r < b.r + b.len;
      }
    });
  };

  const moveBlock = (id: string, dr: number, dc: number) => {
    if (isWon) return;

    setBlocks(prev => {
      const block = prev.find(b => b.id === id);
      if (!block) return prev;

      const newR = block.r + dr;
      const newC = block.c + dc;

      // Check all cells of the block at its new proposed position
      for (let i = 0; i < block.len; i++) {
        const checkR = block.dir === "v" ? newR + i : newR;
        const checkC = block.dir === "h" ? newC + i : newC;
        if (isSpaceOccupied(checkR, checkC, id, prev)) return prev;
      }

      const newBlocks = prev.map(b => b.id === id ? { ...b, r: newR, c: newC } : b);
      
      if (id === "target" && newC === 5) {
         setIsWon(true);
      }

      setMoves(m => m + 1);
      return newBlocks;
    });
  };

  return (
    <div className="w-full max-w-md mx-auto relative pt-8 sm:pt-0 isolate">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-sm border border-slate-100 flex flex-col items-center"
      >
        <div className="flex items-center justify-between w-full mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <Puzzle className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif leading-tight">Unblock Me</h1>
              <div className="flex gap-2 text-xs font-bold uppercase tracking-wider">
                <span className="text-rose-500">Level {levelIndex + 1}</span>
                <span className="text-slate-400">Moves: {moves}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => initializeGame()}
            className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>

        <div 
          ref={containerRef}
          className="relative bg-amber-50 border-4 border-amber-200 rounded-xl shadow-inner overflow-visible"
          style={{ 
            width: GRID_SIZE * CELL_SIZE + 8, 
            height: GRID_SIZE * CELL_SIZE + 8,
          }}
        >
          {/* Grid Background */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none opacity-20">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="border border-amber-900/20" />
            ))}
          </div>

          {/* Exit Indicator */}
          <div className="absolute -right-10 top-[104px] text-rose-400 animate-pulse">
            <ArrowRight className="w-8 h-8" />
          </div>

          {/* Blocks */}
          {blocks.map((block) => (
            <motion.div
              key={block.id}
              initial={false}
              animate={{
                left: block.c * CELL_SIZE + 4,
                top: block.r * CELL_SIZE + 4,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`absolute cursor-pointer rounded-lg shadow-md flex items-center justify-center border-b-4 border-black/10 select-none ${block.color}`}
              style={{
                width: (block.dir === "h" ? block.len : 1) * CELL_SIZE - 4,
                height: (block.dir === "v" ? block.len : 1) * CELL_SIZE - 4,
                touchAction: "none"
              }}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                if (block.dir === "h") {
                  if (x < rect.width / 2) moveBlock(block.id, 0, -1);
                  else moveBlock(block.id, 0, 1);
                } else {
                  if (y < rect.height / 2) moveBlock(block.id, -1, 0);
                  else moveBlock(block.id, 1, 0);
                }
              }}
            >
              {block.id === "target" && <span className="text-white font-bold text-[10px] uppercase tracking-tighter">Exit</span>}
            </motion.div>
          ))}

          <AnimatePresence>
            {isWon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-xl flex-col gap-4 text-center p-6"
              >
                <div className="w-16 h-16 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mb-2">
                  <Trophy className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 font-serif">Level Complete!</h2>
                <p className="text-slate-600 font-medium">Solved in {moves} moves.</p>
                <button
                  onClick={nextLevel}
                  className="px-8 py-3 bg-rose-500 text-white rounded-full font-bold hover:bg-rose-600 transition-all shadow-md active:scale-95"
                >
                  {levelIndex === LEVELS.length - 1 ? "Play Again" : "Next Level"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 p-4 bg-rose-50 rounded-xl text-xs text-slate-600 text-left border border-rose-100 w-full max-w-sm">
          <p className="font-bold text-slate-800 mb-1">How to play:</p>
          <p>Tap the ends of a block to slide it. Move the <span className="text-rose-600 font-bold">Red Block</span> to the exit on the right to escape!</p>
        </div>
      </motion.div>
    </div>
  );
}
