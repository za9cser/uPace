import { Tabs } from "expo-router";
import { Text, StyleSheet } from "react-native";
import { useCustomTheme } from "@/theme/ThemeContext";

export default function TabsLayout() {
  const theme = useCustomTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: styles.tabBarLabelStyle,
      }}
      initialRouteName="timeCalc"
    >
      <Tabs.Screen
        name="timeCalc"
        options={{
          title: "Time Calc",
          tabBarIcon: () => <Text style={styles.title}>⏱</Text>,
        }}
      />
      <Tabs.Screen
        name="pace"
        options={{
          title: "Pace Calc",
          tabBarIcon: () => <Text style={styles.title}>🏃</Text>,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: "600",
  },
});
