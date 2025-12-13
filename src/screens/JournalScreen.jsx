import React, { useState, useEffect } from "react";
import {ScrollView,StyleSheet,View,Image,TouchableOpacity,Text,} from "react-native";

import MainLayout from "../layouts/MainLayout";
import NavBar from "../components/NavBar";
import JournalEntryCard from "../components/JournalEntryCard";
import JournalHeader from "../components/JournalHeader";
import addIcon from "../assets/miscIcons/add.png";

import { loadJournalEntries, deleteJournalEntry } from "../utils/storage";
import { getUser } from "../utils/auth";

export default function JournalScreen({ navigation }) {
  const [entries, setEntries] = useState([]);

  // Load journals whenever screen gains focus
  useEffect(() => {
    const updateScreen = async () => {
      const user = await getUser();
      const data = await loadJournalEntries(user.email);
      setEntries(data);
    };

    const unsubscribe = navigation.addListener("focus", updateScreen);
    return unsubscribe;
  }, [navigation]);

  // Delete journal entry
  const handleDelete = async (id) => {
    const user = await getUser();
    const updated = await deleteJournalEntry(user.email, id);
    setEntries(updated);
  };

  return (
    <MainLayout>
      <JournalHeader navigation={navigation} />

      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {entries.length === 0 ? (
          <Text style={styles.emptyText}>No journal entries yet.</Text>
        ) : (
          entries.map((item) => (
            <JournalEntryCard
              key={item.id}
              entry={item}
              navigation={navigation}
              onDelete={handleDelete}
            />
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddJournal")}
      >
        <Image source={addIcon} style={styles.fabIcon} />
      </TouchableOpacity>

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
