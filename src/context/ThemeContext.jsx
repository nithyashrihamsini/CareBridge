import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem('carebridge_theme');
      if (saved === 'warm' || saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch {
      // ignore storage errors
    }
    return 'light';
  });

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('carebridge_theme', newTheme);
    } catch {
      // ignore storage errors
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-warm', 'theme-dark', 'dark');

    if (theme === 'warm') {
      root.classList.add('theme-warm');
    } else if (theme === 'dark') {
      root.classList.add('theme-dark', 'dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
