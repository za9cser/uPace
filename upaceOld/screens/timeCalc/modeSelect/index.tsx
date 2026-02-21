import { View } from "react-native";
import React from "react";
import ModeButton, { ModeButtonData } from "./modeButton";

export type ModeSelectProps = {
  value: string[] | string;
  buttons: ModeButtonData[];
  onChange: (newValue: string[] | string) => void;
  multiSelect: boolean;
};

const ModeSelect = ({
  value,
  buttons,
  onChange,
  multiSelect,
}: ModeSelectProps) => {
  const isActiveButton = (buttonValue: string) =>
    multiSelect ? value.includes(buttonValue) : value === buttonValue;

  const handlePress = (buttonValue: string) => {
    if (multiSelect) {
      const index = value.indexOf(buttonValue);
      const newValue = [...value];
      if (index >= 0) newValue.splice(index, 1);
      else newValue.push(buttonValue);

      onChange(newValue);
    } else onChange(buttonValue);
  };

  return (
    <View style={{ flexDirection: "row", gap: 15 }}>
      {buttons.map((button) => {
        const isActive = isActiveButton(button.value);
        let paddingHorizontal;
        switch (button.value) {
          case "ss":
            paddingHorizontal = 25;
            break;
          case "ds":
            paddingHorizontal = 25;
            break;
          default:
            paddingHorizontal = 20;
            break;
        }

        return (
          <ModeButton
            key={button.value}
            button={button}
            onPress={handlePress}
            isActive={isActive}
            modeStyle={{ paddingHorizontal: paddingHorizontal }}
          />
        );
      })}
    </View>
  );
};

export default ModeSelect;
