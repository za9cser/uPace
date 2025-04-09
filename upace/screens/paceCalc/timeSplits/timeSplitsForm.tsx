import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Button, SegmentedButtons, Text, TextInput } from "react-native-paper";
import { DistanceUnit } from "../../../lib/distanceUnit";
import moment from "moment";
import { TimeSplitsFormModel } from ".";

type Props = {
  distance: number | undefined;
  pace: moment.Duration | undefined;
};

const TimeSplitsForm = ({ distance, pace }: Props) => {
  const { values, setFieldValue } = useFormikContext<TimeSplitsFormModel>();

  useEffect(() => {
    setFieldValue("timeSplits", []);
  }, [distance, pace]);

  const calcSplits = () => {
    console.log("distance", distance);
    console.log("pace", pace);
    console.log("values", values);

    if (
      !(
        distance &&
        pace?.asMilliseconds() &&
        values.lapDistance &&
        values.lapUnit
      )
    ) {
      setFieldValue("timeSplits", []);
      return;
    }
    // console.log("first");
    const lapDistance = parseFloat(values.lapDistance);
    console.log("lapDistance", lapDistance);
    const isKmDistanceUnit = values.lapUnit === DistanceUnit.KM;
    const calcLapDistance = isKmDistanceUnit ? distance : distance * 1000;
    console.log("calcLapDistance", calcLapDistance);
    const distanceToCalcTime = isKmDistanceUnit
      ? lapDistance
      : lapDistance / 1000;
    const paceSplitMilliseconds = pace.asMilliseconds() * distanceToCalcTime;
    const paceSplit = moment.duration(paceSplitMilliseconds);
    // TODO: handle when distance is less or equal lapDistance
    let timeSplits: TimeSplit[] = [];
    let i = 0;
    let totalDistance = lapDistance;
    while (totalDistance <= calcLapDistance) {
      timeSplits.push({
        number: ++i,
        totalDistance: totalDistance,
        totalTime: moment.duration(paceSplitMilliseconds * i),
        splitTime: paceSplit,
      } as TimeSplit);
      totalDistance += lapDistance;
    }
    console.log("totalDistance", totalDistance);
    const reminder = calcLapDistance - (totalDistance - lapDistance);
    console.log("reminder", reminder);
    if (reminder > 0 && timeSplits.length > 0) {
      const prevSplitTotalTime = timeSplits[timeSplits.length - 1].totalTime;
      const reminderSplitTime = pace.asMilliseconds() * reminder;
      const reminderTotalTime = moment
        .duration(prevSplitTotalTime)
        .add(reminderSplitTime);
      console.log("reminderTotalTime", reminderTotalTime);
      timeSplits.push({
        number: timeSplits.length + 1,
        totalDistance: calcLapDistance,
        totalTime: reminderTotalTime,
        splitTime: moment.duration(reminderSplitTime),
      } as TimeSplit);
    }
    setFieldValue("timeSplits", timeSplits);
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <Button onPress={() => calcSplits()} mode="contained-tonal">
        Calc laps by
      </Button>
      <TextInput
        label={"lap distance"}
        value={values.lapDistance}
        onChangeText={(value) => setFieldValue("lapDistance", value)}
        keyboardType="number-pad"
        autoComplete="off"
      />
      <SegmentedButtons
        value={values.lapUnit}
        onValueChange={(value) => {
          setFieldValue("lapUnit", value);
          if (values.lapDistance) {
            const distance = parseFloat(values.lapDistance);
            setFieldValue(
              "lapDistance",
              (value === DistanceUnit.M
                ? distance * 1000
                : distance / 1000
              ).toString()
            );
          }
        }}
        buttons={[
          { label: "km", value: DistanceUnit.KM },
          { label: "m", value: DistanceUnit.M },
        ]}
      />
    </View>
  );
};

export default TimeSplitsForm;
