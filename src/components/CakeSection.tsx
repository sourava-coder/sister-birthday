import React, { useState } from 'react';
import { Sparkles, Wind, Flame, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundSynth } from '../utils/audio';

export const CakeSection: React.FC = () => {
  // All 5 candles start unlit so Arjya can light each one
  const [litCandles, setLitCandles] = useState<number[]>([]);
  const [hasMadeWish, setHasMadeWish] = useState(false);
  const [showWishSuccess, setShowWishSuccess] = useState(false);

  const allCandlesLit = litCandles.length === 5;

  const triggerCakeCelebration = () => {
    soundSynth.playSparkSound();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#F59E0B', '#EF4444', '#EC4899', '#8B5CF6', '#10B981', '#FBBF24'],
    });
    setHasMadeWish(true);
  };

  const toggleCandle = (id: number) => {
    if (litCandles.includes(id)) {
      soundSynth.playBlowSound();
      setLitCandles(prev => prev.filter(c => c !== id));
    } else {
      soundSynth.playSparkSound();
      const next = [...litCandles, id];
      setLitCandles(next);
      if (next.length === 5) {
        triggerCakeCelebration();
      }
    }
  };

  const lightAllCandles = () => {
    setLitCandles([1, 2, 3, 4, 5]);
    triggerCakeCelebration();
  };

  const blowAllCandles = () => {
    soundSynth.playBlowSound();
    setLitCandles([]);
    setShowWishSuccess(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#FBBF24', '#F472B6', '#60A5FA', '#FFFFFF'],
    });
    setTimeout(() => {
      setShowWishSuccess(false);
    }, 5000);
  };

  return (
    <section id="cake" className="relative py-20 px-4 max-w-5xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-gradient-to-r from-amber-600/10 via-orange-500/15 to-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-amber-300 text-xs font-semibold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          The Birthday Ritual
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-['Cinzel'] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-orange-400">
          Birthday Cake Surprise
        </h2>
        <p className="text-sm sm:text-base text-amber-200/80 font-['Marcellus'] max-w-lg mx-auto">
          Tap each candle to light it up. When all five are lit, make your secret birthday wish!
        </p>

        {/* Status bar */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-xs text-amber-200">
            <span>Candles Lit:</span>
            <span className="font-bold text-amber-400 text-sm">{litCandles.length} / 5</span>
          </div>

          <button
            onClick={lightAllCandles}
            className="px-3.5 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-medium transition-all cursor-pointer"
          >
            Light All 🕯️
          </button>
        </div>
      </div>

      {/* Cake Container */}
      <div className="relative max-w-md mx-auto flex flex-col items-center">
        {/* Make a Wish Banner (Shows when all 5 candles are lit) */}
        {allCandlesLit && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/30 to-amber-500/20 border-2 border-amber-400/80 shadow-[0_0_35px_rgba(245,158,11,0.5)] text-center animate-bounce">
            <div className="text-xl sm:text-2xl font-extrabold font-['Cinzel'] text-amber-200 drop-shadow-md">
              ✨ Make a wish, Arjya! ✨
            </div>
            <p className="text-xs sm:text-sm text-amber-100/90 font-['Marcellus'] mt-1">
              Close your eyes, whisper your deepest dream, and blow out the candles!
            </p>
            <button
              onClick={blowAllCandles}
              className="mt-3 px-5 py-2 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 mx-auto cursor-pointer"
            >
              <Wind className="w-4 h-4" />
              Blow Out Candles 💨
            </button>
          </div>
        )}

        {/* Wish Granted Toast */}
        {showWishSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-400 text-center animate-fade-in shadow-xl">
            <div className="flex items-center justify-center gap-2 text-emerald-300 font-bold font-['Cinzel'] text-sm">
              <Check className="w-5 h-5 text-emerald-400" />
              Wish sent to the stars!
            </div>
            <p className="text-xs text-emerald-200/90 mt-1 font-['Marcellus']">
              May every blessing of Diwali and this birthday conspire to make your wish come true, Arjya!
            </p>
          </div>
        )}

        {/* The Festive Cake Illustration */}
        <div className="relative w-full flex flex-col items-center select-none pt-12 pb-6">
          {/* 5 Birthday Candles sitting on top tier */}
          <div className="relative z-20 flex justify-center items-end gap-5 sm:gap-7 -mb-2">
            {[1, 2, 3, 4, 5].map(id => {
              const isLit = litCandles.includes(id);
              // Candle colors: festive palette
              const candleColors = [
                'from-amber-400 to-amber-600',
                'from-rose-400 to-rose-600',
                'from-orange-400 to-orange-600',
                'from-emerald-400 to-emerald-600',
                'from-indigo-400 to-purple-600',
              ];

              return (
                <button
                  key={id}
                  onClick={() => toggleCandle(id)}
                  title={`Candle #${id} (Click to ${isLit ? 'blow out' : 'light'})`}
                  className="group flex flex-col items-center focus:outline-none cursor-pointer"
                >
                  {/* Candle Flame */}
                  <div className="h-10 w-6 flex items-end justify-center mb-0.5">
                    {isLit ? (
                      <div className="relative flex flex-col items-center">
                        {/* Glow halo */}
                        <div className="absolute -inset-2 bg-amber-400/60 rounded-full blur-md animate-pulse" />
                        <svg
                          className="w-5 h-8 flame-active"
                          viewBox="0 0 20 32"
                          fill="none"
                        >
                          <path
                            d="M10 0 C12 7 19 13 19 20 C19 27 15 32 10 32 C5 32 1 27 1 20 C1 13 8 7 10 0 Z"
                            fill="#FBBF24"
                          />
                          <path
                            d="M10 7 C11 12 15 16 15 21 C15 26 13 29 10 29 C7 29 5 26 5 21 C5 16 9 12 10 7 Z"
                            fill="#EF4444"
                          />
                          <path
                            d="M10 15 C11 17 13 19 13 23 C13 25 12 28 10 28 C8 28 7 25 7 23 C7 19 9 17 10 15 Z"
                            fill="#FFFBEB"
                          />
                        </svg>
                      </div>
                    ) : (
                      /* Burnt / Unlit Wick */
                      <div className="w-1 h-3.5 bg-neutral-700 rounded-t-sm group-hover:bg-amber-500/50 transition-colors" />
                    )}
                  </div>

                  {/* Candle Stick */}
                  <div
                    className={`w-4 h-16 sm:h-20 rounded-t-sm rounded-b-xs bg-gradient-to-b ${
                      candleColors[id - 1]
                    } shadow-md border border-white/20 relative overflow-hidden`}
                  >
                    {/* Spiral gold stripes */}
                    <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.7)_4px,rgba(255,255,255,0.7)_7px)]" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Top Tier Cake */}
          <div className="relative z-10 w-56 sm:w-64 h-20 rounded-t-3xl bg-gradient-to-r from-amber-100 via-amber-50 to-amber-200 border-2 border-amber-300 shadow-[0_5px_15px_rgba(0,0,0,0.3)] flex flex-col justify-between overflow-hidden">
            {/* Saffron & Pistachio Frosting Drip */}
            <div className="w-full flex justify-around">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-4 bg-gradient-to-b from-orange-400 to-amber-500 rounded-b-full shadow-sm"
                />
              ))}
            </div>

            {/* Cake Inscription */}
            <div className="text-center font-['Cinzel'] text-amber-900 font-black text-sm tracking-widest drop-shadow-sm pb-2">
              ARJYA
            </div>

            {/* Marigold Petal border */}
            <div className="h-2 bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400 w-full" />
          </div>

          {/* Middle Tier Cake */}
          <div className="relative z-0 w-72 sm:w-80 h-24 rounded-t-xl bg-gradient-to-r from-[#381d45] via-[#4a245c] to-[#381d45] border-2 border-amber-400/60 shadow-[0_8px_20px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden">
            {/* Golden Pearl Beading */}
            <div className="w-full flex justify-between px-3 pt-1.5">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full bg-amber-300 shadow-sm" />
              ))}
            </div>

            {/* Message on Tier */}
            <div className="text-center font-['Marcellus'] text-amber-200 text-xs sm:text-sm font-semibold tracking-wider">
              ✨ Happy Birthday & Shubh Deepavali ✨
            </div>

            {/* Golden base trim */}
            <div className="h-2.5 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 w-full" />
          </div>

          {/* Bottom Cake Stand / Silver Platter */}
          <div className="w-80 sm:w-96 h-6 rounded-full bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 border border-amber-400 shadow-[0_12px_25px_rgba(0,0,0,0.7)] -mt-1 flex items-center justify-center">
            <div className="text-[10px] uppercase tracking-widest font-bold text-amber-900">
               Arjya Ananya Nayak
            </div>
          </div>
          {/* Platter Pedestal */}
          <div className="w-32 h-4 bg-gradient-to-b from-amber-500 to-amber-800 rounded-b-lg shadow-md" />
        </div>

        {/* Action button */}
        <div className="mt-4 text-center">
          <p className="text-xs text-amber-300/70 font-['Marcellus']">
            ✦ Click any unlit candle to light it, or tap a lit flame to blow it out ✦
          </p>
        </div>
      </div>
    </section>
  );
};
