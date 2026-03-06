import React from "react";
import { motion } from "motion/react";
import { Heart, Sparkles, ArrowRight, Lock, Flame } from "lucide-react";

export function HomeScreen({ onSelectQuiz }: { onSelectQuiz: (id: string) => void }) {
  // 1. Split your data into distinct arrays for each shelf
  const trendingQuizzes = [
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
      id: "weekend-vibe",
      title: "Design Your Perfect Weekend",
      description: "Plan a weekend and we'll guess your introversion level.",
      icon: <Sparkles className="w-6 h-6 text-indigo-500" />,
      color: "bg-indigo-100",
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=600&auto=format&fit=crop",
      comingSoon: false,
    }
  ];

  const cozyQuizzes = [
    {
      id: "jellycat",
      title: "Which Jellycat Are You?",
      description: "Find your plushie soulmate in this cozy 5-question quiz.",
      icon: <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />,
      color: "bg-rose-100",
      image: "https://t3.gstatic.com/images?q=tbn:ANd9GcQzgr8gWNgYWlMlXa_lml5zu_MlLwFRJwcgxrU7wQItNYw6hU_rNptA6tnpaf87Qw", 
      comingSoon: false,
    },
    {
      id: "coffee",
      title: "Your Coffee Order Personality",
      description: "Discover what your morning brew says about you.",
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      color: "bg-amber-100",
      image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop",
      comingSoon: false,
    },
    {
      id: "houseplant",
      title: "What Houseplant Matches Your Vibe?",
      description: "Are you a dramatic Monstera or a resilient Pothos?",
      icon: <Sparkles className="w-6 h-6 text-emerald-500" />,
      color: "bg-emerald-100",
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=600&auto=format&fit=crop",
      comingSoon: true,
    }
  ];

  // 2. Create a helper function to render the grid so you don't repeat code
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
                <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
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
      {/* Main Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4 font-serif">
          Quiz Collection
        </h1>
        <p className="text-lg text-slate-500 max-w-md mx-auto">
          Take a break and discover something new about yourself with our collection of wholesome quizzes.
        </p>
      </div>

      {/* 3. Render the specific shelves with section headers */}
      
      {/* Trending Shelf */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6 pl-2">
          <Flame className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-slate-900 font-serif">New & Trending</h2>
        </div>
        {renderQuizGrid(trendingQuizzes)}
      </div>

      {/* Cozy Shelf */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6 pl-2">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
          <h2 className="text-2xl font-bold text-slate-900 font-serif">Cozy Quizzes</h2>
        </div>
        {renderQuizGrid(cozyQuizzes)}
      </div>

    </motion.div>
  );
}