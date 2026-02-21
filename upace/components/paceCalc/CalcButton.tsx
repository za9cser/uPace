import { Button } from "react-native-paper";
import { useCustomTheme } from "@/theme/ThemeContext";
import { StyleSheet } from "react-native";

interface Props {
  label: string;
  onPress: () => void;
}

const CalcButton = ({ label, onPress }: Props) => {
  const theme = useCustomTheme();

  return (
    <Button
      mode="contained"
      onPress={onPress}
      style={[
        styles.inputLabelButton,
        { backgroundColor: theme.colors.primary },
      ]}
      contentStyle={styles.addButtonContent}
      labelStyle={styles.inputLabelText}
      textColor="#FFFFFF"
    >
      {label}
    </Button>
  );
};

export default CalcButton;

const styles = StyleSheet.create({
  inputLabelButton: {
    flex: 1,
    justifyContent: "flex-start",
    borderRadius: 12,
    elevation: 2,
    marginBottom: 0,
    marginRight: 0,
    padding: 0,
    minWidth: 100,
  },
  inputLabelText: {
    fontSize: 16,
    fontWeight: "600",
  },
  addButtonContent: {
    height: 52,
  },
});
