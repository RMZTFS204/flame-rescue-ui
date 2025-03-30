
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'magic' | 'default';

interface MagicThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const MagicThemeContext = createContext<MagicThemeContextType | undefined>(undefined);

export function MagicThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('magic');

  return (
    <MagicThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </MagicThemeContext.Provider>
  );
}

export function useMagicTheme() {
  const context = useContext(MagicThemeContext);
  if (context === undefined) {
    throw new Error('useMagicTheme must be used within a MagicThemeProvider');
  }
  return context;
}
