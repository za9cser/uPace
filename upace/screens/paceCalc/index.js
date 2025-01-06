import { Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import { Formik } from "formik";
import TimeInput from "../../components/timeInput";
import { initialValues, paceMode, timeMode } from "./paceCalcUtils";
import PaceCalcInput from "./paceCalcInput";
import { TimeSpan } from "timespan";

const PaceCalc = () => {
  const handleCalcTime = (values, setFieldValue) => {
    if (
      values.pace.totalSeconds() === 0 ||
      values.distance === 0 ||
      values.distance === ""
    )
      return;

    const timeSeconds =
      values.pace.totalSeconds() * parseFloat(values.distance);
    const time = new TimeSpan(0, timeSeconds);
    setFieldValue("time", time);
  };

  const handleCalcPace = (values, setFieldValue) => {
    if (
      values.time.totalSeconds() === 0 ||
      values.distance === 0 ||
      values.distance === ""
    )
      return;

    const paceSeconds =
      values.time.totalSeconds() / parseFloat(values.distance);
    const pace = new TimeSpan(0, paceSeconds);
    setFieldValue("pace", pace);
  };

  const handleCalcDistance = (values, setFieldValue) => {
    if (values.time.totalSeconds() === 0 || values.pace.totalSeconds() === 0)
      return;

    const distance = values.time.totalSeconds() / values.pace.totalSeconds();
    console.log("distance", distance);
    setFieldValue("distance", distance.toFixed(2));
  };

  return (
    <Formik initialValues={initialValues}>
      {({ setFieldValue, values }) => (
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.description} variant="titleMedium">
            Enter two values to calculate the third
          </Text>
          <PaceCalcInput
            buttonCaption={"Time"}
            onCalc={() => handleCalcTime(values, setFieldValue)}
          >
            <TimeInput
              mode={timeMode}
              time={values.time}
              onChange={(value) => setFieldValue("time", value)}
            />
          </PaceCalcInput>
          <PaceCalcInput
            buttonCaption={"Pace"}
            onCalc={() => handleCalcPace(values, setFieldValue)}
          >
            <TimeInput
              mode={paceMode}
              time={values.pace}
              onChange={(value) => setFieldValue("pace", value)}
            />
          </PaceCalcInput>
          <PaceCalcInput
            buttonCaption={"Distance"}
            onCalc={() => handleCalcDistance(values, setFieldValue)}
          >
            <TextInput
              value={values.distance?.toString() ?? ""}
              placeholder="km"
              onChangeText={(value) => setFieldValue("distance", value)}
              keyboardType="decimal-pad"
              style={styles.distance}
            />
          </PaceCalcInput>
        </ScrollView>
      )}
    </Formik>
  );
};

export default PaceCalc;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  description: {
    textAlign: "center",
  },
  distance: {
    width: 150,
    textAlign: "center",
    height: 40,
    fontSize: 18,
  },
});
