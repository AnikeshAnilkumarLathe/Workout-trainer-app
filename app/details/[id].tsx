import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function ExerciseDetail() {
  const { name, instructions } = useLocalSearchParams(); 
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name} </Text>
      <Text style={styles.detail}>{instructions}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  detail: { fontSize: 18, marginVertical: 5 },
});
