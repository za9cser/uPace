import { useFormikContext } from "formik";
import React from "react";
import { TimeSplitsFormModel } from ".";
import { DataTable } from "react-native-paper";
import { displayTimePart } from "../../../lib/durationUtils";

const TimeSplitsTable = () => {
  const { values } = useFormikContext<TimeSplitsFormModel>();
  if (!values.timeSplits?.length) return null;

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>N</DataTable.Title>
        <DataTable.Title>Lap</DataTable.Title>
        <DataTable.Title>Time</DataTable.Title>
        <DataTable.Title>Split</DataTable.Title>
      </DataTable.Header>
      {values.timeSplits.map((timeSplit, key) => {
        const hours = timeSplit.totalTime.hours();
        const hasHours = hours > 0;
        return (
          <DataTable.Row key={key}>
            <DataTable.Cell>{timeSplit.number}</DataTable.Cell>
            <DataTable.Cell>{timeSplit.totalDistance}</DataTable.Cell>
            <DataTable.Cell>
              {hasHours ? `${hours}:` : ""}
              {displayTimePart(timeSplit.totalTime.minutes(), hasHours)}:
              {displayTimePart(timeSplit.totalTime.seconds())}
            </DataTable.Cell>
            <DataTable.Cell>
              {timeSplit.splitTime.minutes()}:
              {displayTimePart(timeSplit.splitTime.seconds())}
            </DataTable.Cell>
          </DataTable.Row>
        );
      })}
    </DataTable>
  );
};

export default TimeSplitsTable;
