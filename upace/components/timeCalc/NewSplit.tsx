import { View, StyleSheet, Keyboard } from "react-native";
import { Card, Button } from "react-native-paper";
import TimeInput from "../TimeInput";
import { useCustomTheme } from "@/theme/ThemeContext";
import { useFormikContext, FieldArray } from "formik";
import { TimeCalcFormValues } from "@/lib/timeCalc/types/TimeCalcFormValues";
import { TimeSplit } from "@/types";
import { useSnackbar } from "@/context/SnackbarContext";

const NewSplit = () => {
  const { showSnackbar } = useSnackbar();
  const theme = useCustomTheme();
  const { values, setFieldValue } = useFormikContext<TimeCalcFormValues>();

  return (
    <FieldArray
      name="splits"
      render={({ push }) => (
        <Card
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Card.Content style={styles.addSplitContent}>
            <View style={styles.addSplitForm}>
              <View style={styles.inputRow}>
                <TimeInput
                  label="MIN"
                  value={values.minutes}
                  onChange={(value) => setFieldValue("minutes", value)}
                  max={99}
                  placeholder="mm"
                />
                <TimeInput
                  label="SEC"
                  value={values.seconds}
                  onChange={(value) => setFieldValue("seconds", value)}
                  max={59}
                  placeholder="ss"
                />
                <TimeInput
                  label="DEC"
                  value={values.deciseconds}
                  onChange={(value) => setFieldValue("deciseconds", value)}
                  max={9}
                  placeholder="d"
                />
              </View>
              <Button
                mode="contained"
                onPress={() => {
                  Keyboard.dismiss();
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
                  showSnackbar("Split added successfully", "success");
                }}
                style={[
                  styles.addButton,
                  { backgroundColor: theme.colors.primary },
                ]}
                contentStyle={styles.addButtonContent}
                labelStyle={styles.addButtonLabel}
              >
                Add
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}
    />
  );
};

export default NewSplit;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
  addSplitContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  addSplitForm: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 16,
  },
  inputRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  addButton: {
    marginBottom: 0,
    marginRight: 0,
    borderRadius: 12,
    elevation: 2,
  },
  addButtonContent: {
    height: 52,
    paddingHorizontal: 8,
  },
  addButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
