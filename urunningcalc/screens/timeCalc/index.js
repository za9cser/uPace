import { StyleSheet, View } from "react-native";
import React from "react";
import TimeInput from "../../components/timeInput";
import { FieldArray, Formik } from "formik";
import { Button, Text } from "react-native-paper";
import { TimeSpan } from "timespan";
import TimeSummary from "./timeSummary";

const TimeCalc = () => {
    return (
        <Formik initialValues={initialValues}>
            {({ setFieldValue, values }) => (
                <View style={styles.container}>
                    <Text variant="headlineMedium">Time Calculator</Text>
                    <Text style={styles.description} variant="titleMedium">
                        Enter some time splits and get their sum
                    </Text>
                    <FieldArray name="splits">
                        {({ push }) => (
                            <View>
                                {values.splits.map((item, key) => (
                                    <TimeInput
                                        key={key}
                                        time={item}
                                        onChange={(value) => setFieldValue(`splits[${key}]`, value)}
                                        containerStyle={styles.timeInput}
                                        log={false}
                                    />
                                ))}
                                <Button
                                    style={styles.addButton}
                                    labelStyle={styles.addButtonText}
                                    onPress={() => push(new TimeSpan())}
                                >
                                    Add
                                </Button>
                            </View>
                        )}
                    </FieldArray>
                    <TimeSummary containerStyle={styles.summary} />
                </View>
            )}
        </Formik>
    );
};

const initialValues = {
    splits: [new TimeSpan()],
};

export default TimeCalc;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        paddingTop: 8,
    },
    description: {
        textAlign: "center",
    },
    timeInput: {
        justifyContent: "center",
        paddingRight: 20,
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
        justifyContent: "flex-end",
        paddingEnd: "30%",
        borderTopColor: "#ccc",
        borderTopWidth: 1,
    },
});
