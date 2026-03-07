import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles, Heart, Gamepad2, Coffee, Stars, Flame } from "lucide-react";
import { HomeScreen } from "./components/HomeScreen";
import { JellycatQuiz } from "./quizzes/JellycatQuiz";
import { CoffeeQuiz } from "./quizzes/CoffeeQuiz";
import { AuraQuiz } from "./quizzes/AuraQuiz";
import { TaylorQuiz } from "./quizzes/TaylorQuiz";
import { WordleGame } from "./quizzes/WordleGame";
import { GhibliQuiz } from "./quizzes/GhibliQuiz";
import { HouseplantQuiz } from "./quizzes/HouseplantQuiz";
import { DisneyQuiz } from "./quizzes/DisneyQuiz";
import { MarvelQuiz } from "./quizzes/MarvelQuiz";
import { TravelQuiz } from "./quizzes/TravelQuiz";
import { SnackQuiz } from "./quizzes/SnackQuiz";
import { SudokuGame } from "./quizzes/SudokuGame";
import { MemoryMatch } from "./quizzes/MemoryMatch";
import { MushroomMatchGame } from "./quizzes/MushroomMatchGame";
import { MusicPlayer } from "./components/MusicPlayer";

type MainViewState = 
  | "home" | "jellycat" | "coffee" | "aura" | "taylor" | "wordle" 
  | "ghibli" | "houseplant" | "disney" | "marvel" 
  | "travel" | "snack" | "sudoku" | "memory" | "mushroom";

export default function App() {
  const [currentView, setCurrentView] = useState<MainViewState>("home");

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-rose-200 flex flex-col">
      {/* Universal Top Banner */}
      <header className="sticky top-0 z-[100] w-full bg-white/80 backdrop-blur-md border-b border-rose-100 shadow-sm px-6 py-4 flex items-center justify-center overflow-hidden">
        {/* Floating Decorative Icons in Banner */}
        <div className="absolute inset-0 pointer-events-none opacity-20 hidden sm:block">
          <motion.div animate={{ y: [0, -4, 0], rotate: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-2 left-[10%] text-rose-400">
            <Heart className="w-5 h-5 fill-current" />
          </motion.div>
          <motion.div animate={{ y: [0, 4, 0], rotate: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-1 left-[25%] text-orange-400">
            <Flame className="w-5 h-5 fill-current" />
          </motion.div>
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute top-3 right-[15%] text-amber-500">
            <Stars className="w-6 h-6" />
          </motion.div>
          <motion.div animate={{ y: [0, -5, 0], rotate: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-2 right-[30%] text-indigo-400">
            <Gamepad2 className="w-5 h-5" />
          </motion.div>
          <motion.div animate={{ y: [0, 3, 0], rotate: [0, 15, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-2 right-[5%] text-sky-400">
            <Coffee className="w-4 h-4" />
          </motion.div>
        </div>

        <button 
          onClick={() => setCurrentView("home")}
          className="relative z-10 group flex items-center gap-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-serif hover:opacity-80 transition-opacity"
        >
          <Sparkles className="w-6 h-6 text-rose-500 group-hover:animate-pulse" />
          <span>Cozy <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">Games</span></span>
        </button>
      </header>

      <div className="flex-grow flex items-start justify-center p-4 sm:p-8 pt-8 sm:pt-12">
        <div className="w-full max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {currentView === "home" && (
              <HomeScreen key="home" onSelectQuiz={(id) => setCurrentView(id as MainViewState)} />
            )}
            {currentView === "jellycat" && (
              <JellycatQuiz key="jellycat" onBack={() => setCurrentView("home")} />
            )}
            {currentView === "coffee" && (
              <CoffeeQuiz key="coffee" onBack={() => setCurrentView("home")} />
            )}
            {currentView === "aura" && (
              <AuraQuiz key="aura" onBack={() => setCurrentView("home")} />
            )}
            {currentView === "taylor" && (
              <TaylorQuiz key="taylor" onBack={() => setCurrentView("home")} />
            )}
            {currentView === "wordle" && (
              <WordleGame key="wordle" onBack={() => setCurrentView("home")} />
            )}
            {currentView === "ghibli" && (
              <GhibliQuiz key="ghibli" onBack={() => setCurrentView("home")} />
            )}
            {currentView === "houseplant" && (
              <HouseplantQuiz key="houseplant" onBack={() => setCurrentView("home")} />
            )}
            {currentView === "disney" && (
              <DisneyQuiz key="disney" onBack={() => setCurrentView("home")} />
            )}
            {currentView === "marvel" && (
              <MarvelQuiz key="marvel" onBack={() => setCurrentView("home")} />
            )}
            {currentView === "travel" && (
              <TravelQuiz key="travel" onBack={() => setCurrentView("home")} />
            )}
            {currentView === "snack" && (
              <SnackQuiz key="snack" onBack={() => setCurrentView("home")} />
            )}
            {currentView === "sudoku" && (
              <SudokuGame key="sudoku" onBack={() => setCurrentView("home")} />
            )}
            {currentView === "memory" && (
              <MemoryMatch key="memory" onBack={() => setCurrentView("home")} />
            )}
            {currentView === "mushroom" && (
              <MushroomMatchGame key="mushroom" />
            )}
          </AnimatePresence>
        </div>
      </div>
      <MusicPlayer />
    </div>
  );
}