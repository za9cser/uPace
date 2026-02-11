import React from "react";
import { ThemeProvider } from "../theme/ThemeContext";
import { SnackbarProvider } from "../context/SnackbarContext";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavThemeProvider,
} from "@react-navigation/native";
import { Slot } from "expo-router";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider initialMode={colorScheme === "dark" ? "dark" : "light"}>
      <NavThemeProvider
        value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <SnackbarProvider>
          <Slot />
        </SnackbarProvider>
      </NavThemeProvider>
    </ThemeProvider>
  );
}
