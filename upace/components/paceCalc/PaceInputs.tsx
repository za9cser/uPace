import { StyleSheet, TextInput as RNTextInput } from "react-native";
import { Card } from "react-native-paper";
import { useCustomTheme } from "@/theme/ThemeContext";
import TimeInputRow from "./TimeInputRow";
import PaceInputRow from "./PaceInputRow";
import DistanceInputRow from "./DistanceInputRow";
import { useRef } from "react";

const PaceInputs = () => {
  const theme = useCustomTheme();
  const paceInputRowRef = useRef<RNTextInput | undefined>(null);

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
        <TimeInputRow paceInputRowRef={paceInputRowRef} />
        <PaceInputRow ref={paceInputRowRef} />
        <DistanceInputRow />
      </Card.Content>
    </Card>
  );
};

export default PaceInputs;

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
});
