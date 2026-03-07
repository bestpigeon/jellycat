import React from "react";
import { Music, Share } from "lucide-react";
import { questions, results, BaseResult } from "../data/blackpinkData";
import { QuizTemplate } from "../components/QuizTemplate";

export function BlackpinkQuiz({ onBack }: { onBack: () => void }) {
  return (
    <QuizTemplate<BaseResult>
      quizId="blackpink"
      title="Which Blackpink Member Are You?"
      description="Are you the elegant Jisoo, the fierce Jennie, the soulful Rosé, or the energetic Lisa? Find your Blackpink twin!"
      icon={<Music className="w-8 h-8" />}
      theme={{
        gradientFrom: "from-pink-50",
        iconBg: "bg-pink-100",
        iconText: "text-pink-500",
        buttonGradient: "from-pink-400 to-rose-500",
        progressBg: "bg-pink-400",
        optionHoverBorder: "hover:border-pink-200",
        optionHoverBg: "hover:bg-pink-50/50",
        optionArrowText: "text-pink-500"
      }}
      questions={questions}
      results={results}
      defaultResultId="jisoo"
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
