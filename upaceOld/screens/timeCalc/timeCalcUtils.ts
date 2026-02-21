import moment from "moment";
import React from "react";
import { TimeMode } from "../../lib/timeMode";

export const getNewTimeSplit = () =>
  ({ split: moment.duration(), ref: React.createRef() } as TimeSplit);
export const initialValues = {
  mode: { inputModes: ["mm", "ss", "ds"], displayModes: ["mm", "ss", "ds"] },
  splits: [getNewTimeSplit()],
} as TimeCalcState;

export type TimeCalcState = {
  mode: TimeMode;
  splits: TimeSplit[];
};

export type TimeSplit = {
  split: moment.Duration;
  ref: React.RefObject<any>;
};
