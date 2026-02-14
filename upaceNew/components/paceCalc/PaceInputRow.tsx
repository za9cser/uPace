import React from "react";
import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import { TimeInput } from "../TimeInput";
import TimePaceDistanceButton from "./TimePaceDistanceButton";
import { PaceCalcFormValues } from "@/lib/paceCalc/types/PaceCalcFormValues";
import {
  handleCalculateField,
  handleFieldChange,
  parsePaceValues,
  formatPaceValue,
} from "@/lib/paceCalc/services/paceInputUtils";

const PaceInputRow = () => {
  const { values, setFieldValue } = useFormikContext<PaceCalcFormValues>();

  // Parse pace values from Formik
  const { minutes: paceMinutes, seconds: paceSeconds } = parsePaceValues(
    values.pace
  );

  const handlePaceChange = (field: "minutes" | "seconds", value: number) => {
    let newMinutes = paceMinutes;
    let newSeconds = paceSeconds;

    switch (field) {
      case "minutes":
        newMinutes = value;
        break;
      case "seconds":
        newSeconds = value;
        break;
    }

    const formattedPace = formatPaceValue(newMinutes, newSeconds);

    handleFieldChange("pace", formattedPace, values, setFieldValue);
  };

  const handleCalculate = () => {
    handleCalculateField(values, setFieldValue, "pace");
  };

  return (
    <View style={styles.inputRow}>
      <TimePaceDistanceButton label="Pace" onPress={handleCalculate} />
      <View style={styles.timeInputsRow}>
        <View style={styles.inputSpacer} />
        <View style={styles.inputWrapper}>
          <TimeInput
            label=""
            value={paceMinutes}
            onChange={(value) => handlePaceChange("minutes", value)}
            max={59}
            placeholder="mm"
            min={0}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TimeInput
            label=""
            value={paceSeconds}
            onChange={(value) => handlePaceChange("seconds", value)}
            max={59}
            placeholder="ss"
            min={0}
          />
        </View>
      </View>
    </View>
  );
};

export default PaceInputRow;

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
  inputSpacer: {
    width: 60,
  },
  inputWrapper: {
    width: 60,
  },
});
