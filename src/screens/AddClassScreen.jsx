import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddClassScreen() {

  const [selectedDays, setSelectedDays] = useState([]);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

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

  function toggleDay(day) {
    setSelectedDays(prev => {
      const updated = prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day];

      setSaveSchema(s => ({ ...s, classDays: updated }));

      return updated;
    });
  }

    const [saveSchema, setSaveSchema] = useState({
    className: "",
    classCode: "",
    semStart: "",
    semEnd: "",
    classDays: [],
    timeStart: "",
    timeEnd: ""
    });

    async function saveData() {
        try {
            await AsyncStorage.setItem('classes', JSON.stringify(saveSchema));
            alert('Saved!');
        } catch (error) {
            alert(error);
        }
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

      <Text style={styles.label}>Class Code</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. COMP-264"
        value={saveSchema.classCode}
        onChangeText={(text) => setSaveSchema((prev) => ({...prev, classCode:text}))}
      />

      <Text style={styles.label}>Semester Start</Text>
      <TextInput
        style={styles.input}
        placeholder="MM/DD/YYYY"
        value={saveSchema.startDate}
        onChangeText={(text) => setSaveSchema((prev) => ({...prev, startDate:formatDate(text)}))}
        keyboardType="numeric"
        maxLength={10}
      />

      <Text style={styles.label}>Semester End</Text>
      <TextInput
        style={styles.input}
        placeholder="MM/DD/YYYY"
        value={saveSchema.endDate}
        onChangeText={(text) => setSaveSchema((prev) => ({...prev, endDate:formatDate(text)}))}
        keyboardType="numeric"
        maxLength={10}
      />

      <Text style={styles.label}>Class Days</Text>
      <View style={styles.daysContainer}>
        {daysOfWeek.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDays.includes(day) && styles.dayButtonActive,
            ]}
            onPress={() => toggleDay(day)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDays.includes(day) && styles.dayTextActive,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Class Time Start</Text>
      <TextInput
        style={styles.input}
        placeholder="HH:MM"
        value={saveSchema.startTime}
        onChangeText={(text) => setSaveSchema((prev) => ({...prev, startTime:formatTime(text)}))}
        keyboardType="numeric"
        maxLength={5}
      />

      <Text style={styles.label}>Class Time End</Text>
      <TextInput
        style={styles.input}
        placeholder="HH:MM"
        value={saveSchema.endTime}
        onChangeText={(text) => setSaveSchema((prev) => ({...prev, endTime:formatTime(text)}))}
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
