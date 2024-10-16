// ThemeContext.tsx

import React, {createContext, useState, useEffect} from 'react';
import {useColorScheme as useSystemColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider as NavigationThemeProvider,
  Theme,
} from '@react-navigation/native';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  navigationTheme: Theme;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  navigationTheme: NavigationDefaultTheme,
});

interface ThemeProviderProps {
  children: React.ReactNode;
  initialColorScheme?: 'light' | 'dark' | null;
}

export const ThemeProvider = ({
  children,
  initialColorScheme,
}: ThemeProviderProps) => {
  const systemColorScheme = useSystemColorScheme();
  const colorScheme = initialColorScheme ?? systemColorScheme;
  const [theme, setTheme] = useState<'light' | 'dark'>(colorScheme ?? 'light');

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme as 'light' | 'dark');
      } else {
        setTheme(colorScheme ?? 'light');
      }
    };
    loadTheme();
  }, [colorScheme]);

  useEffect(() => {
    AsyncStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const navigationTheme: Theme =
    theme === 'dark' ? NavigationDarkTheme : NavigationDefaultTheme;

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, navigationTheme}}>
      <NavigationThemeProvider value={navigationTheme}>
        {children}
      </NavigationThemeProvider>
    </ThemeContext.Provider>
  );
};

export {ThemeContext};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
