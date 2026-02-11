import { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Animated, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Card,
  Text,
  Button,
  IconButton,
  useTheme,
  Snackbar,
} from "react-native-paper";
import { Formik, FieldArray } from "formik";
import * as Clipboard from "expo-clipboard";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { TimeInput } from "../../../components/TimeInput";
import { useCustomTheme } from "../../../theme/ThemeContext";
import { TimeSplit, SummaryOptions } from "../../../types";
import { SummaryOptionsComponent } from "./components/SummaryOptions";
import { TotalTimeComponent } from "./components/TotalTime";
import { NewSplitComponent } from "./components/NewSplit";
import { SplitsListComponent } from "./components/SplitsList";
import { TimeCalcFormValues } from "./services/timeCalcHandlers";

export default function TimeCalculatorScreen() {
  const theme = useCustomTheme();
  const paperTheme = useTheme();
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    type: "info" as "info" | "success" | "warning" | "error",
  });
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const showSnackbar = (
    message: string,
    type: "info" | "success" | "warning" | "error" = "info"
  ) => {
    setSnackbar({ visible: true, message, type });
  };

  const handleAddSplit = (values: TimeCalcFormValues, { resetForm }: any) => {
    // Show success message
    showSnackbar("Split added successfully", "success");
  };

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
                render={(arrayHelpers) => (
                  <>
                    {/* Summary Options */}
                    <SummaryOptionsComponent />

                    {/* Result Display */}
                    <TotalTimeComponent showSnackbar={showSnackbar} />

                    {/* Add Split Form */}
                    <NewSplitComponent
                      onAddSplit={() => {
                        const newSplit: TimeSplit = {
                          id: Date.now().toString(),
                          minutes: values.minutes,
                          seconds: values.seconds,
                          deciseconds: values.deciseconds,
                        };
                        arrayHelpers.push(newSplit);
                        setFieldValue("minutes", 0);
                        setFieldValue("seconds", 0);
                        setFieldValue("deciseconds", 0);
                      }}
                    />

                    {/* Splits List */}
                    <SplitsListComponent />
                  </>
                )}
              />
            )}
          </Formik>
        </Animated.View>
      </ScrollView>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
        duration={3000}
        theme={paperTheme}
      >
        {snackbar.message}
      </Snackbar>
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
