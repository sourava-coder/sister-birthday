import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Heart, Flame, Gift, Mail } from 'lucide-react';
import { soundSynth } from '../utils/audio';

interface NavbarProps {
  onTriggerFireworks: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onTriggerFireworks }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    soundSynth.setOnStateChange(setIsPlaying);
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMusic = () => {
    soundSynth.toggleMelody();
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080511]/90 backdrop-blur-md border-b border-amber-500/20 shadow-lg shadow-amber-950/30 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Glowing Diya */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 text-decoration-none focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent border border-amber-500/40 group-hover:border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all">
            <svg
              className="w-6 h-6 transform group-hover:scale-110 transition-transform"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Flame */}
              <path
                d="M32 8 C35 17 41 22 41 29 C41 34 37 38 32 38 C27 38 23 34 23 29 C23 22 29 17 32 8 Z"
                fill="#FBBF24"
                className="flame-active"
              />
              <path
                d="M32 15 C33.5 20 37 24 37 28 C37 31 35 34 32 34 C29 34 27 31 27 28 C27 24 30.5 20 32 15 Z"
                fill="#EF4444"
              />
              {/* Diya Clay Pot */}
              <path
                d="M10 36 C12 48 20 56 32 56 C44 56 52 48 54 36 C42 41 22 41 10 36 Z"
                fill="#D97706"
              />
              <path
                d="M16 38 C22 42 42 42 48 38 C46 47 39 52 32 52 C25 52 18 47 16 38 Z"
                fill="#92400E"
              />
            </svg>
          </div>
          <div>
            <div className="font-['Cinzel'] tracking-wider text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400">
              Arjya Ananya
            </div>
            <div className="text-[10px] uppercase tracking-widest text-amber-300/70 -mt-1 font-medium">
              Birthday & Diwali Celebration
            </div>
          </div>
        </a>

        {/* Quick Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-amber-200/80">
          <a
            href="#diyas"
            className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            8 Sacred Diyas
          </a>
          <a
            href="#cake"
            className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
          >
            <Gift className="w-3.5 h-3.5 text-orange-400" />
            Birthday Cake
          </a>
          <a
            href="#memories"
            className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            Memories
          </a>
          <a
            href="#letter"
            className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            Birthday Letter
          </a>
        </div>

        {/* Controls: Audio Synthesizer & Fireworks */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onTriggerFireworks}
            title="Launch fireworks celebratory burst"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-500/20 to-amber-500/20 hover:from-orange-500/30 hover:to-amber-500/30 text-amber-200 border border-amber-500/30 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span className="hidden sm:inline">Launch</span> Fireworks
          </button>

          {/* Web Audio Birthday Melodic Tune Button */}
          <button
            onClick={toggleMusic}
            className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border ${
              isPlaying
                ? 'bg-amber-500 text-amber-950 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.6)]'
                : 'bg-amber-950/60 text-amber-300 border-amber-500/40 hover:bg-amber-900/60 shadow-sm'
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-4 h-4 animate-bounce text-amber-950" />
                <span>Playing Birthday Tune</span>
                <span className="flex items-center gap-0.5 ml-1">
                  <span className="w-1 h-3 bg-amber-950 rounded-full animate-pulse" />
                  <span className="w-1 h-2 bg-amber-950 rounded-full animate-pulse delay-75" />
                  <span className="w-1 h-4 bg-amber-950 rounded-full animate-pulse delay-150" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Play Birthday Music</span>
                <span className="text-[10px] opacity-75 font-normal">(Chime)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
