import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Maximize2, Zap, RotateCcw } from 'lucide-react';
import { soundSynth } from '../utils/audio';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
  gravity: number;
  trail: Array<{ x: number; y: number }>;
}

interface Rocket {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  exploded: boolean;
}

export const FireworksCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({ launched: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const rocketsRef = useRef<Rocket[]>([]);
  const particlesRef = useRef<Particle[]>([]);

  const colors = [
    '#F59E0B', // Amber
    '#FBBF24', // Gold
    '#EF4444', // Red
    '#EC4899', // Pink
    '#10B981', // Emerald
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#F97316', // Orange
    '#FFFFFF', // White
  ];

  const explodeAt = (x: number, y: number, baseColor?: string) => {
    soundSynth.playSparkSound();
    const count = 40 + Math.floor(Math.random() * 30);
    const chosenColor = baseColor || colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
      const speed = Math.random() * 5 + 1.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: Math.random() > 0.4 ? chosenColor : '#FDE68A',
        size: Math.random() * 3 + 1.2,
        decay: Math.random() * 0.015 + 0.012,
        gravity: 0.05,
        trail: [],
      });
    }
    setStats(prev => ({ launched: prev.launched + 1 }));
  };

  const launchRocketTo = (targetX: number, targetY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const startX = targetX + (Math.random() - 0.5) * 100;
    const startY = canvas.height;
    const distanceY = startY - targetY;
    const speed = 12 + Math.random() * 4;
    const time = distanceY / speed;
    const vx = (targetX - startX) / time;
    const vy = -speed;

    rocketsRef.current.push({
      x: startX,
      y: startY,
      targetX,
      targetY,
      vx,
      vy,
      color: colors[Math.floor(Math.random() * colors.length)],
      exploded: false,
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Launch rocket to clicked location
    launchRocketTo(x, y);
  };

  const handleShower = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const x = Math.random() * (canvas.width * 0.8) + canvas.width * 0.1;
        const y = Math.random() * (canvas.height * 0.5) + canvas.height * 0.15;
        launchRocketTo(x, y);
      }, i * 220);
    }
  };

  const handleAnarFountain = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    soundSynth.playSparkSound();
    const centerX = canvas.width / 2;
    const baseY = canvas.height - 20;

    for (let i = 0; i < 70; i++) {
      setTimeout(() => {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.8;
        const speed = Math.random() * 9 + 4;
        particlesRef.current.push({
          x: centerX + (Math.random() - 0.5) * 30,
          y: baseY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: Math.random() > 0.3 ? '#FBBF24' : '#F97316',
          size: Math.random() * 2.5 + 1.5,
          decay: Math.random() * 0.02 + 0.015,
          gravity: 0.15,
          trail: [],
        });
      }, i * 15);
    }
  };

  // Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      canvas.width = containerRef.current.clientWidth;
      canvas.height = Math.min(520, window.innerHeight * 0.65);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.fillStyle = 'rgba(8, 4, 18, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars in sky background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';

      // Process rockets
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const r = rocketsRef.current[i];
        r.x += r.vx;
        r.y += r.vy;

        // Sparkle trail behind rocket
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 10;
        ctx.fill();

        // Check if reached target
        if (r.y <= r.targetY || r.vy >= 0) {
          explodeAt(r.x, r.y, r.color);
          rocketsRef.current.splice(i, 1);
        }
      }

      // Process explosion particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="fireworks" className="relative py-20 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Grand Diwali Sky Finale
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-['Cinzel'] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-orange-400">
          Tap Anywhere for Fireworks
        </h2>
        <p className="text-sm sm:text-base text-amber-200/80 font-['Marcellus'] max-w-lg mx-auto">
          Tap or click anywhere in the night sky below to launch bursting fireworks rockets for Arjya's birthday!
        </p>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleShower}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-amber-950 font-bold text-xs uppercase tracking-wider shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            Launch Rocket Shower 🚀
          </button>

          <button
            onClick={handleAnarFountain}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/40 text-amber-200 font-semibold text-xs transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            Golden Anar Fountain 🎇
          </button>

          <div className="text-xs font-['Marcellus'] text-amber-300/80 px-3 py-1.5 rounded-full bg-black/40 border border-amber-500/20">
            Total Bursts: <strong className="text-amber-400">{stats.launched}</strong>
          </div>
        </div>
      </div>

      {/* Interactive Sky Canvas Box */}
      <div
        ref={containerRef}
        className="relative rounded-3xl overflow-hidden border-2 border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.2)] bg-gradient-to-b from-[#06030c] via-[#090514] to-[#120722]"
      >
        {/* Sky instructions overlay */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2 text-xs text-amber-300/80 font-['Marcellus'] bg-black/50 px-3 py-1 rounded-full border border-white/10">
          <span>✨ Click or tap anywhere in the sky</span>
        </div>

        {/* Diya Cityscape silhouette at bottom */}
        <div className="absolute bottom-0 inset-x-0 h-16 pointer-events-none bg-gradient-to-t from-black via-black/80 to-transparent flex items-end justify-around px-4 pb-2 z-10">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
              <div className="w-4 h-2 bg-amber-700 rounded-b-full border border-amber-500/40" />
            </div>
          ))}
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="w-full h-[380px] sm:h-[460px] cursor-crosshair block"
        />
      </div>
    </section>
  );
};
