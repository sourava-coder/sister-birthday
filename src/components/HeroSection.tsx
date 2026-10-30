import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, ArrowDown, Heart, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundSynth } from '../utils/audio';

interface HeroSectionProps {
  onLightDiyasClick: () => void;
}

// Replace this demo image with your own photo in public/images.
const HERO_IMAGE_URL = '/images/4.png';

export const HeroSection: React.FC<HeroSectionProps> = ({ onLightDiyasClick }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Background ambient fireworks simulation for opening screen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      size: number;
      decay: number;
    }

    interface Firework {
      x: number;
      y: number;
      targetY: number;
      vy: number;
      exploded: boolean;
      color: string;
    }

    const fireworks: Firework[] = [];
    const particles: Particle[] = [];
    const colors = [
      '#F59E0B',
      '#FBBF24',
      '#F43F5E',
      '#EC4899',
      '#10B981',
      '#8B5CF6',
      '#38BDF8',
      '#F97316',
    ];

    const createFirework = () => {
      const x = Math.random() * (width * 0.8) + width * 0.1;
      const targetY = Math.random() * (height * 0.4) + height * 0.1;
      fireworks.push({
        x,
        y: height,
        targetY,
        vy: -7 - Math.random() * 4,
        exploded: false,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    const explode = (x: number, y: number, color: string) => {
      const count = 35 + Math.floor(Math.random() * 25);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: Math.random() * 2.5 + 1.2,
          decay: Math.random() * 0.015 + 0.01,
        });
      }
    };

    let timer = 0;
    const loop = () => {
      timer++;
      if (timer % 45 === 0) {
        createFirework();
      }

      ctx.fillStyle = 'rgba(8, 5, 17, 0.22)';
      ctx.fillRect(0, 0, width, height);

      // Update and draw fireworks rockets
      for (let i = fireworks.length - 1; i >= 0; i--) {
        const fw = fireworks[i];
        fw.y += fw.vy;
        ctx.beginPath();
        ctx.arc(fw.x, fw.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = fw.color;
        ctx.shadowColor = fw.color;
        ctx.shadowBlur = 8;
        ctx.fill();

        if (fw.y <= fw.targetY) {
          explode(fw.x, fw.y, fw.color);
          fireworks.splice(i, 1);
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 3D Parallax Tilt handling for the arched Diya photo card
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTilt({ x: rotateX, y: rotateY });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleBurst = () => {
    soundSynth.playSparkSound();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#EF4444', '#10B981', '#FBBF24', '#FFFFFF'],
    });
  };

  return (
    <section
      id="top"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden"
    >
      {/* Background fireworks canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0"
      />

      {/* Decorative ambient radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-gradient-to-tr from-amber-600/15 via-orange-500/20 to-rose-600/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Rising Name & Emotional Dedication */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-5">
          {/* Tagline / Subheading - Line 1 */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium tracking-wide shadow-[0_0_20px_rgba(245,158,11,0.2)] animate-[floatGently_3s_ease-in-out_infinite]"
            style={{ animationDelay: '0.2s' }}
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>Diwali Blessings & Birthday Wish</span>
            <span className="text-amber-500">✦</span>
            <span>To My Cherished Sister</span>
          </div>

          {/* Staggered Rising Title Block - Line 2 */}
          <div className="space-y-2">
            <h2 className="text-sm sm:text-base uppercase tracking-[0.25em] font-['Marcellus'] text-amber-200/90 font-medium">
              Happy Birthday Dearest
            </h2>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-['Cinzel'] tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 drop-shadow-[0_4px_25px_rgba(245,158,11,0.4)]">
              Arjya Ananya
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400">
                Nayak
              </span>
            </h1>
          </div>

          {/* Sibling Dedication - Line 3 */}
          <p className="text-base sm:text-lg text-amber-100/80 font-['Marcellus'] max-w-xl mx-auto lg:mx-0 leading-relaxed">
            As a million diyas brighten the night sky this Diwali, this day shines brightest because it marks the birth of an extraordinary sister.
          </p>

          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm font-medium">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-500/20 text-amber-200">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">From:</span>
              <span className="font-['Marcellus'] font-bold text-amber-100">Sourava Kumar Swain</span>
              {/* this line for heart emoji */}
              {/* <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse ml-0.5" /> */}
            </div>

            <div className="text-xs text-amber-300/70 font-['Marcellus']">
              ✨ Light the 8 diyas below to reveal your blessing
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <button
              onClick={onLightDiyasClick}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-amber-950 font-bold tracking-wider uppercase text-xs sm:text-sm shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:shadow-[0_0_40px_rgba(245,158,11,0.8)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer"
            >
              <Flame className="w-4 h-4 fill-amber-950" />
              Light 8 Sacred Diyas
            </button>

            <a
              href="#cake"
              className="px-6 py-3 rounded-full bg-amber-950/50 hover:bg-amber-900/60 border border-amber-500/40 text-amber-200 font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              Cut Birthday Cake 🎂
            </a>
          </div>
        </div>

        {/* Right Column: Arched Diya Photo Card with Gentle 3D Mouse Parallax Tilt */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleBurst}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${
                isHovered ? 1.03 : 1
              }, ${isHovered ? 1.03 : 1}, 1)`,
              transition: isHovered
                ? 'transform 0.1s ease-out'
                : 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
            className="relative cursor-pointer group w-[280px] sm:w-[340px] md:w-[380px] select-none"
          >
            {/* Ambient Background Glow Behind the Arch */}
            <div className="absolute -inset-4 bg-gradient-to-t from-orange-600/30 via-amber-500/30 to-amber-300/20 rounded-t-[190px] rounded-b-[40px] blur-2xl group-hover:blur-3xl opacity-75 group-hover:opacity-100 transition-all duration-500" />

            {/* Indian Jharokha / Royal Arched Frame */}
            <div className="relative rounded-t-[180px] rounded-b-[36px] p-2.5 bg-gradient-to-b from-amber-300 via-amber-600 to-amber-900 shadow-[0_15px_45px_rgba(0,0,0,0.8)] border border-amber-300/50">
              {/* Inner Decorative Arch Trim */}
              <div className="relative rounded-t-[170px] rounded-b-[28px] overflow-hidden bg-[#0e071e] p-1.5 border border-amber-500/40">
                {/* Traditional Arch Filigree Pattern Overlay */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-300/60 flex items-center justify-center shadow-lg">
                    <span className="text-amber-200 text-sm">🪔</span>
                  </div>
                </div>

                {/* Arched Photo with Traditional Glowing Diya */}
                <div className="relative h-[380px] sm:h-[440px] rounded-t-[160px] rounded-b-[24px] overflow-hidden">
                  <img
                    src={HERO_IMAGE_URL}
                    alt="Arched glowing Diwali Diya for Arjya"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-110"
                    loading="eager"
                  />

                  {/* Golden Gradient Lighting Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e071e] via-amber-950/20 to-transparent opacity-80" />

                  {/* Gentle Floating Embers inside Arch */}
                  <div className="absolute inset-0 pointer-events-none">
                    <span className="absolute bottom-16 left-8 w-2 h-2 rounded-full bg-amber-300 blur-[1px] animate-ping" />
                    <span className="absolute bottom-24 right-10 w-1.5 h-1.5 rounded-full bg-amber-400 blur-[0.5px] animate-pulse" />
                    <span className="absolute bottom-36 left-16 w-2 h-2 rounded-full bg-orange-400 blur-[1px] animate-bounce" />
                  </div>

                  {/* Arch Card Footer Text */}
                  <div className="absolute bottom-0 inset-x-0 p-5 text-center bg-gradient-to-t from-[#0c0618] via-[#0c0618]/90 to-transparent">
                    <div className="font-['Cinzel'] text-amber-200 font-bold text-lg tracking-wide drop-shadow-md">
                      Arjya Ananya
                    </div>
                    <div className="text-xs text-amber-300/80 font-['Marcellus'] mt-0.5">
                      "May you shine brighter than every flame."
                    </div>
                    <div className="text-[11px] text-amber-400/60 mt-1 flex items-center justify-center gap-1">
                      <span>✨ Tap to sprinkle festive stardust</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle Tilt Indicator badge */}
            <div className="text-center mt-3 text-[11px] font-['Marcellus'] text-amber-400/60 tracking-wider">
              ✦ Move cursor to tilt the sacred arch ✦
            </div>
          </div>
        </div>
      </div>

      {/* Downward Scroll Indicator */}
      <a
        href="#diyas"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-amber-300/60 hover:text-amber-200 transition-colors"
      >
        <span className="text-[11px] tracking-widest uppercase font-['Marcellus']">
          Discover Celebration
        </span>
        <ArrowDown className="w-4 h-4 animate-bounce mt-1 text-amber-400" />
      </a>
    </section>
  );
};
