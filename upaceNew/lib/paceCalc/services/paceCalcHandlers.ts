import * as Clipboard from "expo-clipboard";
import { PaceCalcFormValues } from "../types/PaceCalcFormValues";
import { LapSplit, LapDistance } from "@/types";

// Time parsing and formatting utilities
export const parseTime = (timeStr: string): number => {
  const parts = timeStr.split(":").map(Number);
  if (parts.length !== 3) return 0;
  return parts[0] * 3600 + parts[1] * 60 + parts[2];
};

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const parsePace = (paceStr: string): number => {
  const parts = paceStr.split(":").map(Number);
  if (parts.length !== 2) return 0;
  return parts[0] * 60 + parts[1];
};

export const formatPace = (secondsPerKm: number): string => {
  const minutes = Math.floor(secondsPerKm / 60);
  const secs = Math.floor(secondsPerKm % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

// Main calculation logic
export const calculateMissingValue = (
  values: PaceCalcFormValues
): PaceCalcFormValues => {
  const timeSeconds =
    values.time && values.time.trim() ? parseTime(values.time) : null;
  const paceSeconds =
    values.pace && values.pace.trim() ? parsePace(values.pace) : null;
  const distance =
    values.distance && values.distance.trim()
      ? parseFloat(values.distance)
      : null;

  const filledCount = [timeSeconds, paceSeconds, distance].filter(
    (v) => v !== null && v > 0
  ).length;

  if (filledCount !== 2) {
    return values;
  }

  const newValues = { ...values };

  if (timeSeconds !== null && paceSeconds !== null && distance === null) {
    const calculatedDistance = timeSeconds / paceSeconds;
    newValues.distance = calculatedDistance.toFixed(2);
  } else if (
    timeSeconds !== null &&
    distance !== null &&
    paceSeconds === null
  ) {
    const calculatedPace = timeSeconds / distance;
    newValues.pace = formatPace(calculatedPace);
  } else if (
    paceSeconds !== null &&
    distance !== null &&
    timeSeconds === null
  ) {
    const calculatedTime = paceSeconds * distance;
    newValues.time = formatTime(calculatedTime);
  }

  return newValues;
};

export const calculateLapSplits = (values: PaceCalcFormValues): LapSplit[] => {
  const timeSeconds = values.time ? parseTime(values.time) : null;
  const paceSeconds = values.pace ? parsePace(values.pace) : null;
  const distance = values.distance ? parseFloat(values.distance) : null;

  if (!timeSeconds || !paceSeconds || !distance) {
    // We'll handle snackbar in the component
    return [];
  }

  const validLaps = values.lapDistances
    .map((lap) => parseFloat(lap.value))
    .filter((lap) => !isNaN(lap) && lap > 0);

  if (validLaps.length === 0) {
    // We'll handle snackbar in the component
    return [];
  }

  const splits: LapSplit[] = [];
  let cumulativeDistance = 0;
  let cumulativeTime = 0;

  validLaps.forEach((lapDistance, index) => {
    cumulativeDistance += lapDistance;
    if (cumulativeDistance > distance) {
      cumulativeDistance = distance;
    }

    const lapTime = lapDistance * paceSeconds;
    cumulativeTime += lapTime;

    if (cumulativeTime > timeSeconds) {
      cumulativeTime = timeSeconds;
    }

    splits.push({
      n: index + 1,
      distance: Math.round(cumulativeDistance * 100) / 100,
      totalTime: formatTime(cumulativeTime),
      splitTime: formatPace(lapTime),
    });
  });

  return splits;
};

// Lap distance management
export const updateLapDistance = (
  lapDistances: LapDistance[],
  id: string,
  value: string
): LapDistance[] => {
  return lapDistances.map((lap) => (lap.id === id ? { ...lap, value } : lap));
};

export const addLap = (lapDistances: LapDistance[]): LapDistance[] => {
  return [...lapDistances, { id: Date.now().toString(), value: "" }];
};

export const removeLap = (
  lapDistances: LapDistance[],
  id: string
): LapDistance[] => {
  if (lapDistances.length > 1) {
    return lapDistances.filter((lap) => lap.id !== id);
  }
  return lapDistances;
};

// Clipboard functions
export const copyTableToClipboard = async (lapSplits: LapSplit[]) => {
  if (lapSplits.length === 0) {
    // We'll handle snackbar in the component
    return;
  }

  const tableText = [
    "N\tDistance (km)\tTotal Time\tSplit Time",
    ...lapSplits.map(
      (split) =>
        `${split.n}\t${split.distance}\t${split.totalTime}\t${split.splitTime}`
    ),
  ].join("\n");

  await Clipboard.setStringAsync(tableText);
};
