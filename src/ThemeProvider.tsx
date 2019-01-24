import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Theme, ThemeConfig, ThemeContextValue, ThemeMode } from './types';
import { applyTheme, getStoredMode, getSystemTheme, onSystemThemeChange, resolveTheme, storeMode } from './utils';

const DEFAULT_STORAGE_KEY = 'theme-mode';

export const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps extends ThemeConfig {
  children: React.ReactNode;
}

export function ThemeProvider({
  children,
  defaultMode = 'system',
  storageKey = DEFAULT_STORAGE_KEY,
  attribute = 'class',
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const stored = getStoredMode(storageKey);
    return stored ?? defaultMode;
  });

  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);

  const theme = useMemo<Theme>(
    () => (mode === 'system' ? systemTheme : mode),
    [mode, systemTheme]
  );

  const setMode = useCallback(
    (newMode: ThemeMode) => {
      setModeState(newMode);
      storeMode(storageKey, newMode);
      const resolved = newMode === 'system' ? getSystemTheme() : newMode;
      applyTheme(resolved, attribute, disableTransitionOnChange);
    },
    [storageKey, attribute, disableTransitionOnChange]
  );

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setMode(nextTheme);
  }, [theme, setMode]);

  useEffect(() => {
    applyTheme(resolveTheme(mode), attribute, false);
  }, []);

  useEffect(() => {
    if (mode !== 'system') return;
    return onSystemThemeChange((newSystemTheme) => {
      setSystemTheme(newSystemTheme);
      applyTheme(newSystemTheme, attribute, disableTransitionOnChange);
    });
  }, [mode, attribute, disableTransitionOnChange]);

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      theme,
      mode,
      setMode,
      toggleTheme,
      isDark: theme === 'dark',
      isLight: theme === 'light',
      systemPreference: systemTheme,
    }),
    [theme, mode, setMode, toggleTheme, systemTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
