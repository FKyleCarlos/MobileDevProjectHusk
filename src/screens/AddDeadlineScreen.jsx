import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function AddDeadlineScreen() {

  function formatDate(text){
    let cleaned = text.replace(/\D+/g, "");
    if (cleaned.length >= 5) {
      cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    } else if (cleaned.length >= 3) {
      cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  function formatTime(text){
    let cleaned = text.replace(/\D+/g, "");
    if (cleaned.length >= 3) {
      cleaned = `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
    }
    return cleaned; 
  };

    const [saveSchema, setSaveSchema] = useState({
    className: "",
    deadlineDate: "",
    deadlineTime: ""
    });

  function saveData(){
    alert(JSON.stringify(saveSchema, null, 2));
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Class Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Web Development"
        value={saveSchema.className}
        onChangeText={(text) => setSaveSchema((prev) => ({...prev, className: text}))}
      />

      <Text style={styles.label}>Deadline Date</Text>
      <TextInput
        style={styles.input}
        placeholder="MM/DD/YYYY"
        value={saveSchema.deadlineDate}
        onChangeText={(text) => setSaveSchema((prev) => ({...prev, deadlineDate:formatDate(text)}))}
        keyboardType="numeric"
        maxLength={10}
      />

      <Text style={styles.label}>Deadline Time</Text>
      <TextInput
        style={styles.input}
        placeholder="HH:MM"
        value={saveSchema.deadlineTime}
        onChangeText={(text) => setSaveSchema((prev) => ({...prev, deadlineTime:formatTime(text)}))}
        keyboardType="numeric"
        maxLength={5}
      />

      <TouchableOpacity style={styles.submitButton} onPress={saveData}>
        <Text style={styles.submitText}>Save Class</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#f8f8f8",
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: "#2B2B2B",
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 5,
  },

  // Days
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  dayButton: {
    backgroundColor: "#ccc",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  dayButtonActive: {
    backgroundColor: "#52796F",
  },
  dayText: {
    color: "#333",
    fontWeight: "600",
  },
  dayTextActive: {
    color: "#fff",
  },

  // Submit
  submitButton: {
    marginTop: 30,
    backgroundColor: "#52796F",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
