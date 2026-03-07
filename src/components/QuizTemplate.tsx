import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RefreshCcw, ArrowRight, Home, Share } from "lucide-react";

export type BaseResult = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
  buttonColor: string;
  link?: string;
};

export type BaseOption = {
  text: string;
  pointsTo: string[];
};

export type BaseQuestion = {
  id: number;
  question: string;
  options: BaseOption[];
};

export type QuizTheme = {
  gradientFrom: string;
  iconBg: string;
  iconText: string;
  buttonGradient: string;
  progressBg: string;
  optionHoverBorder: string;
  optionHoverBg: string;
  optionArrowText: string;
};

type QuizState = "welcome" | "quiz" | "result";

export type QuizTemplateProps<T extends BaseResult> = {
  quizId: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  theme: QuizTheme;
  questions: BaseQuestion[];
  results: Record<string, T>;
  defaultResultId: string;
  onBack: () => void;
  resultSubtitle?: string;
  actionConfig?: {
    primaryAction: 'share' | 'link';
    primaryLabel: string;
    primaryIcon: React.ReactNode;
    secondaryAction?: 'share' | 'restart';
    secondaryLabel?: string;
    secondaryIcon?: React.ReactNode;
    bottomRestartText?: string;
  };
  customResultComponent?: (result: T) => React.ReactNode;
};

export function QuizTemplate<T extends BaseResult>({
  quizId,
  title,
  description,
  icon,
  theme,
  questions,
  results,
  defaultResultId,
  onBack,
  resultSubtitle = "You are a...",
  actionConfig = {
    primaryAction: 'share',
    primaryLabel: 'Share Results',
    primaryIcon: <Share className="w-5 h-5" />,
    bottomRestartText: 'Take Quiz Again'
  },
  customResultComponent,
}: QuizTemplateProps<T>) {
  const [appState, setAppState] = useState<QuizState>(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("result") && results[params.get("result") as string]) {
      return "result";
    }
    return "welcome";
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [finalResult, setFinalResult] = useState<T | null>(() => {
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
    window.history.replaceState({}, '', `?quiz=${quizId}`);
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
    let topId = defaultResultId;
    let maxScore = -1;

    for (const [id, score] of Object.entries(finalScores)) {
      if (score > maxScore) {
        maxScore = score;
        topId = id;
      }
    }

    setFinalResult(results[topId]);
    setAppState("result");
    window.history.replaceState({}, '', `?quiz=${quizId}&result=${topId}`);
  };

  const handleShare = async (result: T) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?quiz=${quizId}`;
    const shareText = `I got ${result.name}! ✨ Take the quiz: ${shareUrl}`;
    
    try {
      await navigator.clipboard.writeText(shareText);
      alert('Results copied to clipboard!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative pt-8 sm:pt-0">
      <AnimatePresence mode="wait">
        {appState === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-sm border border-slate-100 text-center relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b ${theme.gradientFrom} to-transparent opacity-50 pointer-events-none`} />

            <div className="relative z-10">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${theme.iconBg} ${theme.iconText} mb-6`}>
                {icon}
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4 font-serif">
                {title}
              </h1>

              <p className="text-lg text-slate-500 mb-10 max-w-md mx-auto leading-relaxed">
                {description}
              </p>

              <button
                onClick={startQuiz}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-white bg-slate-900 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Quiz <ArrowRight className="w-5 h-5" />
                </span>
                <div className={`absolute inset-0 bg-gradient-to-r ${theme.buttonGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </button>
            </div>
          </motion.div>
        )}

        {appState === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-sm border border-slate-100"
          >
            <div className="mb-8">
              <div className="flex justify-between text-sm font-medium text-slate-400 mb-2 px-1">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${theme.progressBg} rounded-full`}
                  initial={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
                  animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            <div className="mb-10 min-h-[80px] flex items-center">
              <motion.h2
                key={questions[currentQuestionIndex].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl sm:text-3xl font-semibold text-slate-800 leading-tight"
              >
                {questions[currentQuestionIndex].question}
              </motion.h2>
            </div>

            <div className="space-y-3">
              <motion.div
                key={questions[currentQuestionIndex].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, staggerChildren: 0.1 }}
                className="flex flex-col gap-3"
              >
                {questions[currentQuestionIndex].options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => handleOptionSelect(option.pointsTo)}
                    className={`w-full text-left p-5 rounded-2xl border-2 border-slate-100 ${theme.optionHoverBorder} ${theme.optionHoverBg} transition-all duration-200 group flex items-center justify-between`}
                  >
                    <span className="text-lg text-slate-700 group-hover:text-slate-900 font-medium">
                      {option.text}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center ${theme.iconBg} ${theme.iconText} transition-colors opacity-0 group-hover:opacity-100`}>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}

        {appState === "result" && finalResult && (
          <React.Fragment key="result">
            {customResultComponent && customResultComponent(finalResult)}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-sm border border-slate-100 text-center overflow-hidden relative"
            >
              <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20 ${finalResult.color.split(" ")[0]}`} />
              <div className={`absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-20 ${finalResult.color.split(" ")[0]}`} />

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-2 text-sm font-bold tracking-widest text-slate-400 uppercase"
                >
                  {resultSubtitle}
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl sm:text-5xl font-bold text-slate-900 mb-8 font-serif"
                >
                  {finalResult.name}
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  style={{ WebkitTransform: "translateZ(0)", WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
                  className="relative w-56 h-56 mx-auto mb-8 rounded-full overflow-hidden border-8 border-white shadow-xl"
                >
                  <img
                    src={finalResult.imageUrl}
                    alt={finalResult.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover drop-shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black/5 mix-blend-overlay" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className={`p-6 rounded-2xl mb-8 ${finalResult.color}`}
                >
                  <p className="text-lg leading-relaxed font-medium">
                    {finalResult.description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mb-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  {actionConfig.primaryAction === 'link' && finalResult.link ? (
                    <a
                      href={finalResult.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-all w-full sm:w-auto ${finalResult.buttonColor}`}
                    >
                      {actionConfig.primaryLabel}
                      {actionConfig.primaryIcon}
                    </a>
                  ) : actionConfig.primaryAction === 'share' ? (
                    <button
                      onClick={() => handleShare(finalResult)}
                      className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-all w-full sm:w-auto ${finalResult.buttonColor}`}
                    >
                      {actionConfig.primaryIcon}
                      {actionConfig.primaryLabel}
                    </button>
                  ) : null}

                  {actionConfig.secondaryAction === 'share' && (
                    <button
                      onClick={() => handleShare(finalResult)}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 shadow-sm transition-all w-full sm:w-auto"
                    >
                      {actionConfig.secondaryIcon || <Share className="w-5 h-5" />}
                      {actionConfig.secondaryLabel || 'Share Results'}
                    </button>
                  )}
                  
                  {actionConfig.secondaryAction === 'restart' && (
                    <button
                      onClick={startQuiz}
                      className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white shadow-lg transition-all w-full sm:w-auto ${finalResult.buttonColor}`}
                    >
                      {actionConfig.secondaryIcon || <RefreshCcw className="w-5 h-5" />}
                      {actionConfig.secondaryLabel || 'Try Again'}
                    </button>
                  )}
                </motion.div>

                {actionConfig.bottomRestartText && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    onClick={startQuiz}
                    className="inline-flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-slate-900 font-medium transition-colors"
                  >
                    <RefreshCcw className="w-5 h-5" />
                    {actionConfig.bottomRestartText}
                  </motion.button>
                )}
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </div>
  );
}
