import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { useCustomTheme } from "../theme/ThemeContext";

interface PaceTimeInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export const PaceTimeInput: React.FC<PaceTimeInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  error,
}) => {
  const theme = useCustomTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.colors.text }]}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType="numeric"
        style={[
          styles.input,
          {
            borderColor: error ? theme.colors.error : theme.colors.border,
            backgroundColor: theme.colors.inputBackground,
            color: theme.colors.text,
          },
        ]}
        placeholderTextColor={theme.colors.textSecondary}
      />
      {error && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: "500",
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
});
