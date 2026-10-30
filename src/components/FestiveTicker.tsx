import React from 'react';

export const FestiveTicker: React.FC = () => {
  const items = [
    '✨ Shubh Deepavali & Happy Birthday Arjya! ✨',
    '🪔 May your life sparkle with boundless happiness & health 🪔',
    '🌸 For the sweetest sister, Arjya Ananya Nayak 🌸',
    '🎂 May all your dreams take flight this year! 🎂',
    '💫 Warmest festive birthday wishes & blessings 💫',
    '🪷 May divine lights guide every step of your journey 🪷',
    '✨ Arjya Ananya Nayak • Diwali 2026 ✨',
  ];

  return (
    <div className="w-full bg-gradient-to-r from-amber-950/80 via-amber-900/60 to-amber-950/80 border-y border-amber-500/30 overflow-hidden py-2.5 backdrop-blur-sm select-none">
      <div className="flex w-max animate-[slowSpin_120s_linear_infinite] whitespace-nowrap">
        {/* Repeating banner elements for infinite marquee */}
        {[...items, ...items, ...items].map((text, idx) => (
          <div
            key={idx}
            className="inline-flex items-center mx-6 text-xs sm:text-sm font-['Marcellus'] tracking-wider text-amber-200/90 font-medium"
          >
            <span>{text}</span>
            <span className="mx-4 text-amber-500/60">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
};
