import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import JournalHeader from "../components/JournalHeader";
import { updateJournalEntry } from "../utils/storage";

export default function EditJournalScreen({ route, navigation }) {
  const { entry } = route.params;

  const [title, setTitle] = useState(entry.title);
  const [subtitle, setSubtitle] = useState(entry.subtitle);
  const [content, setContent] = useState(entry.content);

  const handleSaveChanges = async () => {
    const updated = {
      ...entry,
      title,
      subtitle,
      content,
      preview: content.substring(0, 120) + "...",
    };

    await updateJournalEntry(updated);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <JournalHeader navigation={navigation} titleOverride="Edit Entry" />

      <ScrollView contentContainerStyle={styles.container}>
        
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Subtitle</Text>
        <TextInput
          style={styles.input}
          value={subtitle}
          onChangeText={setSubtitle}
        />

        <Text style={styles.label}>Journal Content</Text>
        <TextInput
          style={[styles.input, styles.contentInput]}
          multiline
          value={content}
          onChangeText={setContent}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 6 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  contentInput: {
    height: 180,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#6A8F6B",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
