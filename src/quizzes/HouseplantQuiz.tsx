import React from "react";
import { TreePine, Share } from "lucide-react";
import { questions, results, BaseResult } from "../data/houseplantData";
import { QuizTemplate } from "../components/QuizTemplate";

export function HouseplantQuiz({ onBack }: { onBack: () => void }) {
  return (
    <QuizTemplate<BaseResult>
      quizId="houseplant"
      title="What Houseplant Are You?"
      description="Are you a dramatic Monstera, a resilient Pothos, or a low-maintenance Succulent? Find out your botanical twin!"
      icon={<TreePine className="w-8 h-8" />}
      theme={{
        gradientFrom: "from-emerald-50",
        iconBg: "bg-emerald-100",
        iconText: "text-emerald-500",
        buttonGradient: "from-emerald-400 to-lime-500",
        progressBg: "bg-emerald-400",
        optionHoverBorder: "hover:border-emerald-200",
        optionHoverBg: "hover:bg-emerald-50/50",
        optionArrowText: "text-emerald-500"
      }}
      questions={questions}
      results={results}
      defaultResultId="pothos"
      onBack={onBack}
      resultSubtitle="You are a..."
      actionConfig={{
        primaryAction: 'share',
        primaryLabel: 'Share Results',
        primaryIcon: <Share className="w-5 h-5" />,
        bottomRestartText: 'Take Quiz Again'
      }}
    />
  );
}
