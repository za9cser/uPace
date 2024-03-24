import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import TimeInput from "../../components/timeInput";
import { FieldArray, Formik } from "formik";
import { Button, Text, useTheme } from "react-native-paper";
import { TimeSpan } from "timespan";
import TimeSummary from "./timeSummary";
import ModeSelect from "./modeSelect";
import TimeCalcObserver from "./timeCalcObserver";

const TimeCalc = () => {
    const { colors } = useTheme();
    return (
        <Formik initialValues={initialValues}>
            {({ setFieldValue, values }) => (
                <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
                    <TimeCalcObserver />
                    <Text style={styles.description} variant="titleMedium">
                        Enter some time splits and get their sum
                    </Text>
                    <View style={{ flexDirection: "row", width: "100%", justifyContent: "center" }}>
                        <ModeSelect
                            multiSelect
                            value={values.mode}
                            onChange={(value) => setFieldValue("mode", value)}
                            buttons={[
                                {
                                    value: "mm",
                                    label: "mm",
                                },
                                {
                                    value: "ss",
                                    label: "ss",
                                },
                                { value: "ds", label: "ds" },
                            ]}
                        />
                    </View>

                    <FieldArray name="splits">
                        {({ push }) => (
                            <View>
                                {values.splits.map((item, key) => (
                                    <TimeInput
                                        key={key}
                                        time={item.split}
                                        ref={item.ref}
                                        onChange={(value) => setFieldValue(`splits[${key}].split`, value)}
                                        containerStyle={styles.timeInput}
                                        mode={values.mode}
                                        log={false}
                                    />
                                ))}
                                <Button
                                    textColor={colors.secondary}
                                    style={styles.addButton}
                                    labelStyle={styles.addButtonText}
                                    onPress={() => push(getNewTimeSplit())}
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

export const getNewTimeSplit = () => ({ split: new TimeSpan(), ref: React.createRef() });
export const initialValues = {
    mode: ["mm", "ss", "ds"],
    splits: [getNewTimeSplit()],
};

export default TimeCalc;

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
