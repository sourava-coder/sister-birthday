import React, { useState } from 'react';
import { Mail, Heart, Unlock } from 'lucide-react';
import { soundSynth } from '../utils/audio';

/**
 * =================================================================
 * SOURAVA: YOU CAN EDIT YOUR HANDWRITTEN LETTER RIGHT HERE!
 * Just modify the text inside DEFAULT_LETTER_TEXT below.
 * =================================================================
 */
export const DEFAULT_LETTER_TEXT = `Dearest Arjya,

Happy Birthday! 🪔✨

Having your birthday align with Diwali is such a fitting reflection of who you are. You bring a warmth and light into our lives that is so much brighter than any firecracker or festive lamp.

From our childhood days of silly arguments and stolen sweets to standing shoulder-to-shoulder as adults, having you as my sister is one of the greatest blessings I cherish every single day. I see your resilience, your quiet courage, your contagious laughter, and how you brighten every room you walk into.

On this special birthday, I pray that every obstacle in your path turns into an open door. May your ambitions take flight, may your health stay strong, and may your heart always be as full of joy and confidence as it is today. Never forget how proud I am to be your brother.

Enjoy every bite of cake, every sparkler, and every moment of this festival.

With endless love, blessings, and brotherly pride,
Sourava Kumar Swain`;

export const LetterSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEnvelope = () => {
    soundSynth.playSparkSound();
    setIsOpen(!isOpen);
  };

  return (
    <section id="letter" className="relative py-20 px-4 max-w-4xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-widest uppercase">
          <Mail className="w-3.5 h-3.5 text-amber-400" />
          A Special Brotherly Message
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-['Cinzel'] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-orange-400">
          The Handwritten Letter
        </h2>
        <p className="text-sm sm:text-base text-amber-200/80 font-['Marcellus'] max-w-lg mx-auto">
          An envelope sealed with festive wax. Tap the seal to open and read the handwritten words for you.
        </p>
      </div>

      {/* Interactive Envelope Container */}
      <div className="relative max-w-2xl mx-auto">
        <div
          onClick={!isOpen ? toggleEnvelope : undefined}
          className={`relative rounded-3xl transition-all duration-700 ${
            isOpen
              ? 'bg-[#1b0e2b] border-2 border-amber-400/80 shadow-[0_0_50px_rgba(245,158,11,0.3)] p-4 sm:p-8'
              : 'bg-gradient-to-b from-[#2a1338] via-[#1b0e2b] to-[#12071f] border-2 border-amber-500/60 hover:border-amber-400 shadow-2xl p-8 sm:p-12 cursor-pointer hover:scale-[1.02]'
          }`}
        >
          {/* Top Envelope Flap Representation when closed */}
          {!isOpen ? (
            <div className="flex flex-col items-center justify-center text-center space-y-6 py-6 select-none">
              {/* Postal Stamp & Traditional Postmarks */}
              <div className="w-full flex justify-between items-start border-b border-amber-500/20 pb-4">
                <div className="text-left font-['Marcellus']">
                  <div className="text-[10px] uppercase tracking-widest text-amber-400/70">From:</div>
                  <div className="text-sm text-amber-200 font-bold">Sourava Kumar Swain</div>
                  <div className="text-[11px] text-amber-300/60">Festive Diwali 2026</div>
                </div>

                {/* Decorative Diwali Postal Stamp */}
                <div className="w-14 h-16 rounded-md border-2 border-dashed border-amber-400/80 bg-amber-950/60 flex flex-col items-center justify-center p-1 shadow-md">
                  <span className="text-base">🪔</span>
                  <span className="text-[8px] font-['Cinzel'] text-amber-300 uppercase tracking-tighter">
                    Diwali
                  </span>
                  <span className="text-[7px] text-amber-400/80">Birthday</span>
                </div>
              </div>

              {/* Addressee Info in the center */}
              <div className="py-2 space-y-1">
                <div className="text-xs uppercase tracking-widest text-amber-400/80 font-['Marcellus']">
                  Exclusively For:
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-['Cinzel'] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-orange-400">
                  Arjya Ananya Nayak
                </div>
                <div className="text-xs font-['Marcellus'] text-amber-200/70 italic">
                  "To the brightest sister under the Diwali sky"
                </div>
              </div>

              {/* Wax Seal Button */}
              <div className="relative group pt-2">
                <button
                  onClick={toggleEnvelope}
                  className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-600 via-red-700 to-amber-900 border-2 border-amber-300/80 shadow-[0_0_25px_rgba(239,68,68,0.6)] group-hover:scale-110 group-active:scale-95 transition-all cursor-pointer"
                  title="Click to break wax seal and open letter"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-xl">🪔</span>
                    <span className="text-[9px] font-bold font-['Cinzel'] text-amber-100 tracking-wider">
                      OPEN
                    </span>
                  </div>
                </button>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-amber-300 font-['Marcellus'] animate-pulse">
                  ✦ Tap seal to open letter ✦
                </div>
              </div>
            </div>
          ) : (
            /* Open Letter: Sliding Parchment with Handwritten Font */
            <div className="animate-fade-in space-y-6">
              {/* Top Controls Bar */}
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-300 font-semibold font-['Cinzel']">
                  <Unlock className="w-4 h-4 text-emerald-400" />
                  Letter Unsealed for Arjya
                </div>
                <button
                  onClick={toggleEnvelope}
                  className="px-3 py-1 rounded-full bg-black/40 hover:bg-black/60 text-stone-300 hover:text-white text-xs transition-colors cursor-pointer"
                >
                  Close Envelope ✕
                </button>
              </div>

              {/* The Parchment Letter Itself */}
              <div className="relative rounded-2xl bg-[#fffbeb] p-6 sm:p-10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] border-2 border-amber-200/80 overflow-hidden">
                {/* Parchment Texture Accents */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-200/40 to-transparent pointer-events-none rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-200/40 to-transparent pointer-events-none rounded-bl-2xl" />

                {/* Decorative Diya Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.05] text-[180px] select-none text-amber-900">
                  🪔
                </div>

                {/* Handwritten Content */}
                <div className="relative z-10 font-['Caveat'] text-xl sm:text-2xl text-amber-950 font-medium leading-relaxed whitespace-pre-line">
                  {DEFAULT_LETTER_TEXT}
                </div>

                {/* Wax Seal Stamp on the parchment bottom corner */}
                <div className="mt-8 pt-4 border-t border-amber-900/20 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-900/80 font-['Marcellus'] text-xs">
                    <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                    Written with warmth & sisterly love
                  </div>

                  <div className="w-12 h-12 rounded-full bg-red-700 border-2 border-amber-300 flex items-center justify-center text-amber-100 shadow-md">
                    <span className="text-base">🪔</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
