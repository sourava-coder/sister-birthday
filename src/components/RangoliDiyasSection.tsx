import React, { useState } from 'react';
import { Flame, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundSynth } from '../utils/audio';

const DIYA_BLESSINGS = [
  { id: 1, name: 'Ananda', title: 'Light of Joy', meaning: 'May your days overflow with laughter and boundless cheer.' },
  { id: 2, name: 'Aarogya', title: 'Light of Health', meaning: 'May vibrant energy and radiant wellness accompany you always.' },
  { id: 3, name: 'Samriddhi', title: 'Light of Prosperity', meaning: 'May abundance and success bless all your endeavors.' },
  { id: 4, name: 'Vidya', title: 'Light of Wisdom', meaning: 'May sharp intellect and graceful wisdom guide your choices.' },
  { id: 5, name: 'Dirghayu', title: 'Light of Longevity', meaning: 'May you enjoy a long, adventurous, and fulfilling life.' },
  { id: 6, name: 'Shanti', title: 'Light of Peace', meaning: 'May your mind remain tranquil like a quiet sacred lake.' },
  { id: 7, name: 'Prema', title: 'Light of Sibling Love', meaning: 'May the bond between sister and brother stay unbroken forever.' },
  { id: 8, name: 'Vijaya', title: 'Light of Triumph', meaning: 'May you conquer every ambition and soar to new heights.' },
];

export const RangoliDiyasSection: React.FC = () => {
  // All 8 diyas start unlit so Arjya can light every single one
  const [litDiyas, setLitDiyas] = useState<number[]>([]);
  const [showBlessingModal, setShowBlessingModal] = useState(false);
  const [selectedDiyaInfo, setSelectedDiyaInfo] = useState<typeof DIYA_BLESSINGS[0] | null>(null);

  const allLit = litDiyas.length === 8;

  const triggerAllLitCelebration = () => {
    soundSynth.playBlessingChime();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FBBF24', '#F59E0B', '#EF4444', '#10B981', '#FFFFFF'],
    });
    setTimeout(() => {
      setShowBlessingModal(true);
    }, 400);
  };

  const toggleDiya = (id: number) => {
    soundSynth.playSparkSound();
    const diya = DIYA_BLESSINGS.find(d => d.id === id);
    if (diya) {
      setSelectedDiyaInfo(diya);
    }

    if (litDiyas.includes(id)) {
      setLitDiyas(prev => prev.filter(item => item !== id));
    } else {
      const next = [...litDiyas, id];
      setLitDiyas(next);
      if (next.length === 8) {
        triggerAllLitCelebration();
      }
    }
  };

  const lightAll = () => {
    setLitDiyas([1, 2, 3, 4, 5, 6, 7, 8]);
    triggerAllLitCelebration();
  };

  const resetDiyas = () => {
    setLitDiyas([]);
    setShowBlessingModal(false);
  };

  return (
    <section id="diyas" className="relative py-20 px-4 max-w-6xl mx-auto">
      {/* Decorative Title Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-widest uppercase">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          Interactive Diwali Ritual
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-['Cinzel'] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-orange-400">
          The 8 Sacred Diyas & Rangoli
        </h2>
        <p className="text-sm sm:text-base text-amber-200/80 font-['Marcellus'] max-w-xl mx-auto">
          Tap each of the eight diyas placed around the revolving Rangoli. When all eight are ignited, a special birthday blessing will be unveiled for Arjya.
        </p>

        {/* Counter and controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-200 text-xs font-semibold">
            <span>Diyas Lit:</span>
            <span className="text-amber-400 font-bold text-sm">{litDiyas.length} / 8</span>
            {allLit && <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-1" />}
          </div>

          <button
            onClick={lightAll}
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-amber-950 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Light All Diyas 🪔
          </button>

          {litDiyas.length > 0 && (
            <button
              onClick={resetDiyas}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/30 text-amber-300/80 hover:text-amber-200 text-xs transition-all cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Stage: Rotating Rangoli + 8 Orbiting Diyas */}
      <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[540px] md:h-[540px] mx-auto flex items-center justify-center select-none my-6">
        {/* Golden Central Aura */}
        <div className={`absolute inset-10 rounded-full transition-all duration-1000 ${
          allLit
            ? 'bg-gradient-to-tr from-amber-500/30 via-orange-500/35 to-rose-500/20 blur-3xl scale-110'
            : 'bg-amber-500/10 blur-2xl'
        }`} />

        {/* Outer Circular Track */}
        <div className="absolute inset-4 sm:inset-6 rounded-full border border-amber-500/20 border-dashed pointer-events-none" />
        <div className="absolute inset-12 sm:inset-16 rounded-full border border-amber-400/10 pointer-events-none" />

        {/* Central Rotating Rangoli SVG */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 flex items-center justify-center">
          {/* Slowly Rotating Intricate Rangoli */}
          <div className="absolute inset-0 spin-slow">
            <svg
              viewBox="0 0 300 300"
              className="w-full h-full opacity-85 filter drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]"
            >
              <defs>
                <radialGradient id="rangoliGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Concentric rings */}
              <circle cx="150" cy="150" r="140" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="150" cy="150" r="125" fill="none" stroke="#D97706" strokeWidth="1" />
              <circle cx="150" cy="150" r="105" fill="none" stroke="#FBBF24" strokeWidth="1.5" />
              <circle cx="150" cy="150" r="85" fill="none" stroke="#EF4444" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="150" cy="150" r="60" fill="url(#rangoliGlow)" />

              {/* 16 Rangoli Petals */}
              {Array.from({ length: 16 }).map((_, i) => (
                <g key={`petal-${i}`} transform={`rotate(${i * 22.5} 150 150)`}>
                  <path
                    d="M150 45 C162 75 168 105 150 125 C132 105 138 75 150 45 Z"
                    fill={i % 2 === 0 ? '#F59E0B' : '#EF4444'}
                    fillOpacity="0.75"
                    stroke="#FDE68A"
                    strokeWidth="1"
                  />
                  <circle cx="150" cy="40" r="3.5" fill="#FDE68A" />
                </g>
              ))}

              {/* Inner 8 Lotus Petals */}
              {Array.from({ length: 8 }).map((_, i) => (
                <g key={`inner-petal-${i}`} transform={`rotate(${i * 45 + 22.5} 150 150)`}>
                  <path
                    d="M150 90 C158 110 162 130 150 140 C138 130 142 110 150 90 Z"
                    fill="#FBBF24"
                    fillOpacity="0.85"
                    stroke="#92400E"
                    strokeWidth="0.8"
                  />
                </g>
              ))}

              {/* Center Medallion */}
              <circle cx="150" cy="150" r="28" fill="#78350F" stroke="#FDE68A" strokeWidth="2" />
              <circle cx="150" cy="150" r="16" fill="#F59E0B" />
              <circle cx="150" cy="150" r="8" fill="#FFFBEB" />
            </svg>
          </div>

          {/* Reverse Rotating Counter Ring for visual richness */}
          <div className="absolute inset-6 spin-slow-reverse pointer-events-none opacity-40">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <g key={`dot-${i}`} transform={`rotate(${i * 30} 100 100)`}>
                  <circle cx="100" cy="20" r="2" fill="#FBBF24" />
                </g>
              ))}
            </svg>
          </div>

          {/* Center Diya or OM symbol */}
          <div className="relative z-10 w-16 h-16 rounded-full bg-[#160c29]/90 border border-amber-400/60 flex flex-col items-center justify-center shadow-lg shadow-amber-950">
            <span className="text-xl text-amber-300 font-['Cinzel'] font-bold leading-none">
              ॐ
            </span>
            <span className="text-[9px] uppercase tracking-wider text-amber-400/80 font-['Marcellus']">
              Arjya
            </span>
          </div>
        </div>

        {/* 8 Radially Placed Interactive Diyas */}
        {DIYA_BLESSINGS.map((diya, index) => {
          const isLit = litDiyas.includes(diya.id);
          // 8 angles: 0, 45, 90, 135, 180, 225, 270, 315 degrees (shifted -90 so index 0 is at Top)
          const angleDeg = index * 45 - 90;
          const angleRad = (angleDeg * Math.PI) / 180;
          // Radius based on container size
          const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 135 : 205;
          const x = Math.cos(angleRad) * radius;
          const y = Math.sin(angleRad) * radius;

          return (
            <button
              key={diya.id}
              onClick={() => toggleDiya(diya.id)}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
              title={`${diya.title}: ${diya.meaning} (Click to ${isLit ? 'extinguish' : 'light'})`}
              className={`absolute z-20 flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 group cursor-pointer focus:outline-none ${
                isLit
                  ? 'scale-110 drop-shadow-[0_0_20px_rgba(245,158,11,0.8)]'
                  : 'hover:scale-105 opacity-80 hover:opacity-100'
              }`}
            >
              {/* Flame (Only visible when Lit) */}
              <div className="relative h-9 w-6 flex items-end justify-center mb-0.5">
                {isLit ? (
                  <div className="relative flex flex-col items-center">
                    {/* Flame Outer Glow */}
                    <div className="absolute -inset-2 bg-amber-400/50 rounded-full blur-md animate-pulse" />
                    {/* Flame Body */}
                    <svg
                      className="w-6 h-8 flame-active"
                      viewBox="0 0 24 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Outer Yellow Flame */}
                      <path
                        d="M12 0 C14 8 22 14 22 22 C22 29 17.5 35 12 35 C6.5 35 2 29 2 22 C2 14 10 8 12 0 Z"
                        fill="#FBBF24"
                      />
                      {/* Inner Orange Core */}
                      <path
                        d="M12 8 C13.5 13 18 17 18 23 C18 28 15 32 12 32 C9 32 6 28 6 23 C6 17 10.5 13 12 8 Z"
                        fill="#F97316"
                      />
                      {/* White Hot Center */}
                      <path
                        d="M12 17 C13 20 15 22 15 26 C15 29 13.5 31 12 31 C10.5 31 9 29 9 26 C9 22 11 20 12 17 Z"
                        fill="#FFFBEB"
                      />
                    </svg>
                    {/* Floating Ember Particle */}
                    <span className="absolute -top-1 w-1 h-1 bg-amber-200 rounded-full animate-ping" />
                  </div>
                ) : (
                  <div className="w-1.5 h-3.5 bg-neutral-600/60 rounded-t-sm" />
                )}
              </div>

              {/* Clay Diya Pot */}
              <div
                className={`w-12 h-6 sm:w-14 sm:h-7 rounded-b-full rounded-t-sm border transition-all duration-300 relative flex items-center justify-center ${
                  isLit
                    ? 'bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 border-amber-400 shadow-[0_4px_12px_rgba(245,158,11,0.5)]'
                    : 'bg-gradient-to-b from-stone-700 via-stone-800 to-stone-900 border-stone-600 shadow-sm'
                }`}
              >
                {/* Diya Rim Details */}
                <div
                  className={`w-10 sm:w-12 h-1 rounded-full ${
                    isLit ? 'bg-amber-300/80 shadow-[0_0_8px_#fbbf24]' : 'bg-stone-500/50'
                  }`}
                />
              </div>

              {/* Label below Diya */}
              <span
                className={`text-[10px] sm:text-xs font-['Marcellus'] font-semibold mt-1 tracking-wider whitespace-nowrap transition-colors ${
                  isLit ? 'text-amber-300' : 'text-stone-400 group-hover:text-amber-200'
                }`}
              >
                {diya.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Diya Meaning or Hint Banner */}
      <div className="max-w-md mx-auto text-center mt-6 p-4 rounded-xl bg-amber-950/30 border border-amber-500/20 backdrop-blur-sm">
        {selectedDiyaInfo ? (
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold font-['Cinzel']">
              {selectedDiyaInfo.title} ({selectedDiyaInfo.name})
            </div>
            <div className="text-sm text-amber-100 font-['Marcellus'] mt-1">
              "{selectedDiyaInfo.meaning}"
            </div>
          </div>
        ) : (
          <div className="text-xs text-amber-300/70 font-['Marcellus']">
            ✦ Tap any diya to ignite its auspicious flame and read its blessing ✦
          </div>
        )}
      </div>

      {/* When All 8 Diyas Are Lit: Divine Blessing Reveal Card */}
      {allLit && (
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#180d2c] via-[#120822] to-[#0a0515] border-2 border-amber-400/80 shadow-[0_0_50px_rgba(245,158,11,0.4)] text-center relative overflow-hidden animate-[pulseGlow_4s_ease-in-out_infinite]">
          {/* Top Decorative Motif */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/20 border border-amber-300 text-amber-300 mb-3">
            <Sparkles className="w-6 h-6 animate-spin text-amber-400" />
          </div>

          <div className="text-xs sm:text-sm uppercase tracking-[0.2em] font-['Cinzel'] text-amber-300 font-bold">
            The Eightfold Diwali Blessing Unlocked
          </div>

          {/* Sanskrit Shloka */}
          <div className="my-3 text-lg sm:text-xl font-['Cinzel'] text-amber-200 font-bold tracking-wide">
            ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्माऽमृतं गमय ॥
          </div>

          <p className="text-xs sm:text-sm text-amber-300/80 font-['Marcellus'] italic max-w-xl mx-auto">
            "Lead us from darkness unto light, from falsehood unto truth, from mortality unto eternity."
          </p>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-4" />

          {/* Personalized Blessing for Arjya from Sourava */}
          <div className="max-w-2xl mx-auto space-y-3">
            <p className="text-base sm:text-lg text-amber-50 font-['Marcellus'] leading-relaxed">
              Dearest <strong className="text-amber-300 font-['Cinzel']">Arjya Ananya Nayak</strong>, as all eight sacred diyas burn bright with uninterrupted grace, may their radiant glow illuminate your birthday and every single milestone of your journey.
            </p>
            <p className="text-sm text-amber-200/90 font-['Marcellus'] leading-relaxed">
              May the festive lights keep your spirits high, dissolve all worries, and shower your path with joy, wisdom, sound health, and boundless accomplishments.
            </p>
            <div className="pt-2 text-xs uppercase tracking-widest text-amber-400 font-bold">
              — Blessed with love & warmest festive wishes —
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <a
              href="#cake"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-amber-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Continue to Birthday Cake 🎂
            </a>
          </div>
        </div>
      )}
    </section>
  );
};
