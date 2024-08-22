import { PaperProvider, MD3LightTheme, adaptNavigationTheme } from "react-native-paper";
import TimeCalc from "./screens/timeCalc";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PaceCalc from "./screens/paceCalc";

const { LightTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <PaperProvider theme={MD3LightTheme}>
            <NavigationContainer theme={LightTheme}>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ color, size }) => {
                            switch (route.name) {
                                case "TimeCalc":
                                    return <MaterialIcons name="more-time" size={size} color={color} />;
                                case "PaceCalc":
                                    return <MaterialCommunityIcons name="run-fast" size={size} color={color} />;
                                default:
                                    return null;
                            }
                        },
                    })}
                    initialRouteName="Time Calc"
                >
                    <Tab.Screen name="TimeCalc" component={TimeCalc} options={{ title: "Time Calc" }} />
                    <Tab.Screen name="PaceCalc" component={PaceCalc} options={{ title: "Pace Calc" }} />
                </Tab.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
