import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "@/components/ScreenHeader";
import { useCustomTheme } from "@/theme/ThemeContext";
import { Formik, FormikHelpers } from "formik";
import { PaceCalcFormValues } from "@/lib/paceCalc/types/PaceCalcFormValues";
import { calculateMissingValue } from "@/lib/paceCalc/services/paceCalcHandlers";
import LapDistances from "@/components/paceCalc/LapDistances";
import LapCalc from "@/components/paceCalc/LapCalc";
import PaceInputs from "@/components/paceCalc/PaceInputs";
import { useSnackbar } from "@/context/SnackbarContext";

const initialValues: PaceCalcFormValues = {
  time: "",
  pace: "",
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
          {(formik) => (
            <>
              {/* Inputs */}
              <PaceInputs />

              {/* Lap Distances */}
              <LapDistances />

              {/* Results Table */}
              {formik.values.lapSplits.length > 0 && <LapCalc />}
            </>
          )}
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
