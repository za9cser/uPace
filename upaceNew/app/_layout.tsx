import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useAppTheme } from "../theme/ThemeContext";
import { getTheme } from "../theme";

function AppContent() {
  const { colorMode } = useAppTheme();
  const theme = getTheme(colorMode);

  return (
    <>
      <StatusBar style={colorMode === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}

function ThemedApp() {
  const { colorMode } = useAppTheme();
  const theme = getTheme(colorMode);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AppContent />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}
