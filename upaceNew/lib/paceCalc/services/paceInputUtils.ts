import { PaceCalcFormValues } from "../types/PaceCalcFormValues";
import { calculateMissingValue } from "./paceCalcHandlers";
import { Keyboard } from "react-native";

// Handle calculation for a specific field
export const handleCalculateField = (
  values: PaceCalcFormValues,
  setFieldValue: (field: string, value: any) => void,
  targetField: "time" | "pace" | "distance"
) => {
  // Dismiss keyboard first
  Keyboard.dismiss();

  // Create a temporary object with current values
  const tempValues = { ...values };

  // Clear the target field to calculate it
  if (targetField === "time") {
    tempValues.time = "";
  } else if (targetField === "pace") {
    tempValues.pace = "";
  } else if (targetField === "distance") {
    tempValues.distance = "";
  }

  // Calculate the missing value
  const calculated = calculateMissingValue(tempValues);

  // Update the target field with the calculated value
  if (
    calculated[targetField] &&
    calculated[targetField] !== tempValues[targetField]
  ) {
    setFieldValue(targetField, calculated[targetField]);
  }
};

// Handle field change with auto-calculation
export const handleFieldChange = (
  field: keyof PaceCalcFormValues,
  value: string,
  values: PaceCalcFormValues,
  setFieldValue: (field: string, value: any) => void
) => {
  setFieldValue(field, value);

  // Only auto-calculate when we have exactly 2 filled fields and we're adding a new value
  // Don't auto-calculate when clearing a field
  const previousFilledCount = [
    values.time,
    values.pace,
    values.distance,
  ].filter((v) => v && v.trim() !== "").length;

  // If we're clearing a field (going from 3 to 2 filled fields), don't auto-calculate
  if (value.trim() === "" && previousFilledCount === 3) {
    return;
  }

  // Create a temporary object to calculate missing values
  const tempValues = { ...values, [field]: value };
  const calculated = calculateMissingValue(tempValues);

  // Only update fields that have been calculated and are different
  const currentFilledCount = [
    tempValues.time,
    tempValues.pace,
    tempValues.distance,
  ].filter((v) => v && v.trim() !== "").length;

  // Auto-calculate only when we have exactly 2 filled fields
  if (currentFilledCount === 2) {
    if (
      tempValues.time &&
      calculated.time &&
      calculated.time !== tempValues.time
    ) {
      setFieldValue("time", calculated.time);
    }
    if (
      tempValues.pace &&
      calculated.pace &&
      calculated.pace !== tempValues.pace
    ) {
      setFieldValue("pace", calculated.pace);
    }
    if (
      tempValues.distance &&
      calculated.distance &&
      calculated.distance !== tempValues.distance
    ) {
      setFieldValue("distance", calculated.distance);
    }
  }
};

// Parse time values from Formik
export const parseTimeValues = (timeStr: string) => {
  const timeParts = timeStr ? timeStr.split(":").map(Number) : [0, 0, 0];
  return {
    hours: timeParts[0] || 0,
    minutes: timeParts[1] || 0,
    seconds: timeParts[2] || 0,
  };
};

// Parse pace values from Formik
export const parsePaceValues = (paceStr: string) => {
  const paceParts = paceStr ? paceStr.split(":").map(Number) : [0, 0];
  return {
    minutes: paceParts[0] || 0,
    seconds: paceParts[1] || 0,
  };
};

// Format time values
export const formatTimeValue = (
  hours: number,
  minutes: number,
  seconds: number
) => {
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

// Format pace values
export const formatPaceValue = (minutes: number, seconds: number) => {
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
