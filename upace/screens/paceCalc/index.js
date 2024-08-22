import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { TextInput, useTheme } from "react-native-paper";
import { Formik } from "formik";
import TimeInput from "../../components/timeInput";
import { initialValues } from "./paceCalcUtils";

export default function PaceCalc() {
    const { colors } = useTheme();
    const timeInputMode = ["mm", "ss", "ds"];
    return (
        <Formik initialValues={initialValues}>
            {({ setFieldValue, values }) => (
                <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
                    <Text style={styles.description} variant="titleMedium">
                        Enter two values to calculate the third
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <TimeInput
                            mode={timeInputMode}
                            time={values.time}
                            onChange={(value) => setFieldValue("time", value)}
                        />
                        <Text>Time</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <TimeInput
                            mode={timeInputMode}
                            time={values.time}
                            onChange={(value) => setFieldValue("time", value)}
                        />
                        <Text>Pace</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <TextInput />
                        <Text>Pace</Text>
                    </View>
                </ScrollView>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    description: {
        textAlign: "center",
    },
    timeInput: {
        justifyContent: "center",
        marginTop: 8,
    },
    addButton: {
        paddingVertical: 8,
    },
    addButtonText: {
        fontSize: 20,
    },
    summary: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingBottom: 25,
        borderTopColor: "#ccc",
        borderTopWidth: 1,
    },
});
