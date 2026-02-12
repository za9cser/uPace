import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TimeInput } from "./TimeInput";
import { useCustomTheme } from "../theme/ThemeContext";

interface PaceTimeInputsProps {
  hours: number;
  minutes: number;
  seconds: number;
  deciseconds: number;
  onChange: (field: string, value: number) => void;
  errors?: {
    hours?: string;
    minutes?: string;
    seconds?: string;
    deciseconds?: string;
  };
}

export const PaceTimeInputs: React.FC<PaceTimeInputsProps> = ({
  hours,
  minutes,
  seconds,
  deciseconds,
  onChange,
  errors = {},
}) => {
  const theme = useCustomTheme();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <TimeInput
            label="Hours"
            value={hours}
            onChange={(value) => onChange("hours", value)}
            max={23}
            placeholder="hh"
            error={errors.hours}
          />
        </View>
        <Text style={[styles.separator, { color: theme.colors.text }]}>:</Text>
        <View style={styles.inputGroup}>
          <TimeInput
            label="Minutes"
            value={minutes}
            onChange={(value) => onChange("minutes", value)}
            max={59}
            placeholder="mm"
            error={errors.minutes}
          />
        </View>
        <Text style={[styles.separator, { color: theme.colors.text }]}>:</Text>
        <View style={styles.inputGroup}>
          <TimeInput
            label="Seconds"
            value={seconds}
            onChange={(value) => onChange("seconds", value)}
            max={59}
            placeholder="ss"
            error={errors.seconds}
          />
        </View>
        <Text style={[styles.separator, { color: theme.colors.text }]}>.</Text>
        <View style={styles.inputGroup}>
          <TimeInput
            label="Deciseconds"
            value={deciseconds}
            onChange={(value) => onChange("deciseconds", value)}
            max={9}
            placeholder="d"
            error={errors.deciseconds}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    alignItems: "center",
    marginHorizontal: 4,
  },
  separator: {
    fontSize: 24,
    fontWeight: "600",
    marginHorizontal: 2,
  },
});
