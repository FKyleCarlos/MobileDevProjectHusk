import AsyncStorage from "@react-native-async-storage/async-storage";

// Save a new class
export const saveClass = async (newClass) => {
  try {
    const existing = await AsyncStorage.getItem("classes");
    const classes = existing ? JSON.parse(existing) : [];
    const updated = [...classes, newClass];
    await AsyncStorage.setItem("classes", JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.log("Error saving class:", err);
  }
};

// Save a new assignment
export const saveAssignment = async (newAssignment) => {
  try {
    const existing = await AsyncStorage.getItem("assignments");
    const assignments = existing ? JSON.parse(existing) : [];
    const updated = [...assignments, newAssignment];
    await AsyncStorage.setItem("assignments", JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.log("Error saving assignment:", err);
  }
};

// Load ALL classes
export const loadClasses = async () => {
  try {
    const existing = await AsyncStorage.getItem("classes");
    return existing ? JSON.parse(existing) : [];
  } catch (err) {
    console.log("Error loading classes:", err);
    return [];
  }
};

// Load ALL assignments
export const loadAssignments = async () => {
  try {
    const existing = await AsyncStorage.getItem("assignments");
    return existing ? JSON.parse(existing) : [];
  } catch (err) {
    console.log("Error loading assignments:", err);
    return [];
  }
};


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




