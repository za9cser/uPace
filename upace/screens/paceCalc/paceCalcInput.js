import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button, useTheme } from "react-native-paper";

const PaceCalcInput = ({ buttonCaption, onCalc, children }) => {
    const { colors } = useTheme();
    return (
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <View style={{ flex: 3, flexDirection: "row", justifyContent: "flex-end" }}>{children}</View>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <Button
                    textColor={colors.primary}
                    style={styles.addButton}
                    labelStyle={styles.addButtonText}
                    onPress={onCalc}
                >
                    {buttonCaption}
                </Button>
            </View>
        </View>
    );
};

export default PaceCalcInput;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    description: {
        textAlign: "center",
    },
    timeInput: {
        justifyContent: "center",
        marginTop: 8,
    },
    addButton: {
        paddingVertical: 8,
    },
    addButtonText: {
        fontSize: 16,
    },
    summary: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingBottom: 25,
        borderTopColor: "#ccc",
        borderTopWidth: 1,
    },
});
