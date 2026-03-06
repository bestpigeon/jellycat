import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, RefreshCcw, ArrowRight, Home, Music, Share } from "lucide-react";
import { questions, results, TaylorResult } from "../data/taylorData";

type QuizState = "welcome" | "quiz" | "result";

export function TaylorQuiz({ onBack }: { onBack: () => void }) {
  const [appState, setAppState] = useState<QuizState>(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("result") && results[params.get("result") as string]) {
      return "result";
    }
    return "welcome";
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [finalResult, setFinalResult] = useState<TaylorResult | null>(() => {
    const params = new URLSearchParams(window.location.search);
    const resultId = params.get("result");
    if (resultId && results[resultId]) {
      return results[resultId];
    }
    return null;
  });

  const startQuiz = () => {
    setAppState("quiz");
    setCurrentQuestionIndex(0);
    setScores({});
    setFinalResult(null);
    window.history.replaceState({}, '', `?quiz=taylor`);
  };

  const handleOptionSelect = (pointsTo: string[]) => {
    const newScores = { ...scores };
    for (const id of pointsTo) {
      newScores[id] = (newScores[id] || 0) + 1;
    }
    setScores(newScores);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores: Record<string, number>) => {
    let topId = "pop_1989"; // default
    let maxScore = -1;

    for (const [id, score] of Object.entries(finalScores)) {
      if (score > maxScore) {
        maxScore = score;
        topId = id;
      }
    }

    setFinalResult(results[topId]);
    setAppState("result");
    window.history.replaceState({}, '', `?quiz=taylor&result=${topId}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative pt-12 sm:pt-0">
      <button 
        onClick={onBack}
        className="absolute top-0 sm:-top-16 left-0 flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium z-50"
      >
        <Home className="w-4 h-4" />
        Back to Quizzes
      </button>
      
      <AnimatePresence mode="wait">
        {appState === "welcome" && (
          <WelcomeScreen key="welcome" onStart={startQuiz} />
        )}
        {appState === "quiz" && (
          <QuizScreen
            key="quiz"
            questionIndex={currentQuestionIndex}
            onSelect={handleOptionSelect}
          />
        )}
        {appState === "result" && finalResult && (
          <ResultScreen
            key="result"
            result={finalResult}
            onRestart={startQuiz}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function WelcomeScreen({ onStart }: { onStart: () => void; key?: React.Key }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-sm border border-slate-100 text-center relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-100 to-transparent opacity-50 pointer-events-none" />

      <div className="relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-700 mb-6">
          <Music className="w-8 h-8" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4 font-serif">
          Which Taylor Swift Era Are You?
        </h1>

        <p className="text-lg text-slate-500 mb-10 max-w-md mx-auto leading-relaxed">
          Are you a poetic Folklore soul, a fierce Reputation baddie, or a hopeless romantic Lover? Find your era.
        </p>

        <button
          onClick={onStart}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-white bg-slate-900 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
        >
          <span className="relative z-10 flex items-center gap-2">
            Start Quiz <Sparkles className="w-5 h-5" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />