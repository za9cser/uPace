import { View } from "react-native";
import React from "react";
import { Text, TouchableRipple } from "react-native-paper";

const ModeSelect = ({ value, buttons, onChange, multiSelect, bordered }) => {
    const isActiveButton = (buttonValue) => (multiSelect ? value.includes(buttonValue) : value === buttonValue);

    const handlePress = (buttonValue) => {
        if (multiSelect) {
            const index = value.indexOf(buttonValue);
            const newValue = [...value];
            if (index > 0) newValue.splice(index, 1);
            else newValue.push(buttonValue);

            onChange(newValue);
        } else onChange(buttonValue);
    };

    return (
        <View style={{ flexDirection: "row", gap: 20 }}>
            {buttons.map((button, index) => {
                const isActive = isActiveButton(button.value);
                return (
                    <TouchableRipple
                        style={{ backgroundColor: isActive ? "red" : "transparent" }}
                        onPress={() => handlePress(button.value)}
                    >
                        <View
                            style={{
                                flex: 1,
                                alignItems: "center",
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                            }}
                        >
                            <Text>{button.label}</Text>
                        </View>
                    </TouchableRipple>
                );
            })}
        </View>
    );
};

export default ModeSelect;
