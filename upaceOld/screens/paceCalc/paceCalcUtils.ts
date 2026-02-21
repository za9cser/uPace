import moment from "moment";
import React from "react";
import { TimeMode } from "../../lib/timeMode";

export const getNewTimeSplit = () => ({
  split: moment.duration(),
  ref: React.createRef(),
});

export const initialValues = {
  time: moment.duration(),
  pace: moment.duration(),
  distance: undefined,
} as PaceCalcValue;

export type PaceCalcValue = {
  time: moment.Duration;
  pace: moment.Duration;
  distance?: number;
};

export const timeMode = {
  inputModes: ["hh", "mm", "ss"],
  displayModes: ["hh", "mm", "ss"],
} as TimeMode;

export const paceMode = {
  inputModes: ["mm", "ss"],
  displayModes: ["mm", "ss"],
} as TimeMode;
