// screens/ClassesAndAssignmentsScreen.js
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import ToggleTabs from '../components/toggle';
import DateSelector from '../components/date_selector';
import AssignmentList from '../components/assignment_list';

export default function ClassesAndAssignmentsScreen() {
  const [activeTab, setActiveTab] = useState('assignments');
  const [selectedDate, setSelectedDate] = useState('Feb 7');
  return (
    <SafeAreaView style={styles.container}>
      {/* <ToggleTabs activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      {/* <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} /> */}
      <ScrollView>
        {activeTab === 'assignments' ? (
          <AssignmentList selectedDate={selectedDate} />
        ) : (
          <ClassList selectedDate={selectedDate} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
