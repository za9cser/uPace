import { StyleSheet, View } from "react-native";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { TextInput, Text } from "react-native-paper";
import { TimeSpan } from "timespan";
import { describeTimeMode } from "../screens/timeCalc/modeSelect";
import { focusRef } from "../utils/form";

const TimeInput = forwardRef(({ time, onChange, containerStyle, mode, log }, ref) => {
    const minutesRef = useRef(ref);
    const secondsRef = useRef(null);
    const decisecondsRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus() {
            focusRef(minutesRef);
        },
    }));

    const handleMinutesChange = (input) => {
        const newMinutes = validateInput(input, 59);
        const timeSpan = new TimeSpan(time.milliseconds, time.seconds, newMinutes);
        log && console.log("timeSpan", timeSpan);
        onChange(timeSpan);
    };

    const handleSecondsChange = (input) => {
        const newSeconds = validateInput(input, 59);
        const timeSpan = new TimeSpan(time.milliseconds, newSeconds, time.minutes);
        log && console.log("timeSpan", timeSpan);
        onChange(timeSpan);
    };

    const handleDecisecondsChange = (input) => {
        const newDeciseconds = validateInput(input);
        const timeSpan = new TimeSpan(newDeciseconds * 100, time.seconds, time.minutes);
        log && console.log("timeSpan", timeSpan);
        onChange(timeSpan);
    };

    const validateInput = (input, maxValue) => {
        let value = parseInt(input);
        if (value > maxValue) {
            value = maxValue;
            // TODO: display warning feedback if necessary in the future
        }

        return value;
    };

    const getValue = (value) => (value ? value.toString() : "");
    const hasMode = mode !== undefined && mode != null;
    const { hasMinutes, hasSeconds, hasDeciseconds } = describeTimeMode(mode);

    return (
        <View>
            <View style={[styles.container, containerStyle]}>
                <TextInput
                    ref={minutesRef}
                    value={getValue(time.minutes)}
                    onChangeText={handleMinutesChange}
                    placeholder="mm"
                    style={styles.textInput}
                    keyboardType="decimal-pad"
                    returnKeyType="next"
                    onSubmitEditing={() => secondsRef?.current?.focus()}
                    disabled={hasMode && !hasMinutes}
                />
                <Text variant="bodyLarge">:</Text>
                <TextInput
                    ref={secondsRef}
                    value={getValue(time.seconds)}
                    onChangeText={handleSecondsChange}
                    placeholder="ss"
                    style={styles.textInput}
                    keyboardType="decimal-pad"
                    returnKeyType="next"
                    onSubmitEditing={() => decisecondsRef?.current?.focus()}
                    disabled={hasMode && !hasSeconds}
                />
                <Text variant="bodyLarge">.</Text>
                <TextInput
                    ref={decisecondsRef}
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
