/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-blue-500 text-xl">Hello, Nativewind!</Text>
      <Text className='text-blue-200 text-lg p-100 mt-100'>BLUE</Text>
      <Text className='text-black text-6xl'>BLACK</Text>
      <Text className="text-red-500 text-xl" style={{ color: 'red' }}>
        This should show red
      </Text>
      <Text className=''></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
  },
});

export default App;
