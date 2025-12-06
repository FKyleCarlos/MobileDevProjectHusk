import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

import homeIcon from '../assets/navIcons/home.png';
import calendarIcon from '../assets/navIcons/calendar.png';
import diaryIcon from '../assets/navIcons/diary.png';
import profileIcon from '../assets/navIcons/profile.png';

export default function NavBar({ navigation }) {

  const currentRoute = navigation.getState().routes[navigation.getState().index].name;
  const isActive = (route) => currentRoute === route;

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={[styles.item, isActive('Day2Day') && styles.activeItem]}
        onPress={() => navigation.navigate('Day2Day')}
      >
        <Image 
          source={homeIcon} 
          style={[styles.icon, isActive('Day2Day') && styles.activeIcon]} 
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.item, isActive('Classes & Assignments') && styles.activeItem]}
        onPress={() => navigation.navigate('Classes & Assignments')}
      >
        <Image 
          source={calendarIcon} 
          style={[styles.icon, isActive('Classes & Assignments') && styles.activeIcon]} 
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.item, isActive('Journal') && styles.activeItem]}
        onPress={() => navigation.navigate('Journal')}
      >
        <Image 
          source={diaryIcon} 
          style={[styles.icon, isActive('Journal') && styles.activeIcon]} 
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.item, isActive('Profile') && styles.activeItem]}
        onPress={() => navigation.navigate('Profile')}
      >
        <Image 
          source={profileIcon} 
          style={[styles.icon, isActive('Profile') && styles.activeIcon]} 
        />
      </TouchableOpacity>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    paddingVertical: 14,
    paddingBottom: 28,

    borderTopWidth: 0.5,
    borderColor: '#ddd',

    // subtle shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -2 },
    elevation: 10,
  },

  item: {
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  icon: {
    width: 26,
    height: 26,
  },

  // Highlight effects
  activeItem: {
    backgroundColor: '#e6f0ff',
  },
  activeIcon: {
    tintColor: '#0066ff',
  },
});
