import { View } from "react-native";
import React from "react";
import { Text, TouchableRipple, useTheme } from "react-native-paper";

const ModeSelect = ({ value, buttons, onChange, multiSelect }) => {
    const isActiveButton = (buttonValue) => (multiSelect ? value.includes(buttonValue) : value === buttonValue);

    const handlePress = (buttonValue) => {
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

const ModeButton = ({ button, isActive, onPress, modeStyle }) => {
    const { colors } = useTheme();
    return (
        <TouchableRipple
            key={button.value}
            style={{ backgroundColor: isActive ? colors.inverseOnSurface : "transparent" }}
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

export const describeTimeMode = (mode) => ({
    hasMinutes: mode?.includes("mm") ?? true,
    hasSeconds: mode?.includes("ss") ?? true,
    hasDeciseconds: mode?.includes("ds") ?? true,
});
