import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";

export default function AddedExercises() {
    const router = useRouter();
    const { plan } = useLocalSearchParams(); // Get the plan as a string
    const [workoutPlan, setWorkoutPlan] = useState(plan ? JSON.parse(plan) : []); // Parse it to an array

    const removeExercise = (exerciseName) => {
        setWorkoutPlan(workoutPlan.filter((e) => e.name !== exerciseName));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Workout Plan</Text>
            
            {workoutPlan.length > 0 ? (
                <FlatList
                    data={workoutPlan}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.exerciseContainer}>
                            <Text style={styles.exerciseText}>{item.name}</Text>
                            <Text style={styles.exerciseText}>{item.type}</Text>
                            <Text style={styles.exerciseText}>{item.muscle}</Text>
                            <Text style={styles.exerciseText}>{item.difficulty}</Text>

                            <Pressable 
                                style={styles.removeButton} 
                                onPress={() => removeExercise(item.name)}
                            >
                                <Text style={styles.buttonText}>Remove</Text>
                            </Pressable>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noExercises}>No exercises added yet!</Text>
            )}

            <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.buttonText}>Back to Exercises</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    exerciseContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        backgroundColor: "#f8f8f8",
        borderRadius: 10,
        marginBottom: 10,
    },
    exerciseText: {
        fontSize: 16,
    },
    removeButton: {
        backgroundColor: "red",
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    backButton: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    noExercises: {
        textAlign: "center",
        fontSize: 18,
        color: "gray",
    },
});
