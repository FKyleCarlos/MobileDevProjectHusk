import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Accept isSelected and onPress props
export default function CalendarButton({ day, isSelected, onPress }){ 

    return(
        // Use TouchableOpacity to make it clickable
        <TouchableOpacity 
            style={[
                styles.container, 
                isSelected && styles.selectedContainer // Apply selected style if true
            ]}
            onPress={onPress} // Attach the onPress handler
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
    backgroundColor: '#99c299ff', // Default background color
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    marginHorizontal: 2,
  },
  // NEW: Style for the selected button (darker green based on mockup)
  selectedContainer: {
    backgroundColor: '#52796F', // Use your main accent color for highlight
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
  // NEW: Styles for text when selected (if you want to change them too)
  selectedNumber: {
    fontWeight: 'bold',
  },
  selectedText: {
    fontWeight: 'bold',
  }
});