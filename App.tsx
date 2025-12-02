/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen.jsx';
import Schedules from './src/screens/Schedules.jsx';
import Journal from './src/screens/Journal.jsx';
import Profile from './src/screens/Profile.jsx';

const RootStack = createNativeStackNavigator({
  screens:{
    Home: HomeScreen,
    Schedules: Schedules,
    Journal: Journal,
    Profile: Profile
  }
});

const Navigation = createStaticNavigation(RootStack);

function App() {
  return <Navigation />;
}

export default App;
