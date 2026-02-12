import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { ScreenHeader } from "@/components/ScreenHeader";
import { useCustomTheme } from "@/theme/themeContext";
import SummaryOptions from "@/components/timeCalc/SummaryOptions";
import TotalTime from "@/components/timeCalc/TotalTime";
import NewSplit from "@/components/timeCalc/NewSplit";
import SplitList from "@/components/timeCalc/SplitList";

export default function TimeCalculatorScreen() {
  const theme = useCustomTheme();

  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

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
            onSubmit={() => {}}
          >
            <>
              <SummaryOptions />

              <TotalTime />

              <NewSplit />

              <SplitList />
            </>
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
