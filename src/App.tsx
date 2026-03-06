import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import { HomeScreen } from "./components/HomeScreen";
import { JellycatQuiz } from "./quizzes/JellycatQuiz";

type MainViewState = "home" | "jellycat";

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
        </AnimatePresence>
      </div>
    </div>
  );
}


