import React, { useEffect } from "react";
import { motion } from "motion/react";
import { Home, Gamepad2 } from "lucide-react";

export function ConnectionsGame({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    window.history.replaceState({}, '', `?quiz=connections`);
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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-500 mb-6">
          <Gamepad2 className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4 font-serif">
          Connections
        </h1>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          We're busy building the logic for this game! Check back soon for the full interactive puzzle experience.
        </p>
        <div className="grid grid-cols-4 gap-2 mb-8">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="aspect-square bg-slate-100 rounded-lg animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
