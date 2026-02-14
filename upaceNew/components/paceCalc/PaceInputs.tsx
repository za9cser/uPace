import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import { useCustomTheme } from "../../theme/ThemeContext";
import { useFormikContext } from "formik";
import { PaceCalcFormValues } from "@/lib/paceCalc/types/PaceCalcFormValues";
import { calculateMissingValue } from "@/lib/paceCalc/services/paceCalcHandlers";
import { TimeInput } from "../TimeInput";

const PaceInputs = () => {
  const theme = useCustomTheme();
  const { values, setFieldValue } = useFormikContext<PaceCalcFormValues>();

  // State for time input values
  const [timeHours, setTimeHours] = useState(0);
  const [timeMinutes, setTimeMinutes] = useState(0);
  const [timeSeconds, setTimeSeconds] = useState(0);

  // State for pace input values
  const [paceMinutes, setPaceMinutes] = useState(0);
  const [paceSeconds, setPaceSeconds] = useState(0);

  const handleTimeChange = () => {
    const formattedTime = `${timeHours
      .toString()
      .padStart(2, "0")}:${timeMinutes
      .toString()
      .padStart(2, "0")}:${timeSeconds.toString().padStart(2, "0")}`;
    handleFieldChange("time", formattedTime);
  };

  const handlePaceChange = () => {
    const formattedPace = `${paceMinutes}:${paceSeconds
      .toString()
      .padStart(2, "0")}`;
    handleFieldChange("pace", formattedPace);
  };

  const handleCalculate = (targetField: "time" | "pace" | "distance") => {
    // Create a temporary object with current values
    const tempValues = { ...values };

    // Clear the target field to calculate it
    tempValues[targetField] = "";

    // Calculate the missing value
    const calculated = calculateMissingValue(tempValues);

    // Update the target field with the calculated value
    if (
      calculated[targetField] &&
      calculated[targetField] !== tempValues[targetField]
    ) {
      setFieldValue(targetField, calculated[targetField]);

      // Update input states if target is time or pace
      if (targetField === "time" && calculated.time) {
        const timeParts = calculated.time.split(":").map(Number);
        if (timeParts.length === 3) {
          setTimeHours(timeParts[0]);
          setTimeMinutes(timeParts[1]);
          setTimeSeconds(timeParts[2]);
        }
      } else if (targetField === "pace" && calculated.pace) {
        const paceParts = calculated.pace.split(":").map(Number);
        if (paceParts.length === 2) {
          setPaceMinutes(paceParts[0]);
          setPaceSeconds(paceParts[1]);
        }
      }
    }
  };

  const handleFieldChange = (
    field: keyof PaceCalcFormValues,
    value: string
  ) => {
    setFieldValue(field, value);

    // Create a temporary object to calculate missing values
    const tempValues = { ...values, [field]: value };
    const calculated = calculateMissingValue(tempValues);

    // Only update fields that have been calculated and are different
    const filledCount = [
      tempValues.time,
      tempValues.pace,
      tempValues.distance,
    ].filter((v) => v && v.trim() !== "").length;

    if (filledCount >= 2) {
      if (!tempValues.time.trim() && calculated.time !== tempValues.time) {
        setFieldValue("time", calculated.time);

        // Update time input states
        const timeParts = calculated.time.split(":").map(Number);
        if (timeParts.length === 3) {
          setTimeHours(timeParts[0]);
          setTimeMinutes(timeParts[1]);
          setTimeSeconds(timeParts[2]);
        }
      }
      if (!tempValues.pace.trim() && calculated.pace !== tempValues.pace) {
        setFieldValue("pace", calculated.pace);

        // Update pace input states
        const paceParts = calculated.pace.split(":").map(Number);
        if (paceParts.length === 2) {
          setPaceMinutes(paceParts[0]);
          setPaceSeconds(paceParts[1]);
        }
      }
      if (
        !tempValues.distance.trim() &&
        calculated.distance !== tempValues.distance
      ) {
        setFieldValue("distance", calculated.distance);
      }
    }
  };

  return (
    <Card
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Card.Content style={styles.cardContent}>
        <View style={styles.inputRow}>
          <Button
            mode="contained"
            onPress={() => handleCalculate("time")}
            style={[
              styles.inputLabelButton,
              { backgroundColor: theme.colors.primary },
            ]}
            contentStyle={styles.addButtonContent}
            labelStyle={styles.inputLabelText}
            textColor="#FFFFFF"
          >
            Time
          </Button>
          <View style={styles.timeInputsRow}>
            <View style={styles.inputWrapper}>
              <TimeInput
                label=""
                value={timeHours}
                onChange={(value) => {
                  setTimeHours(value);
                  setTimeout(handleTimeChange, 0);
                }}
                max={23}
                placeholder="hh"
                min={0}
              />
            </View>
            <View style={styles.inputWrapper}>
              <TimeInput
                label=""
                value={timeMinutes}
                onChange={(value) => {
                  setTimeMinutes(value);
                  setTimeout(handleTimeChange, 0);
                }}
                max={59}
                placeholder="mm"
                min={0}
              />
            </View>
            <View style={styles.inputWrapper}>
              <TimeInput
                label=""
                value={timeSeconds}
                onChange={(value) => {
                  setTimeSeconds(value);
                  setTimeout(handleTimeChange, 0);
                }}
                max={59}
                placeholder="ss"
                min={0}
              />
            </View>
          </View>
        </View>

        <View style={styles.inputRow}>
          <Button
            mode="contained"
            onPress={() => handleCalculate("pace")}
            style={[
              styles.inputLabelButton,
              { backgroundColor: theme.colors.primary },
            ]}
            contentStyle={styles.addButtonContent}
            labelStyle={styles.inputLabelText}
            textColor="#FFFFFF"
          >
            Pace
          </Button>
          <View style={styles.timeInputsRow}>
            <View style={styles.inputSpacer} />
            <View style={styles.inputWrapper}>
              <TimeInput
                label=""
                value={paceMinutes}
                onChange={(value) => {
                  setPaceMinutes(value);
                  setTimeout(handlePaceChange, 0);
                }}
                max={59}
                placeholder="mm"
                min={0}
              />
            </View>
            <View style={styles.inputWrapper}>
              <TimeInput
                label=""
                value={paceSeconds}
                onChange={(value) => {
                  setPaceSeconds(value);
                  setTimeout(handlePaceChange, 0);
                }}
                max={59}
                placeholder="ss"
                min={0}
              />
            </View>
          </View>
        </View>

        <View style={[styles.inputRow, { paddingTop: 12 }]}>
          <Button
            mode="contained"
            onPress={() => handleCalculate("distance")}
            style={[
              styles.inputLabelButton,
              { backgroundColor: theme.colors.primary },
            ]}
            contentStyle={styles.addButtonContent}
            labelStyle={styles.inputLabelText}
            textColor="#FFFFFF"
          >
            Distance
          </Button>
          <View style={styles.distanceInputContainer}>
            <TextInput
              label="Distance (km)"
              value={values.distance}
              onChangeText={(text) => handleFieldChange("distance", text)}
              placeholder="0.00"
              keyboardType="decimal-pad"
              mode="outlined"
              style={styles.distanceInput}
              theme={{
                colors: {
                  text: theme.colors.text,
                  placeholder: theme.colors.textSecondary,
                },
              }}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default PaceInputs;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 16,
  },
  cardContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 12,
    gap: 12,
  },
  inputLabelButton: {
    flex: 1,
    justifyContent: "flex-start",
    borderRadius: 12,
    elevation: 2,
    marginBottom: 0,
    marginRight: 0,
    padding: 0,
    minWidth: 100,
  },
  inputLabelText: {
    fontSize: 16,
    fontWeight: "600",
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
  distanceInputContainer: {
    flex: 16,
    gap: 12,
  },
  distanceInput: {
    marginBottom: 0,
  },
  addButtonContent: {
    height: 52,
  },
});
