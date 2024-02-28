import { StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import { TextInput, Text } from "react-native-paper";

const TimeInput = ({ time, onChange }) => {
    // const { minutes, seconds, milliseconds } = useMemo(() => {}, [time]);

    const handleMinutesChange = (newMinutes) => {
        const date = new Date(0, 0, 0, 0, newMinutes, time.getSeconds(), time.getMilliseconds());
        console.log("date", date);
        onChange(date);
    };

    const handleSecondsChange = (newSeconds) => {
        const date = new Date(0, 0, 0, 0, time.getMinutes(), newSeconds, time.getMilliseconds());
        console.log("date", date);
        onChange(date);
    };

    const handleMillisecondsChange = (newMilliseconds) => {
        const date = new Date(0, 0, 0, 0, time.getMinutes(), time.getSeconds(), newMilliseconds);
        console.log("date", date);
        onChange(date);
    };

    return (
        <View>
            <View style={styles.container}>
                <TextInput
                    onChangeText={handleMinutesChange}
                    placeholder="mm"
                    style={styles.textInput}
                    keyboardType="decimal-pad"
                />
                <Text variant="bodyLarge">:</Text>
                <TextInput
                    onChangeText={handleSecondsChange}
                    placeholder="ss"
                    style={styles.textInput}
                    keyboardType="decimal-pad"
                />
                <Text variant="bodyLarge">.</Text>
                <TextInput
                    onChangeText={handleMillisecondsChange}
                    placeholder="ms"
                    style={styles.textInput}
                    keyboardType="decimal-pad"
                />
            </View>
            <Text>{time.toString()}</Text>
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
