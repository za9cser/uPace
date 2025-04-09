import { Form, Formik, FormikValues, useFormikContext } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { DistanceUnit } from "../../../lib/distanceUnit";
import { Text, View } from "react-native";
import { SegmentedButtons, TextInput } from "react-native-paper";
import { PaceCalcValue } from "../paceCalcUtils";
import TimeSplitsFormModel from "./timeSplitsForm";
import { displayTimePart } from "../../../lib/durationUtils";

type TimeSplitsFormModel = {
  lapDistance?: string;
  lapUnit: DistanceUnit;
  timeSplits: TimeSplit[];
};

export type { TimeSplitsFormModel };

const TimeSplits = () => {
  const { values: paceCalcValues } = useFormikContext<PaceCalcValue>();
  const [timeSplits, setTimeSplits] = useState<TimeSplit[]>([]);

  const handleSubmit = (values: TimeSplitsFormModel) => {};

  return (
    <Formik
      initialValues={
        {
          lapDistance: "1",
          lapUnit: DistanceUnit.KM,
          timeSplits: [],
        } as TimeSplitsFormModel
      }
      onSubmit={() => {}}
    >
      {({ setFieldValue, values }) => (
        <>
          <TimeSplitsFormModel
            distance={paceCalcValues.distance}
            pace={paceCalcValues.pace}
          />
          {values.timeSplits?.length > 0 &&
            values.timeSplits.map((timeSplit) => {
              const hours = timeSplit.totalTime.hours();
              const hasHours = hours > 0;
              return (
                <View style={{ flexDirection: "row" }} key={timeSplit.number}>
                  <Text style={{ flex: 2 }}>{timeSplit.number}</Text>
                  <Text style={{ flex: 3 }}>{timeSplit.totalDistance}</Text>
                  <Text style={{ flex: 3 }}>
                    {hasHours ? `${hours}:` : ""}
                    {displayTimePart(timeSplit.totalTime.minutes(), hasHours)}:
                    {displayTimePart(timeSplit.totalTime.seconds())}
                  </Text>
                  <Text style={{ flex: 3 }}>
                    {timeSplit.splitTime.minutes()}:
                    {displayTimePart(timeSplit.splitTime.seconds())}
                  </Text>
                </View>
              );
            })}
        </>
      )}
    </Formik>
  );
};

export default TimeSplits;
