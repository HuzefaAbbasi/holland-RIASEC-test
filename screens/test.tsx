import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import questions from "../questions.json"; // Import JSON file
import { useNavigation } from "@react-navigation/native";

// Define rating scale
const options = [
  { label: "Strongly Dislike", value: 1 },
  { label: "Dislike", value: 2 },
  { label: "Neutral", value: 3 },
  { label: "Like", value: 4 },
  { label: "Strongly Like", value: 5 },
];

const TestScreen = () => {
    const navigation = useNavigation<any>();
  // Store user responses
  interface ResponseItem {
    category: keyof typeof scores;
    score: number;
  }

  // Initialize scores
const scores = {
      Realistic: 0,
      Investigative: 0,
      Artistic: 0,
      Social: 0,
      Enterprising: 0,
      Conventional: 0,
  };

  const [responses, setResponses] = useState<{  [key: string]: ResponseItem }>({});

  // Handle response selection
  const handleSelect = (questionId: number, category: string, score: number) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: { category, score },
    }));
  };

  // Compute total scores per category
  const calculateResults = () => {
    const scores: { [key: string]: number } = {
      Realistic: 0,
      Investigative: 0,
      Artistic: 0,
      Social: 0,
      Enterprising: 0,
      Conventional: 0,
    };

    Object.values(responses).forEach(({ category, score }) => {
      scores[category] += score;
    });

    const results = Object.entries(scores)
      .sort(([, a], [, b]) => b - a) // Sort by highest score

    return results.map(([name, score]) => ({ name, score }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>RIASEC Career Assessment</Text>

      <FlatList
        data={questions.questions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.id}. {item.question}</Text>

            <View style={styles.optionsContainer}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionButton,
                    responses[item.id]?.score === option.value && styles.selectedOption,
                  ]}
                  onPress={() => handleSelect(item.id, item.category, option.value)}
                >
                  <Text style={styles.optionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.submitButton} onPress={() =>{
            navigation.navigate("Result", { results: calculateResults() });
      }}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styling
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop:40,backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  questionContainer: { marginBottom: 20 },
  questionText: { fontSize: 18, marginBottom: 10 },
  optionsContainer: { flexDirection: "column"},
  optionButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  selectedOption: { backgroundColor: "#3498db" },
  optionText: { fontSize: 16, color: "#000" },
  submitButton: { backgroundColor: "#27ae60", padding: 15, borderRadius: 5, alignItems: "center" },
  submitButtonText: { fontSize: 18, color: "#fff", fontWeight: "bold" },
});

export default TestScreen;
