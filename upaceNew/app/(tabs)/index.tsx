import { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Animated } from "react-native";
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
import { LinearGradient } from "expo-linear-gradient";
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
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

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

  const removeSplit = (id: string) =>
    setSplits(splits.filter((split) => split.id !== id));

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

  const copyResultToClipboard = async () => {
    const result = formatResult();
    await Clipboard.setStringAsync(result);
    showSnackbar("Result copied to clipboard", "success");
  };

  const copySplitsToClipboard = async () => {
    if (splits.length === 0) {
      showSnackbar("Add some splits first", "warning");
      return;
    }

    const splitsText = splits
      .map((split) => {
        const parts = [];
        if (summaryOptions.includeMinutes) {
          parts.push(split.minutes.toString().padStart(2, "0"));
        }
        if (summaryOptions.includeSeconds) {
          parts.push(split.seconds.toString().padStart(2, "0"));
        }
        if (summaryOptions.includeDeciseconds) {
          parts.push(split.deciseconds.toString());
        }

        if (parts.length === 3) {
          return `${parts[0]}:${parts[1]}.${parts[2]}`;
        } else if (parts.length === 2) {
          if (summaryOptions.includeMinutes && summaryOptions.includeSeconds) {
            return `${parts[0]}:${parts[1]}`;
          } else if (
            summaryOptions.includeMinutes &&
            summaryOptions.includeDeciseconds
          ) {
            return `${parts[0]}:00.${parts[1]}`;
          } else {
            return `${parts[0]}.${parts[1]}`;
          }
        } else if (parts.length === 1) {
          return parts[0];
        }
        return "";
      })
      .filter((part) => part.length > 0)
      .join(" - ");

    await Clipboard.setStringAsync(splitsText);
    showSnackbar("Splits copied to clipboard", "success");
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

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={["top"]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim, gap: 16 }}>
          <ScreenHeader
            title="Time Calculator"
            subtitle="Add time splits and calculate their sum"
          />

          {/* Summary Options */}
          <View style={styles.sectionContainer}>
            <Text
              variant="labelMedium"
              style={{
                color: theme.colors.textSecondary,
                marginBottom: 8,
                marginLeft: 4,
              }}
            >
              INCLUDE IN SUMMARY
            </Text>
            <View
              style={[
                styles.optionsRow,
                { backgroundColor: theme.colors.inputBackground },
              ]}
            >
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
                  style={[
                    styles.optionButton,
                    summaryOptions[option] && {
                      backgroundColor: theme.colors.card,
                      elevation: 2,
                    },
                  ]}
                  contentStyle={styles.optionButtonContent}
                  labelStyle={{
                    fontSize: 12,
                    marginHorizontal: 0,
                    fontWeight: "600",
                    color: summaryOptions[option]
                      ? theme.colors.primary
                      : theme.colors.textSecondary,
                  }}
                  compact
                >
                  {option
                    .replace("include", "")
                    .replace("Minutes", "MIN")
                    .replace("Seconds", "SEC")
                    .replace("Deciseconds", "DEC")}
                </Button>
              ))}
            </View>
          </View>

          {/* Result Display */}
          <Card
            style={[
              styles.card,
              styles.totalCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.totalGradient}
            >
              <Card.Content style={styles.resultContent}>
                <Text
                  variant="labelLarge"
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    marginBottom: 4,
                    letterSpacing: 1.5,
                    fontSize: 13,
                  }}
                >
                  TOTAL TIME
                </Text>
                <Text
                  variant="displayLarge"
                  style={{
                    color: "white",
                    fontWeight: "800",
                    letterSpacing: 1,
                  }}
                >
                  {formatResult()}
                </Text>
                <View style={styles.totalActions}>
                  <IconButton
                    icon="content-copy"
                    iconColor="white"
                    size={20}
                    onPress={copyResultToClipboard}
                    style={styles.totalActionIcon}
                  />
                  <IconButton
                    icon="file-document-outline"
                    iconColor="white"
                    size={20}
                    onPress={copySplitsToClipboard}
                    style={styles.totalActionIcon}
                  />
                  <IconButton
                    icon="refresh"
                    iconColor="white"
                    size={20}
                    onPress={clearAll}
                    style={styles.totalActionIcon}
                  />
                </View>
              </Card.Content>
            </LinearGradient>
          </Card>

          {/* Add Split Form */}
          <Card
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Card.Content style={styles.addSplitContent}>
              <Formik
                initialValues={{ minutes: 0, seconds: 0, deciseconds: 0 }}
                onSubmit={addSplit}
              >
                {({ handleSubmit, values, setFieldValue }) => (
                  <View style={styles.addSplitForm}>
                    <View style={styles.inputRow}>
                      <TimeInput
                        label="MIN"
                        value={values.minutes}
                        onChange={(value) => setFieldValue("minutes", value)}
                        max={99}
                        placeholder="mm"
                      />
                      <TimeInput
                        label="SEC"
                        value={values.seconds}
                        onChange={(value) => setFieldValue("seconds", value)}
                        max={59}
                        placeholder="ss"
                      />
                      <TimeInput
                        label="DEC"
                        value={values.deciseconds}
                        onChange={(value) =>
                          setFieldValue("deciseconds", value)
                        }
                        max={9}
                        placeholder="d"
                      />
                    </View>
                    <Button
                      mode="contained"
                      onPress={() => handleSubmit()}
                      style={styles.addButton}
                      contentStyle={styles.addButtonContent}
                      labelStyle={{ fontSize: 16, fontWeight: "600" }}
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
                <Card
                  key={split.id}
                  style={[
                    styles.card,
                    {
                      backgroundColor: theme.colors.card,
                      borderColor: theme.colors.border,
                    },
                  ]}
                >
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
        </Animated.View>
      </ScrollView>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
        duration={3000}
        theme={paperTheme}
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
    gap: 16,
  },
  sectionContainer: {
    marginBottom: 8,
  },
  card: {
    borderRadius: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
  totalCard: {
    elevation: 8,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 0,
  },
  totalGradient: {
    padding: 0,
  },
  resultContent: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  totalActions: {
    flexDirection: "row",
    position: "absolute",
    right: 8,
    top: 8,
    gap: 8,
  },
  totalActionIcon: {
    margin: 0,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  optionsRow: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "rgba(0,0,0,0.03)",
    padding: 4,
    borderRadius: 12,
  },
  optionButton: {
    flex: 1,
    marginRight: 0,
    marginBottom: 0,
    borderRadius: 8,
    borderWidth: 0,
  },
  optionButtonContent: {
    height: 36,
  },
  addSplitContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  addSplitForm: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 16,
  },
  inputRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  addButton: {
    marginBottom: 0,
    marginRight: 0,
    borderRadius: 12,
    elevation: 2,
  },
  addButtonContent: {
    height: 52,
    paddingHorizontal: 8,
  },
  splitsContainer: {
    gap: 8,
  },
  splitContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  splitInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});
