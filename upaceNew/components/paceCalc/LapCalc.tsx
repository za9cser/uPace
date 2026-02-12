import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button, DataTable } from "react-native-paper";
import { useCustomTheme } from "../../theme/ThemeContext";
import { useFormikContext } from "formik";
import { PaceCalcFormValues } from "@/lib/paceCalc/types/PaceCalcFormValues";
import { useSnackbar } from "@/context/SnackbarContext";
import {
  calculateLapSplits,
  copyTableToClipboard,
} from "@/lib/paceCalc/services/paceCalcHandlers";

const LapCalc = () => {
  const theme = useCustomTheme();
  const { values, setFieldValue } = useFormikContext<PaceCalcFormValues>();
  const { showSnackbar } = useSnackbar();

  const handleCalculateSplits = () => {
    const splits = calculateLapSplits(values);
    if (splits.length === 0) {
      showSnackbar("Please fill in time, pace, and distance first", "warning");
      return;
    }

    const validLaps = values.lapDistances
      .map((lap) => parseFloat(lap.value))
      .filter((lap) => !isNaN(lap) && lap > 0);

    if (validLaps.length === 0) {
      showSnackbar("Please enter at least one valid lap distance", "warning");
      return;
    }

    setFieldValue("lapSplits", splits);
    showSnackbar("Lap splits calculated successfully", "success");
  };

  const handleCopyToClipboard = async () => {
    if (values.lapSplits.length === 0) {
      showSnackbar("Calculate lap splits first", "warning");
      return;
    }

    await copyTableToClipboard(values.lapSplits);
    showSnackbar("Table copied to clipboard", "success");
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
        <View style={styles.tableHeader}>
          <Text variant="titleLarge" style={{ color: theme.colors.text }}>
            Lap Splits
          </Text>
          <Button
            mode="text"
            onPress={handleCopyToClipboard}
            textColor={theme.colors.primary}
          >
            Copy
          </Button>
        </View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>N</DataTable.Title>
            <DataTable.Title>Distance</DataTable.Title>
            <DataTable.Title>Total Time</DataTable.Title>
            <DataTable.Title>Split Time</DataTable.Title>
          </DataTable.Header>
          {values.lapSplits.map((split) => (
            <DataTable.Row key={split.n}>
              <DataTable.Cell>{split.n}</DataTable.Cell>
              <DataTable.Cell>{split.distance} km</DataTable.Cell>
              <DataTable.Cell>{split.totalTime}</DataTable.Cell>
              <DataTable.Cell>{split.splitTime}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
        <Button
          mode="contained"
          onPress={handleCalculateSplits}
          style={styles.calculateButton}
        >
          Calculate Splits
        </Button>
      </Card.Content>
    </Card>
  );
};

export default LapCalc;

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  calculateButton: {
    marginTop: 16,
  },
});
