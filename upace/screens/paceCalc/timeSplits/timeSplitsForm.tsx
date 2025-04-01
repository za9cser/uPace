import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { View } from "react-native";
import { SegmentedButtons, Text, TextInput } from "react-native-paper";
import { PaceCalcValue } from "../paceCalcUtils";
import { DistanceUnit } from "../../../lib/distanceUnit";
import moment from "moment";
import { TimeSplitsFormModel } from ".";

const TimeSplitsForm = () => {
  const { values, setFieldValue } = useFormikContext<TimeSplitsFormModel>();
  const { values: paceCalcValues } = useFormikContext<PaceCalcValue>();

  useEffect(() => {
    console.log("paceCalcValues", paceCalcValues);
    console.log("values", values);

    if (
      !(
        paceCalcValues.distance &&
        paceCalcValues.pace &&
        values.lapDistance &&
        values.lapUnit
      )
    )
      return;
    console.log("first");
    const lapDistance = parseFloat(values.lapDistance);
    const isKmDistanceUnit = values.lapUnit === DistanceUnit.KM;
    const calcLapDistance = isKmDistanceUnit
      ? paceCalcValues.distance
      : paceCalcValues.distance * 1000;
    const distanceToCalcTime = isKmDistanceUnit
      ? lapDistance
      : lapDistance / 1000;
    const paceSplitMilliseconds =
      paceCalcValues.pace.asMilliseconds() * distanceToCalcTime;
    const paceSplit = moment.duration(paceSplitMilliseconds);
    // TODO: handle when distance is less or equal lapDistance
    let timeSplits: TimeSplit[] = [];
    let i = 0;
    let totalDistance = 0;
    while (totalDistance <= calcLapDistance) {
      totalDistance += lapDistance;
      timeSplits.push({
        number: ++i,
        totalDistance: totalDistance,
        totalTime: moment.duration(paceSplitMilliseconds * i),
        splitTime: paceSplit,
      } as TimeSplit);
    }

    const reminder = calcLapDistance - totalDistance;
    if (reminder > 0)
      timeSplits.push({
        number: timeSplits.length + 1,
        totalDistance: calcLapDistance,
        totalTime: paceCalcValues.time,
        splitTime: moment.duration(0),
      } as TimeSplit);

    setFieldValue("timeSplits", timeSplits);
  }, [
    paceCalcValues.distance,
    paceCalcValues.pace,
    values.lapDistance,
    values.lapUnit,
  ]);

  return (
    <View style={{ flexDirection: "row" }}>
      <Text>Calc laps by</Text>
      <TextInput
        label={"lap distance"}
        value={values.lapDistance}
        onChangeText={(value) => setFieldValue("lapDistance", value)}
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
