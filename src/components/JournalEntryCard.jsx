import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function JournalEntryCard({ title, subtitle, datetime, preview }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.datetime}>{datetime}</Text>
        </View>
      </View>

      <Text style={styles.preview}>{preview}</Text>
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
});
