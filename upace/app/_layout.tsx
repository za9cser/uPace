import { ThemeProvider } from "@/theme/ThemeContext";
import { SnackbarProvider } from "@/context/SnackbarContext";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavThemeProvider,
} from "@react-navigation/native";
import { Slot } from "expo-router";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";
  return (
    <ThemeProvider initialMode={isDark ? "dark" : "light"}>
      <NavThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <SnackbarProvider>
          <Slot />
        </SnackbarProvider>
      </NavThemeProvider>
    </ThemeProvider>
  );
}
