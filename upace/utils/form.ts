import React from "react";

export const focusRef = (ref: React.MutableRefObject<any>) => {
  const current = ref?.current;
  // if we don't call focus() inside setTimeout and before blur, than keyboard will not show up. But Input will be focused ;-)
  // https://github.com/software-mansion/react-native-screens/issues/472#issuecomment-1239494850
  current?.focus &&
    setTimeout(() => {
      current.blur();
      current.focus();
    }, 100);
};
