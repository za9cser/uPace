import { StyleSheet, View } from "react-native";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { TextInput, Text } from "react-native-paper";
import { describeTimeMode } from "../screens/timeCalc/modeSelect/describeTimeMode";
import { focusRef } from "../utils/form";
import moment from "moment";
import { TimeMode } from "../lib/timeMode";

const TimeInput = forwardRef(
  (
    { time, onChange, containerStyle, mode, log, onSubmitEditing }: Props,
    ref: any
  ) => {
    const hoursRef = useRef(ref);
    const minutesRef = useRef(ref);
    const secondsRef = useRef(null);
    const decisecondsRef = useRef(null);

    useImperativeHandle(ref, () => ({
      focus() {
        focusRef(minutesRef);
      },
    }));

    const handleHoursChange = (input: string) => {
      const value = parseInt(input);
      let timeSpan = time.subtract(time.hours(), "h");
      timeSpan = timeSpan.add(value, "h");

      log && console.log("timeSpan", timeSpan);
      onChange(timeSpan);
    };
    const handleMinutesChange = (input: string) => {
      const newMinutes = validateInput(input, 59);
      let timeSpan = moment.duration(time);
      timeSpan.subtract(timeSpan.minutes(), "m");
      timeSpan.add(newMinutes, "m");

      log && console.log("timeSpan", timeSpan);
      onChange(timeSpan);
    };

    const handleSecondsChange = (input: string) => {
      const newSeconds = validateInput(input, 59);
      let timeSpan = moment.duration(time);
      timeSpan.subtract(timeSpan.seconds(), "s");
      timeSpan.add(newSeconds, "s");

      log && console.log("timeSpan", timeSpan);
      onChange(timeSpan);
    };

    const handleDecisecondsChange = (input: string) => {
      const newDeciseconds = validateInput(input);
      let timeSpan = moment.duration(time);
      timeSpan.subtract(timeSpan.milliseconds(), "ms");
      timeSpan.add(newDeciseconds * 100, "ms");

      log && console.log("timeSpan", timeSpan);
      onChange(timeSpan);
    };

    const validateInput = (input: string, maxValue?: number) => {
      let value = parseInt(input);
      if (maxValue && value > maxValue) {
        value = maxValue;
        // TODO: display warning feedback if necessary in the future
      }

      return value;
    };

    const handleSubmitting = (...refs: any[]) => {
      for (const ref of refs)
        if (ref?.current) {
          ref.current.focus();
          return;
        }

      onSubmitEditing?.();
    };

    const getValue = (value?: number) => (value ? value.toString() : "");
    const hasMode = mode !== undefined && mode != null;
    const { hasHours, hasMinutes, hasSeconds, hasDeciseconds } =
      describeTimeMode(mode?.inputModes);
    const {
      hasHours: displayHours,
      hasMinutes: displayMinutes,
      hasSeconds: displaySeconds,
      hasDeciseconds: displayDeciseconds,
    } = describeTimeMode(mode?.displayModes);

    return (
      <View style={[styles.container, containerStyle]}>
        {displayHours && (
          <TextInput
            ref={hoursRef}
            value={getValue(time.hours())}
            onChangeText={handleHoursChange}
            placeholder="hh"
            style={styles.textInput}
            keyboardType="decimal-pad"
            returnKeyType="next"
            onSubmitEditing={() =>
              handleSubmitting(
                hasMinutes && minutesRef,
                hasSeconds && secondsRef,
                hasDeciseconds && decisecondsRef
              )
            }
            disabled={hasMode && !hasHours}
            autoComplete="off"
          />
        )}
        {displayMinutes && (
          <>
            {displayHours && (
              <Text variant="bodyLarge" style={styles.separator}>
                :
              </Text>
            )}
            <TextInput
              ref={minutesRef}
              value={getValue(time.minutes())}
              onChangeText={handleMinutesChange}
              placeholder="mm"
              style={styles.textInput}
              keyboardType="decimal-pad"
              returnKeyType="next"
              onSubmitEditing={() =>
                handleSubmitting(
                  hasSeconds && secondsRef,
                  hasDeciseconds && decisecondsRef
                )
              }
              disabled={hasMode && !hasMinutes}
              autoComplete="off"
            />
          </>
        )}
        {displaySeconds && (
          <>
            {(displayHours || displayMinutes) && (
              <Text variant="bodyLarge" style={styles.separator}>
                :
              </Text>
            )}
            <TextInput
              ref={secondsRef}
              value={getValue(time.seconds())}
              onChangeText={handleSecondsChange}
              placeholder="ss"
              style={styles.textInput}
              keyboardType="decimal-pad"
              returnKeyType="next"
              onSubmitEditing={() =>
                handleSubmitting(hasDeciseconds && decisecondsRef)
              }
              disabled={hasMode && !hasSeconds}
              autoComplete="off"
            />
          </>
        )}
        {displayDeciseconds && (
          <>
            {(displayHours || displayMinutes || displaySeconds) && (
              <Text variant="bodyLarge" style={{ marginHorizontal: 5 }}>
                .
              </Text>
            )}
            <TextInput
              ref={decisecondsRef}
              value={getValue(time.milliseconds() / 100)}
              onChangeText={handleDecisecondsChange}
              placeholder="ds"
              style={styles.textInput}
              keyboardType={"decimal-pad"}
              returnKeyType={onSubmitEditing ? "next" : "done"}
              onSubmitEditing={() => onSubmitEditing?.()}
              disabled={hasMode && !hasDeciseconds}
              autoComplete="off"
            />
          </>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    height: 40,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
  },
  separator: {
    marginHorizontal: 5,
  },
});

export type Props = {
  time: moment.Duration;
  onChange: (value: moment.Duration) => void;
  containerStyle?: any;
  mode?: TimeMode;
  log?: boolean;
  onSubmitEditing?: () => void;
};

export default TimeInput;
