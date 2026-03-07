import React, { useState } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { questions, results, JellycatResult } from "../data/jellycatData";
import { QuizTemplate } from "../components/QuizTemplate";

export function JellycatQuiz({ onBack }: { onBack: () => void }) {
  return (
    <QuizTemplate<JellycatResult>
      quizId="jellycat"
      title="Which Jellycat Are You?"
      description="Are you a grumpy frog, a sleepy bear, or a free-spirited bird? Take this 5-question quiz to find your plushie soulmate."
      icon={<Heart className="w-8 h-8 fill-current" />}
      theme={{
        gradientFrom: "from-rose-50",
        iconBg: "bg-rose-100",
        iconText: "text-rose-500",
        buttonGradient: "from-rose-400 to-orange-400",
        progressBg: "bg-rose-300",
        optionHoverBorder: "hover:border-rose-200",
        optionHoverBg: "hover:bg-rose-50/50",
        optionArrowText: "text-rose-500"
      }}
      questions={questions}
      results={results}
      defaultResultId="bunny"
      onBack={onBack}
      resultSubtitle="You are a..."
      actionConfig={{
        primaryAction: 'link',
        primaryLabel: 'Snuggle Him Home',
        primaryIcon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>,
        secondaryAction: 'share',
        bottomRestartText: 'Take Quiz Again'
      }}
      customResultComponent={(result) => <JellycatRain imageUrl={result.imageUrl} />}
    />
  );
}

function JellycatRain({ imageUrl }: { imageUrl: string }) {
  const [items] = useState(() => 
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 6,
      size: 40 + Math.random() * 60,
      rotation: Math.random() * 360,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {items.map((item) => (
        <motion.img
          key={item.id}
          src={imageUrl}
          initial={{ y: -150, x: `${item.left}vw`, rotate: item.rotation, opacity: 0 }}
          animate={{ 
            y: '110vh', 
            rotate: item.rotation + 360,
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: item.duration, 
            repeat: Infinity, 
            delay: item.delay,
            ease: "linear"
          }}
          className="absolute"
          style={{ 
            width: item.size,
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
          }}
        />
      ))}
    </div>
  );
}
