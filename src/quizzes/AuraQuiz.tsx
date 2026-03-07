import React from "react";
import { Flame, Share } from "lucide-react";
import { questions, results, AuraResult } from "../data/auraData"; 
import { QuizTemplate } from "../components/QuizTemplate";

export function AuraQuiz({ onBack }: { onBack: () => void }) {
  return (
    <QuizTemplate<AuraResult>
      quizId="aura"
      title="What's Your Aura Color?"
      description="Are you a passionate Red, a calming Blue, or a mystic Purple? Discover the specific energy you project to the world!"
      icon={<Flame className="w-8 h-8" />}
      theme={{
        gradientFrom: "from-purple-50",
        iconBg: "bg-purple-100",
        iconText: "text-purple-600",
        buttonGradient: "from-purple-400 to-indigo-500",
        progressBg: "bg-purple-400",
        optionHoverBorder: "hover:border-purple-200",
        optionHoverBg: "hover:bg-purple-50/50",
        optionArrowText: "text-purple-600"
      }}
      questions={questions}
      results={results}
      defaultResultId="blue"
      onBack={onBack}
      resultSubtitle="Your aura is..."
      actionConfig={{
        primaryAction: 'share',
        primaryLabel: 'Share Results',
        primaryIcon: <Share className="w-5 h-5" />,
        bottomRestartText: 'Take Quiz Again'
      }}
    />
  );
}
