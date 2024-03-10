import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider, MD3LightTheme, adaptNavigationTheme } from "react-native-paper";
import TimeCalc from "./screens/timeCalc";
import { SafeAreaView } from "react-native-safe-area-context";
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
        // <SafeAreaView style={styles.container}>
        //     <TimeCalc />
        //     <StatusBar style="auto" />
        // </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
