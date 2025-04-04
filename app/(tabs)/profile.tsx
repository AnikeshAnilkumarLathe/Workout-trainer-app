import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function ProfileScreen() {
    const addedExercises = useSelector((state) => state.profile); // `profile` matches your store

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Workout Plan</Text>

            {addedExercises.length === 0 ? (
                <Text style={styles.emptyText}>No exercises added yet.</Text>
            ) : (
                <FlatList
                    data={addedExercises}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.exerciseItem}>
                            <Text style={styles.exerciseName}>{item.name}</Text>
                            <Text style={styles.exerciseDetail}>Type: {item.type}</Text>
                            <Text style={styles.exerciseDetail}>Muscle: {item.muscle}</Text>
                            <Text style={styles.exerciseDetail}>Difficulty: {item.difficulty}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1B1212",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginBottom: 16,
    },
    emptyText: {
        color: "gray",
        fontSize: 16,
        textAlign: "center",
        marginTop: 20,
    },
    exerciseItem: {
        backgroundColor: "#292929",
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    exerciseName: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
    },
    exerciseDetail: {
        fontSize: 14,
        color: "lightgray",
    },
});
