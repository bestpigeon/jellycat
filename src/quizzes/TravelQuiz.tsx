import React from "react";
import { MapPin, Share } from "lucide-react";
import { questions, results, BaseResult } from "../data/travelData";
import { QuizTemplate } from "../components/QuizTemplate";

export function TravelQuiz({ onBack }: { onBack: () => void }) {
  return (
    <QuizTemplate<BaseResult>
      quizId="travel"
      title="Dream Destination"
      description="Where should your next cozy trip be? Find the perfect getaway to match your vibe."
      icon={<MapPin className="w-8 h-8" />}
      theme={{
        gradientFrom: "from-sky-50",
        iconBg: "bg-sky-100",
        iconText: "text-sky-500",
        buttonGradient: "from-sky-400 to-blue-500",
        progressBg: "bg-sky-400",
        optionHoverBorder: "hover:border-sky-200",
        optionHoverBg: "hover:bg-sky-50/50",
        optionArrowText: "text-sky-500"
      }}
      questions={questions}
      results={results}
      defaultResultId="italy"
      onBack={onBack}
      resultSubtitle="You should travel to..."
      actionConfig={{
        primaryAction: 'share',
        primaryLabel: 'Share Results',
        primaryIcon: <Share className="w-5 h-5" />,
        bottomRestartText: 'Take Quiz Again'
      }}
    />
  );
}
