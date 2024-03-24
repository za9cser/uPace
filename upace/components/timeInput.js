import { StyleSheet, View } from "react-native";
import React, { forwardRef, useRef } from "react";
import { TextInput, Text } from "react-native-paper";
import { TimeSpan } from "timespan";
import { describeTimeMode } from "../screens/timeCalc/modeSelect";

const TimeInput = forwardRef(({ time, onChange, containerStyle, mode, log }, ref) => {
    const minutesRef = useRef(null);
    const secondsRef = useRef(null);
    const decisecondsRef = useRef(null);

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

    const handleDecisecondsChange = (newDeciseconds) => {
        const timeSpan = new TimeSpan(parseInt(newDeciseconds * 100), time.seconds, time.minutes);
        log && console.log("timeSpan", timeSpan);
        onChange(timeSpan);
    };

    const getValue = (value) => (value ? value.toString() : "");
    const hasMode = mode !== undefined && mode != null;
    const { hasMinutes, hasSeconds, hasDeciseconds } = describeTimeMode(mode);

    return (
        <View>
            <View style={[styles.container, containerStyle]}>
                <TextInput
                    value={getValue(time.minutes)}
                    onChangeText={handleMinutesChange}
                    placeholder="mm"
                    style={styles.textInput}
                    keyboardType="decimal-pad"
                    disabled={hasMode && !hasMinutes}
                />
                <Text variant="bodyLarge">:</Text>
                <TextInput
                    value={getValue(time.seconds)}
                    onChangeText={handleSecondsChange}
                    placeholder="ss"
                    style={styles.textInput}
                    keyboardType="decimal-pad"
                    disabled={hasMode && !hasSeconds}
                />
                <Text variant="bodyLarge">.</Text>
                <TextInput
                    value={getValue(time.milliseconds / 100)}
                    onChangeText={handleDecisecondsChange}
                    placeholder="ds"
                    style={styles.textInput}
                    keyboardType="decimal-pad"
                    disabled={hasMode && !hasDeciseconds}
                />
            </View>
            {log && <Text>{time.toString()}</Text>}
        </View>
    );
});

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
        fontSize: 18,
    },
});

export default TimeInput;
