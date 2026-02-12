import { LapDistance, LapSplit } from "@/types";

export interface PaceCalcFormValues {
  time: string;
  pace: string;
  distance: string;
  lapDistances: LapDistance[];
  lapSplits: LapSplit[];
}
