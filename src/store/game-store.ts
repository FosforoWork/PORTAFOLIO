import { create } from 'zustand';

interface GameState {
  soundEnabled: boolean;
  reducedMotion: boolean;
  xp: number;
  maxXp: number;
  level: number;
  completedQuests: string[];
  toggleSound: () => void;
  toggleMotion: () => void;
  addXp: (amount: number) => void;
  completeQuest: (title: string) => void;
  playSfx: (type: 'click' | 'hover' | 'levelup' | 'save') => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  soundEnabled: false,
  reducedMotion: false,
  xp: 0,
  maxXp: 1000, // XP needed for max scroll level
  level: 1,
  completedQuests: [],

  toggleSound: () => {
    const nextState = !get().soundEnabled;
    set({ soundEnabled: nextState });
    if (nextState) {
      get().playSfx('click');
    }
  },

  toggleMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),

  addXp: (amount) => set((state) => {
    const newXp = Math.min(state.xp + amount, state.maxXp);
    const newLevel = Math.floor(newXp / 200) + 1; // Level up every 200 XP
    if (newLevel > state.level && state.soundEnabled) {
      // Play level-up sound after a tiny delay
      setTimeout(() => get().playSfx('levelup'), 50);
    }
    return { xp: newXp, level: newLevel };
  }),

  completeQuest: (title) => set((state) => {
    if (state.completedQuests.includes(title)) return {};
    const newQuests = [...state.completedQuests, title];
    if (state.soundEnabled) {
      get().playSfx('save');
    }
    return { completedQuests: newQuests };
  }),

  // Synthesize retro 8-bit sound effects using Web Audio API (zero weight, zero imports!)
  playSfx: (type) => {
    if (!get().soundEnabled) return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'click') {
        // High click sound
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.1);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'hover') {
        // Soft short hover sound
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'levelup') {
        // Arpeggio chord level-up
        osc.type = 'sine';
        osc.frequency.setValueAtTime(261.63, now); // C4
        osc.frequency.setValueAtTime(329.63, now + 0.08); // E4
        osc.frequency.setValueAtTime(392.00, now + 0.16); // G4
        osc.frequency.setValueAtTime(523.25, now + 0.24); // C5
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'save') {
        // Coin ring / Save game chime
        osc.type = 'square';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880.00, now + 0.1); // A5
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {
      console.warn('AudioContext not supported or blocked by browser policy:', e);
    }
  }
}));
