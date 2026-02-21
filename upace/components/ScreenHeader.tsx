import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { ThemeToggle } from "./ThemeToggle";
import { useCustomTheme } from "../theme/ThemeContext";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
}

export const ScreenHeader = ({ title, subtitle }: ScreenHeaderProps) => {
  const theme = useCustomTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text
            variant="headlineMedium"
            style={{ color: theme.colors.text, marginBottom: 8 }}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.textSecondary }}
            >
              {subtitle}
            </Text>
          )}
        </View>
        <ThemeToggle />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
  },
});
