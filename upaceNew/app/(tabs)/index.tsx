import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Card,
  Text,
  Button,
  IconButton,
  useTheme,
  Snackbar,
} from "react-native-paper";
import { Formik } from "formik";
import * as Clipboard from "expo-clipboard";
import { ScreenHeader } from "../../components/ScreenHeader";
import { TimeInput } from "../../components/TimeInput";
import { useCustomTheme } from "../../theme/ThemeContext";
import { TimeSplit, SummaryOptions } from "../../types";

interface TimeSplitForm {
  minutes: number;
  seconds: number;
  deciseconds: number;
}

export default function TimeCalculatorScreen() {
  const theme = useCustomTheme();
  const paperTheme = useTheme();
  const [splits, setSplits] = useState<TimeSplit[]>([]);
  const [summaryOptions, setSummaryOptions] = useState<SummaryOptions>({
    includeMinutes: true,
    includeSeconds: true,
    includeDeciseconds: true,
  });
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    type: "info" as "info" | "success" | "warning" | "error",
  });

  const showSnackbar = (
    message: string,
    type: "info" | "success" | "warning" | "error" = "info"
  ) => {
    setSnackbar({ visible: true, message, type });
  };

  const addSplit = (values: TimeSplitForm, { resetForm }: any) => {
    const newSplit: TimeSplit = {
      id: Date.now().toString(),
      minutes: values.minutes,
      seconds: values.seconds,
      deciseconds: values.deciseconds,
    };
    setSplits([...splits, newSplit]);
    resetForm();
  };

  const removeSplit = (id: string) => {
    setSplits(splits.filter((split) => split.id !== id));
  };

  const calculateTotal = (): {
    minutes: number;
    seconds: number;
    deciseconds: number;
  } => {
    let totalDeciseconds = 0;
    splits.forEach((split) => {
      if (summaryOptions.includeMinutes) {
        totalDeciseconds += split.minutes * 600;
      }
      if (summaryOptions.includeSeconds) {
        totalDeciseconds += split.seconds * 10;
      }
      if (summaryOptions.includeDeciseconds) {
        totalDeciseconds += split.deciseconds;
      }
    });

    const minutes = Math.floor(totalDeciseconds / 600);
    const remainingDeciseconds = totalDeciseconds % 600;
    const seconds = Math.floor(remainingDeciseconds / 10);
    const deciseconds = remainingDeciseconds % 10;

    return { minutes, seconds, deciseconds };
  };

  const formatResult = (): string => {
    const { minutes, seconds, deciseconds } = calculateTotal();

    // Always return full format mm:ss.d
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${deciseconds}`;
  };

  const copySplitsToClipboard = async () => {
    if (splits.length === 0) {
      showSnackbar("Add some splits first", "warning");
      return;
    }

    const splitsText = splits
      .map(
        (split, index) =>
          `Split ${index + 1}: ${split.minutes}m ${split.seconds}s ${
            split.deciseconds
          }d`
      )
      .join("\n");

    await Clipboard.setStringAsync(splitsText);
    showSnackbar("Splits copied to clipboard", "success");
  };

  const copyResultToClipboard = async () => {
    const result = formatResult();
    await Clipboard.setStringAsync(result);
    showSnackbar("Result copied to clipboard", "success");
  };

  const clearAll = () => {
    setSplits([]);
    showSnackbar("All splits cleared", "info");
  };

  const toggleOption = (option: keyof SummaryOptions) => {
    setSummaryOptions({
      ...summaryOptions,
      [option]: !summaryOptions[option],
    });
  };

  const total = calculateTotal();

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
          title="Time Calculator"
          subtitle="Add time splits and calculate their sum"
        />

        {/* Summary Options */}
        <Card style={styles.card}>
          <Card.Content>
            <Text
              variant="titleMedium"
              style={{ color: theme.colors.text, marginBottom: 12 }}
            >
              Include in Summary
            </Text>
            <View style={styles.optionsRow}>
              {(
                [
                  "includeMinutes",
                  "includeSeconds",
                  "includeDeciseconds",
                ] as const
              ).map((option) => (
                <Button
                  key={option}
                  mode={summaryOptions[option] ? "contained" : "outlined"}
                  onPress={() => toggleOption(option)}
                  style={styles.optionButton}
                  contentStyle={styles.optionButtonContent}
                  labelStyle={{ fontSize: 12, marginHorizontal: 8 }}
                  compact
                >
                  {option
                    .replace("include", "")
                    .replace("Minutes", "Min")
                    .replace("Seconds", "Sec")
                    .replace("Deciseconds", "Dec")}
                </Button>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Result Display */}
        <Card style={[styles.card, { backgroundColor: theme.colors.primary }]}>
          <Card.Content style={styles.resultContent}>
            <Text
              variant="labelLarge"
              style={{ color: "white", opacity: 0.9, marginBottom: 8 }}
            >
              Total Time
            </Text>
            <Text
              variant="displayLarge"
              style={{ color: "white", fontWeight: "bold" }}
            >
              {formatResult()}
            </Text>
          </Card.Content>
        </Card>

        {/* Add Split Form */}
        <Card style={styles.card}>
          <Card.Content style={styles.addSplitContent}>
            <Formik
              initialValues={{ minutes: 0, seconds: 0, deciseconds: 0 }}
              onSubmit={addSplit}
            >
              {({ handleSubmit, values, setFieldValue }) => (
                <View style={styles.addSplitForm}>
                  <View style={styles.inputRow}>
                    <TimeInput
                      label="Min"
                      value={values.minutes}
                      onChange={(value) => setFieldValue("minutes", value)}
                      max={99}
                    />
                    <TimeInput
                      label="Sec"
                      value={values.seconds}
                      onChange={(value) => setFieldValue("seconds", value)}
                      max={59}
                    />
                    <TimeInput
                      label="Dec"
                      value={values.deciseconds}
                      onChange={(value) => setFieldValue("deciseconds", value)}
                      max={9}
                    />
                  </View>
                  <Button
                    mode="contained"
                    onPress={() => handleSubmit()}
                    style={styles.addButton}
                    contentStyle={styles.addButtonContent}
                  >
                    Add
                  </Button>
                </View>
              )}
            </Formik>
          </Card.Content>
        </Card>

        {/* Splits List */}
        {splits.length > 0 && (
          <View style={styles.splitsContainer}>
            {splits.map((split, index) => (
              <Card key={split.id} style={styles.card}>
                <Card.Content style={styles.splitContent}>
                  <View style={styles.splitInfo}>
                    <Text
                      variant="titleMedium"
                      style={{ color: theme.colors.primary }}
                    >
                      #{index + 1}
                    </Text>
                    <Text
                      variant="headlineSmall"
                      style={{ color: theme.colors.text }}
                    >
                      {split.minutes.toString().padStart(2, "0")}:
                      {split.seconds.toString().padStart(2, "0")}.
                      {split.deciseconds}
                    </Text>
                  </View>
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => removeSplit(split.id)}
                  />
                </Card.Content>
              </Card>
            ))}
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            mode="outlined"
            onPress={copySplitsToClipboard}
            disabled={splits.length === 0}
            style={styles.actionButton}
          >
            Copy Splits
          </Button>
          <Button
            mode="outlined"
            onPress={copyResultToClipboard}
            disabled={splits.length === 0}
            style={styles.actionButton}
          >
            Copy Result
          </Button>
          <Button
            mode="outlined"
            onPress={clearAll}
            disabled={splits.length === 0}
            textColor={theme.colors.error}
            style={styles.actionButton}
          >
            Clear All
          </Button>
        </View>
      </ScrollView>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
        duration={3000}
        style={{ backgroundColor: paperTheme.colors.surface }}
      >
        {snackbar.message}
      </Snackbar>
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
  optionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  optionButton: {
    flex: 1,
    marginRight: 0,
    marginBottom: 0,
  },
  optionButtonContent: {
    height: 36,
  },
  resultContent: {
    alignItems: "center",
    paddingVertical: 24,
  },
  addSplitContent: {
    paddingVertical: 8,
  },
  addSplitForm: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 16,
  },
  inputRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 8,
  },
  addButton: {
    marginBottom: 0,
    marginRight: 0,
    borderRadius: 8,
  },
  addButtonContent: {
    height: 50,
  },
  splitsContainer: {
    marginBottom: 16,
    gap: 8,
  },
  splitContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  splitInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  actionButtons: {
    gap: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
});
