import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TimeInput from "../../components/timeInput";
import { FieldArray, Form, Formik } from "formik";
import { Button } from "react-native-paper";

const TimeCalc = () => {
    return (
        <Formik initialValues={initialValues}>
            {({ handleChange, values }) => (
                <View>
                    <FieldArray name="splits">
                        {({ push }) => (
                            <View>
                                {values.splits.map((item, key) => (
                                    <TimeInput
                                        name={`splits[${key}]`}
                                        time={item}
                                        onChange={(value) => handleChange(`splits[${key}]`, value)}
                                    />
                                ))}
                                <Button onPress={() => push(new Date())}>Add</Button>
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
    splits: [new Date()],
};

export default TimeCalc;

const styles = StyleSheet.create({});
