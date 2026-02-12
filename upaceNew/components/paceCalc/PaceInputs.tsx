import React from "react";
import { StyleSheet } from "react-native";
import { Card, TextInput } from "react-native-paper";
import { useCustomTheme } from "../../theme/ThemeContext";
import { useFormikContext } from "formik";
import { PaceCalcFormValues } from "@/lib/paceCalc/types/PaceCalcFormValues";
import { calculateMissingValue } from "@/lib/paceCalc/services/paceCalcHandlers";

const PaceInputs = () => {
  const theme = useCustomTheme();
  const { values, setFieldValue } = useFormikContext<PaceCalcFormValues>();

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
      <Card.Content>
        <TextInput
          label="Time (HH:MM:SS)"
          value={values.time}
          onChangeText={(text) => handleFieldChange("time", text)}
          placeholder="HH:MM:SS (e.g. 01:30:45)"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Pace (MM:SS min/km)"
          value={values.pace}
          onChangeText={(text) => handleFieldChange("pace", text)}
          placeholder="MM:SS (e.g. 05:30)"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Distance (km)"
          value={values.distance}
          onChangeText={(text) => handleFieldChange("distance", text)}
          placeholder="0.00"
          keyboardType="decimal-pad"
          mode="outlined"
          style={styles.input}
        />
      </Card.Content>
    </Card>
  );
};

export default PaceInputs;

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  input: {
    marginBottom: 12,
  },
});
