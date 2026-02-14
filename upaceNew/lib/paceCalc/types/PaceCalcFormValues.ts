import { LapDistance, LapSplit } from "@/types";

export interface TimeObject {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface PaceObject {
  minutes: number;
  seconds: number;
}

export interface PaceCalcFormValues {
  time: TimeObject;
  pace: PaceObject;
  distance: string;
  lapDistances: LapDistance[];
  lapSplits: LapSplit[];
}
