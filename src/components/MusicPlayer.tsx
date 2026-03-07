import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, CloudRain, Piano, Coffee, Volume2, VolumeX, X } from 'lucide-react';

const TRACKS = [
  {
    id: 'rain',
    name: 'Cozy Rain',
    icon: <CloudRain className="w-4 h-4" />,
    src: ['https://actions.google.com/sounds/v1/weather/rain_on_roof.ogg'],
    volume: 0.5,
  },
  {
    id: 'piano',
    name: 'Light Piano',
    icon: <Piano className="w-4 h-4" />,
    src: [
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Clair_de_lune_%28Claude_Debussy%29_Suite_bergamasque.ogg',
      'https://upload.wikimedia.org/wikipedia/commons/0/0f/Claude_Debussy_-_Premi%C3%A8re_Arabesque_-_Patrizia_Prati.ogg',
      'https://upload.wikimedia.org/wikipedia/commons/8/89/Claude_Debussy_-_Deuxi%C3%A8me_Arabesque_-_Patrizia_Prati.ogg',
      'https://upload.wikimedia.org/wikipedia/commons/d/d5/Chopin-Berceuse.ogg',
      'https://upload.wikimedia.org/wikipedia/commons/e/eb/Beethoven_Moonlight_1st_movement.ogg',
      'https://upload.wikimedia.org/wikipedia/commons/7/7c/Barcarolle_-_Chopin.ogg'
    ],
    volume: 0.4,
  },
  {
    id: 'cafe',
    name: 'Coffee Shop',
    icon: <Coffee className="w-4 h-4" />,
    src: ['https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg'],
    volume: 0.3,
  }
];

export function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSubTrackIndex, setCurrentSubTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS.find(t => t.id === currentTrackId);

  // Handle audio play/pause and volume when track or playing state changes
  useEffect(() => {
    if (audioRef.current) {
      if (currentTrack) {
        audioRef.current.volume = currentTrack.volume;
      }
      
      if (isPlaying && currentTrackId) {
        audioRef.current.play().catch((e) => console.log("Audio autoplay prevented by browser:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackId, currentTrack, currentSubTrackIndex]);

  const handleTrackEnded = () => {
    if (currentTrack && currentTrack.src.length > 1) {
      // Move to next sub-track, loop back to 0
      setCurrentSubTrackIndex((prev) => (prev + 1) % currentTrack.src.length);
    } else if (audioRef.current) {
      // Single track: just replay it
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => console.log("Audio replay prevented:", e));
    }
  };

  const togglePlay = () => {
    if (!currentTrackId && !isPlaying) {
      setCurrentTrackId(TRACKS[0].id);
      setCurrentSubTrackIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const selectTrack = (id: string) => {
    if (currentTrackId === id) {
      // Toggle play if same track selected
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrackId(id);
      setCurrentSubTrackIndex(0); // Reset sub-track index when changing categories
      setIsPlaying(true);
    }
  };

  const turnOff = () => {
    setIsPlaying(false);
    setCurrentTrackId(null);
    setCurrentSubTrackIndex(0);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-2xl p-2 w-64 overflow-hidden"
          >
            <div className="px-3 py-2 text-xs font-bold tracking-widest text-slate-400 uppercase flex justify-between items-center">
              <span>Background Vibe</span>
              <button onClick={() => setIsOpen(false)} className="hover:text-slate-700 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-1">
              {TRACKS.map((track) => {
                const isActive = currentTrackId === track.id && isPlaying;
                return (
                  <button
                    key={track.id}
                    onClick={() => selectTrack(track.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-rose-50 text-rose-600 font-semibold' 
                        : 'hover:bg-slate-50 text-slate-700 font-medium'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${isActive ? 'bg-rose-200/50' : 'bg-slate-100'}`}>
                      {track.icon}
                    </div>
                    <span>{track.name}</span>
                    {isActive && (
                      <div className="ml-auto flex gap-0.5">
                        <span className="w-1 h-3 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1 h-4 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    )}
                  </button>
                );
              })}
              
              <button
                onClick={turnOff}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  !isPlaying 
                    ? 'bg-slate-100 text-slate-900 font-semibold' 
                    : 'hover:bg-slate-50 text-slate-500 font-medium'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${!isPlaying ? 'bg-slate-200' : 'bg-slate-100'}`}>
                  <VolumeX className="w-4 h-4" />
                </div>
                <span>Off</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-3 bg-white/90 backdrop-blur-md border border-slate-200 shadow-lg px-4 py-3 rounded-full hover:shadow-xl hover:scale-105 transition-all active:scale-95"
      >
        <div className={`relative flex items-center justify-center transition-colors ${isPlaying ? 'text-rose-500' : 'text-slate-500'}`}>
          {isPlaying ? <Volume2 className="w-5 h-5" /> : <Music className="w-5 h-5" />}
        </div>
        <span className={`font-medium text-sm transition-colors ${isPlaying ? 'text-slate-900' : 'text-slate-500'}`}>
          {isPlaying && currentTrack ? currentTrack.name : 'Music'}
        </span>
      </button>

      {/* Hidden Audio Element */}
      {currentTrackId && currentTrack && (
        <audio
          ref={audioRef}
          src={currentTrack.src[currentSubTrackIndex]}
          onEnded={handleTrackEnded}
          loop={currentTrack.src.length === 1}
          autoPlay={isPlaying}
          preload="auto"
        />
      )}
    </div>
  );
}
