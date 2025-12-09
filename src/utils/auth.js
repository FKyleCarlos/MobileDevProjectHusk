import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerUser = async (user) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    return true;
  } catch (error) {
    console.log("Register Error:", error);
    return false;
  }
};

export const getUser = async () => {
  try {
    const data = await AsyncStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log("Load User Error:", error);
    return null;
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem("user");
  } catch (error) {
    console.log("Logout Error:", error);
  }
};
