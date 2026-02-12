import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useCustomTheme } from "@/theme/themeContext";
import { useFormikContext } from "formik";
import {
  formatResult,
  copyResultToClipboard,
  copySplitsToClipboard,
  clearAll,
} from "@/lib/timeCalc/services/timeCalcHandlers";
import { TimeCalcFormValues } from "@/lib/timeCalc/types/timeCalcFormValues";
import { useSnackbar } from "@/context/SnackbarContext";

const TotalTime = () => {
  const theme = useCustomTheme();
  const { values, setFieldValue } = useFormikContext<TimeCalcFormValues>();
  const { showSnackbar } = useSnackbar();

  const handleCopyResult = async () => {
    await copyResultToClipboard(values);
    showSnackbar("Result copied to clipboard", "success");
  };

  const handleCopySplits = async () => {
    if (values.splits.length === 0) {
      showSnackbar("Add some splits first", "warning");
      return;
    }

    const result = await copySplitsToClipboard(values);
    showSnackbar(result.message, result.success ? "success" : "warning");
  };

  const handleClearAll = () => {
    const updatedValues = clearAll(values);
    setFieldValue("splits", updatedValues.splits);
    showSnackbar("All splits cleared", "info");
  };

  return (
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
            {formatResult(values)}
          </Text>
          <View style={styles.totalActions}>
            <IconButton
              icon="content-copy"
              iconColor="white"
              size={20}
              onPress={handleCopyResult}
              style={styles.totalActionIcon}
            />
            <IconButton
              icon="file-document-outline"
              iconColor="white"
              size={20}
              onPress={handleCopySplits}
              style={styles.totalActionIcon}
            />
            <IconButton
              icon="refresh"
              iconColor="white"
              size={20}
              onPress={handleClearAll}
              style={styles.totalActionIcon}
            />
          </View>
        </Card.Content>
      </LinearGradient>
    </Card>
  );
};

export default TotalTime;

const styles = StyleSheet.create({
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
});
