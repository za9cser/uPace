import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import TimeInput from "../TimeInput";
import CalcButton from "./CalcButton";
import { PaceCalcFormValues } from "@/lib/paceCalc/types/PaceCalcFormValues";
import {
  handleCalculateField,
  handleTimeFieldChange,
  parseTimeValues,
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
    field: keyof PaceCalcFormValues["time"],
    value: number
  ) => {
    handleTimeFieldChange(field, value, values.time, values, setFieldValue);
  };

  const handleCalculate = () => {
    handleCalculateField(values, setFieldValue, "time");
  };

  return (
    <View style={styles.inputRow}>
      <CalcButton label="Time" onPress={handleCalculate} />
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
