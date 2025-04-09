import { Form, Formik, FormikValues, useFormikContext } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { DistanceUnit } from "../../../lib/distanceUnit";
import { Text, View } from "react-native";
import { SegmentedButtons, TextInput } from "react-native-paper";
import { PaceCalcValue } from "../paceCalcUtils";
import TimeSplitsFormModel from "./timeSplitsForm";
import { displayTimePart } from "../../../lib/durationUtils";
import TimeSplitsTable from "./timeSplitsTable";

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
          <TimeSplitsTable />
        </>
      )}
    </Formik>
  );
};

export default TimeSplits;
