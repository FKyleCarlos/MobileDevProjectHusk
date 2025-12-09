import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { getUser } from "../utils/auth";


function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function showError(msg) {
    setError(msg);
    setTimeout(() => setError(""), 2000);
  }

  async function handleLogin() {
    // 1. Empty field validation
    if (!email || !password) {
      showError("Please fill in all fields.");
      return;
    }

    // 2. Email format validation
    if (!isValidEmail(email)) {
      showError("Invalid email format.");
      return;
    }

    const storedUser = await getUser();

    // 3. Check if user exists
    if (!storedUser) {
      showError("No account found. Please sign up first.");
      return;
    }

    // 4. Check email match
    if (storedUser.email !== email) {
      showError("Email not found.");
      return;
    }

    // 5. Check password match
    if (storedUser.password !== password) {
      showError("Incorrect password.");
      return;
    }

    // 6. Successful login
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace("Day2Day");
    }, 1200);
  }

  // Loading screen
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#52796F" />
        <Text style={styles.loadingText}>Logging in...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Error Toast */}
      {error !== "" && (
        <View style={styles.errorToast}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to your Day2Day account</Text>

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

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signupLink}>
          Don't have an account? <Text style={{ fontWeight: "bold" }}>Sign Up</Text>
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
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },

  loginBtn: {
    backgroundColor: "#52796F",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  signupLink: {
    textAlign: "center",
    marginTop: 15,
    color: "#444",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F9F4",
  },
  loadingText: {
    marginTop: 15,
    fontSize: 18,
    color: "#2B4D39",
    fontWeight: "600",
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
