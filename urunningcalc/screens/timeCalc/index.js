import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TimeInput from "../../components/timeInput";
import { FieldArray, Formik } from "formik";
import { Button } from "react-native-paper";
import { TimeSpan } from "timespan";

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
                                        log={true}
                                    />
                                ))}
                                <Button onPress={() => push(new TimeSpan())}>Add</Button>
                            </View>
                        )}
                    </FieldArray>

                    {
                        <Text>
                            {values.splits
                                .reduce((acc, current) => {
                                    acc.add(current);
                                    return acc;
                                }, new TimeSpan())
                                .toString()}
                        </Text>
                    }
                </View>
            )}
        </Formik>
    );
};

const initialValues = {
    splits: [new TimeSpan()],
};

export default TimeCalc;

const styles = StyleSheet.create({});
