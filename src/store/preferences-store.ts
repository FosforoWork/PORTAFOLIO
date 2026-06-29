import { create } from 'zustand';

interface PreferencesState {
  soundEnabled: boolean;
  reducedMotion: boolean;
  toggleSound: () => void;
  toggleMotion: () => void;
}

export const usePreferences = create<PreferencesState>((set, get) => ({
  soundEnabled: false,
  reducedMotion: false,

  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

  toggleMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
}));
