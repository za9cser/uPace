import { TimeSplit, SummaryOptions } from "@/types";

export interface TimeCalcFormValues {
  minutes: number;
  seconds: number;
  deciseconds: number;
  splits: TimeSplit[];
  summaryOptions: SummaryOptions;
}
