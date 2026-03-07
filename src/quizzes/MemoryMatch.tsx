import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, RefreshCcw, Sparkles } from "lucide-react";

const EMOJIS = ["☕", "🪴", "📚", "🕯️", "🧶", "🧸", "🍵", "🌧️"];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryMatch({ onBack }: { onBack: () => void }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    window.history.replaceState({}, '', `?quiz=memory-match`);
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledEmojis = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledEmojis);
    setFlippedIndices([]);
    setMoves(0);
    setIsWon(false);
  };

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    if (newFlippedIndices.length === 2) {
      setMoves((m) => m + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;
      
      if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstIndex].isMatched = true;
          matchedCards[secondIndex].isMatched = true;
          setCards(matchedCards);
          setFlippedIndices([]);
          
          if (matchedCards.every(c => c.isMatched)) {
            setIsWon(true);
          }
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstIndex].isFlipped = false;
          resetCards[secondIndex].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto relative flex flex-col pt-8 sm:pt-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-slate-100 text-center w-full"
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-900 font-serif">Cozy Match</h1>
          <div className="text-slate-500 font-medium bg-slate-100 px-4 py-2 rounded-full">
            Moves: {moves}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 sm:gap-4 mb-8" style={{ perspective: '1000px' }}>
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="relative w-full aspect-square cursor-pointer"
              onClick={() => handleCardClick(index)}
              whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.05 }}
              whileTap={{ scale: card.isFlipped || card.isMatched ? 1 : 0.95 }}
            >
              <motion.div
                className="w-full h-full absolute"
                style={{ transformStyle: 'preserve-3d' }}
                initial={false}
                animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
              >
                {/* Front (Hidden) */}
                <div 
                  className="absolute inset-0 bg-rose-100 rounded-2xl border-2 border-rose-200 flex items-center justify-center"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <Sparkles className="w-6 h-6 text-rose-300" />
                </div>
                
                {/* Back (Revealed) */}
                <div 
                  className={`absolute inset-0 rounded-2xl border-2 flex items-center justify-center text-4xl sm:text-5xl ${card.isMatched ? 'bg-emerald-100 border-emerald-200' : 'bg-white border-slate-200'}`}
                  style={{ backfaceVisibility: 'hidden', transform: "rotateY(180deg)" }}
                >
                  {card.emoji}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {isWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="p-6 bg-amber-50 rounded-2xl border border-amber-100"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-2 font-serif">You did it! 🎉</h2>
              <p className="text-slate-600 mb-6">You matched all the cozy items in {moves} moves.</p>
              <button
                onClick={initializeGame}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-amber-500 hover:bg-amber-600 transition-colors shadow-md hover:shadow-lg"
              >
                <RefreshCcw className="w-5 h-5" />
                Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}