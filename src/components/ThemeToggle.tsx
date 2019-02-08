import { useTheme } from '../useTheme';

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
}

const sizes = {
  sm: { button: 32, icon: 16, track: 48 },
  md: { button: 40, icon: 20, track: 56 },
  lg: { button: 48, icon: 24, track: 64 },
};

export function ThemeToggle({ size = 'md', className = '', showLabel = false }: ThemeToggleProps) {
  const { isDark, toggleTheme, theme } = useTheme();
  const s = sizes[size];

  return (
    <div className={`theme-toggle-wrapper ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        onClick={toggleTheme}
        style={{
          position: 'relative',
          width: `${s.track}px`,
          height: `${s.button}px`,
          borderRadius: `${s.button}px`,
          border: 'none',
          cursor: 'pointer',
          background: isDark ? '#6366f1' : '#e2e8f0',
          transition: 'background-color 200ms ease',
          padding: 0,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '4px',
            left: isDark ? `${s.track - s.button + 4}px` : '4px',
            width: `${s.button - 8}px`,
            height: `${s.button - 8}px`,
            borderRadius: '50%',
            background: 'white',
            transition: 'left 200ms ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${s.icon}px`,
          }}
        >
          {isDark ? (
            <svg width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </span>
      </button>
      {showLabel && (
        <span style={{ fontSize: '14px', textTransform: 'capitalize' }}>
          {theme} mode
        </span>
      )}
    </div>
  );
}
