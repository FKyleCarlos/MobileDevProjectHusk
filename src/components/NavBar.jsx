import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

export default function NavBar({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navText}>Home</Text>
        </Pressable>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer}>
        <Pressable onPress={() => navigation.navigate('Classes & Assignments')}>
          <Text style={styles.navText}>Schedules</Text>
        </Pressable>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer}>
        <Pressable onPress={() => navigation.navigate('Journal')}>
          <Text style={styles.navText}>Journals</Text>
        </Pressable>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer}>
        <Pressable onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.navText}>Profile</Text>
        </Pressable>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e7e7e7',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    elevation: 5,
    zIndex: 1,
    paddingBottom: 30,
  },
  iconContainer: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: '600',
  },
});
