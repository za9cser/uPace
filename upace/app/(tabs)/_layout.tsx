import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { useCustomTheme } from "@/theme/ThemeContext";
import Icon from "react-native-vector-icons/MaterialIcons";

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
        tabBarLabelStyle: [
          styles.tabBarLabelStyle,
          { color: theme.colors.text },
        ],
      }}
      initialRouteName="timeCalc"
    >
      <Tabs.Screen
        name="timeCalc"
        options={{
          title: "Time Calc",
          tabBarIcon: () => (
            <Icon name="timer" size={20} color={theme.colors.text} />
          ),
        }}
      />
      <Tabs.Screen
        name="pace"
        options={{
          title: "Pace Calc",
          tabBarIcon: () => (
            <Icon name="directions-run" size={20} color={theme.colors.text} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: "600",
  },
});
