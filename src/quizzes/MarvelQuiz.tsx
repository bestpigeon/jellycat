import React from "react";
import { Flame, Share } from "lucide-react";
import { questions, results, BaseResult } from "../data/marvelData";
import { QuizTemplate } from "../components/QuizTemplate";

export function MarvelQuiz({ onBack }: { onBack: () => void }) {
  return (
    <QuizTemplate<BaseResult>
      quizId="marvel"
      title="Marvel Super Soul"
      description="Are you a natural leader like Cap or a brilliant inventor like Tony? Find out which Avenger matches your personality."
      icon={<Flame className="w-8 h-8" />}
      theme={{
        gradientFrom: "from-red-50",
        iconBg: "bg-red-100",
        iconText: "text-red-600",
        buttonGradient: "from-red-500 to-red-700",
        progressBg: "bg-red-500",
        optionHoverBorder: "hover:border-red-200",
        optionHoverBg: "hover:bg-red-50/50",
        optionArrowText: "text-red-600"
      }}
      questions={questions}
      results={results}
      defaultResultId="cap"
      onBack={onBack}
      resultSubtitle="Your hero identity is..."
      actionConfig={{
        primaryAction: 'share',
        primaryLabel: 'Share Results',
        primaryIcon: <Share className="w-5 h-5" />,
        bottomRestartText: 'Take Quiz Again'
      }}
    />
  );
}
