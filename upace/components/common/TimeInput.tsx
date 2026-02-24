import { View, StyleSheet, TextInput as RNTextInput } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { useCustomTheme } from "@/theme/ThemeContext";
import React, { forwardRef, useState, useEffect } from "react";

interface TimeInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
  error?: string;
  placeholder?: string;
  onSubmitEditing?: () => void;
  returnKeyType?: "done" | "next";
}

const TimeInput = forwardRef<RNTextInput, TimeInputProps>(
  (
    {
      label,
      value,
      onChange,
      max = 99,
      min = 0,
      error,
      placeholder,
      onSubmitEditing,
      returnKeyType = "next",
    }: TimeInputProps,
    ref
  ) => {
    const theme = useCustomTheme();
    const [inputText, setInputText] = useState<string>(
      value === 0 ? "" : value.toString()
    );

    useEffect(() => {
      // When value changes from outside (e.g., calculation), update the input text
      if (value === 0) {
        setInputText("");
      } else {
        setInputText(value.toString());
      }
    }, [value]);

    const handleChange = (text: string) => {
      setInputText(text);
      const num = parseInt(text) || 0;
      const clamped = Math.max(min, Math.min(max, num));
      onChange(clamped);
    };

    return (
      <View style={styles.container}>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          {label}
        </Text>
        <TextInput
          ref={ref}
          value={inputText}
          onChangeText={handleChange}
          keyboardType="numeric"
          maxLength={2}
          mode="outlined"
          placeholder={placeholder}
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.inputBackground,
            },
          ]}
          contentStyle={[styles.inputContent, { color: theme.colors.text }]}
          error={!!error}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          theme={{
            colors: {
              primary: theme.colors.primary,
              placeholder: theme.colors.textSecondary,
              text: theme.colors.text,
              background: theme.colors.inputBackground,
              surface: theme.colors.card,
              outline: theme.colors.border,
            },
          }}
          placeholderTextColor={theme.colors.textSecondary}
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
  }
);

export default TimeInput;

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
