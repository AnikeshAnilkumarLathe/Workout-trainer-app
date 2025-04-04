import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';

export default function ExerciseDetail() {
  const { name, instructions } = useLocalSearchParams();

  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [stopwatchReset, setStopwatchReset] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Button
          title={isStopwatchStart ? 'Stop Workout' : 'Start Workout'}
          onPress={() => setIsStopwatchStart(!isStopwatchStart)}
        />
      </View>

      <Text style={styles.title}>{name}</Text>
      <Text style={styles.detail}>{instructions}</Text>

      <Text style={styles.sectionTitle}>You have been burning calories since</Text>
      <Stopwatch
        laps
        start={isStopwatchStart}
        reset={stopwatchReset}
        options={stopwatchStyles}
      />
      <View style={styles.buttonRow}>
        <Button
          title="Reset"
          onPress={() => {
            setStopwatchReset(true);
            setIsStopwatchStart(false);
            setTimeout(() => setStopwatchReset(false), 100);
          }}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  detail: { fontSize: 18, marginVertical: 5 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 30,
  },
});

const stopwatchStyles = {
  container: { alignItems: 'center', marginVertical: 10 },
  text: { fontSize: 24, fontWeight: 'bold' },
  marginBottom:100,
};
