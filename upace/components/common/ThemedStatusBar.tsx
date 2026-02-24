import { StatusBar } from "expo-status-bar";
import { useAppTheme } from "@/theme/ThemeContext";

export function ThemedStatusBar() {
  const { colorMode } = useAppTheme();
  const isDark = colorMode === "dark";

  return <StatusBar style={isDark ? "light" : "dark"} />;
}
