import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TimeInput } from "./TimeInput";
import { useCustomTheme } from "../theme/ThemeContext";

interface PaceTimeInputRowProps {
  label: string;
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

export const PaceTimeInputRow: React.FC<PaceTimeInputRowProps> = ({
  label,
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
      <Text style={[styles.label, { color: theme.colors.text }]}>{label}</Text>
      <View style={styles.row}>
        <TimeInput
          label="HH"
          value={hours}
          onChange={(value) => onChange("hours", value)}
          max={23}
          placeholder="hh"
        />
        <Text style={[styles.separator, { color: theme.colors.text }]}>:</Text>
        <TimeInput
          label="MM"
          value={minutes}
          onChange={(value) => onChange("minutes", value)}
          max={59}
          placeholder="mm"
        />
        <Text style={[styles.separator, { color: theme.colors.text }]}>:</Text>
        <TimeInput
          label="SS"
          value={seconds}
          onChange={(value) => onChange("seconds", value)}
          max={59}
          placeholder="ss"
        />
        <Text style={[styles.separator, { color: theme.colors.text }]}>.</Text>
        <TimeInput
          label="D"
          value={deciseconds}
          onChange={(value) => onChange("deciseconds", value)}
          max={9}
          placeholder="d"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    fontSize: 24,
    fontWeight: "600",
    marginHorizontal: 2,
  },
});
