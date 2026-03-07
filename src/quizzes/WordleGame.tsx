import React, { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Home, RefreshCcw, Share } from "lucide-react";

const WORDS = [
  // Easy / Cozy / Nature / Food
  "APPLE", "BERRY", "LEMON", "MELON", "PEACH", "GRAPE", "MANGO", "SWEET", 
  "COZY", "PLUSH", "LATTE", "BEANS", "ROAST", "SUGAR", "CREAM", "WATER", 
  "PLANT", "GREEN", "ROOTS", "VIBES", "CHILL", "HAPPY", "SMILE", "HEART", 
  "PEACE", "QUIET", "SLEEP", "DREAM", "STARS", "NIGHT", "LIGHT", "SUNNY", 
  "FRESH", "CLEAN", "CLEAR", "SMART", "QUICK", "BRAIN", "THINK", "LEARN", 
  "STUDY", "BOOKS", "PAGES", "WORDS", "MAGIC", "SPARK", "FLAME", "SHINE", 
  "BLISS", "LAUGH", "CHEER", "BREAD", "TOAST", "HONEY", "SYRUP", "CANDY", 
  "CACAO", "CAKES", "BAKER", "SPOON", "PLATE", "GLASS", "CHAIR", "COUCH", 
  "HOUSE", "CABIN", "PORCH", "PATIO", "GRASS", "TREES", "WOODS", "RIVER", 
  "OCEAN", "BEACH", "SHELL", "WAVES", "CLOUD", "RAINY", "SNOWY", "FROST", 
  "WINDY", "STORM", "BLAZE", "SMOKE", "EARTH", "STONE", "ROCKS", "MUDDY", 
  "DUSTY", "SANDY", "BROWN", "BLACK", "WHITE", "PINKS", "GOLDS", "PAPER", 
  "CLOTH", "YARNS", "KNITS", "QUILT", "SHEET", "TOWEL", "SOAPS", "BATHS", 
  "BRUSH", "COMBS", "TOOTH", "PASTE", "FLOSS", "TEARS", "CRIES", "SHOUT",
  "YELLS", "SPEAK", "TALKS", "CHATS", "SINGS", "DANCE", "JUMPS", "LEAPS",
  "WALKS", "STEPS", "RACES", "SWIMS", "DIVES", "BOATS", "SHIPS", "TRAIN",
  "CARGO", "BIKES", "SKATE", "BOARD", "WHEEL", "TIRES", "BRAKE", "PEDAL",
  "GEARS", "CHAIN", "SEATS", "DOORS", "ROOFS", "WALLS", "FLOOR", "STAIR",
  
  // Medium / Hard / Quirky
  "XYLEM", "QUIRK", "ZILCH", "YACHT", "WALTZ", "VIVID", "USURP", "TOXIC",
  "SQUID", "RHYME", "PIQUE", "OZONE", "NYMPH", "MYRRH", "LYRIC", "KIOSK",
  "JUMBO", "IGLOO", "HAIKU", "GIZMO", "FJORD", "EPOXY", "DWARF", "CYNIC",
  "AZURE", "AXIOM", "ABYSS", "YIELD", "WRING", "VOUCH", "UNZIP", "TWANG",
  "SWOOP", "SQUAT", "SHRUG", "PLUMP", "KNACK", "FLUFF", "CRUMB", "CHUMP",
  "BLIMP", "APHID", "VIXEN", "TOPAZ", "PIXEL", "NINJA", "MUMMY", "LLAMA",
  "KAZOO", "GUPPY", "FUZZY", "DIZZY", "COMIC", "BANJO", "ALIBI", "WACKY",
  "VODKA", "TULIP", "SKUNK", "PUPPY", "ONION", "MACAW", "LEMUR", "KOALA",
  "JELLY", "HIPPO", "GECKO", "FINCH", "EAGLE", "DINGO", "CAMEL", "BISON",
  "HYENA", "SLOTH", "MOOSE", "OTTER", "PANDA", "RHINO", "TIGER", "ZEBRA",
  "SNAKE", "SHARK", "WHALE", "RAVEN", "QUAIL", "PROBE", "OUNCE", "NERVE",
  "MANOR", "LUNAR", "KARMA", "JOINT", "IRONY", "HOUND", "GHOST", "FLOCK",
  "ENVOY", "DONOR", "CROWN", "BRICK", "ALARM", "ZESTY", "YOUTH", "WHEAT",
  "VIRUS", "URBAN", "THEME", "SQUAD", "RIVAL", "QUOTE", "PROUD", "ONSET",
  "NOVEL", "MERIT", "LOGIC", "KNIFE", "JUDGE", "INDEX", "HOTEL", "GIANT",
  "FORUM", "EVENT", "DRAFT", "CYCLE", "BRIEF", "ASSET", "WIDOW", "VAGUE",
  "UNCLE", "TRACT", "SWAMP", "RURAL", "QUEEN", "PHASE", "ORGAN", "NIECE",
  "MOTOR", "LABEL", "KNEEL", "JUICE", "IMAGE", "HABIT", "GLOBE", "FIBER",
  "ERROR", "DRAMA", "CLERK", "BLIND", "AUDIO", "YEAST", "WORRY", "VALID",
  "UPPER", "TRULY", "SUPER", "ROUGH", "QUEER", "PIECE", "OUTER", "NOISE",
  "LOCAL", "KNOCK", "JOLLY", "INNER", "HEAVY", "GUESS", "FUNNY", "EMPTY",
  "DAILY", "CRAZY", "BROAD", "AWARE", "YOUNG", "WRONG", "VITAL", "USUAL",
  "TOUGH", "RIGHT", "OTHER", "NOBLE", "MORAL", "LARGE", "KNOWN", "IDEAL",
  "HUMAN", "GRAND", "EQUAL", "DIRTY", "CHIEF", "BRAVE", "ALIVE", "WRITE",
  "VISIT", "UNITE", "TRUST", "SOLVE", "RAISE", "PROVE", "OCCUR", "NOTCH",
  "MATCH", "LEAVE", "ISSUE", "HEAR", "FORCE", "EXIST", "DRIVE", "CATCH",
  "BUILD", "ADAPT", "WORLD", "VALUE", "UNION", "TRUTH", "STYLE", "POWER",
  "ORDER", "MONTH", "LEVEL", "GROUP", "FRONT", "DEATH", "CHILD", "BLOOD",
  "ANGLE", "WOMAN", "VIDEO", "OWNER", "MODEL", "LIMIT"
];

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

type LetterState = "correct" | "present" | "absent" | "empty";

export function WordleGame({ onBack }: { onBack: () => void }) {
  const [targetWord, setTargetWord] = useState(() => WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");

  useEffect(() => {
    window.history.replaceState({}, '', `?quiz=wordle`);
  }, []);

  const onKeyPress = useCallback((key: string) => {
    if (gameStatus !== "playing") return;

    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (key === "Enter") {
      if (currentGuess.length === WORD_LENGTH) {
        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        setCurrentGuess("");

        if (currentGuess === targetWord) {
          setGameStatus("won");
        } else if (newGuesses.length >= MAX_GUESSES) {
          setGameStatus("lost");
        }
      }
    } else if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess((prev) => prev + key);
    }
  }, [currentGuess, gameStatus, guesses, targetWord]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Backspace") {
        onKeyPress(e.key);
      } else {
        const key = e.key.toUpperCase();
        if (/^[A-Z]$/.test(key)) {
          onKeyPress(key);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKeyPress]);

  const restartGame = () => {
    setTargetWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setGuesses([]);
    setCurrentGuess("");
    setGameStatus("playing");
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?quiz=wordle`;
    const score = gameStatus === "won" ? guesses.length : "X";
    const shareText = `I played Cozy Wordle and got ${score}/${MAX_GUESSES}! ✨ Play here: ${shareUrl}`;
    
    try {
      await navigator.clipboard.writeText(shareText);
      alert('Results copied to clipboard!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  // Helper to get letter state
  const getLetterState = (letter: string, index: number, guess: string): LetterState => {
    if (targetWord[index] === letter) return "correct";
    if (targetWord.includes(letter)) {
      // Handle multiple occurrences
      const letterCountInTarget = targetWord.split('').filter(l => l === letter).length;
      const letterCountInGuessSoFar = guess.slice(0, index + 1).split('').filter(l => l === letter).length;
      // Also need to consider if there are correct matches for this letter later in the guess
      let correctMatchesForLetter = 0;
      for (let i = 0; i < WORD_LENGTH; i++) {
        if (guess[i] === letter && targetWord[i] === letter) {
          correctMatchesForLetter++;
        }
      }
      
      if (letterCountInGuessSoFar <= letterCountInTarget - correctMatchesForLetter + (targetWord[index] === letter ? 1 : 0)) {
         return "present";
      }
    }
    return "absent";
  };

  const usedKeys: Record<string, LetterState> = {};
  guesses.forEach((guess) => {
    for (let i = 0; i < WORD_LENGTH; i++) {
      const letter = guess[i];
      const state = getLetterState(letter, i, guess);
      if (state === "correct") {
        usedKeys[letter] = "correct";
      } else if (state === "present" && usedKeys[letter] !== "correct") {
        usedKeys[letter] = "present";
      } else if (state === "absent" && usedKeys[letter] !== "correct" && usedKeys[letter] !== "present") {
        usedKeys[letter] = "absent";
      }
    }
  });

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col pt-8 sm:pt-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-sm border border-slate-100 flex-grow flex flex-col relative overflow-hidden"
      >
        <h1 className="text-3xl font-bold text-slate-900 mb-6 font-serif">Cozy Wordle</h1>

        <div className="grid grid-rows-6 gap-2 mb-8 w-fit mx-auto">
          {Array.from({ length: MAX_GUESSES }).map((_, rowIndex) => {
            const isCurrentRow = rowIndex === guesses.length;
            const guess = isCurrentRow ? currentGuess : guesses[rowIndex] || "";

            return (
              <div key={rowIndex} className="grid grid-cols-5 gap-2">
                {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                  const letter = guess[colIndex] || "";
                  let state: LetterState = "empty";
                  if (rowIndex < guesses.length) {
                    state = getLetterState(letter, colIndex, guess);
                  }

                  let bgColor = "bg-slate-50 border-slate-200";
                  let textColor = "text-slate-800";
                  
                  if (state === "correct") {
                    bgColor = "bg-emerald-500 border-emerald-500";
                    textColor = "text-white";
                  } else if (state === "present") {
                    bgColor = "bg-amber-400 border-amber-400";
                    textColor = "text-white";
                  } else if (state === "absent") {
                    bgColor = "bg-slate-400 border-slate-400";
                    textColor = "text-white";
                  } else if (letter) {
                    bgColor = "bg-white border-slate-400";
                  }

                  return (
                    <motion.div
                      key={colIndex}
                      initial={isCurrentRow && letter ? { scale: 0.8 } : false}
                      animate={isCurrentRow && letter ? { scale: 1 } : false}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`w-12 h-12 sm:w-14 sm:h-14 border-2 flex items-center justify-center text-2xl font-bold rounded-xl uppercase transition-colors duration-500 ${bgColor} ${textColor}`}
                    >
                      {letter}
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {gameStatus !== "playing" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-6 rounded-2xl bg-slate-50 border border-slate-100"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {gameStatus === "won" ? "You won! 🎉" : "Game Over"}
            </h2>
            <p className="text-slate-600 mb-6">
              The word was <span className="font-bold text-slate-900">{targetWord}</span>
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-indigo-500 hover:bg-indigo-600 transition-colors"
              >
                <Share className="w-5 h-5" />
                Share
              </button>
              <button
                onClick={restartGame}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <RefreshCcw className="w-5 h-5" />
                Play Again
              </button>
            </div>
          </motion.div>
        )}

        {/* Keyboard */}
        <div className="flex flex-col gap-2 w-full max-w-md mx-auto">
          {["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"].map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1 sm:gap-2">
              {rowIndex === 2 && (
                <button
                  onClick={() => onKeyPress("Enter")}
                  className="px-2 sm:px-4 py-3 rounded-lg font-bold text-xs sm:text-sm bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                >
                  ENTER
                </button>
              )}
              {row.split("").map((key) => {
                const state = usedKeys[key];
                let keyBg = "bg-slate-200 text-slate-700 hover:bg-slate-300";
                if (state === "correct") keyBg = "bg-emerald-500 text-white";
                else if (state === "present") keyBg = "bg-amber-400 text-white";
                else if (state === "absent") keyBg = "bg-slate-400 text-white";

                return (
                  <button
                    key={key}
                    onClick={() => onKeyPress(key)}
                    className={`w-8 sm:w-10 py-3 rounded-lg font-bold text-sm sm:text-base transition-colors ${keyBg}`}
                  >
                    {key}
                  </button>
                );
              })}
              {rowIndex === 2 && (
                <button
                  onClick={() => onKeyPress("Backspace")}
                  className="px-2 sm:px-4 py-3 rounded-lg font-bold text-xs sm:text-sm bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                >
                  DEL
                </button>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
