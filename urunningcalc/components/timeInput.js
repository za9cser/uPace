import { StyleSheet, View } from "react-native";
import React from "react";
import { TextInput, Text } from "react-native-paper";

const TimeInput = () => {
    return (
        <View style={styles.container}>
            <TextInput placeholder="mm" style={styles.textInput} keyboardType="decimal-pad" />
            <Text variant="bodyLarge">:</Text>
            <TextInput placeholder="ss" style={styles.textInput} keyboardType="decimal-pad" />
            <Text variant="bodyLarge">.</Text>
            <TextInput placeholder="ms" style={styles.textInput} keyboardType="decimal-pad" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        alignItems: "center",
    },
    textInput: {
        width: "30%", // Adjust the width as needed based on your design
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        textAlign: "center",
        backgroundColor: "fff",
        fontSize: 20,
    },
});

export default TimeInput;
