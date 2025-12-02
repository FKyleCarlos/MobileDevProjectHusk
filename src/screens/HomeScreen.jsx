import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeWindStyleSheet } from 'nativewind';

// const StyledText = styled(Text);

export default function HomeScreen() {

    const nav = useNavigation();

  console.log("Hello World!")
  return (
    <View className="flex-1 justify-center items-center bg-blue-500">
      <Text className="text-white text-lg">Hello, NativeWind!</Text>
      <Text className="text-red text-lg">Hello, NativeWind2!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
    paddingHorizontal: 20
  },
});