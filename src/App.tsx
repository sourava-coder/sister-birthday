import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FestiveTicker } from './components/FestiveTicker';
import { RangoliDiyasSection } from './components/RangoliDiyasSection';
import { CakeSection } from './components/CakeSection';
import { MemoriesSection } from './components/MemoriesSection';
import { LetterSection } from './components/LetterSection';
import { FireworksCanvas } from './components/FireworksCanvas';
import { Footer } from './components/Footer';
import confetti from 'canvas-confetti';
import { soundSynth } from './utils/audio';

export default function App() {
  const triggerGlobalFireworks = () => {
    soundSynth.playSparkSound();
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#F59E0B', '#EF4444', '#10B981', '#FBBF24', '#EC4899', '#8B5CF6'],
    });
  };

  const scrollToDiyas = () => {
    const el = document.getElementById('diyas');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080511] text-amber-50 relative selection:bg-amber-500 selection:text-amber-950 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar */}
      <Navbar onTriggerFireworks={triggerGlobalFireworks} />

      {/* Main One-Page Content */}
      <main className="relative z-10">
        {/* 1. Opening Hero Screen: Rising name + Fireworks + Arched Diya 3D Tilt Card */}
        <HeroSection onLightDiyasClick={scrollToDiyas} />

        {/* 2. Scrolling Festive Diwali Banner */}
        <FestiveTicker />

        {/* 3. Diyas and Rangoli: 8 tappable diyas orbiting a slowly turning Rangoli */}
        <RangoliDiyasSection />

        {/* 4. Cake Surprise: 5 tappable candles, confetti trigger & "Make a wish, Arjya!" */}
        <CakeSection />

        {/* 5. Memories: 4 bracketed photo cards with lightbox modal & customization */}
        <MemoriesSection />

        {/* 6. Letter: Interactive envelope opening to handwritten letter from Sourava */}
        <LetterSection />

        {/* 7. Finale: Tap anywhere for fireworks interactive night sky */}
        <FireworksCanvas />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
