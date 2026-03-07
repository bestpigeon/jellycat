import React from "react";
import { Coffee, Share } from "lucide-react";
import { questions, results, CoffeeResult } from "../data/coffeeData";
import { QuizTemplate } from "../components/QuizTemplate";

export function CoffeeQuiz({ onBack }: { onBack: () => void }) {
  return (
    <QuizTemplate<CoffeeResult>
      quizId="coffee"
      title="Your Coffee Order Personality"
      description="Are you a no-nonsense black coffee, a comforting latte, or a trendy iced caramel macchiato? Find out what your brew says about you!"
      icon={<Coffee className="w-8 h-8" />}
      theme={{
        gradientFrom: "from-amber-50",
        iconBg: "bg-amber-100",
        iconText: "text-amber-600",
        buttonGradient: "from-amber-400 to-orange-400",
        progressBg: "bg-amber-300",
        optionHoverBorder: "hover:border-amber-200",
        optionHoverBg: "hover:bg-amber-50/50",
        optionArrowText: "text-amber-600"
      }}
      questions={questions}
      results={results}
      defaultResultId="latte"
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
