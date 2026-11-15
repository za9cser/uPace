import { ThemeProvider } from "@/theme/ThemeContext";
import { SnackbarProvider } from "@/context/SnackbarContext";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavThemeProvider,
  Slot,
} from "expo-router";
import { ThemedStatusBar } from "@/components/common/ThemedStatusBar";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    MaterialIcons: require("react-native-vector-icons/Fonts/MaterialIcons.ttf"),
    MaterialCommunityIcons: require("react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf"),
  });

  if (!fontsLoaded) return null;

  const isDark = colorScheme === "dark";
  return (
    <ThemeProvider initialMode={isDark ? "dark" : "light"}>
      <NavThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <ThemedStatusBar />
        <SnackbarProvider>
          <Slot />
        </SnackbarProvider>
      </NavThemeProvider>
    </ThemeProvider>
  );
}
