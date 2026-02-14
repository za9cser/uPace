import * as Clipboard from "expo-clipboard";
import {
  PaceCalcFormValues,
  TimeObject,
  PaceObject,
} from "../types/PaceCalcFormValues";
import { LapSplit, LapDistance } from "@/types";

// Check if a time object is effectively "empty" (all zeros)
const isTimeEmpty = (time: TimeObject): boolean => {
  return time.hours === 0 && time.minutes === 0 && time.seconds === 0;
};

// Check if a pace object is effectively "empty" (all zeros)
const isPaceEmpty = (pace: PaceObject): boolean => {
  return pace.minutes === 0 && pace.seconds === 0;
};

// Time parsing and formatting utilities
export const parseTime = (time: TimeObject): number | null => {
  // Check if it's an empty time object
  if (isTimeEmpty(time)) {
    return null;
  }
  return time.hours * 3600 + time.minutes * 60 + time.seconds;
};

export const formatTime = (seconds: number): TimeObject => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return { hours, minutes, seconds: secs };
};

export const parsePace = (pace: PaceObject): number | null => {
  // Check if it's an empty pace object
  if (isPaceEmpty(pace)) {
    return null;
  }
  return pace.minutes * 60 + pace.seconds;
};

export const formatPace = (secondsPerKm: number): PaceObject => {
  const minutes = Math.floor(secondsPerKm / 60);
  const secs = Math.floor(secondsPerKm % 60);
  return { minutes, seconds: secs };
};

// Main calculation logic
export const calculateMissingValue = (
  values: PaceCalcFormValues
): PaceCalcFormValues => {
  const timeSeconds = values.time ? parseTime(values.time) : null;
  const paceSeconds = values.pace ? parsePace(values.pace) : null;
  const distance =
    values.distance && values.distance.trim()
      ? parseFloat(values.distance)
      : null;

  // Count how many fields are filled (not null and greater than 0)
  const filledCount = [timeSeconds, paceSeconds, distance].filter(
    (v) => v !== null && v > 0
  ).length;

  // We can only calculate if exactly 2 fields are filled
  if (filledCount !== 2) {
    return values;
  }

  const newValues = { ...values };

  if (timeSeconds !== null && paceSeconds !== null && distance === null) {
    // Calculate distance from time and pace
    const calculatedDistance = timeSeconds / paceSeconds;
    newValues.distance = calculatedDistance.toFixed(2);
  } else if (
    timeSeconds !== null &&
    distance !== null &&
    paceSeconds === null
  ) {
    // Calculate pace from time and distance
    const calculatedPace = timeSeconds / distance;
    newValues.pace = formatPace(calculatedPace);
  } else if (
    paceSeconds !== null &&
    distance !== null &&
    timeSeconds === null
  ) {
    // Calculate time from pace and distance
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
      totalTime: formatTimeToString(formatTime(cumulativeTime)),
      splitTime: formatPaceToString(formatPace(lapTime)),
    });
  });

  return splits;
};

// Format time object to string for display
export const formatTimeToString = (time: TimeObject): string => {
  return `${time.hours.toString().padStart(2, "0")}:${time.minutes
    .toString()
    .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`;
};

// Format pace object to string for display
export const formatPaceToString = (pace: PaceObject): string => {
  return `${pace.minutes}:${pace.seconds.toString().padStart(2, "0")}`;
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
