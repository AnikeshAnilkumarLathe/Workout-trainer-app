import { Text, View, StyleSheet, ScrollView , Button, Pressable} from "react-native";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

export default function Exercises() {
    const router = useRouter();
    const [list, setList] = useState([]);
    
    const getProducts = async () => {
        const url = "https://api.api-ninjas.com/v1/exercises";
        try {
            const result = await fetch(url, {
                headers: {
                    'X-Api-Key': 'TRYptaJ/l0im22PU8YcVkg==joIhbPVNBTGRPGCq'  
                }
            });
            const data = await result.json();
            setList(data);
        } catch (error) {                                             
            console.error("Error fetching exercises:", error);
        }
    };
    // can be written anything inside braces instead of writing error

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {list.length > 0 ? (
                list.map((exercise, index) => (
                    <Pressable onPress={()=> router.push({pathname: `details/${exercise.name}`,
                                                         params: {name: exercise.name},
                                                         params: { instructions: exercise.instructions }})}>
                    <View key={index} style={styles.exerciseContainer}>
                        <Text style={styles.exerciseText}>{exercise.name}</Text>
                        <Text style={styles.exerciseText}>{exercise.type}</Text>
                        <Text style={styles.exerciseText}>{exercise.muscle}</Text>
                        <Text style={styles.exerciseText}>{exercise.difficulty}</Text>
                        <Text style={styles.exerciseText}>Add to workout plan</Text>
                        
                    </View>
                    </Pressable>
                ))
            ) : (
                <Text>Getting exercises for you</Text>
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
        borderBottomColor: '#ccc',
        width: '100%',
    },
    exerciseText: {
        fontSize: 16,
    },
    linkText: {
        color: "blue",
        fontSize: 18,
        marginVertical: 10,
    }
});
