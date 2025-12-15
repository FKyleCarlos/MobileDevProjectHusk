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

// Journals //
// Helper to generate a per-user storage key
const journalKey = (email) => `journalEntries_${email}`;

// Load all journal entries for a specific user
export const loadJournalEntries = async (email) => {
  try {
    const existing = await AsyncStorage.getItem(journalKey(email));
    return existing ? JSON.parse(existing) : [];
  } catch (err) {
    console.log("Error loading journal entries:", err);
    return [];
  }
};

// Save a new journal entry for the user
export const saveJournalEntry = async (email, entry) => {
  try {
    const existing = await loadJournalEntries(email);
    const updated = [...existing, entry];

    await AsyncStorage.setItem(journalKey(email), JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.log("Error saving journal entry:", err);
  }
};

// Update a journal entry
export const updateJournalEntry = async (email, updatedEntry) => {
  try {
    const existing = await loadJournalEntries(email);

    const newList = existing.map((entry) =>
      entry.id === updatedEntry.id ? updatedEntry : entry
    );

    await AsyncStorage.setItem(journalKey(email), JSON.stringify(newList));
    return newList;
  } catch (err) {
    console.log("Error updating journal entry:", err);
  }
};

// Delete a journal entry
export const deleteJournalEntry = async (email, id) => {
  try {
    const existing = await loadJournalEntries(email);

    const newList = existing.filter((entry) => entry.id !== id);

    await AsyncStorage.setItem(journalKey(email), JSON.stringify(newList));
    return newList;
  } catch (err) {
    console.log("Error deleting journal entry:", err);
  }
};