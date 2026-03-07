import React from "react";
import { Sparkles } from "lucide-react";
import { questions, results, GhibliResult } from "../data/ghibliData";
import { QuizTemplate } from "../components/QuizTemplate";

export function GhibliQuiz({ onBack }: { onBack: () => void }) {
  return (
    <QuizTemplate<GhibliResult>
      quizId="ghibli"
      title="Which Ghibli World Do You Belong In?"
      description="From the moving castle to the forest spirit's home, discover where your soul truly lives."
      icon={<Sparkles className="w-8 h-8" />}
      theme={{
        gradientFrom: "from-emerald-50",
        iconBg: "bg-emerald-100",
        iconText: "text-emerald-500",
        buttonGradient: "from-emerald-400 to-sky-400",
        progressBg: "bg-emerald-300",
        optionHoverBorder: "hover:border-emerald-200",
        optionHoverBg: "hover:bg-emerald-50/50",
        optionArrowText: "text-emerald-500"
      }}
      questions={questions}
      results={results}
      defaultResultId="totoro"
      onBack={onBack}
      resultSubtitle="Your Destiny Is..."
      actionConfig={{
        primaryAction: 'share',
        primaryLabel: 'Share Result',
        primaryIcon: <Sparkles className="w-5 h-5" />,
        secondaryAction: 'restart',
        secondaryLabel: 'Try Again'
      }}
    />
  );
}
