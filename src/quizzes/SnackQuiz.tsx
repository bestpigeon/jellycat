import React from "react";
import { Pizza, Share } from "lucide-react";
import { questions, results, BaseResult } from "../data/snackData";
import { QuizTemplate } from "../components/QuizTemplate";

export function SnackQuiz({ onBack }: { onBack: () => void }) {
  return (
    <QuizTemplate<BaseResult>
      quizId="snack"
      title="What Snack Are You?"
      description="Are you crunchy, sweet, or perfectly salty? Discover your ultimate snack twin."
      icon={<Pizza className="w-8 h-8" />}
      theme={{
        gradientFrom: "from-orange-50",
        iconBg: "bg-orange-100",
        iconText: "text-orange-500",
        buttonGradient: "from-orange-400 to-red-400",
        progressBg: "bg-orange-400",
        optionHoverBorder: "hover:border-orange-200",
        optionHoverBg: "hover:bg-orange-50/50",
        optionArrowText: "text-orange-500"
      }}
      questions={questions}
      results={results}
      defaultResultId="chips"
      onBack={onBack}
      resultSubtitle="Your snack vibe is..."
      actionConfig={{
        primaryAction: 'share',
        primaryLabel: 'Share Results',
        primaryIcon: <Share className="w-5 h-5" />,
        bottomRestartText: 'Take Quiz Again'
      }}
    />
  );
}
