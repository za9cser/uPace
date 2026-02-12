import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button, TextInput, IconButton } from "react-native-paper";
import { useCustomTheme } from "../../theme/ThemeContext";
import { useFormikContext } from "formik";
import { PaceCalcFormValues } from "@/lib/paceCalc/types/PaceCalcFormValues";
import {
  addLap,
  removeLap,
  updateLapDistance,
} from "@/lib/paceCalc/services/paceCalcHandlers";

const LapDistances = () => {
  const theme = useCustomTheme();
  const { values, setFieldValue } = useFormikContext<PaceCalcFormValues>();

  const handleUpdateLapDistance = (id: string, value: string) => {
    const updatedLaps = updateLapDistance(values.lapDistances, id, value);
    setFieldValue("lapDistances", updatedLaps);
  };

  const handleAddLap = () => {
    const updatedLaps = addLap(values.lapDistances);
    setFieldValue("lapDistances", updatedLaps);
  };

  const handleRemoveLap = (id: string) => {
    const updatedLaps = removeLap(values.lapDistances, id);
    setFieldValue("lapDistances", updatedLaps);
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
      <Card.Content>
        <Text
          variant="titleLarge"
          style={{ color: theme.colors.text, marginBottom: 12 }}
        >
          Lap Distances (km)
        </Text>
        <View style={styles.lapContainer}>
          {values.lapDistances.map((lap) => (
            <View key={lap.id} style={styles.lapRow}>
              <TextInput
                value={lap.value}
                onChangeText={(text) => handleUpdateLapDistance(lap.id, text)}
                placeholder="0.00"
                keyboardType="decimal-pad"
                mode="outlined"
                style={styles.lapInput}
              />
              {values.lapDistances.length > 1 && (
                <IconButton
                  icon="delete"
                  size={20}
                  onPress={() => handleRemoveLap(lap.id)}
                />
              )}
            </View>
          ))}
          <Button
            mode="outlined"
            onPress={handleAddLap}
            style={styles.addLapButton}
          >
            + Add Lap
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

export default LapDistances;

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  lapContainer: {
    gap: 12,
  },
  lapRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  lapInput: {
    flex: 1,
  },
  addLapButton: {
    marginTop: 8,
  },
});
