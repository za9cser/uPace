import { StyleSheet, Text, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import React, { useState } from "react";
import { useFormikContext } from "formik";
import { TimeSpan } from "timespan";
import { Button, Portal, Snackbar, useTheme } from "react-native-paper";
import { describeTimeMode } from "./modeSelect";
import { getNewTimeSplit } from "./timeCalcUtils";

const TimeSummary = ({ containerStyle }) => {
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const { colors } = useTheme();
    const { values, setFieldValue } = useFormikContext();
    if (!values) return null;

    const { splits, mode } = values;
    const { hasMinutes, hasSeconds, hasDeciseconds } = describeTimeMode(mode.inputModes);
    const totalTimeSpan = splits.reduce((acc, current) => {
        const split = current.split;
        hasMinutes && acc.addMinutes(split.minutes);
        hasSeconds && acc.addSeconds(split.seconds);
        hasDeciseconds && acc.addMilliseconds(split.milliseconds);
        return acc;
    }, new TimeSpan());

    const getTime = (timeSpan) => {
        const displayHours = timeSpan.hours > 0;
        const hours = `${displayHours ? `${timeSpan.hours}:` : ""}`;

        let minutes = "";
        if (displayHours) minutes = timeSpan.minutes < 10 ? `0${timeSpan.minutes}` : timeSpan.minutes;
        else if (hasMinutes || timeSpan.minutes > 0) minutes = timeSpan.minutes.toString();

        const displayMinutes = minutes !== "";

        let seconds = "";
        if (hasSeconds || timeSpan.seconds > 0 || hasDeciseconds)
            seconds = `${displayMinutes ? ":" : ""}${
                displayMinutes && timeSpan.seconds < 10 ? `0${timeSpan.seconds}` : timeSpan.seconds
            }`;

        const displaySeconds = seconds !== "";

        const deciseconds = hasDeciseconds ? `${displaySeconds ? "." : ""}${timeSpan.milliseconds / 100}` : "";

        const time = hours + minutes + seconds + deciseconds;
        return time;
    };

    const totalTime = getTime(totalTimeSpan);

    const copySplits = () => {
        const result = splits.map((s) => getTime(s.split)).join(" - ");
        Clipboard.setStringAsync(result);

        setFeedbackMessage("Splits and result copied");
        setIsFeedbackOpen(true);
    };

    const copyResult = () => {
        Clipboard.setStringAsync(totalTime);

        setFeedbackMessage("Result copied");
        setIsFeedbackOpen(true);
    };

    const clear = () => {
        Clipboard.setStringAsync("");

        setFieldValue("splits", [getNewTimeSplit()]);
        setFeedbackMessage("Time splits cleared");
        setIsFeedbackOpen(true);
    };

    return (
        <>
            <View style={[styles.summary, containerStyle]}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Button icon="content-copy" onPress={copySplits}>
                        Splits
                    </Button>
                    <Button icon="content-copy" onPress={copyResult}>
                        Result
                    </Button>
                    <Button icon="block-helper" textColor={colors.error} onPress={clear}>
                        Clear
                    </Button>
                </View>
                <View>
                    <Text style={[styles.text, { color: colors.primary }]}>{totalTime.toString()}</Text>
                </View>
            </View>

            <Portal>
                <Snackbar
                    visible={isFeedbackOpen}
                    onDismiss={() => setIsFeedbackOpen(false)}
                    duration={3000}
                    style={{ backgroundColor: colors.secondary }}
                >
                    {feedbackMessage}
                </Snackbar>
            </Portal>
        </>
    );
};

export default TimeSummary;

const styles = StyleSheet.create({
    summary: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    buttons: { flex: 1, flexDirection: "row" },
    text: { textAlign: "right", fontWeight: "600", fontSize: 20 },
});
