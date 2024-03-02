import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import TimeCalc from "./screens/timeCalc";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
    return (
        <PaperProvider>
            <SafeAreaView style={styles.container}>
                <TimeCalc />
                <StatusBar style="auto" />
            </SafeAreaView>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
