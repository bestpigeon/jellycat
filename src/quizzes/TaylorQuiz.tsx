import React from "react";
import { Music, Share } from "lucide-react";
import { questions, results, QuizResult } from "../data/taylorData";
import { QuizTemplate } from "../components/QuizTemplate";

export function TaylorQuiz({ onBack }: { onBack: () => void }) {
  return (
    <QuizTemplate<QuizResult>
      quizId="taylor"
      title="Which Taylor Swift Era Are You?"
      description="Are you a poetic folklore soul, a chaotic reputation baddie, or a glittery 1989 pop icon? Find your true era."
      icon={<Music className="w-8 h-8" />}
      theme={{
        gradientFrom: "from-purple-50",
        iconBg: "bg-purple-100",
        iconText: "text-purple-600",
        buttonGradient: "from-purple-400 to-indigo-400",
        progressBg: "bg-purple-400",
        optionHoverBorder: "hover:border-purple-200",
        optionHoverBg: "hover:bg-purple-50/50",
        optionArrowText: "text-purple-600"
      }}
      questions={questions}
      results={results}
      defaultResultId={Object.keys(results)[0]}
      onBack={onBack}
      resultSubtitle="You are in your..."
      actionConfig={{
        primaryAction: 'share',
        primaryLabel: 'Share Results',
        primaryIcon: <Share className="w-5 h-5" />,
        bottomRestartText: 'Take Quiz Again'
      }}
    />
  );
}
