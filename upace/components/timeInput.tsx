import { View, StyleSheet } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { useCustomTheme } from "@/theme/ThemeContext";

interface TimeInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
  error?: string;
  placeholder?: string;
}

const TimeInput = ({
  label,
  value,
  onChange,
  max = 99,
  min = 0,
  error,
  placeholder,
}: TimeInputProps) => {
  const theme = useCustomTheme();

  const handleChange = (text: string) => {
    const num = parseInt(text) || 0;
    const clamped = Math.max(min, Math.min(max, num));
    onChange(clamped);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.colors.text }]}>{label}</Text>
      <TextInput
        value={value === 0 ? "" : value.toString()}
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
};

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
