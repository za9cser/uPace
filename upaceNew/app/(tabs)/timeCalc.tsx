import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik, FieldArray } from "formik";
import { ScreenHeader } from "@/components/ScreenHeader";
import { useCustomTheme } from "@/theme/ThemeContext";
import { TimeSplit } from "@/types";
import SummaryOptionsComponent from "@/components/timeCalc/SummaryOptions";
import TotalTimeComponent from "@/components/timeCalc/TotalTime";
import NewSplitComponent from "@/components/timeCalc/NewSplit";
import SplitListComponent from "@/components/timeCalc/SplitList";
import { useSnackbar } from "@/context/SnackbarContext";

export default function TimeCalculatorScreen() {
  const theme = useCustomTheme();
  const { showSnackbar } = useSnackbar();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAddSplit = () =>
    showSnackbar("Split added successfully", "success");

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
        <Animated.View style={{ opacity: fadeAnim, gap: 16 }}>
          <ScreenHeader
            title="Time Calculator"
            subtitle="Add time splits and calculate their sum"
          />

          <Formik
            initialValues={{
              minutes: 0,
              seconds: 0,
              deciseconds: 0,
              splits: [],
              summaryOptions: {
                includeMinutes: true,
                includeSeconds: true,
                includeDeciseconds: true,
              },
            }}
            onSubmit={handleAddSplit}
          >
            {({ values, setFieldValue }) => (
              <FieldArray
                name="splits"
                render={({ push }) => (
                  <>
                    <SummaryOptionsComponent />

                    <TotalTimeComponent />

                    <NewSplitComponent
                      onAddSplit={() => {
                        const newSplit: TimeSplit = {
                          id: Date.now().toString(),
                          minutes: values.minutes,
                          seconds: values.seconds,
                          deciseconds: values.deciseconds,
                        };
                        push(newSplit);
                        setFieldValue("minutes", 0);
                        setFieldValue("seconds", 0);
                        setFieldValue("deciseconds", 0);
                      }}
                    />

                    <SplitListComponent />
                  </>
                )}
              />
            )}
          </Formik>
        </Animated.View>
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
    gap: 16,
  },
});
