import { TimeSpan } from "timespan";

export const getNewTimeSplit = () => ({ split: new TimeSpan(), ref: React.createRef() });
export const initialValues = {
    time: new TimeSpan(),
    pace: new TimeSpan(),
    distance: "",
};
