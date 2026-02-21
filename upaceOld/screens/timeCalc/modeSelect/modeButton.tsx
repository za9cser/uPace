import React from "react";
import { View } from "react-native";
import { Text, TouchableRipple, useTheme } from "react-native-paper";

type ModeButtonProps = {
  button: ModeButtonData;
  isActive: boolean;
  onPress: (value: string) => void;
  modeStyle: any;
};

export type ModeButtonData = {
  value: string;
  label: string;
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

export default ModeButton;
