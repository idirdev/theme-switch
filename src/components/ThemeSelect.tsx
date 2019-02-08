import { useTheme } from '../useTheme';
import { ThemeMode } from '../types';

interface ThemeSelectProps {
  className?: string;
  labels?: Record<ThemeMode, string>;
}

const defaultLabels: Record<ThemeMode, string> = {
  light: '☀️ Light',
  dark: '🌙 Dark',
  system: '💻 System',
};

const modes: ThemeMode[] = ['light', 'dark', 'system'];

export function ThemeSelect({ className = '', labels = defaultLabels }: ThemeSelectProps) {
  const { mode, setMode } = useTheme();

  return (
    <div className={`theme-select ${className}`} style={{ display: 'inline-flex', gap: '4px', padding: '4px', borderRadius: '8px', background: 'var(--theme-select-bg, #f1f5f9)' }}>
      {modes.map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => setMode(m)}
          aria-pressed={mode === m}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: mode === m ? 600 : 400,
            background: mode === m ? 'var(--theme-select-active-bg, white)' : 'transparent',
            color: mode === m ? 'var(--theme-select-active-color, #1e293b)' : 'var(--theme-select-color, #64748b)',
            boxShadow: mode === m ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 150ms ease',
          }}
        >
          {labels[m]}
        </button>
      ))}
    </div>
  );
}
