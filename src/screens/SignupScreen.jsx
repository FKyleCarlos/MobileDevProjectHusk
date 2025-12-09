import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { registerUser } from "../utils/auth";

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  function showError(msg) {
    setError(msg);
    setTimeout(() => setError(""), 2000);
  }

  async function handleSignup() {
    // 1. Empty fields
    if (!name || !email || !password) {
      showError("Please fill in all fields.");
      return;
    }

    // 2. Invalid email
    if (!isValidEmail(email)) {
      showError("Invalid email format.");
      return;
    }

    // 3. Save user
    await registerUser({ name, email, password });

    alert("Account created successfully!");
    navigation.replace("Login");
  }

  return (
    <View style={styles.container}>

      {/* Error Toast */}
      {error !== "" && (
        <View style={styles.errorToast}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#777"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#777"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace("Login")}>
        <Text style={styles.loginLink}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9F4",
    paddingHorizontal: 25,
    justifyContent: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2B4D39",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },

  signupBtn: {
    backgroundColor: "#52796F",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  signupText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  loginLink: {
    textAlign: "center",
    marginTop: 15,
    color: "#444",
  },

  errorToast: {
    position: "absolute",
    bottom: 50,
    left: 30,
    right: 30,
    backgroundColor: "#E74C3C",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    zIndex: 999,
    elevation: 4,
  },
  errorText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
