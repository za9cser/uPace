import { StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import { TextInput, Text } from "react-native-paper";
import { TimeSpan } from "timespan";

const TimeInput = ({ time, onChange }) => {
    const handleMinutesChange = (newMinutes) => {
        const timeSpan = new TimeSpan(time.milliseconds, time.seconds, newMinutes);
        console.log("timeSpan", timeSpan);
        onChange(timeSpan);
    };

    const handleSecondsChange = (newSeconds) => {
        const timeSpan = new TimeSpan(time.milliseconds, newSeconds, time.minutes);
        console.log("timeSpan", timeSpan);
        onChange(timeSpan);
    };

    const handleMillisecondsChange = (newMilliseconds) => {
        const timeSpan = new TimeSpan(newMilliseconds, time.seconds, time.minutes);
        console.log("timeSpan", timeSpan);
        onChange(timeSpan);
    };

    return (
        <View>
            <View style={styles.container}>
                <TextInput
                    value={time.minutes.toString()}
                    onChangeText={handleMinutesChange}
                    placeholder="mm"
                    style={styles.textInput}
                    keyboardType="decimal-pad"
                />
                <Text variant="bodyLarge">:</Text>
                <TextInput
                    value={time.seconds.toString()}
                    onChangeText={handleSecondsChange}
                    placeholder="ss"
                    style={styles.textInput}
                    keyboardType="decimal-pad"
                />
                <Text variant="bodyLarge">.</Text>
                <TextInput
                    value={time.milliseconds.toString()}
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
