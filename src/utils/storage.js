import AsyncStorage from '@react-native-async-storage/async-storage';

// Key used to store the classes array in AsyncStorage
const CLASSES_KEY = 'myClasses'; 
const DEADLINES_KEY = 'myDeadlines';

/**
 * Retrieves all saved classes from AsyncStorage.
 * @returns {Promise<Array>} An array of class objects, or an empty array if none exist.
 */
export async function getClasses() {
  try {
    const classesJson = await AsyncStorage.getItem(CLASSES_KEY);
    // Return the parsed array, or an empty array if the key doesn't exist
    return classesJson ? JSON.parse(classesJson) : [];
  } catch (error) {
    console.error('Error fetching classes:', error);
    return [];
  }
}

/**
 * Saves a new class object to AsyncStorage.
 * @param {object} newClass - The class object to save (e.g., from AddClassScreen).
 */
export async function saveClass(newClass) {
  try {
    // 1. Get the existing list of classes
    const existingClasses = await getClasses();

    // 2. Add the new class
    const updatedClasses = [...existingClasses, newClass];

    // 3. Save the updated list back to storage
    await AsyncStorage.setItem(CLASSES_KEY, JSON.stringify(updatedClasses));
    console.log('Class saved successfully:', newClass.className);
  } catch (error) {
    console.error('Error saving class:', error);
    alert("Failed to save class. Please try again.");
  }
}

/**
 * OPTIONAL: Clears all saved classes. Useful for development/testing.
 */
export async function clearClasses() {
    try {
        await AsyncStorage.removeItem(CLASSES_KEY);
        console.log('All classes cleared successfully.');
    } catch (error) {
        console.error('Error clearing classes:', error);
    }
}

// You can also add utilities for deadlines here:

/**
 * Retrieves all saved deadlines/assignments.
 */
export async function getDeadlines() {
    try {
        const deadlinesJson = await AsyncStorage.getItem(DEADLINES_KEY);
        return deadlinesJson ? JSON.parse(deadlinesJson) : [];
    } catch (error) {
        console.error('Error fetching deadlines:', error);
        return [];
    }
}

/**
 * Saves a new deadline/assignment object.
 */
export async function saveDeadline(newDeadline) {
    try {
        const existingDeadlinesJson = await AsyncStorage.getItem(DEADLINES_KEY);
        const existingDeadlines = existingDeadlinesJson ? JSON.parse(existingDeadlinesJson) : [];

        const updatedDeadlines = [...existingDeadlines, newDeadline];
        await AsyncStorage.setItem(DEADLINES_KEY, JSON.stringify(updatedDeadlines));
        console.log('Deadline saved successfully:', newDeadline.className);
    } catch (error) {
        console.error('Error saving deadline:', error);
        alert("Failed to save deadline. Please try again.");
    }
}