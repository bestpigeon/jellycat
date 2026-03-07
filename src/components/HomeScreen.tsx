import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, ArrowRight, Lock, Flame, Music, Search, X, Gamepad2, Stars, Coffee, Tv, TreePine, Palette, Camera, MapPin, Pizza } from "lucide-react";

export function HomeScreen({ onSelectQuiz }: { onSelectQuiz: (id: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dailyGames = [
    {
      id: "wordle",
      title: "Cozy Wordle",
      description: "Guess the 5-letter word in 6 tries. A cozy take on the daily classic.",
      icon: <Sparkles className="w-6 h-6 text-emerald-500" />,
      color: "bg-emerald-100",
      image: "https://images.unsplash.com/photo-1643208589889-0735ad7218f0?q=80&w=600&auto=format&fit=crop",
      comingSoon: false,
    },
    {
      id: "connections",
      title: "Connections",
      description: "Group words that share a common thread.",
      icon: <Gamepad2 className="w-6 h-6 text-indigo-500" />,
      color: "bg-indigo-100",
      image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?q=80&w=600&auto=format&fit=crop",
      comingSoon: false,
    },
    {
      id: "pixelart",
      title: "Pixel Art Puzzle",
      description: "Reveal the hidden picture using logic numbers.",
      icon: <Palette className="w-6 h-6 text-pink-500" />,
      color: "bg-pink-100",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
      comingSoon: false,
    }
  ];

  const popCultureQuizzes = [
    {
      id: "taylor",
      title: "Which Taylor Swift Era Are You?",
      description: "Are you a poetic folklore soul or a chaotic reputation baddie?",
      icon: <Music className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-100",
      image: "https://images.unsplash.com/photo-1698711864764-c9150adc9f36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGF5bG9yJTIwc3dpZnR8ZW58MHx8MHx8fDA%3D",
      comingSoon: false,
    },
    {
      id: "whitelotus",
      title: "The White Lotus Persona",
      description: "Are you an iconic Tanya or a sharp-tongued Harper?",
      icon: <Tv className="w-6 h-6 text-fuchsia-600" />,
      color: "bg-fuchsia-100",
      image: "https://images.unsplash.com/photo-1580130006950-8b1b24e4d5fb?q=80&w=600&auto=format&fit=crop",
      comingSoon: false,
    },
    {
      id: "ghibli",
      title: "Which Ghibli World Is Yours?",
      description: "Discover which magical Ghibli world you belong in.",
      icon: <Stars className="w-6 h-6 text-emerald-600" />,
      color: "bg-emerald-100",
      image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=600&auto=format&fit=crop",
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
      id: "jellycat",
      title: "Which Jellycat Are You?",
      description: "Find your plushie soulmate in this cozy quiz.",
      icon: <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />,
      color: "bg-rose-100",
      image: "https://t3.gstatic.com/images?q=tbn:ANd9GcQzgr8gWNgYWlMlXa_lml5zu_MlLwFRJwcgxrU7wQItNYw6hU_rNptA6tnpaf87Qw", 
      comingSoon: false,
    },
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
    },
    {
      id: "snack",
      title: "What Snack Are You?",
      description: "Crunchy, sweet, or salty? Find your snack twin.",
      icon: <Pizza className="w-6 h-6 text-orange-400" />,
      color: "bg-orange-50",
      image: "https://images.unsplash.com/photo-1599490659213-e2b9527bb087?q=80&w=600&auto=format&fit=crop",
      comingSoon: false,
    }
  ];

  const allQuizzes = [...dailyGames, ...popCultureQuizzes, ...cozyCollections];

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
                  <Lock className="w-3 h-3" /> Soon
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
            Cozy <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500">Games</span>
          </motion.h1>
          <p className="text-sm text-slate-500 mb-6 font-medium">Take a break and explore our collection of wholesome quizzes and games.</p>
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
