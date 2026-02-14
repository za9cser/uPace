import React from "react";
import { StyleSheet, View, Keyboard } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import { useCustomTheme } from "../../theme/ThemeContext";
import { useFormikContext } from "formik";
import { PaceCalcFormValues } from "@/lib/paceCalc/types/PaceCalcFormValues";
import { calculateMissingValue } from "@/lib/paceCalc/services/paceCalcHandlers";
import { TimeInput } from "../TimeInput";

const PaceInputs = () => {
  const theme = useCustomTheme();
  const { values, setFieldValue } = useFormikContext<PaceCalcFormValues>();

  // Parse time values from Formik
  const timeParts = values.time
    ? values.time.split(":").map(Number)
    : [0, 0, 0];
  const timeHours = timeParts[0] || 0;
  const timeMinutes = timeParts[1] || 0;
  const timeSeconds = timeParts[2] || 0;

  // Parse pace values from Formik
  const paceParts = values.pace ? values.pace.split(":").map(Number) : [0, 0];
  const paceMinutes = paceParts[0] || 0;
  const paceSeconds = paceParts[1] || 0;

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

    const formattedTime = `${newHours.toString().padStart(2, "0")}:${newMinutes
      .toString()
      .padStart(2, "0")}:${newSeconds.toString().padStart(2, "0")}`;

    handleFieldChange("time", formattedTime);
  };

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

    const formattedPace = `${newMinutes}:${newSeconds
      .toString()
      .padStart(2, "0")}`;

    handleFieldChange("pace", formattedPace);
  };

  const handleCalculate = (targetField: "time" | "pace" | "distance") => {
    // Dismiss keyboard first
    Keyboard.dismiss();

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
    }
  };

  const handleFieldChange = (
    field: keyof PaceCalcFormValues,
    value: string
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
      if (!tempValues.time.trim() && calculated.time !== tempValues.time) {
        setFieldValue("time", calculated.time);
      }
      if (!tempValues.pace.trim() && calculated.pace !== tempValues.pace) {
        setFieldValue("pace", calculated.pace);
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
              value={values.distance}
              onChangeText={(text) => handleFieldChange("distance", text)}
              placeholder="0.00"
              keyboardType="decimal-pad"
              mode="outlined"
              style={[
                styles.distanceInput,
                {
                  backgroundColor: theme.colors.inputBackground,
                },
              ]}
              theme={{
                colors: {
                  text: theme.colors.text,
                  placeholder: theme.colors.textSecondary,
                  primary: theme.colors.primary,
                  background: theme.colors.inputBackground,
                  surface: theme.colors.card,
                  outline: theme.colors.border,
                },
              }}
              textColor={theme.colors.text}
              placeholderTextColor={theme.colors.textSecondary}
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
    borderWidth: 1,
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
