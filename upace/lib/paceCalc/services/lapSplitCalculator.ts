import { LapSplit } from "@/types";

/**
 * Calculate lap splits based on lap distance, pace, and total distance
 * @param lapDistance Distance of each lap in kilometers
 * @param paceMinutes Minutes per kilometer
 * @param paceSeconds Seconds per kilometer
 * @param totalDistance Total distance in kilometers
 * @returns Array of lap splits
 */
export const calculateLapSplits = (
  lapDistance: number,
  paceMinutes: number,
  paceSeconds: number,
  totalDistance: number
): LapSplit[] => {
  // Convert pace to seconds per kilometer
  const paceInSeconds = paceMinutes * 60 + paceSeconds;

  if (paceInSeconds <= 0 || totalDistance <= 0 || lapDistance <= 0) {
    return [];
  }

  const splits: LapSplit[] = [];
  let accumulatedDistance = 0;
  let accumulatedTimeSeconds = 0;

  // Calculate full laps
  const fullLaps = Math.floor(totalDistance / lapDistance);

  // Add full laps
  for (let i = 1; i <= fullLaps; i++) {
    accumulatedDistance += lapDistance;
    accumulatedTimeSeconds += lapDistance * paceInSeconds;

    const totalTime = formatTime(accumulatedTimeSeconds);
    const splitTime = formatPace(lapDistance * paceInSeconds);

    splits.push({
      n: i,
      distance: accumulatedDistance,
      totalTime,
      splitTime,
    });
  }

  // Add final partial lap if exists
  const remainingDistance = totalDistance - fullLaps * lapDistance;
  if (remainingDistance > 0) {
    accumulatedDistance += remainingDistance;
    accumulatedTimeSeconds += remainingDistance * paceInSeconds;

    const totalTime = formatTime(accumulatedTimeSeconds);
    const splitTime = formatPace(remainingDistance * paceInSeconds);

    splits.push({
      n: splits.length + 1,
      distance: accumulatedDistance,
      totalTime,
      splitTime,
    });
  }

  return splits;
};

/**
 * Format seconds to HH:MM:SS format
 * @param totalSeconds Total seconds
 * @returns Formatted time string
 */
const formatTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const pad = (num: number): string => num.toString().padStart(2, "0");

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  } else {
    return `${pad(minutes)}:${pad(seconds)}`;
  }
};

/**
 * Format seconds to MM:SS format
 * @param totalSeconds Total seconds
 * @returns Formatted pace string
 */
const formatPace = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const pad = (num: number): string => num.toString().padStart(2, "0");

  return `${pad(minutes)}:${pad(seconds)}`;
};
