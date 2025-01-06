import { View, StyleSheet } from "react-native";
import React from "react";
import { Button, useTheme } from "react-native-paper";

const PaceCalcInput = ({ buttonCaption, onCalc, children }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.input}>{children}</View>
      <View style={styles.buttonContainer}>
        <Button
          textColor={colors.primary}
          style={styles.button}
          labelStyle={styles.buttonText}
          onPress={onCalc}
        >
          {buttonCaption}
        </Button>
      </View>
    </View>
  );
};

export default PaceCalcInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  input: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
  },
  button: {
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 16,
  },
});
