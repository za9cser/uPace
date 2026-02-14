import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { useFormikContext } from "formik";
import TimePaceDistanceButton from "./TimePaceDistanceButton";
import { PaceCalcFormValues } from "@/lib/paceCalc/types/PaceCalcFormValues";
import {
  handleCalculateField,
  handleFieldChange,
} from "@/lib/paceCalc/services/paceInputUtils";
import { useCustomTheme } from "../../theme/ThemeContext";

const DistanceInputRow = () => {
  const theme = useCustomTheme();
  const { values, setFieldValue } = useFormikContext<PaceCalcFormValues>();

  const handleCalculate = () => {
    handleCalculateField(values, setFieldValue, "distance");
  };

  const handleFieldChangeLocal = (value: string) => {
    handleFieldChange("distance", value, values, setFieldValue);
  };

  return (
    <View style={[styles.inputRow, { paddingTop: 12 }]}>
      <TimePaceDistanceButton label="Distance" onPress={handleCalculate} />
      <View style={styles.distanceInputContainer}>
        <TextInput
          value={values.distance}
          onChangeText={handleFieldChangeLocal}
          placeholder="0.00"
          keyboardType="decimal-pad"
          mode="outlined"
          style={[
            styles.distanceInput,
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
  );
};

export default DistanceInputRow;

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 12,
    gap: 12,
  },
  distanceInputContainer: {
    flex: 16,
    gap: 12,
  },
  distanceInput: {
    marginBottom: 0,
  },
});
