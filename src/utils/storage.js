import AsyncStorage from '@react-native-async-storage/async-storage';

// --- Storage Keys ---
const CLASSES_KEY = 'myClasses'; 
const DEADLINES_KEY = 'myDeadlines';

/**
 * Helper function to generate a unique ID using a timestamp.
 * This replaces the complex uuid package.
 */
const generateUniqueId = () => {
    // Generates a string based on the current timestamp + a small random number
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
};


// --- Class Functions ---

/**
 * Retrieves all saved classes.
 */
export async function getClasses() {
    try {
        const classesJson = await AsyncStorage.getItem(CLASSES_KEY);
        // This addresses the "getClasses is not a function" error if it was a build issue.
        return classesJson ? JSON.parse(classesJson) : []; 
    } catch (error) {
        console.error('Error fetching classes:', error);
        return [];
    }
}

/**
 * Saves a new class object.
 */
export async function saveClass(newClass) {
    try {
        const existingClasses = await getClasses();
        // NOTE: We assume newClass already contains an ID if needed for classes.
        const updatedClasses = [...existingClasses, newClass]; 
        await AsyncStorage.setItem(CLASSES_KEY, JSON.stringify(updatedClasses));
    } catch (error) {
        console.error('Error saving class:', error);
        alert("Failed to save class. Please try again.");
    }
}


// --- Deadline Functions ---

/**
 * Retrieves all saved deadlines/assignments.
 */
export async function getDeadlines() {
    try {
        const jsonValue = await AsyncStorage.getItem(DEADLINES_KEY);
        return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Error getting deadlines:', e);
        return [];
    }
}

/**
 * Saves a new deadline/assignment object with a unique ID.
 */
export async function saveDeadline(newDeadline) {
    try {
        const existingDeadlines = await getDeadlines();
        
        // Use our simple JavaScript ID generator instead of uuidv4
        const deadlineWithId = { 
            ...newDeadline, 
            id: generateUniqueId() 
        }; 
        
        const updatedDeadlines = [...existingDeadlines, deadlineWithId];
        const jsonValue = JSON.stringify(updatedDeadlines);
        await AsyncStorage.setItem(DEADLINES_KEY, jsonValue);
        return deadlineWithId;
    } catch (e) {
        // This console error previously caught the native linking issue
        console.error('Error saving deadline:', e); 
        return null;
    }
}

// --- Utility Functions ---

export async function clearClasses() {
    try {
        await AsyncStorage.removeItem(CLASSES_KEY);
        console.log('All classes cleared.');
    } catch (error) {
        console.error('Error clearing classes:', error);
    }
}

export async function clearDeadlines() {
    try {
        await AsyncStorage.removeItem(DEADLINES_KEY);
        console.log('All deadlines cleared.');
    } catch (error) {
        console.error('Error clearing deadlines:', error);
    }
}