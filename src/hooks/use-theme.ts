export type ThemeId = 'sage-forest';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  colors: {
    accent: string;
    background: string;
    text: string;
    card: string;
  };
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'sage-forest',
    name: 'Sage Forest',
    colors: {
      accent: '#8ECA9A',
      background: '#121815',
      text: '#F3F7F4',
      card: '#1C2521',
    },
  },
];

export function useTheme() {
  return {
    theme: 'sage-forest' as ThemeId,
    setTheme: () => {},
    themes: THEMES,
    currentThemeConfig: THEMES[0],
  };
}
