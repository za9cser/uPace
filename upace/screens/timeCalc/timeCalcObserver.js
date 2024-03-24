import { useFormikContext } from "formik";
import React, { useEffect } from "react";

const TimeCalcObserver = () => {
    const { values } = useFormikContext();

    useEffect(() => {
        console.log("fired");
        console.log("values?.splits[0]", values?.splits?.[0]);
        console.log("values?.splits?.[0]?.ref", values?.splits?.[0]?.ref);
        if (values?.splits?.length === 1) values?.splits?.[0].ref?.current?.focus();
    }, [values?.splits[0]?.ref]);

    return null;
};

export default TimeCalcObserver;
