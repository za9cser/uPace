import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import { TimeSpan } from "timespan";
import { Button, IconButton, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

const TimeSummary = ({ containerStyle }) => {
    const { colors } = useTheme();
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
                <Button icon="content-copy" onPress={() => console.log("first")}>
                    Splits
                </Button>
                <Button icon="content-copy" onPress={() => console.log("first")}>
                    Result
                </Button>
            </View>

            <Text style={[styles.text, { color: colors.primary }]}>{totalTime}</Text>
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
});
