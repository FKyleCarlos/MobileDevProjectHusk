import React, { useState } from "react";
import {View,Text,TextInput,StyleSheet,TouchableOpacity,ScrollView,} from "react-native";
import JournalHeader from "../components/JournalHeader";
import { saveJournalEntry } from "../utils/storage";
import { getUser } from "../utils/auth";

export default function AddJournalScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");



  const handleSave = async () => {
  const user = await getUser(); // get logged in user

  const newEntry = {
    id: Date.now().toString(),
    title,
    subtitle,
    content,
    preview: content.substring(0, 120) + "...",
    datetime: new Date().toLocaleString(),
  };

  await saveJournalEntry(user.email, newEntry);
  navigation.goBack();
};


  return (
    <View style={{ flex: 1 }}>
      <JournalHeader navigation={navigation} titleOverride="New Entry" />

      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a title..."
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Subtitle</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex. Banff Trip Day!"
          value={subtitle}
          onChangeText={setSubtitle}
        />

        <Text style={styles.label}>Journal Content</Text>
        <TextInput
          style={[styles.input, styles.contentInput]}
          placeholder="Write your journal entry here..."
          value={content}
          onChangeText={setContent}
          multiline
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save Entry</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
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
