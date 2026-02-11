import {
  MD3LightTheme,
  MD3DarkTheme,
  configureFonts,
} from "react-native-paper";
import type { MD3Theme } from "react-native-paper";

export type ColorMode = "light" | "dark";

export const lightColors = {
  primary: "#0066CC",
  primaryDark: "#0052A3",
  primaryLight: "#3399FF",
  background: "#FFFFFF",
  surface: "#F8F9FA",
  text: "#1A1A1A",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  error: "#EF4444",
  success: "#10B981",
  card: "#FFFFFF",
  inputBackground: "#F3F4F6",
};

export const darkColors = {
  primary: "#0066CC",
  primaryDark: "#0052A3",
  primaryLight: "#3399FF",
  background: "#0F0F0F",
  surface: "#1A1A1A",
  text: "#FFFFFF",
  textSecondary: "#9CA3AF",
  border: "#374151",
  error: "#EF4444",
  success: "#10B981",
  card: "#1F1F1F",
  inputBackground: "#2A2A2A",
};

const fontConfig = {
  displayLarge: {
    fontFamily: "System",
    fontSize: 57,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 64,
  },
  displayMedium: {
    fontFamily: "System",
    fontSize: 45,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 52,
  },
  displaySmall: {
    fontFamily: "System",
    fontSize: 36,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 44,
  },
  headlineLarge: {
    fontFamily: "System",
    fontSize: 32,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 40,
  },
  headlineMedium: {
    fontFamily: "System",
    fontSize: 28,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 36,
  },
  headlineSmall: {
    fontFamily: "System",
    fontSize: 24,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 32,
  },
  titleLarge: {
    fontFamily: "System",
    fontSize: 22,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 28,
  },
  titleMedium: {
    fontFamily: "System",
    fontSize: 16,
    fontWeight: "500" as const,
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  titleSmall: {
    fontFamily: "System",
    fontSize: 14,
    fontWeight: "500" as const,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelLarge: {
    fontFamily: "System",
    fontSize: 14,
    fontWeight: "500" as const,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelMedium: {
    fontFamily: "System",
    fontSize: 12,
    fontWeight: "500" as const,
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelSmall: {
    fontFamily: "System",
    fontSize: 11,
    fontWeight: "500" as const,
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  bodyLarge: {
    fontFamily: "System",
    fontSize: 16,
    fontWeight: "400" as const,
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: "System",
    fontSize: 14,
    fontWeight: "400" as const,
    letterSpacing: 0.25,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: "System",
    fontSize: 12,
    fontWeight: "400" as const,
    letterSpacing: 0.4,
    lineHeight: 16,
  },
};

export const getTheme = (colorMode: ColorMode): MD3Theme => {
  const colors = colorMode === "dark" ? darkColors : lightColors;
  const baseTheme = colorMode === "dark" ? MD3DarkTheme : MD3LightTheme;

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: colors.primary,
      primaryContainer: colors.primaryLight,
      secondary: colors.primary,
      secondaryContainer: colors.primaryLight,
      tertiary: colors.primary,
      tertiaryContainer: colors.primaryLight,
      surface: colors.surface,
      surfaceVariant: colors.card,
      background: colors.background,
      error: colors.error,
      errorContainer: colors.error,
      onPrimary: "#FFFFFF",
      onPrimaryContainer: colors.text,
      onSecondary: "#FFFFFF",
      onSecondaryContainer: colors.text,
      onTertiary: "#FFFFFF",
      onTertiaryContainer: colors.text,
      onSurface: colors.text,
      onSurfaceVariant: colors.textSecondary,
      onBackground: colors.text,
      onError: "#FFFFFF",
      onErrorContainer: "#FFFFFF",
      outline: colors.border,
      outlineVariant: colors.border,
      shadow: colors.text,
      scrim: colors.text,
      inverseSurface: colors.text,
      inverseOnSurface: colors.background,
      inversePrimary: colors.primary,
      elevation: {
        level0: "transparent",
        level1: colors.surface,
        level2: colors.surface,
        level3: colors.surface,
        level4: colors.surface,
        level5: colors.surface,
      },
    },
    fonts: configureFonts({ config: fontConfig }),
  };
};

export type Theme = MD3Theme;

// Custom theme values for easy access
export const customColors = {
  light: lightColors,
  dark: darkColors,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
