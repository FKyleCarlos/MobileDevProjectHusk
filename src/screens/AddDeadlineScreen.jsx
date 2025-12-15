import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
// Import the necessary function from your storage utility
import { saveDeadline } from '../utils/storage'; 
import MainLayout from '../layouts/MainLayout'; // Use MainLayout for consistent screen layout

export default function AddDeadlineScreen({ navigation }) {

    const [saveSchema, setSaveSchema] = useState({
        className: "",
        assignmentName: "", // Added field for the assignment name
        deadlineDate: "",
        deadlineTime: ""
    });

    // Helper to format date as MM/DD/YYYY
    function formatDate(text){
        let cleaned = text.replace(/\D+/g, "");
        if (cleaned.length >= 5) {
            cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
        } else if (cleaned.length >= 3) {
            cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
        }
        return cleaned;
    };

    // Helper to format time as HH:MM
    function formatTime(text){
        let cleaned = text.replace(/\D+/g, "");
        if (cleaned.length >= 3) {
            cleaned = `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
        }
        return cleaned; 
    };

    async function saveData() {
        if (!saveSchema.className || !saveSchema.assignmentName || !saveSchema.deadlineDate || !saveSchema.deadlineTime) {
            Alert.alert("Missing Fields", "Please fill out all fields.");
            return;
        }

        const savedDeadline = await saveDeadline(saveSchema);

        if (savedDeadline) {
            Alert.alert("Success", "Deadline saved successfully!");
            navigation.goBack(); 
        } else {
            Alert.alert("Error", "Failed to save deadline.");
        }
    }

    return (
        <MainLayout>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Add New Deadline</Text>

                <Text style={styles.label}>Class Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. Web Development"
                    value={saveSchema.className}
                    onChangeText={(text) => setSaveSchema((prev) => ({...prev, className: text}))}
                />

                <Text style={styles.label}>Assignment Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. Project 1"
                    value={saveSchema.assignmentName}
                    onChangeText={(text) => setSaveSchema((prev) => ({...prev, assignmentName: text}))}
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
                    <Text style={styles.submitText}>Save Deadline</Text>
                </TouchableOpacity>
            </ScrollView>
        </MainLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 150, // Added space for FAB and NavBar
        backgroundColor: "#f8f8f8",
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2B2B2B',
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginTop: 15,
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
        fontSize: 16,
    },
    submitButton: {
        marginTop: 40,
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