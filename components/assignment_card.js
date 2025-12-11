// components/AssignmentCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AssignmentCard({ subject, task, dueTime }) {
  return (
    <View style={styles.card}>
      <Text style={styles.subject}>{subject}</Text>
      <Text style={styles.task}>{task}</Text>
      <Text style={styles.due}>Due: {dueTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#4ECDC4',
    borderRadius: 10,
  },
  subject: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  task: {
    fontSize: 16,
    color: '#fff',
  },
  due: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
});
