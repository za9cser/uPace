import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { useCustomTheme } from "../theme/ThemeContext";

interface TimeInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
  error?: string;
  placeholder?: string;
}

export const TimeInput: React.FC<TimeInputProps> = ({
  label,
  value,
  onChange,
  max = 99,
  min = 0,
  error,
  placeholder,
}) => {
  const theme = useCustomTheme();

  const handleChange = (text: string) => {
    const num = parseInt(text) || 0;
    const clamped = Math.max(min, Math.min(max, num));
    onChange(clamped);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value === 0 ? "" : value.toString()}
        onChangeText={handleChange}
        keyboardType="numeric"
        maxLength={2}
        mode="outlined"
        placeholder={placeholder}
        style={styles.input}
        contentStyle={styles.inputContent}
        error={!!error}
        selectTextOnFocus
      />
      {error && (
        <Text
          variant="labelSmall"
          style={{ color: theme.colors.error, marginTop: 4 }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  label: {
    marginBottom: 4,
    fontSize: 12,
    fontWeight: "500",
  },
  input: {
    width: 60,
    height: 50,
    textAlign: "center",
  },
  inputContent: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});
