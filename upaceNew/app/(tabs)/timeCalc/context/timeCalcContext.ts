import { createContext, useContext } from "react";
import { TimeSplit, SummaryOptions } from "../../../../types";

export interface TimeCalcFormValues {
  minutes: number;
  seconds: number;
  deciseconds: number;
  splits: TimeSplit[];
  summaryOptions: SummaryOptions;
}

export interface TimeCalcContextType {
  addSplit: (values: TimeCalcFormValues) => void;
  removeSplit: (id: string) => void;
  toggleSummaryOption: (option: keyof SummaryOptions) => void;
  calculateTotal: (values: TimeCalcFormValues) => {
    minutes: number;
    seconds: number;
    deciseconds: number;
  };
  formatResult: (values: TimeCalcFormValues) => string;
  copyResultToClipboard: (values: TimeCalcFormValues) => Promise<void>;
  copySplitsToClipboard: (values: TimeCalcFormValues) => Promise<void>;
  clearAll: () => void;
}

export const TimeCalcContext = createContext<TimeCalcContextType | undefined>(
  undefined
);

export const useTimeCalc = () => {
  const context = useContext(TimeCalcContext);
  if (!context) {
    throw new Error("useTimeCalc must be used within TimeCalcProvider");
  }
  return context;
};
