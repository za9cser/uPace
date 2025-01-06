import { TimeSpan } from "timespan";

export const getNewTimeSplit = () => ({
  split: new TimeSpan(),
  ref: React.createRef(),
});
export const initialValues = {
  time: new TimeSpan(),
  pace: new TimeSpan(),
  distance: "",
};

export const timeMode = {
  inputModes: ["hh", "mm", "ss"],
  displayModes: ["hh", "mm", "ss"],
};

export const paceMode = {
  inputModes: ["mm", "ss"],
  displayModes: ["mm", "ss"],
};
