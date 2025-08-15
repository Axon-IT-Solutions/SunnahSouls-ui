import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

const Colors = {
  light: {
    // Primary colors
    primary: '#6e5fdb',
    
    // Background colors
    background: '#ffffff',
    backgroundSecondary: '#F3F4F6',
    
    // Text colors
    text: '#111827',
    textSecondary: '#374151',
    textTertiary: '#6B7280',
    textMuted: '#696969',
    
    // Premium colors
    premium: '#D8A000',
    premiumBackground: '#FFF3D0',
    
    // Surface colors
    surface: '#f2eeff',
    
    // Border colors
    border: '#E2E8F0',
    
    // Status colors
    success: '#22c55e',
    error: '#EF4444',
  },
  dark: {
    // Primary colors
    primary: '#8a7ce8',
    
    // Background colors
    background: '#0f172a',
    backgroundSecondary: '#1e293b',
    
    // Text colors
    text: '#f8fafc',
    textSecondary: '#e2e8f0',
    textTertiary: '#cbd5e1',
    textMuted: '#94a3b8',
    
    // Premium colors
    premium: '#fbbf24',
    premiumBackground: '#451a03',
    
    // Surface colors
    surface: '#2d1b69',
    
    // Border colors
    border: '#334155',
    
    // Status colors
    success: '#22c55e',
    error: '#f87171',
  },
} as const;

interface ThemeContextType {
  colors: typeof Colors.light;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const isDark = systemColorScheme === 'dark';
  const colors = Colors[isDark ? 'dark' : 'light'];

  return (
    <ThemeContext.Provider value={{ colors, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};