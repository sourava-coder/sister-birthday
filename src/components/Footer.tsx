import React from 'react';
import { Heart, Flame, ArrowUp, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-amber-500/30 bg-[#06030c] pt-14 pb-12 px-4 text-center overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-amber-500/10 blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {/* Emblem */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
          <span className="text-xl">🪔</span>
        </div>

        <div className="space-y-1">
          <h3 className="font-['Cinzel'] text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400">
            Arjya Ananya
          </h3>
          <p className="text-xs uppercase tracking-widest text-amber-300/70 font-['Marcellus']">
            A Diwali Birthday Celebration
          </p>
        </div>

        <p className="text-sm text-amber-100/80 font-['Marcellus'] max-w-md mx-auto leading-relaxed">
          Crafted with love, devotion, and festive joy for our beloved{' '}
          <strong className="text-amber-300 font-semibold">Arjya Ananya Nayak</strong>.
        </p>

        <div className="flex items-center justify-center gap-1.5 text-xs text-amber-400/70 font-['Marcellus']">
          <span>May the divine lights forever illuminate your journey</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>

        <div className="pt-4 flex items-center justify-center gap-4">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/30 text-amber-300 hover:text-amber-100 text-xs font-['Marcellus'] transition-all cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            Back to Top
          </button>
        </div>

        <div className="text-[11px] text-stone-500 font-['Marcellus'] pt-4">
          Happy Birthday Arjya • Shubh Deepavali
        </div>
      </div>
    </footer>
  );
};
