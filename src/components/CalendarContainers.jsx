import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CalendarButton({ day, isSelected, onPress }){ 

    return(
        <TouchableOpacity 
            style={[
                styles.container, 
                isSelected && styles.selectedContainer 
            ]}
            onPress={onPress} 
        >
            <Text style={[styles.number, isSelected && styles.selectedNumber]}>{day.number}</Text>
            <Text style={[styles.text, isSelected && styles.selectedText]}>{day.word}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 10,
    backgroundColor: '#99c299ff', 
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    marginHorizontal: 2,
  },
  selectedContainer: {
    backgroundColor: '#52796F',
  },
  number: {
    color: '#fff',
    fontSize: 25,
    fontStyle: ''
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  selectedNumber: {
    fontWeight: 'bold',
  },
  selectedText: {
    fontWeight: 'bold',
  }
});