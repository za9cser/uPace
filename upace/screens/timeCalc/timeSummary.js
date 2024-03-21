import { StyleSheet, Text, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import React, { useState } from "react";
import { useFormikContext } from "formik";
import { TimeSpan } from "timespan";
import { Button, Portal, Snackbar, useTheme } from "react-native-paper";
import { describeTimeMode } from "./modeSelect";

const TimeSummary = ({ containerStyle }) => {
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const { colors } = useTheme();
    const { values, setFieldValue } = useFormikContext();
    if (!values) return null;

    const { splits, mode } = values;
    const { hasMinutes, hasSeconds, hasMilliSeconds } = describeTimeMode(mode);
    const totalTimeSpan = splits.reduce((acc, current) => {
        hasMinutes && acc.addMinutes(current.minutes);
        hasSeconds && acc.addSeconds(current.seconds);
        hasMilliSeconds && acc.addMilliseconds(current.milliseconds * 10);
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
        if (hasSeconds || timeSpan.seconds > 0)
            seconds = `${displayMinutes ? ":" : ""}${
                displayMinutes && timeSpan.seconds < 10 ? `0${timeSpan.seconds}` : timeSpan.seconds
            }`;

        const displaySeconds = seconds !== "";

        let milliseconds = hasMilliSeconds
            ? `${displaySeconds ? "." : ""}${
                  timeSpan.milliseconds < 10 ? `0${timeSpan.milliseconds / 10}` : timeSpan.milliseconds / 10
              }`
            : "";

        const time = hours + minutes + seconds + milliseconds;
        return time;
    };

    const totalTime = getTime(totalTimeSpan);

    const copySplits = () => {
        const result = splits.map((s) => getTime(s)).join(" - ");
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

        setFieldValue("splits", [new TimeSpan()]);
        setFeedbackMessage("Time splits cleared");
        setIsFeedbackOpen(true);
    };

    return (
        <View style={[styles.summary, containerStyle]}>
            <View style={styles.buttons}>
                <Button icon="content-copy" onPress={copySplits}>
                    Splits
                </Button>
                <Button icon="content-copy" onPress={copyResult}>
                    Result
                </Button>
                <Button icon="block-helper" onPress={clear} textColor={colors.error}>
                    Clear
                </Button>
            </View>
            <Text style={[styles.text, { color: colors.primary }]}>{totalTime}</Text>

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
        </View>
    );
};

export default TimeSummary;

const styles = StyleSheet.create({
    summary: {
        alignItems: "center",
    },
    buttons: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "600",
    },
});
