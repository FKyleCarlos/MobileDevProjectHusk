import { View, Text, StyleSheet } from 'react-native';

export default function CalendarButton({ day }){

    return(
        <View style={styles.container}>
            <Text style={styles.number}>{day.number}</Text>
            <Text style={styles.text}>{day.word}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 10,
    backgroundColor: '#99c299ff', // A nice background color
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    marginHorizontal: 2,
  },
  number: {
    color: '#fff',
    fontSize: 25,
    fontStyle: ''
  },
  text: {
    color: '#fff',
    fontSize: 16,
  }
});