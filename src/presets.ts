import { ColorPreset } from './types';

export const presets: Record<string, ColorPreset> = {
  slate: {
    name: 'Slate',
    light: {
      '--bg-primary': '#ffffff',
      '--bg-secondary': '#f8fafc',
      '--bg-tertiary': '#f1f5f9',
      '--text-primary': '#0f172a',
      '--text-secondary': '#475569',
      '--text-muted': '#94a3b8',
      '--border': '#e2e8f0',
      '--accent': '#6366f1',
      '--accent-hover': '#4f46e5',
    },
    dark: {
      '--bg-primary': '#0f172a',
      '--bg-secondary': '#1e293b',
      '--bg-tertiary': '#334155',
      '--text-primary': '#f8fafc',
      '--text-secondary': '#cbd5e1',
      '--text-muted': '#64748b',
      '--border': '#334155',
      '--accent': '#818cf8',
      '--accent-hover': '#6366f1',
    },
  },
  zinc: {
    name: 'Zinc',
    light: {
      '--bg-primary': '#ffffff',
      '--bg-secondary': '#fafafa',
      '--bg-tertiary': '#f4f4f5',
      '--text-primary': '#18181b',
      '--text-secondary': '#52525b',
      '--text-muted': '#a1a1aa',
      '--border': '#e4e4e7',
      '--accent': '#8b5cf6',
      '--accent-hover': '#7c3aed',
    },
    dark: {
      '--bg-primary': '#18181b',
      '--bg-secondary': '#27272a',
      '--bg-tertiary': '#3f3f46',
      '--text-primary': '#fafafa',
      '--text-secondary': '#d4d4d8',
      '--text-muted': '#71717a',
      '--border': '#3f3f46',
      '--accent': '#a78bfa',
      '--accent-hover': '#8b5cf6',
    },
  },
  stone: {
    name: 'Stone',
    light: {
      '--bg-primary': '#ffffff',
      '--bg-secondary': '#fafaf9',
      '--bg-tertiary': '#f5f5f4',
      '--text-primary': '#1c1917',
      '--text-secondary': '#57534e',
      '--text-muted': '#a8a29e',
      '--border': '#e7e5e4',
      '--accent': '#f97316',
      '--accent-hover': '#ea580c',
    },
    dark: {
      '--bg-primary': '#1c1917',
      '--bg-secondary': '#292524',
      '--bg-tertiary': '#44403c',
      '--text-primary': '#fafaf9',
      '--text-secondary': '#d6d3d1',
      '--text-muted': '#78716c',
      '--border': '#44403c',
      '--accent': '#fb923c',
      '--accent-hover': '#f97316',
    },
  },
};

export function applyPreset(preset: ColorPreset, theme: 'light' | 'dark'): void {
  if (typeof document === 'undefined') return;
  const vars = theme === 'dark' ? preset.dark : preset.light;
  const root = document.documentElement;
  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

export function getPreset(name: string): ColorPreset | undefined {
  return presets[name];
}

export function getPresetNames(): string[] {
  return Object.keys(presets);
}
