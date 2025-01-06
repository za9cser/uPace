import { StyleProp, View, ViewStyle } from "react-native";
import React from "react";
import { Text, TouchableRipple, useTheme } from "react-native-paper";

export type ModeSelectProps = {
  value: string[] | string;
  buttons: ModeButton[];
  onChange: (newValue: string[] | string) => void;
  multiSelect: boolean;
};

export type ModeButton = {
  label: string;
  value: string;
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

type ModeButtonProps = {
  button: ModeButton;
  isActive: boolean;
  onPress: (value: string) => void;
  modeStyle?: StyleProp<ViewStyle>;
};

const ModeButton = ({
  button,
  isActive,
  onPress,
  modeStyle,
}: ModeButtonProps) => {
  const { colors } = useTheme();
  return (
    <TouchableRipple
      key={button.value}
      style={{
        backgroundColor: isActive ? colors.inverseOnSurface : "transparent",
      }}
      onPress={() => onPress(button.value)}
    >
      <View
        style={[
          {
            alignItems: "center",
            paddingVertical: 10,
            width: "100%",
          },
          modeStyle,
        ]}
      >
        <Text>{button.label}</Text>
      </View>
    </TouchableRipple>
  );
};

export default ModeSelect;
