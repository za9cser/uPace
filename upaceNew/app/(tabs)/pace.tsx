import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Card,
  Text,
  TextInput,
  Button,
  IconButton,
  DataTable,
} from "react-native-paper";
import * as Clipboard from "expo-clipboard";
import { ScreenHeader } from "../../components/ScreenHeader";
import { useCustomTheme } from "../../theme/ThemeContext";
import { PaceInputs, LapSplit, LapDistance } from "../../types";
import { useSnackbar } from "../../context/SnackbarContext";

interface PaceFormValues {
  time: string;
  pace: string;
  distance: string;
}

export default function PaceCalculatorScreen() {
  const theme = useCustomTheme();
  const { showSnackbar } = useSnackbar();
  const [lapDistances, setLapDistances] = useState<LapDistance[]>([
    { id: "1", value: "" },
  ]);
  const [lapSplits, setLapSplits] = useState<LapSplit[]>([]);
  const [formValues, setFormValues] = useState<PaceFormValues>({
    time: "",
    pace: "",
    distance: "",
  });

  const parseTime = (timeStr: string): number => {
    const parts = timeStr.split(":").map(Number);
    if (parts.length !== 3) return 0;
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const parsePace = (paceStr: string): number => {
    const parts = paceStr.split(":").map(Number);
    if (parts.length !== 2) return 0;
    return parts[0] * 60 + parts[1];
  };

  const formatPace = (secondsPerKm: number): string => {
    const minutes = Math.floor(secondsPerKm / 60);
    const secs = Math.floor(secondsPerKm % 60);
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const calculateMissingValue = (values: PaceFormValues): PaceFormValues => {
    const timeSeconds =
      values.time && values.time.trim() ? parseTime(values.time) : null;
    const paceSeconds =
      values.pace && values.pace.trim() ? parsePace(values.pace) : null;
    const distance =
      values.distance && values.distance.trim()
        ? parseFloat(values.distance)
        : null;

    const filledCount = [timeSeconds, paceSeconds, distance].filter(
      (v) => v !== null && v > 0
    ).length;

    if (filledCount !== 2) {
      return values;
    }

    const newValues = { ...values };

    if (timeSeconds !== null && paceSeconds !== null && distance === null) {
      const calculatedDistance = timeSeconds / paceSeconds;
      newValues.distance = calculatedDistance.toFixed(2);
    } else if (
      timeSeconds !== null &&
      distance !== null &&
      paceSeconds === null
    ) {
      const calculatedPace = timeSeconds / distance;
      newValues.pace = formatPace(calculatedPace);
    } else if (
      paceSeconds !== null &&
      distance !== null &&
      timeSeconds === null
    ) {
      const calculatedTime = paceSeconds * distance;
      newValues.time = formatTime(calculatedTime);
    }

    return newValues;
  };

  const handleFieldChange = (field: keyof PaceFormValues, value: string) => {
    const newValues = { ...formValues, [field]: value };
    setFormValues(newValues);

    const calculated = calculateMissingValue(newValues);
    const filledCount = [
      newValues.time,
      newValues.pace,
      newValues.distance,
    ].filter((v) => v && v.trim() !== "").length;

    if (filledCount >= 2) {
      const updated = { ...newValues };
      if (!newValues.time.trim() && calculated.time !== newValues.time) {
        updated.time = calculated.time;
      }
      if (!newValues.pace.trim() && calculated.pace !== newValues.pace) {
        updated.pace = calculated.pace;
      }
      if (
        !newValues.distance.trim() &&
        calculated.distance !== newValues.distance
      ) {
        updated.distance = calculated.distance;
      }
      setFormValues(updated);
    }
  };

  const calculateLapSplits = (values: PaceFormValues) => {
    const timeSeconds = values.time ? parseTime(values.time) : null;
    const paceSeconds = values.pace ? parsePace(values.pace) : null;
    const distance = values.distance ? parseFloat(values.distance) : null;

    if (!timeSeconds || !paceSeconds || !distance) {
      showSnackbar("Please fill in time, pace, and distance first", "warning");
      return;
    }

    const validLaps = lapDistances
      .map((lap) => parseFloat(lap.value))
      .filter((lap) => !isNaN(lap) && lap > 0);

    if (validLaps.length === 0) {
      showSnackbar("Please enter at least one valid lap distance", "warning");
      return;
    }

    const splits: LapSplit[] = [];
    let cumulativeDistance = 0;
    let cumulativeTime = 0;

    validLaps.forEach((lapDistance, index) => {
      cumulativeDistance += lapDistance;
      if (cumulativeDistance > distance) {
        cumulativeDistance = distance;
      }

      const lapTime = lapDistance * paceSeconds;
      cumulativeTime += lapTime;

      if (cumulativeTime > timeSeconds) {
        cumulativeTime = timeSeconds;
      }

      splits.push({
        n: index + 1,
        distance: Math.round(cumulativeDistance * 100) / 100,
        totalTime: formatTime(cumulativeTime),
        splitTime: formatPace(lapTime),
      });
    });

    setLapSplits(splits);
    showSnackbar("Lap splits calculated successfully", "success");
  };

  const updateLapDistance = (id: string, value: string) => {
    setLapDistances(
      lapDistances.map((lap) => (lap.id === id ? { ...lap, value } : lap))
    );
  };

  const addLap = () => {
    setLapDistances([
      ...lapDistances,
      { id: Date.now().toString(), value: "" },
    ]);
  };

  const removeLap = (id: string) => {
    if (lapDistances.length > 1) {
      setLapDistances(lapDistances.filter((lap) => lap.id !== id));
    }
  };

  const copyTableToClipboard = async () => {
    if (lapSplits.length === 0) {
      showSnackbar("Calculate lap splits first", "warning");
      return;
    }

    const tableText = [
      "N\tDistance (km)\tTotal Time\tSplit Time",
      ...lapSplits.map(
        (split) =>
          `${split.n}\t${split.distance}\t${split.totalTime}\t${split.splitTime}`
      ),
    ].join("\n");

    await Clipboard.setStringAsync(tableText);
    showSnackbar("Table copied to clipboard", "success");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={["top"]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Pace Calculator"
          subtitle="Enter two values to calculate the third"
        />

        {/* Inputs */}
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
              value={formValues.time}
              onChangeText={(text) => handleFieldChange("time", text)}
              placeholder="HH:MM:SS (e.g. 01:30:45)"
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Pace (MM:SS min/km)"
              value={formValues.pace}
              onChangeText={(text) => handleFieldChange("pace", text)}
              placeholder="MM:SS (e.g. 05:30)"
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Distance (km)"
              value={formValues.distance}
              onChangeText={(text) => handleFieldChange("distance", text)}
              placeholder="0.00"
              keyboardType="decimal-pad"
              mode="outlined"
              style={styles.input}
            />
          </Card.Content>
        </Card>

        {/* Lap Distances */}
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
            <Text
              variant="titleLarge"
              style={{ color: theme.colors.text, marginBottom: 12 }}
            >
              Lap Distances (km)
            </Text>
            <View style={styles.lapContainer}>
              {lapDistances.map((lap) => (
                <View key={lap.id} style={styles.lapRow}>
                  <TextInput
                    value={lap.value}
                    onChangeText={(text) => updateLapDistance(lap.id, text)}
                    placeholder="0.00"
                    keyboardType="decimal-pad"
                    mode="outlined"
                    style={styles.lapInput}
                  />
                  {lapDistances.length > 1 && (
                    <IconButton
                      icon="delete"
                      size={20}
                      onPress={() => removeLap(lap.id)}
                    />
                  )}
                </View>
              ))}
              <Button
                mode="outlined"
                onPress={addLap}
                style={styles.addLapButton}
              >
                + Add Lap
              </Button>
              <Button
                mode="contained"
                onPress={() => calculateLapSplits(formValues)}
                style={styles.calculateButton}
              >
                Calculate Splits
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Results Table */}
        {lapSplits.length > 0 && (
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
                  onPress={copyTableToClipboard}
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
                {lapSplits.map((split) => (
                  <DataTable.Row key={split.n}>
                    <DataTable.Cell>{split.n}</DataTable.Cell>
                    <DataTable.Cell>{split.distance} km</DataTable.Cell>
                    <DataTable.Cell>{split.totalTime}</DataTable.Cell>
                    <DataTable.Cell>{split.splitTime}</DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  input: {
    marginBottom: 12,
  },
  lapContainer: {
    gap: 12,
  },
  lapRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  lapInput: {
    flex: 1,
  },
  addLapButton: {
    marginTop: 8,
  },
  calculateButton: {
    marginTop: 8,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
});
