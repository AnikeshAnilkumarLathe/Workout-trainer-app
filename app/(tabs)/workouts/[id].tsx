import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function WorkoutDetails() {
    const { id } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text>Details about workout with ID: {id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",  // Fixed typo
        alignItems: "center",
    },
});
