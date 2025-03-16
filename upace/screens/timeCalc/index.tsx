import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import TimeInput from "../../components/timeInput";
import { FieldArray, Formik } from "formik";
import { Button, Text, useTheme } from "react-native-paper";
import TimeSummary from "./timeSummary";
import ModeSelect from "./modeSelect";
import TimeCalcObserver from "./timeCalcObserver";
import { getNewTimeSplit, initialValues } from "./timeCalcUtils";

const TimeCalc = () => {
  const { colors } = useTheme();
  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ setFieldValue, values }) => (
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <TimeCalcObserver />
          <Text style={styles.description} variant="titleMedium">
            Enter some time splits and get their sum
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <ModeSelect
              multiSelect
              value={values.mode.inputModes}
              onChange={(value) => setFieldValue("mode.inputModes", value)}
              buttons={[
                {
                  value: "mm",
                  label: "mm",
                },
                {
                  value: "ss",
                  label: "ss",
                },
                { value: "ds", label: "ds" },
              ]}
            />
          </View>

          <FieldArray name="splits">
            {({ push }) => (
              <View>
                {values.splits.map((item, key) => (
                  <View
                    key={key}
                    style={{
                      flexDirection: "row",
                      marginTop: 8,
                      gap: 4,
                    }}
                  >
                    <View style={styles.timeSplitNumber}>
                      <Text>{key + 1}</Text>
                    </View>

                    <TimeInput
                      time={item.split}
                      ref={item.ref}
                      onChange={(value) =>
                        setFieldValue(`splits[${key}].split`, value)
                      }
                      containerStyle={styles.timeInput}
                      mode={values.mode}
                      onSubmitEditing={() => {
                        if (key + 1 === values.splits.length)
                          push(getNewTimeSplit());
                        else values.splits[key + 1].ref?.current?.focus();
                      }}
                      log={false}
                    />
                  </View>
                ))}
                <Button
                  textColor={colors.secondary}
                  style={styles.addButton}
                  labelStyle={styles.addButtonText}
                  onPress={() => push(getNewTimeSplit())}
                >
                  Add
                </Button>
              </View>
            )}
          </FieldArray>
          <TimeSummary containerStyle={styles.summary} />
        </ScrollView>
      )}
    </Formik>
  );
};

export default TimeCalc;

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
  description: {
    textAlign: "center",
  },
  timeInput: {
    borderColor: "red",
    borderWidth: 1,
    flex: 0.8,
  },
  timeSplitNumber: { borderWidth: 1, flex: 0.2, textAlign: "right" },
  addButton: {
    paddingVertical: 8,
  },
  addButtonText: {
    fontSize: 20,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 25,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
  },
});
