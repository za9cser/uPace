import React, { createContext, useContext, useState } from 'react';
import { useTheme as usePaperTheme } from 'react-native-paper';
import { ColorMode, customColors, spacing } from './index';

interface ThemeContextType {
  colorMode: ColorMode;
  toggleColorMode: () => void;
  setColorMode: (mode: ColorMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode; initialMode?: ColorMode }> = ({
  children,
  initialMode = 'light',
}) => {
  const [currentMode, setCurrentMode] = useState<ColorMode>(initialMode);

  const toggleColorMode = () => {
    setCurrentMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setColorMode = (mode: ColorMode) => {
    setCurrentMode(mode);
  };

  return (
    <ThemeContext.Provider value={{ colorMode: currentMode, toggleColorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within ThemeProvider');
  }
  return context;
};

export const useCustomTheme = () => {
  const paperTheme = usePaperTheme();
  const { colorMode } = useAppTheme();
  const colors = customColors[colorMode];

  return {
    colors,
    spacing,
    paper: paperTheme,
  };
};
