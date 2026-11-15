import { View, StyleSheet } from "react-native";
import type { TextInputInstance } from "react-native";
import { useFormikContext } from "formik";
import TimeInput from "../common/TimeInput";
import CalcButton from "./CalcButton";
import { PaceCalcFormValues } from "@/lib/paceCalc/types/PaceCalcFormValues";
import {
  handleCalculateField,
  handlePaceFieldChange,
  parsePaceValues,
} from "@/lib/paceCalc/services/paceInputUtils";
import { forwardRef, useImperativeHandle, useRef } from "react";

interface PaceInputFocusHandle {
  focus: () => void;
}

const PaceInputRow = forwardRef<PaceInputFocusHandle>(
  (props, ref) => {
    const { values, setFieldValue } = useFormikContext<PaceCalcFormValues>();
    const minutesRef = useRef<TextInputInstance>(null);
    const secondsRef = useRef<TextInputInstance>(null);

    useImperativeHandle(ref, () => ({
      focus: () => minutesRef.current?.focus(),
    }));

    // Parse pace values from Formik
    const { minutes: paceMinutes, seconds: paceSeconds } = parsePaceValues(
      values.pace
    );

    const handlePaceChange = (
      field: keyof PaceCalcFormValues["pace"],
      value: number
    ) =>
      handlePaceFieldChange(field, value, values.pace, values, setFieldValue);

    const handleCalculate = () =>
      handleCalculateField(values, setFieldValue, "pace");

    return (
      <View style={styles.inputRow}>
        <CalcButton label="Pace" onPress={handleCalculate} />
        <View style={styles.timeInputsRow}>
          <View style={styles.inputSpacer} />
          <View style={styles.inputWrapper}>
            <TimeInput
              ref={minutesRef}
              label=""
              value={paceMinutes}
              onChange={(value) => handlePaceChange("minutes", value)}
              max={59}
              placeholder="mm"
              min={0}
              onSubmitEditing={() => secondsRef.current?.focus()}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TimeInput
              ref={secondsRef}
              label=""
              value={paceSeconds}
              onChange={(value) => handlePaceChange("seconds", value)}
              max={59}
              placeholder="ss"
              min={0}
              onSubmitEditing={() => {}}
              returnKeyType="done"
            />
          </View>
        </View>
      </View>
    );
  }
);

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
