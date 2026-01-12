import React from 'react';
import { IconButton } from 'react-native-paper';
import { useAppTheme } from '../theme/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useAppTheme();

  return (
    <IconButton
      icon={colorMode === 'dark' ? 'weather-sunny' : 'weather-night'}
      iconColor={colorMode === 'dark' ? '#FFA500' : '#4A90E2'}
      size={24}
      onPress={toggleColorMode}
      style={{ margin: 0 }}
    />
  );
};
