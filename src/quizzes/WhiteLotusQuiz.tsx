import React from "react";
import { Music } from "lucide-react";
import { questions, results, WhiteLotusResult } from "../data/whitelotusData";
import { QuizTemplate } from "../components/QuizTemplate";

export function WhiteLotusQuiz({ onBack }: { onBack: () => void }) {
  return (
    <QuizTemplate<WhiteLotusResult>
      quizId="whitelotus"
      title="Which White Lotus Character Are You?"
      description="Are you the iconic Tanya, the cynical Harper, or the sharp Lucia? Find out your luxury resort persona."
      icon={<Music className="w-8 h-8" />}
      theme={{
        gradientFrom: "from-fuchsia-50",
        iconBg: "bg-fuchsia-100",
        iconText: "text-fuchsia-500",
        buttonGradient: "from-fuchsia-400 to-rose-400",
        progressBg: "bg-fuchsia-300",
        optionHoverBorder: "hover:border-fuchsia-200",
        optionHoverBg: "hover:bg-fuchsia-50/50",
        optionArrowText: "text-fuchsia-500"
      }}
      questions={questions}
      results={results}
      defaultResultId="tanya"
      onBack={onBack}
      resultSubtitle="You Are..."
      actionConfig={{
        primaryAction: 'share',
        primaryLabel: 'Share Result',
        primaryIcon: <Music className="w-5 h-5" />,
        secondaryAction: 'restart',
        secondaryLabel: 'Try Again'
      }}
    />
  );
}
