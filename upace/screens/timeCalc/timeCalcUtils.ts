import moment from "moment";
import React from "react";

export const getNewTimeSplit = () => ({ split: moment.duration(), ref: React.createRef() } as TimeSplit);
export const initialValues = {
    mode: { inputModes: ["mm", "ss", "ds"], displayModes: ["mm", "ss", "ds"] },
    splits: [getNewTimeSplit()],
} as TimeCalcValue;

export type TimeCalcValue = {
    mode : TimeMode,
    splits : TimeSplit[]
}

export type TimeMode = {
    inputModes: string[],
    displayModes: string[],
}

export type TimeSplit = {
    split: moment.Duration;
    ref: React.RefObject<any>
}

