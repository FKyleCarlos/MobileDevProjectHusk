import React from "react";
import {View,Text,StyleSheet,TouchableOpacity,} from "react-native";

export default function JournalEntryCard({ entry, navigation, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {/* Left: text info */}
        <View>
          <Text style={styles.title}>{entry.title}</Text>
          <Text style={styles.subtitle}>{entry.subtitle}</Text>
          <Text style={styles.datetime}>{entry.datetime}</Text>
        </View>

        {/* Right: Edit + Delete */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate("EditJournal", { entry })}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => onDelete && onDelete(entry.id)}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.preview}>{entry.preview}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 3,
    fontWeight: "600",
    color: "#606060",
  },
  datetime: {
    color: "#8a8a8a",
    marginTop: 2,
    fontSize: 13,
  },
  preview: {
    marginTop: 12,
    fontSize: 14,
    color: "#4a4a4a",
    lineHeight: 20,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  editBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "#E6F0FF",
    marginRight: 6,
  },
  editText: {
    fontSize: 13,
    color: "#0066ff",
    fontWeight: "600",
  },
  deleteBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "#FFE6E6",
  },
  deleteText: {
    fontSize: 13,
    color: "#D11A2A",
    fontWeight: "600",
  },
});
