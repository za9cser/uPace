import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import { TimeSpan } from "timespan";
import { useTheme } from "react-native-paper";

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
        <View style={containerStyle}>
            <Text style={[styles.text, { color: colors.primary }]}>{totalTime}</Text>
        </View>
    );
};

export default TimeSummary;

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        fontWeight: "600",
    },
});
