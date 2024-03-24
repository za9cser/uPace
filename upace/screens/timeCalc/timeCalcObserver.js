import { useFormikContext } from "formik";
import React, { useEffect } from "react";

const TimeCalcObserver = () => {
    const { values } = useFormikContext();

    useEffect(() => {
        values?.splits?.length === 1 && values?.splits?.[0].ref?.current?.focus();
    }, [values?.splits[0]?.ref]);

    useEffect(() => {
        values?.splits?.length > 1 &&
            setTimeout(() => values.splits[values.splits.length - 1].ref?.current?.focus(), 100);
    }, [values?.splits?.length]);

    return null;
};

export default TimeCalcObserver;
