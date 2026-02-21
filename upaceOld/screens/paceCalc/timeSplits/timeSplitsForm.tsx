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

const UNIT_BUTTONS = [
  {
    label: "km",
    value: DistanceUnit.KM,
    style: { paddingVertical: 10 },
  },
  {
    label: "m",
    value: DistanceUnit.M,
    style: { paddingVertical: 10 },
  },
];

const TimeSplitsForm = ({ distance, pace }: Props) => {
  const { values, setFieldValue } = useFormikContext<TimeSplitsFormModel>();

  useEffect(() => {
    setFieldValue("timeSplits", []);
  }, [distance, pace]);

  const calcSplits = () => {
    const paceMilliseconds = pace?.asMilliseconds();
    if (
      !(distance && paceMilliseconds && values.lapDistance && values.lapUnit)
    ) {
      setFieldValue("timeSplits", []);
      return;
    }
    const lapDistance = parseFloat(values.lapDistance);
    const isKmDistanceUnit = values.lapUnit === DistanceUnit.KM;
    const calcLapDistance = isKmDistanceUnit ? distance : distance * 1000;
    const distanceToCalcTime = isKmDistanceUnit
      ? lapDistance
      : lapDistance / 1000;
    const paceSplitMilliseconds = paceMilliseconds * distanceToCalcTime;
    const paceSplit = moment.duration(paceSplitMilliseconds);

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

    const remainingDistance = calcLapDistance - (totalDistance - lapDistance);
    if (remainingDistance > 0 && timeSplits.length > 0) {
      const prevSplitTotalTime = timeSplits[timeSplits.length - 1].totalTime;
      const reminderSplitTime =
        paceMilliseconds *
        (isKmDistanceUnit ? remainingDistance : remainingDistance / 1000);
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
    <View style={{ marginTop: 10 }}>
      <Text style={{ textAlign: "center" }} variant="titleMedium">
        Calc laps time
      </Text>
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <TextInput
            label={"lap distance"}
            value={values.lapDistance}
            onChangeText={(value) => setFieldValue("lapDistance", value)}
            keyboardType="number-pad"
            autoComplete="off"
            style={{ textAlign: "center" }}
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
            buttons={UNIT_BUTTONS}
            style={{ width: "25%" }}
          />
        </View>
        <Button
          onPress={() => calcSplits()}
          mode="contained-tonal"
          style={{ marginTop: 10 }}
        >
          Calc laps
        </Button>
      </View>
    </View>
  );
};

export default TimeSplitsForm;
