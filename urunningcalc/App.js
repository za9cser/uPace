import { PaperProvider, MD3LightTheme, adaptNavigationTheme } from "react-native-paper";
import TimeCalc from "./screens/timeCalc";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const { LightTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });

export default function App() {
    return (
        <PaperProvider theme={MD3LightTheme}>
            <NavigationContainer theme={LightTheme}>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={TimeCalc} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
