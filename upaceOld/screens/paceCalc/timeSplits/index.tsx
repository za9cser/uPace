import { Form, Formik, useFormikContext } from "formik";
import React from "react";
import { DistanceUnit } from "../../../lib/distanceUnit";
import { PaceCalcValue } from "../paceCalcUtils";
import TimeSplitsFormModel from "./timeSplitsForm";
import TimeSplitsTable from "./timeSplitsTable";

type TimeSplitsFormModel = {
  lapDistance?: string;
  lapUnit: DistanceUnit;
  timeSplits: TimeSplit[];
};

export type { TimeSplitsFormModel };

const TimeSplits = () => {
  const { values: paceCalcValues } = useFormikContext<PaceCalcValue>();

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
      <>
        <TimeSplitsFormModel
          distance={paceCalcValues.distance}
          pace={paceCalcValues.pace}
        />
        <TimeSplitsTable />
      </>
    </Formik>
  );
};

export default TimeSplits;
