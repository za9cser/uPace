import { View, StyleSheet, Text, Keyboard } from "react-native";
import { Card, TextInput } from "react-native-paper";
import { useFormikContext } from "formik";
import { PaceCalcFormValues } from "@/lib/paceCalc/types/PaceCalcFormValues";
import { useCustomTheme } from "@/theme/ThemeContext";
import CalcButton from "../CalcButton";
import LapSplitTable from "./LapSplitTable";
import { calculateLapSplits } from "@/lib/paceCalc/services/lapSplitCalculator";

const LapSplitCalculator = () => {
  const theme = useCustomTheme();
  const { values, setFieldValue } = useFormikContext<PaceCalcFormValues>();

  const handleCalculateSplits = () => {
    Keyboard.dismiss();
    // Get the lap distance from the first input
    const lapDistanceStr = values.lapDistances[0]?.value;
    if (!lapDistanceStr) return;

    const lapDistance = parseFloat(lapDistanceStr);
    if (isNaN(lapDistance) || lapDistance <= 0) return;

    // Get pace and distance from form values
    const paceMinutes = values.pace.minutes || 0;
    const paceSeconds = values.pace.seconds || 0;
    const distanceStr = values.distance || "0";
    const distance = parseFloat(distanceStr) || 0;

    if (distance <= 0) return;

    // Calculate splits
    const splits = calculateLapSplits(
      lapDistance,
      paceMinutes,
      paceSeconds,
      distance
    );
    setFieldValue("lapSplits", splits);
  };

  const handleLapDistanceChange = (value: string) => {
    // Update the first lap distance input
    if (values.lapDistances.length > 0) {
      setFieldValue("lapDistances.0.value", value);
    } else {
      setFieldValue("lapDistances", [{ id: "1", value }]);
    }
  };

  return (
    <Card
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Card.Content style={styles.cardContent}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Lap Splits
        </Text>
        <Text
          style={[styles.description, { color: theme.colors.textSecondary }]}
        >
          Calculate splits for your laps based on your pace
        </Text>

        <View style={styles.inputRow}>
          <CalcButton label="Calc" onPress={handleCalculateSplits} />
          <View style={styles.lapDistanceInputContainer}>
            <TextInput
              value={values.lapDistances[0]?.value || ""}
              onChangeText={handleLapDistanceChange}
              placeholder="Lap distance (km)"
              keyboardType="decimal-pad"
              mode="outlined"
              style={[
                styles.lapDistanceInput,
                {
                  backgroundColor: theme.colors.inputBackground,
                },
              ]}
              theme={{
                colors: {
                  text: theme.colors.text,
                  placeholder: theme.colors.textSecondary,
                  primary: theme.colors.primary,
                  background: theme.colors.inputBackground,
                  surface: theme.colors.card,
                  outline: theme.colors.border,
                },
              }}
              textColor={theme.colors.text}
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>
        </View>

        {values.lapSplits.length > 0 && (
          <LapSplitTable splits={values.lapSplits} />
        )}
      </Card.Content>
    </Card>
  );
};

export default LapSplitCalculator;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  cardContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 12,
    gap: 12,
  },
  lapDistanceInputContainer: {
    flex: 16,
    gap: 12,
  },
  lapDistanceInput: {
    marginBottom: 0,
  },
});
