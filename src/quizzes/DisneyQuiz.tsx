import React from "react";
import { Stars, Share } from "lucide-react";
import { questions, results, BaseResult } from "../data/disneyData";
import { QuizTemplate } from "../components/QuizTemplate";

export function DisneyQuiz({ onBack }: { onBack: () => void }) {
  return (
    <QuizTemplate<BaseResult>
      quizId="disney"
      title="Your Disney Royal Vibe"
      description="Which princess's story matches your life right now? Discover your royal destiny."
      icon={<Stars className="w-8 h-8" />}
      theme={{
        gradientFrom: "from-amber-50",
        iconBg: "bg-amber-100",
        iconText: "text-amber-500",
        buttonGradient: "from-amber-400 to-yellow-500",
        progressBg: "bg-amber-400",
        optionHoverBorder: "hover:border-amber-200",
        optionHoverBg: "hover:bg-amber-50/50",
        optionArrowText: "text-amber-500"
      }}
      questions={questions}
      results={results}
      defaultResultId="cinderella"
      onBack={onBack}
      resultSubtitle="You are..."
      actionConfig={{
        primaryAction: 'share',
        primaryLabel: 'Share Results',
        primaryIcon: <Share className="w-5 h-5" />,
        bottomRestartText: 'Take Quiz Again'
      }}
    />
  );
}
