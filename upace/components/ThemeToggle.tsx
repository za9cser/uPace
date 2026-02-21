import React from "react";
import { IconButton } from "react-native-paper";
import { useAppTheme, useCustomTheme } from "@/theme/ThemeContext";

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useAppTheme();
  const theme = useCustomTheme();

  return (
    <IconButton
      icon={colorMode === "dark" ? "weather-sunny" : "weather-night"}
      iconColor={theme.colors.primary}
      size={24}
      onPress={toggleColorMode}
      style={{ margin: 0 }}
    />
  );
};
