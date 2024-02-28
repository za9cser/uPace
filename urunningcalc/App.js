import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import TimeCalc from "./screens/timeCalc";

export default function App() {
    return (
        <PaperProvider>
            <View style={styles.container}>
                <TimeCalc />
                <StatusBar style="auto" />
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
});
