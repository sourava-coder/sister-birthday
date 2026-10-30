import React, { useState, useEffect } from 'react';
import { Heart, Maximize2, X } from 'lucide-react';
import { soundSynth } from '../utils/audio';

/**
 * =================================================================
 * SOURAVA: Add your five local photos in public/images:
 * hero.svg, memory-1.svg, memory-2.svg, memory-3.svg, memory-4.svg.
 * You can also edit the 'title', 'year', or 'caption' below.
 * =================================================================
 */
export interface MemoryItem {
  id: number;
  image: string;
  title: string;
  year: string;
  caption: string;
  likes: number;
}

export const MEMORIES_DATA: MemoryItem[] = [
  {
    id: 1,
    image: '/images/1.png',
    title: '[Your best photo ]',
    year: '[2022]',
    caption: '[Late night conversations, endless laughter, and planning festive Diwali pranks together. An unforgettable day where we smiled till our cheeks hurt.]',
    likes: 12,
  },
  {
    id: 2,
    image: '/images/2.png',
    title: '[Childhood laughs]',
    year: '[2023]',
    caption: '[From silly arguments over the TV remote to becoming each other\'s greatest confidant and biggest supporter through every test of life.]',
    likes: 18,
  },
  {
    id: 3,
    image: '/images/3.png',
    title: '[Our Crow in Sweet Smile]',
    year: '[2024]',
    caption: '[]',
    likes: 24,
  },
  {
    id: 4,
    image: '/images/4.png',
    title: '[To the best sister in the world]',
    year: '[2025]',
    caption: '[Growing up side by side has been the greatest gift. Watching you grow wiser, kinder, and more brilliant each year fills my heart with immense pride.]',
    likes: 31,
  },
];

export const MemoriesSection: React.FC = () => {
  const [memories, setMemories] = useState<MemoryItem[]>(MEMORIES_DATA);
  const [activeModalMemory, setActiveModalMemory] = useState<MemoryItem | null>(null);

  const handleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    soundSynth.playSparkSound();
    setMemories(prev =>
      prev.map(m => (m.id === id ? { ...m, likes: m.likes + 1 } : m))
    );
    if (activeModalMemory && activeModalMemory.id === id) {
      setActiveModalMemory(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
    }
  };

  return (
    <section id="memories" className="relative py-20 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold tracking-widest uppercase">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          Golden Moments & Nostalgia
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-['Cinzel'] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-rose-400">
          Cherished Memories
        </h2>
        <p className="text-sm sm:text-base text-amber-200/80 font-['Marcellus'] max-w-xl mx-auto">
          Every memory with you is like a radiant diya glowing in our journey. Tap any photo to enlarge and read the story.
        </p>
      </div>

      {/* 4 Photo Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {memories.map(item => (
          <div
            key={item.id}
            onClick={() => setActiveModalMemory(item)}
            className="group relative rounded-2xl bg-gradient-to-b from-[#180f2b] to-[#0d0718] border border-amber-500/30 hover:border-amber-400/80 shadow-[0_8px_25px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(245,158,11,0.25)] flex flex-col cursor-pointer"
          >
            {/* Photo Container */}
            <div className="relative h-60 w-full overflow-hidden bg-black/40">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
                loading="lazy"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#180f2b] via-transparent to-black/30" />

              {/* Year Tag Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-400/60 text-[11px] font-bold font-['Cinzel'] text-amber-200 shadow-sm">
                {item.year}
              </div>

              {/* Maximize Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-amber-300" />
              </div>

              {/* Heart Likes Pill */}
              <button
                onClick={e => handleLike(e, item.id)}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-rose-500/40 text-rose-300 hover:text-rose-200 text-xs backdrop-blur-sm transition-transform active:scale-90"
              >
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span className="font-semibold">{item.likes}</span>
              </button>
            </div>

            {/* Content Details */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h3 className="font-['Cinzel'] text-amber-200 font-bold text-sm leading-snug group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-amber-100/70 font-['Marcellus'] mt-1.5 line-clamp-3 leading-relaxed">
                  {item.caption}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-amber-400/70 border-t border-amber-500/20 font-['Marcellus']">
                <span>✦ Tap to view enlarged</span>
                <span className="text-amber-300 group-hover:underline">Read Story →</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal (Enlarged Photo View) */}
      {activeModalMemory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModalMemory(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#160d2b] rounded-3xl border-2 border-amber-400/80 shadow-[0_0_50px_rgba(245,158,11,0.4)] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalMemory(null)}
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 border border-amber-400/50 flex items-center justify-center text-amber-200 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large Image */}
            <div className="relative max-h-[50vh] sm:max-h-[58vh] overflow-hidden bg-black/60 flex items-center justify-center">
              <img
                src={activeModalMemory.image}
                alt={activeModalMemory.title}
                className="w-full h-full object-contain max-h-[55vh]"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-950/90 border border-amber-400 text-xs font-bold font-['Cinzel'] text-amber-200">
                {activeModalMemory.year}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-['Cinzel'] text-amber-200">
                    {activeModalMemory.title}
                  </h3>
                  <div className="text-xs text-amber-400/80 font-['Marcellus'] mt-0.5">
                    Cherished Memories of Arjya
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={e => handleLike(e, activeModalMemory.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/50 text-rose-200 text-xs font-semibold cursor-pointer active:scale-95 transition-transform"
                  >
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <span>{activeModalMemory.likes} Hearts</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/20 text-amber-100 font-['Marcellus'] text-sm sm:text-base leading-relaxed">
                {activeModalMemory.caption}
              </div>

              <div className="flex justify-between items-center text-xs text-amber-400/60 font-['Marcellus'] pt-2">
                <span>✨ Sibling bond illuminated this Diwali</span>
                <button
                  onClick={() => setActiveModalMemory(null)}
                  className="text-amber-300 hover:underline cursor-pointer"
                >
                  Close Window ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
