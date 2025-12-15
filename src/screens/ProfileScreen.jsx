import { SafeAreaView, View, Text, TextInput, StyleSheet } from 'react-native';
import MainLayout from '../layouts/MainLayout';
import NavBar from '../components/NavBar';
import { getUser } from "../utils/auth";
import { useState, useEffect } from 'react';

export default function ProfileScreen({ navigation }) {

  const [user, setUser] = useState({ name: "User" });

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getUser();
      if (storedUser) {
        setUser(storedUser);
      }
    };

    loadUser();
  }, []);

  return (
    <MainLayout>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>My Profile</Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={user.name.split(" ")[0]}
            editable={false}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={user.name.split(" ")[1]}
            editable={false}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={user.email}
            editable={false}
          />
        </View>
      </SafeAreaView>

      <NavBar navigation={navigation} />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#2B2B2B',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F2F2F2',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
  },
});
