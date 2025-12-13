import React from 'react';
import { View, StyleSheet } from 'react-native';
import NavBar from '../components/NavBar.jsx';

const MainLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    {/* <NavBar/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f8f8f8',
  },
});

export default MainLayout;