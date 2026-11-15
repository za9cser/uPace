import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { useCustomTheme } from "@/theme/ThemeContext";
import Icon from "react-native-vector-icons/MaterialIcons";

export const unstable_settings = {
  initialRouteName: "timeCalc",
};

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
    >
      <Tabs.Screen
        name="timeCalc"
        options={{
          title: "Time Calc",
          tabBarIcon: ({ color }) => (
            <Icon name="timer" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pace"
        options={{
          title: "Pace Calc",
          tabBarIcon: ({ color }) => (
            <Icon name="directions-run" size={20} color={color} />
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
