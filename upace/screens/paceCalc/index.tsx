import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { TextInput, Text } from "react-native-paper";
import { Formik, FormikErrors } from "formik";
import TimeInput from "../../components/timeInput";
import {
  initialValues,
  PaceCalcValue as PaceCalcState,
  paceMode,
  timeMode,
} from "./paceCalcUtils";
import PaceCalcInput from "./paceCalcInput";
import moment from "moment";
import TimeSplits from "./timeSplits";

const PaceCalc = () => {
  const handleCalcTime = (
    values: PaceCalcState,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => Promise<void | FormikErrors<PaceCalcState>>
  ) => {
    const paceSeconds = values.pace.asSeconds();
    if (paceSeconds === 0 || !values.distance) return;

    const timeSeconds = paceSeconds * values.distance;
    const time = moment.duration(timeSeconds, "s");
    setFieldValue("time", time);
  };

  const handleCalcPace = (
    values: PaceCalcState,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => Promise<void | FormikErrors<PaceCalcState>>
  ) => {
    const timeSeconds = values.time.asSeconds();
    if (timeSeconds === 0 || !values.distance) return;

    const paceSeconds = timeSeconds / values.distance;
    const pace = moment.duration(paceSeconds, "s");
    setFieldValue("pace", pace);
  };

  const handleCalcDistance = (
    values: PaceCalcState,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => Promise<void | FormikErrors<PaceCalcState>>
  ) => {
    const timeSeconds = values.time.asSeconds();
    const paceSeconds = values.pace.asSeconds();
    if (timeSeconds === 0 || paceSeconds === 0) return;

    const distance = timeSeconds / paceSeconds;
    setFieldValue("distance", distance.toFixed(2));
  };

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
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
              containerStyle={styles.timeInput}
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
              containerStyle={styles.timeInput}
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
              style={[styles.timeInput, styles.distance]}
            />
          </PaceCalcInput>
          <TimeSplits />
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
    gap: 4,
  },
  description: {
    textAlign: "center",
  },
  timeInput: {
    marginTop: 8,
  },
  distance: {
    width: 145,
    textAlign: "center",
    height: 40,
    fontSize: 18,
  },
});
