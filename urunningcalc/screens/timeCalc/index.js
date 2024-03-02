import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TimeInput from "../../components/timeInput";
import { FieldArray, Formik } from "formik";
import { Button } from "react-native-paper";
import { TimeSpan } from "timespan";
import TimeSummary from "./timeSummary";

const TimeCalc = () => {
    return (
        <Formik initialValues={initialValues}>
            {({ setFieldValue, values }) => (
                <View>
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
                                <Button onPress={() => push(new TimeSpan())}>Add</Button>
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
    timeInput: {
        justifyContent: "center",
        paddingRight: 20,
    },
    summary: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingEnd: 100,
        borderTopColor: "grey",
        borderTopWidth: 1,
    },
});
