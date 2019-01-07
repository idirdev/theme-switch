export type Theme = 'light' | 'dark';
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  defaultMode?: ThemeMode;
  storageKey?: string;
  attribute?: string;
  disableTransitionOnChange?: boolean;
}

export interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  isDark: boolean;
  isLight: boolean;
  systemPreference: Theme;
}

export interface ColorPreset {
  name: string;
  light: Record<string, string>;
  dark: Record<string, string>;
}
