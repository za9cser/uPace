import { Form, Formik, FormikValues } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { DistanceUnit } from "../../../lib/distanceUnit";
import { Text, View } from "react-native";
import { SegmentedButtons, TextInput } from "react-native-paper";

type Props = {
  distance: number;
  pace: moment.Duration;
};

type TimeSplitsForm = {
  lapDistance?: string;
  lapUnit: DistanceUnit;
};

const TimeSplits = ({ distance, pace }: Props) => {
  const [timeSplits, setTimeSplits] = useState<TimeSplit[]>([]);

  const handleSubmit = (values: TimeSplitsForm) => {};

  return (
    <Formik
      initialValues={
        { lapDistance: "1", lapUnit: DistanceUnit.KM } as TimeSplitsForm
      }
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <View style={{ flexDirection: "row" }}>
          <Text>Calc laps by</Text>
          <TextInput
            label={"lap distance"}
            value={values.lapDistance}
            onChangeText={(value) => setFieldValue("lapDistance", value)}
          />
          <SegmentedButtons
            value={values.lapUnit}
            onValueChange={(value) => {
              setFieldValue("lapUnit", value);
              if (values.lapDistance) {
                const distance = parseFloat(values.lapDistance);
                setFieldValue(
                  "lapDistance",
                  (value === DistanceUnit.M
                    ? distance * 1000
                    : distance / 1000
                  ).toString()
                );
              }
            }}
            buttons={[
              { label: "km", value: DistanceUnit.KM },
              { label: "m", value: DistanceUnit.M },
            ]}
          />
        </View>
      )}
    </Formik>
  );
};

export default TimeSplits;
