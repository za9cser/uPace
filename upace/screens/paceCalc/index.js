import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Button, TextInput, useTheme } from "react-native-paper";
import { Formik } from "formik";
import TimeInput from "../../components/timeInput";
import { initialValues, paceMode, timeMode } from "./paceCalcUtils";
import PaceCalcInput from "./paceCalcInput";

export default function PaceCalc() {
    const { colors } = useTheme();

    return (
        <Formik initialValues={initialValues}>
            {({ setFieldValue, values }) => (
                <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
                    <Text style={styles.description} variant="titleMedium">
                        Enter two values to calculate the third
                    </Text>
                    <PaceCalcInput buttonCaption={"Time"} onCalc={() => {}}>
                        <TimeInput
                            mode={timeMode}
                            time={values.time}
                            onChange={(value) => setFieldValue("time", value)}
                        />
                    </PaceCalcInput>
                    <PaceCalcInput buttonCaption={"Pace"} onCalc={() => {}}>
                        <TimeInput
                            mode={paceMode}
                            time={values.pace}
                            onChange={(value) => setFieldValue("pace", value)}
                        />
                    </PaceCalcInput>
                    <PaceCalcInput buttonCaption={"Distance"} onCalc={() => {}}>
                        <TextInput style={{ width: 150 }} />
                    </PaceCalcInput>
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
        fontSize: 16,
    },
    summary: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingBottom: 25,
        borderTopColor: "#ccc",
        borderTopWidth: 1,
    },
});
