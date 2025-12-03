import { SafeAreaView, Button } from 'react-native';
import { useState } from "react";
import MainLayout from '../layouts/MainLayout';
import NavBar from '../components/NavBar';

export default function JournalScreen({ navigation }) {

  return (
    <MainLayout>
        <NavBar navigation={navigation} />
    </MainLayout>
  );
}