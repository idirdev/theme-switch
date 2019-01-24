import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import { ThemeContextValue } from './types';

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. ' +
      'Wrap your app with <ThemeProvider> to use the theme hook.'
    );
  }

  return context;
}
