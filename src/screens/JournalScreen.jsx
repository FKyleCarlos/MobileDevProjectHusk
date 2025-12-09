import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import MainLayout from "../layouts/MainLayout";
import NavBar from "../components/NavBar";
import JournalEntryCard from "../components/JournalEntryCard";
import JournalHeader from "../components/JournalHeader";
import addIcon from "../assets/miscIcons/add.png";

export default function JournalScreen({ navigation }) {
  const [entries, setEntries] = useState([]);

  return (
    <MainLayout>

      {/* Green Header */}
      <JournalHeader navigation={navigation} />

      {/* Scrollable List */}
      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >

        {entries.length === 0 ? (
          <Text style={styles.emptyText}>No journal entries yet.</Text>
        ) : (
          entries.map((item, index) => (
            <JournalEntryCard
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              datetime={item.datetime}
              preview={item.preview}
            />
          ))
        )}

      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddJournal")}
      >
        <Image source={addIcon} style={styles.fabIcon} />
      </TouchableOpacity>

      {/* Bottom Nav */}
      <NavBar navigation={navigation} />

    </MainLayout>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 15,
    marginTop: 10,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#666",
  },

  fab: {
    position: "absolute",
    bottom: 120,
    right: 28,
    width: 60,
    height: 60,
  },

  fabIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
