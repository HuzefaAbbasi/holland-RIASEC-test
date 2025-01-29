import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ResultScreen = () => {
  const route = useRoute();
  const { results }: any = route.params;

  // Sort the results by score in descending order
  const traits = results.sort((a: any, b: any) => b.score - a.score);

  // Maximum possible score to scale the bars (you can adjust this based on your data)
  const maxScore = Math.max(...traits.map((trait: any) => trait.score));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RIASEC Traits Scores</Text>
      {traits.map((trait: any, index: any) => (
        <View key={index} style={styles.traitContainer}>
          <Text style={styles.traitName}>{trait.name}</Text>
          <View style={styles.barContainer}>
            <View
              style={[
                styles.bar,
                { width: `${(trait.score / maxScore) * 100}%` },
              ]}
            >
              <Text style={styles.traitScore}>{trait.score}</Text>
            </View>
          </View>
        </View>
      ))}
      <Text style={styles.noteStyle}>Note: You can search careers based on your top two or three traits</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start', // Align content to the left
    padding: 20,
  },
  noteStyle:{
    paddingTop: 20,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  traitContainer: {
    width: '100%',
    marginBottom: 15,
  },
  traitName: {
    fontSize: 18,
    marginBottom: 5,
  },
  traitScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    right: 10,
  },
  barContainer: {
    width: '100%',
    backgroundColor: '#e0e0e0', // Light background for the bar container
    borderRadius: 10,
    overflow: 'hidden',
  },
  bar: {
    height: 20,
    backgroundColor: '#4CAF50', // Bar color
    borderRadius: 10,
    justifyContent: 'center',
    position: 'relative',
  },
});

export default ResultScreen;
