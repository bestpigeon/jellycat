import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import { HomeScreen } from "./components/HomeScreen";
import { JellycatQuiz } from "./quizzes/JellycatQuiz";
import { CoffeeQuiz } from "./quizzes/CoffeeQuiz";
import { AuraQuiz } from "./quizzes/AuraQuiz";
import { TaylorQuiz } from "./quizzes/TaylorQuiz";
import { WordleGame } from "./quizzes/WordleGame";
import { GhibliQuiz } from "./quizzes/GhibliQuiz";
import { WhiteLotusQuiz } from "./quizzes/WhiteLotusQuiz";
import { HouseplantQuiz } from "./quizzes/HouseplantQuiz";
import { DisneyQuiz } from "./quizzes/DisneyQuiz";
import { MarvelQuiz } from "./quizzes/MarvelQuiz";
import { TravelQuiz } from "./quizzes/TravelQuiz";
import { SnackQuiz } from "./quizzes/SnackQuiz";
import { ConnectionsGame } from "./quizzes/ConnectionsGame";
import { PixelArtGame } from "./quizzes/PixelArtGame";

type MainViewState = 
  | "home" | "jellycat" | "coffee" | "aura" | "taylor" | "wordle" 
  | "ghibli" | "whitelotus" | "houseplant" | "disney" | "marvel" 
  | "travel" | "snack" | "connections" | "pixelart";

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
          {currentView === "wordle" && (
            <WordleGame key="wordle" onBack={() => setCurrentView("home")} />
          )}
          {currentView === "ghibli" && (
            <GhibliQuiz key="ghibli" onBack={() => setCurrentView("home")} />
          )}
          {currentView === "whitelotus" && (
            <WhiteLotusQuiz key="whitelotus" onBack={() => setCurrentView("home")} />
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
          {currentView === "connections" && (
            <ConnectionsGame key="connections" onBack={() => setCurrentView("home")} />
          )}
          {currentView === "pixelart" && (
            <PixelArtGame key="pixelart" onBack={() => setCurrentView("home")} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}