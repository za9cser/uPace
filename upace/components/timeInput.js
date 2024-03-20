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

    const getValue = (value) => (value ? value.toString() : "");

    return (
        <View>
            <View style={[styles.container, containerStyle]}>
                <TextInput
                    value={getValue(time.minutes)}
                    onChangeText={handleMinutesChange}
                    placeholder="mm"
                    style={styles.textInput}
                    keyboardType="decimal-pad"
                />
                <Text variant="bodyLarge">:</Text>
                <TextInput
                    value={getValue(time.seconds)}
                    onChangeText={handleSecondsChange}
                    placeholder="ss"
                    style={styles.textInput}
                    keyboardType="decimal-pad"
                />
                <Text variant="bodyLarge">.</Text>
                <TextInput
                    value={getValue(time.milliseconds)}
                    onChangeText={handleMillisecondsChange}
                    placeholder="ms"
                    style={styles.textInput}
                    keyboardType="decimal-pad"
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
        height: 40,
        borderRadius: 5,
        marginHorizontal: 5,
        textAlign: "center",
        fontSize: 20,
    },
});

export default TimeInput;
