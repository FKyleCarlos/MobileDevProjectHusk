/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen.jsx';
import ScheduleScreen from './src/screens/ScheduleScreen.jsx';
import JournalScreen from './src/screens/JournalScreen.jsx';
import ProfileScreen from './src/screens/ProfileScreen.jsx';
import NavBar from './src/components/NavBar';

const Stack = createNativeStackNavigator();

function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
          headerTitleAlign: 'center', 
          headerStyle: { 
          },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Classes & Assignments" component={ScheduleScreen} />
        <Stack.Screen name="Journal" component={JournalScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;

