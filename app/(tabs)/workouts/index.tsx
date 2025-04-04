import { Text, View, StyleSheet, FlatList, Pressable, Modal, Button } from "react-native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addExercise as addToRedux, removeExercise } from "../../../reduxtoolkit/profileslice";

export default function Exercises() {
    const router = useRouter();
    const [list, setList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);

    const dispatch = useDispatch();
    const addedExercises = useSelector(state => state.profile); // profile should match the key in configureStore

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

    const handleAddExercise = (exercise) => {
        dispatch(addToRedux(exercise));
        setIsModalVisible(false);
    };

    const handleRemoveExercise = (exercise) => {
        const index = addedExercises.findIndex((e) => e.name === exercise.name);
        if (index !== -1) {
            dispatch(removeExercise(index));
        }
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
                            onPress={() =>
                                router.push({
                                    pathname: `details/${item.name}`,
                                    params: {
                                        name: item.name,
                                        instructions: item.instructions || "No instructions",
                                    },
                                })
                            }
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
                ListEmptyComponent={<Text style={{ color: "white" }}>Getting exercises for you...</Text>}
            />

            <Modal visible={isModalVisible} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Manage Workout Plan</Text>
                        {selectedExercise &&
                        addedExercises.some((e) => e.name === selectedExercise.name) ? (
                            <Button
                                title="Remove from workout plan"
                                onPress={() => handleRemoveExercise(selectedExercise)}
                            />
                        ) : (
                            <Button
                                title="Add to workout plan"
                                onPress={() => handleAddExercise(selectedExercise)}
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
        backgroundColor: "#1B1212",
    },
    exerciseContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        width: "100%",
    },
    exerciseText: {
        fontSize: 16,
        color: "white",
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
