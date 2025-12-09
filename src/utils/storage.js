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
