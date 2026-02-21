import { View, StyleSheet, Text } from "react-native";
import { useCustomTheme } from "@/theme/ThemeContext";
import { LapSplit } from "@/types";

interface Props {
  splits: LapSplit[];
}

const LapSplitTable = ({ splits }: Props) => {
  const theme = useCustomTheme();

  return (
    <View style={styles.container}>
      <View
        style={[styles.tableHeader, { backgroundColor: theme.colors.surface }]}
      >
        <Text style={[styles.headerText, { color: theme.colors.text }]}>#</Text>
        <Text style={[styles.headerText, { color: theme.colors.text }]}>
          Distance
        </Text>
        <Text style={[styles.headerText, { color: theme.colors.text }]}>
          Total Time
        </Text>
        <Text style={[styles.headerText, { color: theme.colors.text }]}>
          Split Time
        </Text>
      </View>

      {splits.map((split, index) => (
        <View
          key={split.n}
          style={[
            styles.tableRow,
            {
              backgroundColor:
                index % 2 === 0 ? theme.colors.card : theme.colors.surface,
            },
          ]}
        >
          <Text style={[styles.cellText, { color: theme.colors.text }]}>
            {split.n}
          </Text>
          <Text style={[styles.cellText, { color: theme.colors.text }]}>
            {split.distance.toFixed(2)} km
          </Text>
          <Text style={[styles.cellText, { color: theme.colors.text }]}>
            {split.totalTime}
          </Text>
          <Text style={[styles.cellText, { color: theme.colors.text }]}>
            {split.splitTime}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default LapSplitTable;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  headerText: {
    flex: 1,
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  cellText: {
    flex: 1,
    fontSize: 14,
    textAlign: "center",
  },
});
