> **Archived** — Kept for reference. Not part of the current portfolio.

# 🌓 Theme Switch

![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)
![Bundle Size](https://img.shields.io/badge/Bundle-<3KB-brightgreen)

A lightweight React dark/light theme manager with system preference detection, persistence, and beautiful toggle components.

## Features

- **Three modes** — Light, Dark, and System (auto-detect)
- **System preference sync** — Listens to `prefers-color-scheme` changes
- **Persistent** — Saves preference to localStorage
- **SSR-safe** — No hydration mismatch
- **Transition control** — Disable transitions during theme change
- **Color presets** — Slate, Zinc, Stone built-in presets
- **Zero dependencies** — Only React as peer dependency
- **Tiny** — Under 3KB gzipped

## Installation

```bash
npm install theme-switch
```

## Quick Start

```tsx
import { ThemeProvider, ThemeToggle } from 'theme-switch';

function App() {
  return (
    <ThemeProvider defaultMode="system">
      <header>
        <ThemeToggle />
      </header>
      <main>{/* Your app */}</main>
    </ThemeProvider>
  );
}
```

## Components

### `<ThemeProvider>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultMode` | `'light' \| 'dark' \| 'system'` | `'system'` | Initial theme mode |
| `storageKey` | `string` | `'theme-mode'` | localStorage key |
| `attribute` | `string` | `'class'` | HTML attribute to set (`class` or `data-theme`) |
| `disableTransitionOnChange` | `boolean` | `false` | Disable CSS transitions during theme switch |

### `<ThemeToggle>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Toggle size |
| `showLabel` | `boolean` | `false` | Show "Light/Dark mode" label |

### `<ThemeSelect>`

Three-button selector for Light / Dark / System modes.

## Hook

```tsx
const { theme, mode, setMode, toggleTheme, isDark, isLight, systemPreference } = useTheme();
```

## Color Presets

```tsx
import { applyPreset, presets } from 'theme-switch';

// Apply a preset
applyPreset(presets.slate, 'dark');
```

Available presets: `slate`, `zinc`, `stone`

## License

MIT

---

## 🇫🇷 Documentation en français

### Description
**Theme Switch** est un composant React de bascule de thème (clair/sombre) avec persistance dans le localStorage et animation fluide. Il s'intègre facilement dans n'importe quelle application React et respecte les préférences système de l'utilisateur via `prefers-color-scheme`.

### Installation
```bash
npm install @idirdev/theme-switch
```

### Utilisation
```tsx
import { ThemeSwitch } from "@idirdev/theme-switch";
// <ThemeSwitch />   — ajoute le bouton bascule dans votre interface
```
