module.exports = {
  presets: ['module:@react-native/babel-preset'],

};



// Journal storage // 
const JOURNAL_KEY = "journals";

// Save single new journal entry
export const saveJournalEntry = async (entry) => {
  try {
    const existing = await AsyncStorage.getItem(JOURNAL_KEY);
    const journals = existing ? JSON.parse(existing) : [];
    const updated = [...journals, entry];

    await AsyncStorage.setItem(JOURNAL_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.log("Error saving journal entry:", err);
  }
};

// Load ALL journal entries
export const loadJournalEntries = async () => {
  try {
    const existing = await AsyncStorage.getItem(JOURNAL_KEY);
    return existing ? JSON.parse(existing) : [];
  } catch (err) {
    console.log("Error loading journal entries:", err);
    return [];
  }
};