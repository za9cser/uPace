import {
  PaceCalcFormValues,
  TimeObject,
  PaceObject,
} from "../types/PaceCalcFormValues";
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
  switch (targetField) {
    case "time":
      tempValues.time = { hours: 0, minutes: 0, seconds: 0 };
      break;
    case "pace":
      tempValues.pace = { minutes: 0, seconds: 0 };
      break;
    case "distance":
      tempValues.distance = "";
      break;
  }

  // Calculate the missing value
  const calculated = calculateMissingValue(tempValues);

  // Update the target field with the calculated value
  if (calculated[targetField]) {
    setFieldValue(targetField, calculated[targetField]);
  }
};

// Handle field change with auto-calculation
export const handleFieldChange = (
  field: keyof PaceCalcFormValues,
  value: string | TimeObject | PaceObject,
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
  ].filter((v) => v && isFilled(v)).length;

  // If we're clearing a field (going from 3 to 2 filled fields), don't auto-calculate
  if (!isFilled(value) && previousFilledCount === 3) {
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
  ].filter((v) => v && isFilled(v)).length;

  // Auto-calculate only when we have exactly 2 filled fields
  if (currentFilledCount === 2) {
    if (
      isFilled(tempValues.time) &&
      calculated.time &&
      !isTimeEqual(tempValues.time, calculated.time)
    ) {
      setFieldValue("time", calculated.time);
    }
    if (
      isFilled(tempValues.pace) &&
      calculated.pace &&
      !isPaceEqual(tempValues.pace, calculated.pace)
    ) {
      setFieldValue("pace", calculated.pace);
    }
    if (
      isFilled(tempValues.distance) &&
      calculated.distance &&
      calculated.distance !== tempValues.distance
    ) {
      setFieldValue("distance", calculated.distance);
    }
  }
};

// Handle time field change
export const handleTimeFieldChange = (
  field: keyof TimeObject,
  value: number,
  currentTime: TimeObject,
  values: PaceCalcFormValues,
  setFieldValue: (field: string, value: any) => void
) => {
  // Create a new time object with the updated field
  const newTime = { ...currentTime, [field]: value };

  // Use the general field change handler
  handleFieldChange("time", newTime, values, setFieldValue);
};

// Handle pace field change
export const handlePaceFieldChange = (
  field: keyof PaceObject,
  value: number,
  currentPace: PaceObject,
  values: PaceCalcFormValues,
  setFieldValue: (field: string, value: any) => void
) => {
  // Create a new pace object with the updated field
  const newPace = { ...currentPace, [field]: value };

  // Use the general field change handler
  handleFieldChange("pace", newPace, values, setFieldValue);
};

// Check if a field is filled
const isFilled = (value: string | TimeObject | PaceObject): boolean => {
  if (typeof value === "string") {
    return value.trim() !== "";
  } else if (isTimeObject(value)) {
    // For time objects, check if any field has a non-zero value
    return value.hours > 0 || value.minutes > 0 || value.seconds > 0;
  } else if (isPaceObject(value)) {
    // For pace objects, check if any field has a non-zero value
    return value.minutes > 0 || value.seconds > 0;
  }
  return false;
};

// Check if two values are equal
const isValueEqual = (
  value1: any,
  value2: any,
  fieldType: "time" | "pace" | "distance"
): boolean => {
  if (fieldType === "time" && isTimeObject(value1) && isTimeObject(value2)) {
    return isTimeEqual(value1, value2);
  } else if (
    fieldType === "pace" &&
    isPaceObject(value1) &&
    isPaceObject(value2)
  ) {
    return isPaceEqual(value1, value2);
  } else if (
    fieldType === "distance" &&
    typeof value1 === "string" &&
    typeof value2 === "string"
  ) {
    return value1 === value2;
  }
  return false;
};

// Type guards
const isTimeObject = (value: any): value is TimeObject => {
  return (
    value &&
    typeof value === "object" &&
    "hours" in value &&
    "minutes" in value &&
    "seconds" in value
  );
};

const isPaceObject = (value: any): value is PaceObject => {
  return (
    value &&
    typeof value === "object" &&
    "minutes" in value &&
    "seconds" in value
  );
};

// Compare time objects
const isTimeEqual = (time1: TimeObject, time2: TimeObject): boolean => {
  return (
    time1.hours === time2.hours &&
    time1.minutes === time2.minutes &&
    time1.seconds === time2.seconds
  );
};

// Compare pace objects
const isPaceEqual = (pace1: PaceObject, pace2: PaceObject): boolean => {
  return pace1.minutes === pace2.minutes && pace1.seconds === pace2.seconds;
};

// Parse time values from Formik
export const parseTimeValues = (timeObj: TimeObject) => {
  return {
    hours: timeObj.hours || 0,
    minutes: timeObj.minutes || 0,
    seconds: timeObj.seconds || 0,
  };
};

// Parse pace values from Formik
export const parsePaceValues = (paceObj: PaceObject) => {
  return {
    minutes: paceObj.minutes || 0,
    seconds: paceObj.seconds || 0,
  };
};

// Format time values
export const formatTimeValue = (
  hours: number,
  minutes: number,
  seconds: number
): TimeObject => {
  return { hours, minutes, seconds };
};

// Format pace values
export const formatPaceValue = (
  minutes: number,
  seconds: number
): PaceObject => {
  return { minutes, seconds };
};
