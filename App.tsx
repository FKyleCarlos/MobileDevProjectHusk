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
import AddClass from './src/screens/AddClassScreen.jsx';
import addDeadline from './src/screens/AddDeadlineScreen.jsx'
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";

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
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Day2Day" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Classes & Assignments" component={ScheduleScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Journal" component={JournalScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Add Schedule" component={AddClass}/>
        <Stack.Screen name="Add Deadline" component={addDeadline}/>


      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;

