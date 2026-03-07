import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, ArrowRight, Lock, Flame, Music, Search, X, Gamepad2, Stars, Coffee, Tv, TreePine, Palette, Camera, MapPin, Pizza, LayoutGrid, Puzzle } from "lucide-react";

export function HomeScreen({ onSelectQuiz }: { onSelectQuiz: (id: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const trendingQuizzes = [
    {
      id: "mushroom",
      title: "Forest Match",
      description: "A relaxing match-3 game with colorful woodland treasures.",
      icon: <TreePine className="w-6 h-6 text-orange-500" />,
      color: "bg-orange-100",
      image: "https://em-content.zobj.net/social/emoji/mushroom.png",
      comingSoon: false,
    }
    ];
      id: "blackpink",
      title: "Which Blackpink Member Are You?",
      description: "Find your Blackpink twin among the four icons.",
      icon: <Music className="w-6 h-6 text-pink-500" />,
      color: "bg-pink-100",
      image: "https://www.rollingstone.com/wp-content/uploads/2026/02/BLACKPINK-DEADLINE-Artist-Image.jpg?w=1581&h=1054&crop=1",
      comingSoon: false,
    },
    {
      id: "taylor",
      title: "Which Taylor Swift Era Are You?",
      description: "Are you a poetic folklore soul or a chaotic reputation baddie?",
      icon: <Music className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-100",
      image: "https://images.unsplash.com/photo-1698711864764-c9150adc9f36?w=500&auto=format&fit=crop&q=60",
      comingSoon: false,
    },
    {
      id: "jellycat",
      title: "Which Jellycat Are You?",
      description: "Find your plushie soulmate in this cozy quiz.",
      icon: <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />,
      color: "bg-rose-100",
      image: "https://t3.gstatic.com/images?q=tbn:ANd9GcQzgr8gWNgYWlMlXa_lml5zu_MlLwFRJwcgxrU7wQItNYw6hU_rNptA6tnpaf87Qw", 
      comingSoon: false,
    }
  ];

  const dailyGames = [
    {
      id: "wordle",
      title: "Wordle",
      description: "Guess the 5-letter word in 6 tries. A cozy take on the daily classic.",
      icon: <Sparkles className="w-6 h-6 text-emerald-500" />,
      color: "bg-emerald-100",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQdvkeaIuPwd_QHBUj4hypsxq-pIFvl7bZ7w&s",
      comingSoon: false,
    },
    {
      id: "sudoku",
      title: "Sudoku",
      description: "A relaxing, beautifully designed classic number puzzle to clear your mind.",
      icon: <LayoutGrid className="w-6 h-6 text-blue-500" />,
      color: "bg-blue-100",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0kjJu2EXfGCazpa5FjAdNWAD60cLVNUWPMA&s",
      comingSoon: false,
    },
    {
      id: "memory",
      title: "Memory Flip",
      description: "Test your memory by matching these cute, comforting items.",
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      color: "bg-rose-100",
      image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=600&auto=format&fit=crop",
      comingSoon: false,
    },
    {
      id: "tetris",
      title: "Tetris",
      description: "A calming pastel block-stacking game to clear your mind and score points.",
      icon: <Gamepad2 className="w-6 h-6 text-indigo-500" />,
      color: "bg-indigo-100",
      image: "data:image/jpeg;base64,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",
      comingSoon: false,
    },
    {
      id: "slide",
      title: "Unblock Me",
      description: "A relaxing sliding block puzzle. Sort the numbers to win!",
      icon: <Puzzle className="w-6 h-6 text-emerald-500" />,
      color: "bg-emerald-100",
      image: "https://lh3.googleusercontent.com/iEoeH_3bRJIkSwDFhnV2dZ4Mqwe4cYjGuydOl8j0bB1C1j_U1PLMrDU3Qb5aH1fwAtGDj65OMQBxmO-Un2BdJOM3",
      comingSoon: true,
    }
  ];

  const popCultureQuizzes = [
    {
      id: "ghibli",
      title: "Which Ghibli World Is Yours?",
      description: "Discover which magical Ghibli world you belong in.",
      icon: <Stars className="w-6 h-6 text-emerald-600" />,
      color: "bg-emerald-100",
      image: "https://wallup.net/wp-content/uploads/2016/07/23/75333-Totoro-Studio_Ghibli-748x468.png",
      comingSoon: false,
    },
    {
      id: "disney",
      title: "Your Disney Royal Vibe",
      description: "Which princess's story matches your life right now?",
      icon: <Stars className="w-6 h-6 text-amber-500" />,
      color: "bg-amber-100",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
      comingSoon: false,
    },
    {
      id: "marvel",
      title: "Marvel Super Soul",
      description: "Find out which Avenger matches your personality.",
      icon: <Flame className="w-6 h-6 text-red-600" />,
      color: "bg-red-100",
      image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=600&auto=format&fit=crop",
      comingSoon: false,
    }
    ];
  const cozyCollections = [
    {
      id: "aura",
      title: "What's Your Aura Color?",
      description: "Discover the energy you project to the world.",
      icon: <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />,
      color: "bg-orange-100",
      image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=600&auto=format&fit=crop",
      comingSoon: false,
    },
    {
      id: "coffee",
      title: "Your Coffee Order Personality",
      description: "What your morning brew says about your soul.",
      icon: <Coffee className="w-6 h-6 text-amber-700" />,
      color: "bg-amber-100",
      image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop",
      comingSoon: false,
    },
    {
      id: "houseplant",
      title: "What Houseplant Are You?",
      description: "Are you a dramatic Monstera or a resilient Pothos?",
      icon: <TreePine className="w-6 h-6 text-emerald-500" />,
      color: "bg-emerald-100",
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=600&auto=format&fit=crop",
      comingSoon: false,
    },
    {
      id: "travel",
      title: "Dream Destination",
      description: "Where should your next cozy trip be?",
      icon: <MapPin className="w-6 h-6 text-sky-500" />,
      color: "bg-sky-100",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
      comingSoon: false,
    }
  ];

  const allQuizzes = [...trendingQuizzes, ...dailyGames, ...popCultureQuizzes, ...cozyCollections];

  const searchResults = allQuizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(e.target.value.length > 0);
  };

  const handleResultClick = (id: string, comingSoon: boolean) => {
    if (!comingSoon) {
      onSelectQuiz(id);
      setIsDropdownOpen(false);
      setSearchQuery("");
    }
  };

  const renderQuizGrid = (quizzes: any[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map((quiz, idx) => (
        <motion.div
          key={quiz.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          onClick={() => !quiz.comingSoon && onSelectQuiz(quiz.id)}
          className={`group relative bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm transition-all duration-300 ${quiz.comingSoon ? 'cursor-not-allowed opacity-80' : 'cursor-pointer hover:shadow-md hover:-translate-y-1'}`}
        >
          <div className="h-48 overflow-hidden relative">
            <img 
              src={quiz.image} 
              alt={quiz.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className={`w-12 h-12 rounded-2xl ${quiz.color} flex items-center justify-center shadow-lg`}>
                {quiz.icon}
              </div>
              {quiz.comingSoon && (
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 uppercase tracking-wider">
                  <Lock className="w-3 h-3" /> Coming Soon
                </span>
              )}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">{quiz.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">{quiz.description}</p>
            
            {!quiz.comingSoon && (
              <div className="flex items-center text-rose-500 font-semibold text-sm group-hover:gap-2 transition-all">
                Play Now <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Hero Section */}
      <div className="relative text-center py-6 sm:py-8 mb-8 rounded-[2rem] bg-gradient-to-br from-rose-50 via-white to-amber-50 border border-rose-100/50 shadow-sm">
        <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none">
          <motion.div animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-4 left-6 text-rose-300 opacity-30">
            <Heart className="w-8 h-8 fill-current" />
          </motion.div>
          <motion.div animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-4 left-12 text-orange-300 opacity-30">
            <Flame className="w-6 h-6 fill-current" />
          </motion.div>
          <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 right-6 text-amber-400 opacity-30">
            <Stars className="w-10 h-10" />
          </motion.div>
          <motion.div animate={{ y: [0, -15, 0], rotate: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-6 right-12 text-indigo-300 opacity-30">
            <Gamepad2 className="w-8 h-8" />
          </motion.div>
          <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 left-0 w-48 h-48 bg-rose-200/30 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-0 right-0 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />
        </div>
        
        <div className="relative z-10 px-6 max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, type: "spring", stiffness: 200 }} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-sm text-rose-600 text-[10px] font-bold mb-3 border border-rose-100">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span className="uppercase tracking-widest">Ready to play?</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, type: "spring", damping: 12 }} className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-2 font-serif">
            Take a <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500">Break</span>
          </motion.h1>
          <p className="text-sm text-slate-500 mb-6 font-medium">Unwind and explore our collection of wholesome quizzes and games.</p>
          <div className="max-w-md mx-auto relative z-50" ref={dropdownRef}>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 transition-colors ${isDropdownOpen ? 'text-rose-500' : 'text-slate-400'}`} />
              </div>
              <input type="text" placeholder="Search games & quizzes..." value={searchQuery} onChange={handleSearchChange} onFocus={() => searchQuery.length > 0 && setIsDropdownOpen(true)} className="w-full pl-12 pr-12 py-3 bg-white border border-slate-200 rounded-[2rem] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-400 transition-all shadow-xl shadow-rose-900/5 group-hover:border-slate-300" />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(""); setIsDropdownOpen(false); }} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="h-5 h-5" />
                </button>
              )}
            </div>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ duration: 0.2 }} className="absolute z-50 w-full mt-3 bg-white border border-slate-200 rounded-[2rem] shadow-2xl overflow-hidden backdrop-blur-xl bg-white/95">
                  <div className="max-h-[360px] overflow-y-auto py-3">
                    {searchResults.length > 0 ? (
                      searchResults.map((quiz) => (
                        <button key={quiz.id} onClick={() => handleResultClick(quiz.id, quiz.comingSoon)} className={`w-full flex items-center gap-5 px-6 py-4 text-left transition-colors hover:bg-rose-50/50 group/item ${quiz.comingSoon ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                          <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${quiz.color} flex items-center justify-center shadow-sm`}>
                            {quiz.icon}
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-slate-900 text-lg truncate">{quiz.title}</h4>
                              {quiz.comingSoon && <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded-md">Soon</span>}
                            </div>
                            <p className="text-sm text-slate-500 truncate">{quiz.description}</p>
                          </div>
                          {!quiz.comingSoon && <ArrowRight className="flex-shrink-0 w-5 h-5 text-slate-300 group-hover/item:text-rose-500 group-hover/item:translate-x-1 transition-all" />}
                        </button>
                      ))
                    ) : (
                      <div className="px-6 py-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
                          <Search className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="text-lg font-bold text-slate-900">No results found</p>
                        <p className="text-sm text-slate-500 mt-1">Try a different search term</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <div>
          <div className="flex items-center gap-2 mb-6 pl-2">
            <Flame className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-slate-900 font-serif">New & Trending</h2>
          </div>
          {renderQuizGrid(trendingQuizzes)}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-6 pl-2">
            <Gamepad2 className="w-6 h-6 text-indigo-500" />
            <h2 className="text-2xl font-bold text-slate-900 font-serif">Daily Games</h2>
          </div>
          {renderQuizGrid(dailyGames)}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-6 pl-2">
            <Tv className="w-6 h-6 text-fuchsia-500" />
            <h2 className="text-2xl font-bold text-slate-900 font-serif">Pop Culture Quizzes</h2>
          </div>
          {renderQuizGrid(popCultureQuizzes)}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-6 pl-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <h2 className="text-2xl font-bold text-slate-900 font-serif">Cozy Collections</h2>
          </div>
          {renderQuizGrid(cozyCollections)}
        </div>
      </div>
    </motion.div>
  );
}
