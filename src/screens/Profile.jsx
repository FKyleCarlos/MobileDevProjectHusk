import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {

    const nav = useNavigation();

  return (
    <View style={styles.container}>
        <ScrollView>
            <Text style={ {fontSize:30,color:'blue',textAlign:'center',marginTop:50}}>Profile Page!</Text>
            <Button title="Go to about" onPress={ () => nav.navigate('About')}/>
              <Button title="Go to Counter" onPress={ () => nav.navigate('Counter')}/>
        </ScrollView>
    </View>
  );
}