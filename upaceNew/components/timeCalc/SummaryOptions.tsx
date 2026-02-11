import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { useCustomTheme } from "@/theme/ThemeContext";
import { SummaryOptions } from "@/types";
import { useFormikContext } from "formik";
import { TimeCalcFormValues } from "@/lib/timeCalc/types/TimeCalcFormValues";

export const SummaryOptionsComponent = () => {
  const theme = useCustomTheme();
  const { values, setFieldValue } = useFormikContext<TimeCalcFormValues>();
  const summaryOptions = values.summaryOptions;

  const toggleOption = (option: keyof SummaryOptions) => {
    setFieldValue("summaryOptions", {
      ...summaryOptions,
      [option]: !summaryOptions[option],
    });
  };

  return (
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
          ["includeMinutes", "includeSeconds", "includeDeciseconds"] as const
        ).map((option) => {
          const selected = summaryOptions[option];
          return (
            <Button
              key={option}
              mode={selected ? "contained" : "outlined"}
              onPress={() => toggleOption(option)}
              style={[
                styles.optionButton,
                selected && {
                  backgroundColor: theme.colors.card,
                  elevation: 2,
                },
              ]}
              contentStyle={styles.optionButtonContent}
              labelStyle={{
                fontSize: 12,
                marginHorizontal: 0,
                fontWeight: "600",
                color: selected
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
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 8,
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
});
