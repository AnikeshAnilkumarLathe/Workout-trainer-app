import { Text, View, StyleSheet, FlatList, Pressable, Modal, Button } from "react-native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

export default function Exercises() {
    const router = useRouter();
    const [list, setList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [plan, setPlan] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(null);

    const getExercises = async () => {
        const url = "https://api.api-ninjas.com/v1/exercises";
        try {
            const result = await fetch(url, {
                headers: {
                    "X-Api-Key": "TRYptaJ/l0im22PU8YcVkg==joIhbPVNBTGRPGCq",
                },
            });
            const data = await result.json();
            setList(data);
        } catch (error) {
            console.error("Error fetching exercises:", error);
        }
    };

    useEffect(() => {
        getExercises();
    }, []);

    const addToWorkoutPlan = (exercise) => {
        if (!plan.some((e) => e.name === exercise.name)) {
            setPlan([...plan, exercise]);
        }
        setIsModalVisible(false);
    };

    const removeFromWorkoutPlan = (exercise) => {
        setPlan(plan.filter((e) => e.name !== exercise.name));
        setIsModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={list}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.exerciseContainer}>
                        <Pressable
                            onPress={() => router.push({
                                pathname: `details/${item.name}`,
                                params: {
                                    name: item.name,
                                    instructions: item.instructions || "No instructions",
                                },
                            })}
                        >
                            <Text style={styles.exerciseText}>{item.name}</Text>
                            <Text style={styles.exerciseText}>{item.type}</Text>
                            <Text style={styles.exerciseText}>{item.muscle}</Text>
                            <Text style={styles.exerciseText}>{item.difficulty}</Text>
                        </Pressable>

                        <Pressable 
                            style={styles.addButton} 
                            onPress={() => {
                                setSelectedExercise(item);
                                setIsModalVisible(true);
                            }}
                        >
                            <Text style={styles.buttonText}>Add to workout plan</Text>
                        </Pressable>
                    </View>
                )}
                ListEmptyComponent={<Text>Getting exercises for you...</Text>}
            />

            <Modal visible={isModalVisible} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Manage Workout Plan</Text>
                        {selectedExercise && plan.some((e) => e.name === selectedExercise.name) ? (
                            <Button 
                                title="Remove from existing workouts" 
                                onPress={() => removeFromWorkoutPlan(selectedExercise)}
                            />
                        ) : (
                            <Button 
                                title="Add to existing workouts" 
                                onPress={() => addToWorkoutPlan(selectedExercise)}
                            />
                        )}
                        <Button title="Close" onPress={() => setIsModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
    },
    exerciseContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        width: "100%",
    },
    exerciseText: {
        fontSize: 16,
    },
    addButton: {
        backgroundColor: "#007BFF",
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "yellow",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    modalText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
});
