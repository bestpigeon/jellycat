import React, { useEffect } from "react";
import { motion } from "motion/react";
import { Home, Palette } from "lucide-react";

export function PixelArtGame({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    window.history.replaceState({}, '', `?quiz=pixelart`);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto relative pt-12 sm:pt-0">
      <button 
        onClick={onBack}
        className="absolute top-0 sm:-top-16 left-0 flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium z-50"
      >
        <Home className="w-4 h-4" />
        Back to Games
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-sm border border-slate-100 text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-pink-500 mb-6">
          <Palette className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4 font-serif">
          Pixel Art Puzzle
        </h1>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          The canvas is being prepared. Soon you'll be able to reveal hidden pictures through logic!
        </p>
        <div className="grid grid-cols-8 gap-1 mb-8 max-w-[240px] mx-auto">
          {Array.from({ length: 64 }).map((_, i) => (
            <div 
              key={i} 
              className={`aspect-square rounded-sm ${Math.random() > 0.5 ? 'bg-pink-100' : 'bg-slate-100'}`} 
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
