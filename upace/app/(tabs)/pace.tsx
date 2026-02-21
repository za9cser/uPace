import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "@/components/common/ScreenHeader";
import { useCustomTheme } from "@/theme/ThemeContext";
import { Formik } from "formik";
import { PaceCalcFormValues } from "@/lib/paceCalc/types/PaceCalcFormValues";
import PaceInputs from "@/components/paceCalc/PaceInputs";
import LapSplitCalculator from "@/components/paceCalc/lapSplit/LapSplitCalculator";

const initialValues: PaceCalcFormValues = {
  time: { hours: 0, minutes: 0, seconds: 0 },
  pace: { minutes: 0, seconds: 0 },
  distance: "",
  lapDistances: [{ id: "1", value: "" }],
  lapSplits: [],
};

export default function PaceCalculatorScreen() {
  const theme = useCustomTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={["top"]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ScreenHeader
          title="Pace Calculator"
          subtitle="Enter two values to calculate the third"
        />

        <Formik<PaceCalcFormValues>
          initialValues={initialValues}
          onSubmit={() => {}}
        >
          <>
            <PaceInputs />
            <LapSplitCalculator />
          </>
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  input: {
    marginBottom: 12,
  },
});
