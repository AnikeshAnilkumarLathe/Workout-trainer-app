import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

export default function Exercises() {
    const router = useRouter();
    const [list, setList] = useState([]);

    const getProducts = async () => {
        const url = "https://api.api-ninjas.com/v1/exercises";
        try {
            const result = await fetch(url, {
                headers: {
                    "X-Api-Key": "TRYptaJ/l0im22PU8YcVkg==joIhbPVNBTGRPGCq",
                },
            });
            const data = await result.json();
            console.log("Fetched exercises:", data); 
            setList(data);
        } catch (error) {
            console.error("Error fetching exercises:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {list.length > 0 ? (
                list.map((exercise, index) => (
                    <Pressable
                        key={index}
                        onPress={() => {

                            router.push({
                                pathname: `details/${exercise.name}`,
                                params: {
                                    name: exercise.name,
                                    instructions: exercise.instructions || "No instructions",
                                },
                            });
                        }}
                    >
                        <View style={styles.exerciseContainer}>
                            <Text style={styles.exerciseText}>{exercise.name}</Text>
                            <Text style={styles.exerciseText}>{exercise.type}</Text>
                            <Text style={styles.exerciseText}>{exercise.muscle}</Text>
                            <Text style={styles.exerciseText}>{exercise.difficulty}</Text>

                            
                            <Pressable style={styles.addButton} onPress={() => console.log("Added to workout plan")}>
                                <Text style={styles.buttonText}>Add to workout plan</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                ))
            ) : (
                <Text>Getting exercises for you...</Text>
            )}
        </ScrollView>
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
});


