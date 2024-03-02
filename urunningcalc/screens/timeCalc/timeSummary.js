import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import { TimeSpan } from "timespan";

const TimeSummary = ({ containerStyle }) => {
    const context = useFormikContext();
    const values = context?.values;
    console.log("values", values);
    if (!values?.splits) return null;

    const timeSpan = values.splits.reduce((acc, current) => {
        acc.add(current);
        return acc;
    }, new TimeSpan());

    const totalTime = `${timeSpan.minutes}:${timeSpan.seconds}.${timeSpan.milliseconds}`;

    return (
        <View style={containerStyle}>
            <Text style={styles.text}>{totalTime}</Text>
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
