import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, CloudRain, Piano, Headphones, Volume2, VolumeX, X } from 'lucide-react';

const TRACKS = [
  {
    id: 'rain',
    name: 'Cozy Rain',
    icon: <CloudRain className="w-4 h-4" />,
    src: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_1167139175.mp3?filename=soft-rain-ambient-111154.mp3',
    volume: 1.0,
  },
  {
    id: 'piano',
    name: 'Light Piano',
    icon: <Piano className="w-4 h-4" />,
    src: 'https://cdn.pixabay.com/download/audio/2022/10/25/audio_9a953fc421.mp3?filename=calm-piano-music-123490.mp3',
    volume: 1.0,
  },
  {
    id: 'lofi',
    name: 'Lo-fi Chill',
    icon: <Headphones className="w-4 h-4" />,
    src: 'https://cdn.pixabay.com/download/audio/2022/01/26/audio_8ed59cf1e2.mp3?filename=chill-lofi-song-8444.mp3',
    volume: 1.0,
  }
];

export function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
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
  }, [isPlaying, currentTrackId, currentTrack]);

  const togglePlay = () => {
    if (!currentTrackId && !isPlaying) {
      setCurrentTrackId(TRACKS[0].id);
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
      setIsPlaying(true);
    }
  };

  const turnOff = () => {
    setIsPlaying(false);
    setCurrentTrackId(null);
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
      {currentTrackId && (
        <audio
          ref={audioRef}
          src={currentTrack?.src}
          loop
          preload="auto"
        />
      )}
    </div>
  );
}
