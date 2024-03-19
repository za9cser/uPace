import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import TimeInput from "../../components/timeInput";
import { FieldArray, Formik } from "formik";
import { Button, SegmentedButtons, Text, useTheme } from "react-native-paper";
import { TimeSpan } from "timespan";
import TimeSummary from "./timeSummary";

const TimeCalc = () => {
    const { colors } = useTheme();
    return (
        <Formik initialValues={initialValues}>
            {({ setFieldValue, values }) => (
                <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
                    <Text style={styles.description} variant="titleMedium">
                        Enter some time splits and get their sum
                    </Text>
                    <SegmentedButtons
                        multiSelect
                        value={values.mode}
                        onValueChange={(value) => {
                            console.log("value", value);
                            setFieldValue("mode", value);
                        }}
                        buttons={[
                            {
                                value: "mm",
                                label: "mm",
                            },
                            {
                                value: "ss",
                                label: "ss",
                            },
                            { value: "ms", label: "ms" },
                        ]}
                    />
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
                                    textColor={colors.secondary}
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
                </ScrollView>
            )}
        </Formik>
    );
};

const initialValues = {
    mode: ["ss"],
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
        justifyContent: "space-around",
        paddingBottom: 25,
        borderTopColor: "#ccc",
        borderTopWidth: 1,
    },
});
