import { Theme, ThemeMode } from './types';

const MEDIA_QUERY = '(prefers-color-scheme: dark)';

export function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia(MEDIA_QUERY).matches ? 'dark' : 'light';
}

export function getStoredMode(key: string): ThemeMode | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(key);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
    return null;
  } catch {
    return null;
  }
}

export function storeMode(key: string, mode: ThemeMode): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, mode);
  } catch {
    // localStorage unavailable
  }
}

export function resolveTheme(mode: ThemeMode): Theme {
  if (mode === 'system') return getSystemTheme();
  return mode;
}

export function applyTheme(
  theme: Theme,
  attribute: string = 'class',
  disableTransition: boolean = false
): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  let cleanup: (() => void) | undefined;

  if (disableTransition) {
    const style = document.createElement('style');
    style.textContent = '*, *::before, *::after { transition: none !important; }';
    document.head.appendChild(style);
    cleanup = () => {
      window.getComputedStyle(root).opacity;
      document.head.removeChild(style);
    };
  }

  if (attribute === 'class') {
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  } else {
    root.setAttribute(attribute, theme);
  }

  root.style.colorScheme = theme;

  if (cleanup) {
    requestAnimationFrame(cleanup);
  }
}

export function onSystemThemeChange(callback: (theme: Theme) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const mql = window.matchMedia(MEDIA_QUERY);
  const handler = (e: MediaQueryListEvent) => callback(e.matches ? 'dark' : 'light');
  mql.addEventListener('change', handler);
  return () => mql.removeEventListener('change', handler);
}
