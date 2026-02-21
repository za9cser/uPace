import * as Clipboard from "expo-clipboard";
import { TimeCalcFormValues } from "@/types/TimeCalcFormValues";

// Time calculation utilities
export const calculateTotal = (
  values: TimeCalcFormValues
): {
  minutes: number;
  seconds: number;
  deciseconds: number;
} => {
  let totalDeciseconds = 0;
  values.splits.forEach((split) => {
    if (values.summaryOptions.includeMinutes) {
      totalDeciseconds += split.minutes * 600;
    }
    if (values.summaryOptions.includeSeconds) {
      totalDeciseconds += split.seconds * 10;
    }
    if (values.summaryOptions.includeDeciseconds) {
      totalDeciseconds += split.deciseconds;
    }
  });

  const minutes = Math.floor(totalDeciseconds / 600);
  const remainingDeciseconds = totalDeciseconds % 600;
  const seconds = Math.floor(remainingDeciseconds / 10);
  const deciseconds = remainingDeciseconds % 10;

  return { minutes, seconds, deciseconds };
};

export const formatResult = (values: TimeCalcFormValues): string => {
  const { minutes, seconds, deciseconds } = calculateTotal(values);

  // Always return full format mm:ss.d
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}.${deciseconds}`;
};

export const copyResultToClipboard = async (values: TimeCalcFormValues) => {
  const result = formatResult(values);
  await Clipboard.setStringAsync(result);
};

export const copySplitsToClipboard = async (values: TimeCalcFormValues) => {
  if (values.splits.length === 0)
    return { success: false, message: "Add some splits first" };

  const splitsText = values.splits
    .map((split) => {
      const parts = [];
      if (values.summaryOptions.includeMinutes) {
        parts.push(split.minutes.toString().padStart(2, "0"));
      }
      if (values.summaryOptions.includeSeconds) {
        parts.push(split.seconds.toString().padStart(2, "0"));
      }
      if (values.summaryOptions.includeDeciseconds) {
        parts.push(split.deciseconds.toString());
      }

      if (parts.length === 3) {
        return `${parts[0]}:${parts[1]}.${parts[2]}`;
      } else if (parts.length === 2) {
        if (
          values.summaryOptions.includeMinutes &&
          values.summaryOptions.includeSeconds
        ) {
          return `${parts[0]}:${parts[1]}`;
        } else if (
          values.summaryOptions.includeMinutes &&
          values.summaryOptions.includeDeciseconds
        ) {
          return `${parts[0]}:00.${parts[1]}`;
        } else {
          return `${parts[0]}.${parts[1]}`;
        }
      } else if (parts.length === 1) {
        return parts[0];
      }
      return "";
    })
    .filter((part) => part.length > 0)
    .join(" - ");

  await Clipboard.setStringAsync(splitsText);
  return { success: true, message: "Splits copied to clipboard" };
};

export const clearAll = (values: TimeCalcFormValues) => ({
  ...values,
  splits: [],
});
