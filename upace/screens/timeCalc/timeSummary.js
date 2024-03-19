import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useFormikContext } from "formik";
import { TimeSpan } from "timespan";
import { Button, Portal, Snackbar, useTheme } from "react-native-paper";

const TimeSummary = ({ containerStyle }) => {
    const [isCopyFeedbackOpen, setIsCopyFeedbackOpen] = useState(false);
    const [copyFeedback, setCopyFeedback] = useState("");
    const theme = useTheme();
    const colors = theme.colors;
    const { values } = useFormikContext();
    if (!values?.splits) return null;

    const timeSpan = values.splits.reduce((acc, current) => {
        acc.add(current);
        return acc;
    }, new TimeSpan());

    const hasHours = timeSpan.hours > 0;
    const totalTime =
        `${hasHours ? `${timeSpan.hours}:` : ""}` +
        `${hasHours && timeSpan.minutes < 10 ? `0${timeSpan.minutes}` : timeSpan.minutes}:` +
        `${timeSpan.seconds < 10 ? `0${timeSpan.seconds}` : timeSpan.seconds}.${timeSpan.milliseconds}`;

    return (
        <View style={[styles.summary, containerStyle]}>
            <View style={styles.buttons}>
                <Button
                    icon="content-copy"
                    onPress={() => {
                        setCopyFeedback("Splits and result copied");
                        setIsCopyFeedbackOpen(true);
                    }}
                >
                    Splits
                </Button>
                <Button
                    icon="content-copy"
                    onPress={() => {
                        setCopyFeedback("Result copied");
                        setIsCopyFeedbackOpen(true);
                    }}
                >
                    Result
                </Button>
            </View>
            <Text style={[styles.text, { color: colors.primary }]}>{totalTime}</Text>
            <Portal>
                <Snackbar
                    visible={isCopyFeedbackOpen}
                    onDismiss={() => setIsCopyFeedbackOpen(false)}
                    duration={3000}
                    style={{ backgroundColor: colors.secondary }}
                >
                    {copyFeedback}
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
        fontSize: 25,
        fontWeight: "600",
    },
    feedback: {},
});
