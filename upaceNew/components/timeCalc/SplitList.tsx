import { View, StyleSheet } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";
import { useCustomTheme } from "@/theme/themeContext";
import { useFormikContext } from "formik";
import { FieldArray } from "formik";
import { TimeCalcFormValues } from "@/lib/timeCalc/types/timeCalcFormValues";

const SplitList = () => {
  const theme = useCustomTheme();
  const { values } = useFormikContext<TimeCalcFormValues>();
  const splits = values.splits;

  if (splits.length === 0) return null;

  return (
    <FieldArray
      name="splits"
      render={({ remove }) => (
        <View style={styles.splitsContainer}>
          {splits.map((split, index) => (
            <Card
              key={split.id}
              style={[
                styles.card,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <Card.Content style={styles.splitContent}>
                <View style={styles.splitInfo}>
                  <Text
                    variant="titleMedium"
                    style={{ color: theme.colors.primary }}
                  >
                    #{index + 1}
                  </Text>
                  <Text
                    variant="headlineSmall"
                    style={{ color: theme.colors.text }}
                  >
                    {split.minutes.toString().padStart(2, "0")}:
                    {split.seconds.toString().padStart(2, "0")}.
                    {split.deciseconds}
                  </Text>
                </View>
                <IconButton
                  icon="delete"
                  size={20}
                  onPress={() => remove(index)}
                />
              </Card.Content>
            </Card>
          ))}
        </View>
      )}
    />
  );
};

export default SplitList;

const styles = StyleSheet.create({
  splitsContainer: {
    gap: 8,
  },
  card: {
    borderRadius: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
  splitContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  splitInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});
