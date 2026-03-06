import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, RefreshCcw, ArrowRight, Home, Coffee, Share } from "lucide-react";
import { questions, results, CoffeeResult } from "../data/coffeeData";

type QuizState = "welcome" | "quiz" | "result";

export function CoffeeQuiz({ onBack }: { onBack: () => void }) {
  const [appState, setAppState] = useState<QuizState>("welcome");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [finalResult, setFinalResult] = useState<CoffeeResult | null>(null);

  const startQuiz = () => {
    setAppState("quiz");
    setCurrentQuestionIndex(0);
    setScores({});
    setFinalResult(null);
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
    let topId = "latte"; // default
    let maxScore = -1;

    for (const [id, score] of Object.entries(finalScores)) {
      if (score > maxScore) {
        maxScore = score;
        topId = id;
      }
    }

    setFinalResult(results[topId]);
    setAppState("result");
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
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-amber-50 to-transparent opacity-50 pointer-events-none" />

      <div className="relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mb-6">
          <Coffee className="w-8 h-8" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4 font-serif">
          Your Coffee Order Personality
        </h1>

        <p className="text-lg text-slate-500 mb-10 max-w-md mx-auto leading-relaxed">
          Are you a no-nonsense black coffee, a comforting latte, or a trendy iced caramel macchiato? Find out what your brew says about you!
        </p>

        <button
          onClick={onStart}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-white bg-slate-900 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
        >
          <span className="relative z-10 flex items-center gap-2">
            Start Quiz <Sparkles className="w-5 h-5" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </motion.div>
  );
}

function QuizScreen({
  questionIndex,
  onSelect,
}: {
  questionIndex: number;
  onSelect: (pointsTo: string[]) => void;
  key?: React.Key;
}) {
  const question = questions[questionIndex];
  const progress = ((questionIndex + 1) / questions.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-sm border border-slate-100"
    >
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-slate-400 mb-2 px-1">
          <span>
            Question {questionIndex + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-amber-300 rounded-full"
            initial={{ width: `${(questionIndex / questions.length) * 100}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-10 min-h-[80px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={question.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-2xl sm:text-3xl font-semibold text-slate-800 leading-tight"
          >
            {question.question}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Options */}
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, staggerChildren: 0.1 }}
            className="flex flex-col gap-3"
          >
            {question.options.map((option, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => onSelect(option.pointsTo)}
                className="w-full text-left p-5 rounded-2xl border-2 border-slate-100 hover:border-amber-200 hover:bg-amber-50/50 transition-all duration-200 group flex items-center justify-between"
              >
                <span className="text-lg text-slate-700 group-hover:text-slate-900 font-medium">
                  {option.text}
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ResultScreen({
  result,
  onRestart,
}: {
  result: CoffeeResult;
  onRestart: () => void;
  key?: React.Key;
}) {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Coffee Personality',
          text: `I took the quiz and my coffee personality is ${result.name}! Find out yours!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-sm border border-slate-100 text-center overflow-hidden relative"
    >
      <div
        className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20 ${result.color.split(" ")[0]}`}
      />
      <div
        className={`absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-20 ${result.color.split(" ")[0]}`}
      />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-2 text-sm font-bold tracking-widest text-slate-400 uppercase"
        >
          You are a...
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl sm:text-5xl font-bold text-slate-900 mb-8 font-serif"
        >
          {result.name}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1.2 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-8 border-white shadow-xl"
        >
          <img
            src={result.imageUrl}
            alt={result.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover drop-shadow-lg"
          />
          <div className="absolute inset-0 bg-black/5 mix-blend-overlay" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`p-6 rounded-2xl mb-8 ${result.color}`}
        >
          <p className="text-lg leading-relaxed font-medium">
            {result.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handleShare}
            className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 w-full sm:w-auto ${result.buttonColor}`}
          >
            <Share className="w-5 h-5" />
            Share Results
          </button>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-slate-900 font-medium transition-colors"
        >
          <RefreshCcw className="w-5 h-5" />
          Take Quiz Again
        </motion.button>
      </div>
    </motion.div>
  );
}
