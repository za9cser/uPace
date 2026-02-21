import {
  PaceCalcFormValues,
  TimeObject,
  PaceObject,
} from "@/types/PaceCalcFormValues";

// Check if a time object is effectively "empty" (all zeros)
const isTimeEmpty = (time: TimeObject): boolean =>
  time.hours === 0 && time.minutes === 0 && time.seconds === 0;

// Check if a pace object is effectively "empty" (all zeros)
const isPaceEmpty = (pace: PaceObject): boolean =>
  pace.minutes === 0 && pace.seconds === 0;

// Time parsing and formatting utilities
export const parseTime = (time: TimeObject): number | null =>
  // Check if it's an empty time object
  isTimeEmpty(time)
    ? null
    : time.hours * 3600 + time.minutes * 60 + time.seconds;

export const formatTime = (seconds: number): TimeObject => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return { hours, minutes, seconds: secs };
};

export const parsePace = (pace: PaceObject): number | null =>
  isPaceEmpty(pace) ? null : pace.minutes * 60 + pace.seconds;

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
  const distance = values.distance?.trim() ? parseFloat(values.distance) : null;

  // Count how many fields are filled (not null and greater than 0)
  const filledCount = [timeSeconds, paceSeconds, distance].filter(
    (v) => v !== null && v > 0
  ).length;

  // We can only calculate if exactly 2 fields are filled
  if (filledCount !== 2) return values;

  const newValues = { ...values };

  const hasTime = timeSeconds !== null;
  const hasPace = paceSeconds !== null;
  const hasDistance = distance !== null;
  if (hasTime && hasPace && !hasDistance) {
    // Calculate distance from time and pace
    const calculatedDistance = timeSeconds / paceSeconds;
    newValues.distance = calculatedDistance.toFixed(2);
  } else if (hasTime && hasDistance && !hasPace) {
    // Calculate pace from time and distance
    const calculatedPace = timeSeconds / distance;
    newValues.pace = formatPace(calculatedPace);
  } else if (hasPace && hasDistance && !hasTime) {
    // Calculate time from pace and distance
    const calculatedTime = paceSeconds * distance;
    newValues.time = formatTime(calculatedTime);
  }

  return newValues;
};
