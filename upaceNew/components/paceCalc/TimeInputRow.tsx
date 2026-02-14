import React from "react";
import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import { TimeInput } from "../TimeInput";
import TimePaceDistanceButton from "./TimePaceDistanceButton";
import { PaceCalcFormValues } from "@/lib/paceCalc/types/PaceCalcFormValues";
import {
  handleCalculateField,
  handleFieldChange,
  parseTimeValues,
  formatTimeValue,
} from "@/lib/paceCalc/services/paceInputUtils";

const TimeInputRow = () => {
  const { values, setFieldValue } = useFormikContext<PaceCalcFormValues>();

  // Parse time values from Formik
  const {
    hours: timeHours,
    minutes: timeMinutes,
    seconds: timeSeconds,
  } = parseTimeValues(values.time);

  const handleTimeChange = (
    field: "hours" | "minutes" | "seconds",
    value: number
  ) => {
    let newHours = timeHours;
    let newMinutes = timeMinutes;
    let newSeconds = timeSeconds;

    switch (field) {
      case "hours":
        newHours = value;
        break;
      case "minutes":
        newMinutes = value;
        break;
      case "seconds":
        newSeconds = value;
        break;
    }

    const formattedTime = formatTimeValue(newHours, newMinutes, newSeconds);

    handleFieldChange("time", formattedTime, values, setFieldValue);
  };

  const handleCalculate = () => {
    handleCalculateField(values, setFieldValue, "time");
  };

  return (
    <View style={styles.inputRow}>
      <TimePaceDistanceButton label="Time" onPress={handleCalculate} />
      <View style={styles.timeInputsRow}>
        <View style={styles.inputWrapper}>
          <TimeInput
            label=""
            value={timeHours}
            onChange={(value) => handleTimeChange("hours", value)}
            max={23}
            placeholder="hh"
            min={0}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TimeInput
            label=""
            value={timeMinutes}
            onChange={(value) => handleTimeChange("minutes", value)}
            max={59}
            placeholder="mm"
            min={0}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TimeInput
            label=""
            value={timeSeconds}
            onChange={(value) => handleTimeChange("seconds", value)}
            max={59}
            placeholder="ss"
            min={0}
          />
        </View>
      </View>
    </View>
  );
};

export default TimeInputRow;

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 12,
    gap: 12,
  },
  timeInputsRow: {
    flex: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  inputWrapper: {
    width: 60,
  },
});
