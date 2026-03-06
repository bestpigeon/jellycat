import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import { HomeScreen } from "./components/HomeScreen";
import { JellycatQuiz } from "./quizzes/JellycatQuiz";
import { CoffeeQuiz } from "./quizzes/CoffeeQuiz";
import { AuraQuiz } from "./quizzes/AuraQuiz";
import { TaylorQuiz } from "./quizzes/TaylorQuiz";


// Added "aura" to the allowed view states
type MainViewState = "home" | "jellycat" | "coffee" | "aura";

export default function App() {
  const [currentView, setCurrentView] = useState<MainViewState>("home");

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-rose-200 flex items-center justify-center p-4 sm:p-8">
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
        </AnimatePresence>
      </div>
    </div>
  );
}