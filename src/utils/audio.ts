/**
 * Web Audio API synthesizer for playing Happy Birthday tune
 * and festive sound effects without external audio files.
 */

// Happy Birthday melody notes and durations in beats
// F4, F4, G4, F4, Bb4, A4 ...
const NOTES: Record<string, number> = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  Bb4: 466.16,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.0,
  Bb5: 932.33,
  C6: 1046.5,
};

// Birthday tune in F Major:
// Happy (0.75) birth-(0.25) day (1) to (1) you (2)
const MELODY: Array<{ note: string; duration: number }> = [
  { note: 'C4', duration: 0.75 },
  { note: 'C4', duration: 0.25 },
  { note: 'D4', duration: 1.0 },
  { note: 'C4', duration: 1.0 },
  { note: 'F4', duration: 1.0 },
  { note: 'E4', duration: 2.0 },

  { note: 'C4', duration: 0.75 },
  { note: 'C4', duration: 0.25 },
  { note: 'D4', duration: 1.0 },
  { note: 'C4', duration: 1.0 },
  { note: 'G4', duration: 1.0 },
  { note: 'F4', duration: 2.0 },

  { note: 'C4', duration: 0.75 },
  { note: 'C4', duration: 0.25 },
  { note: 'C5', duration: 1.0 },
  { note: 'A4', duration: 1.0 },
  { note: 'F4', duration: 1.0 },
  { note: 'E4', duration: 1.0 },
  { note: 'D4', duration: 1.5 },

  { note: 'Bb4', duration: 0.75 },
  { note: 'Bb4', duration: 0.25 },
  { note: 'A4', duration: 1.0 },
  { note: 'F4', duration: 1.0 },
  { note: 'G4', duration: 1.0 },
  { note: 'F4', duration: 2.5 },
];

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timeoutIds: number[] = [];
  private onStateChangeCallback?: (playing: boolean) => void;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setOnStateChange(cb: (playing: boolean) => void) {
    this.onStateChangeCallback = cb;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Plays a warm, bell/music-box chime tone with gentle harmonics
   */
  public playTone(freq: number, duration: number, startTime: number, volume = 0.2) {
    const ctx = this.getContext();

    // Primary oscillator (sine for pure melodic chime)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    // Warm harmonic overtone (triangle at 2x freq for festive richness)
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, startTime);

    // Subtle sparkle overtone (celesta chime feel)
    const osc3 = ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 3, startTime);

    // Gain envelope
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, startTime);
    // Soft attack
    gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.04);
    // Gentle bell-like decay
    gain.gain.exponentialRampToValueAtTime(volume * 0.4, startTime + duration * 0.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // Secondary subtle gains
    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(volume * 0.25, startTime);
    gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.7);

    const gain3 = ctx.createGain();
    gain3.gain.setValueAtTime(volume * 0.12, startTime);
    gain3.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.5);

    osc1.connect(gain);
    osc2.connect(gain2);
    osc3.connect(gain3);

    gain.connect(ctx.destination);
    gain2.connect(ctx.destination);
    gain3.connect(ctx.destination);

    osc1.start(startTime);
    osc2.start(startTime);
    osc3.start(startTime);

    osc1.stop(startTime + duration);
    osc2.stop(startTime + duration);
    osc3.stop(startTime + duration);
  }

  /**
   * Starts playing the Happy Birthday melody in a loop
   */
  public playBirthdayMelody() {
    this.stopMelody();

    const ctx = this.getContext();
    this.isPlaying = true;
    this.onStateChangeCallback?.(true);

    const tempo = 0.55; // Seconds per beat
    let currentBeatTime = ctx.currentTime + 0.1;

    MELODY.forEach(({ note, duration }) => {
      const freq = NOTES[note];
      const noteDuration = duration * tempo;
      if (freq) {
        this.playTone(freq, noteDuration * 0.9, currentBeatTime, 0.22);
      }
      currentBeatTime += noteDuration;
    });

    const totalDurationMs = (currentBeatTime - ctx.currentTime) * 1000;

    // Loop after finished
    const loopTimeout = window.setTimeout(() => {
      if (this.isPlaying) {
        this.playBirthdayMelody();
      }
    }, totalDurationMs + 1200);

    this.timeoutIds.push(loopTimeout);
  }

  public stopMelody() {
    this.timeoutIds.forEach(id => clearTimeout(id));
    this.timeoutIds = [];
    this.isPlaying = false;
    this.onStateChangeCallback?.(false);
  }

  public toggleMelody() {
    if (this.isPlaying) {
      this.stopMelody();
    } else {
      this.playBirthdayMelody();
    }
  }

  /**
   * Festive chime for lighting a Diya or Candle
   */
  public playSparkSound() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      // Joyous ascending pentatonic shimmer (C6, E6, G6)
      [1046.5, 1318.51, 1567.98].forEach((freq, idx) => {
        this.playTone(freq, 0.4, now + idx * 0.06, 0.12);
      });
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  /**
   * Deep festive conch / bell blessing chime when all 8 diyas are lit
   */
  public playBlessingChime() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const chords = [523.25, 659.25, 783.99, 1046.5];
      chords.forEach(freq => {
        this.playTone(freq, 2.5, now, 0.15);
      });
    } catch {
      // Audio fallback
    }
  }

  /**
   * Soft puff / wish sound when blowing candles
   */
  public playBlowSound() {
    try {
      const ctx = this.getContext();
      const bufferSize = ctx.sampleRate * 0.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.5);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio fallback
    }
  }
}

export const soundSynth = new SoundSynthesizer();
