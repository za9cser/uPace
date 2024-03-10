import { StyleSheet, View } from "react-native";
import React from "react";
import { TextInput, Text } from "react-native-paper";
import { TimeSpan } from "timespan";

const TimeInput = ({ time, onChange, containerStyle, log }) => {
    const handleMinutesChange = (newMinutes) => {
        const timeSpan = new TimeSpan(time.milliseconds, time.seconds, parseInt(newMinutes));
        log && console.log("timeSpan", timeSpan);
        onChange(timeSpan);
    };

    const handleSecondsChange = (newSeconds) => {
        const timeSpan = new TimeSpan(time.milliseconds, parseInt(newSeconds), time.minutes);
        log && console.log("timeSpan", timeSpan);
        onChange(timeSpan);
    };

    const handleMillisecondsChange = (newMilliseconds) => {
        const timeSpan = new TimeSpan(parseInt(newMilliseconds), time.seconds, time.minutes);
        log && console.log("timeSpan", timeSpan);
        onChange(timeSpan);
    };

    return (
        <View>
            <View style={[styles.container, containerStyle]}>
                <TextInput
                    value={time.minutes.toString()}
                    onChangeText={handleMinutesChange}
                    placeholder="mm"
                    style={styles.textInput}
                    keyboardType="decimal-pad"
                    mode="outlined"
                />
                <Text variant="bodyLarge">:</Text>
                <TextInput
                    value={time.seconds.toString()}
                    onChangeText={handleSecondsChange}
                    placeholder="ss"
                    style={styles.textInput}
                    keyboardType="decimal-pad"
                    mode="outlined"
                />
                <Text variant="bodyLarge">.</Text>
                <TextInput
                    value={time.milliseconds.toString()}
                    onChangeText={handleMillisecondsChange}
                    placeholder="ms"
                    style={styles.textInput}
                    keyboardType="decimal-pad"
                    mode="outlined"
                />
            </View>
            {log && <Text>{time.toString()}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    textInput: {
        width: "14%", // Adjust the width as needed based on your design
        height: 40,
        borderRadius: 5,
        marginHorizontal: 5,
        textAlign: "center",
        fontSize: 20,
    },
});

export default TimeInput;
