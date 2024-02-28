import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TimeInput from "../../components/timeInput";
import { FieldArray, Form, Formik } from "formik";
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
                                        onChange={(value) => {
                                            console.log("value", value);
                                            setFieldValue(`splits[${key}]`, value);
                                        }}
                                    />
                                ))}
                                <Button onPress={() => push(new TimeSpan())}>Add</Button>
                            </View>
                        )}
                    </FieldArray>

                    <Text>result</Text>
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
