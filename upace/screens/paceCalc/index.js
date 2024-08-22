import { Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { TextInput, useTheme } from "react-native-paper";
import { Formik } from "formik";
import TimeInput from "../../components/timeInput";
import { initialValues, paceMode, timeMode } from "./paceCalcUtils";
import PaceCalcInput from "./paceCalcInput";
import { TimeSpan } from "timespan";

export default function PaceCalc() {
    const { colors } = useTheme();

    return (
        <Formik initialValues={initialValues}>
            {({ setFieldValue, values }) => (
                <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
                    <Text style={styles.description} variant="titleMedium">
                        Enter two values to calculate the third
                    </Text>
                    <PaceCalcInput
                        buttonCaption={"Time"}
                        onCalc={() => {
                            if (values.pace.totalSeconds() === 0 || values.distance === 0 || values.distance === "")
                                return;

                            const timeSeconds = values.pace.totalSeconds() * parseFloat(values.distance);
                            const time = new TimeSpan(0, timeSeconds);
                            setFieldValue("time", time);
                        }}
                    >
                        <TimeInput
                            mode={timeMode}
                            time={values.time}
                            onChange={(value) => setFieldValue("time", value)}
                        />
                    </PaceCalcInput>
                    <PaceCalcInput
                        buttonCaption={"Pace"}
                        onCalc={() => {
                            if (values.time.totalSeconds() === 0 || values.distance === 0 || values.distance === "")
                                return;

                            const paceSeconds = values.time.totalSeconds() / parseFloat(values.distance);
                            const pace = new TimeSpan(0, paceSeconds);
                            setFieldValue("pace", pace);
                        }}
                    >
                        <TimeInput
                            mode={paceMode}
                            time={values.pace}
                            onChange={(value) => setFieldValue("pace", value)}
                        />
                    </PaceCalcInput>
                    <PaceCalcInput
                        buttonCaption={"Distance"}
                        onCalc={() => {
                            if (values.time.totalSeconds() === 0 || values.pace.totalSeconds() === 0) return;

                            const distance = values.time.totalSeconds() / values.pace.totalSeconds();
                            console.log("distance", distance);
                            setFieldValue("distance", distance.toFixed(2));
                        }}
                    >
                        <TextInput
                            value={values.distance?.toString() ?? ""}
                            placeholder="km"
                            onChangeText={(value) => setFieldValue("distance", value)}
                            keyboardType="decimal-pad"
                            style={{ width: 150, textAlign: "center", height: 40, fontSize: 18 }}
                        />
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
