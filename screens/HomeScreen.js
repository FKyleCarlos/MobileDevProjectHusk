// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome Hans!</Text>
      <Button
        title="View Assignments & Schedule"
        onPress={() => navigation.navigate('ClassesAndAssignments')}
      />
    </View>
  );
}
