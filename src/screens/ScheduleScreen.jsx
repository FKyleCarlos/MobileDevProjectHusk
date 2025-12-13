import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, ScrollView, Image, Link } from 'react-native';
import MainLayout from '../layouts/MainLayout';
import NavBar from '../components/NavBar';
import CalendarButton from '../components/CalendarContainers';
import addIcon from '../assets/miscIcons/add.png'


export default function ScheduleScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('classes');
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [days, setDays] = useState([]);

  const times = [
    '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM',
    '3 PM', '4 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'
  ];

  const months = [
    { id: 1, month: 'January', days: 31 },
    { id: 2, month: 'February', days: 28 },
    { id: 3, month: 'March', days: 31 },
    { id: 4, month: 'April', days: 30 },
    { id: 5, month: 'May', days: 31 },
    { id: 6, month: 'June', days: 30 },
    { id: 7, month: 'July', days: 31 },
    { id: 8, month: 'August', days: 31 },
    { id: 9, month: 'September', days: 30 },
    { id: 10, month: 'October', days: 31 },
    { id: 11, month: 'November', days: 30 },
    { id: 12, month: 'December', days: 31 }
  ];

  const handleTabSwitch = (tab) => {
      setSelectedTab(tab);
    };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = (month) => {
    setSelectedMonth(month.id-1);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const selectedMonthData = months[selectedMonth];
    const daysArray = [];

    const currentYear = new Date().getFullYear();

    for (let i = 1; i <= selectedMonthData.days; i++) {
      const date = new Date(currentYear, selectedMonth, i);
      const weekday = date.toLocaleString('en-us', { weekday: 'short' });
      daysArray.push({ number: i, word: weekday });
    }

    setDays(daysArray);
  }, [selectedMonth]);

  return (
    <MainLayout>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Classes & Assignments</Text>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'classes' && styles.activeTab]}
            onPress={() => handleTabSwitch('classes')}
          >
            <Text style={[styles.tabText, selectedTab === 'classes' && styles.activeTabText]}>Classes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'assignments' && styles.activeTab]}
            onPress={() => handleTabSwitch('assignments')}
          >
            <Text style={[styles.tabText, selectedTab === 'assignments' && styles.activeTabText]}>Assignments</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
          <Text style={styles.monthText}>{months[selectedMonth].month}</Text>
        </TouchableOpacity>
        {isDropdownOpen && (
        <View style={styles.dropdown}>
          {months.map((month) => (
            <TouchableOpacity
              key={month.id}
              style={styles.option}
              onPress={() => handleSelect(month)}
            >
              <Text style={styles.optionText}>{month.month}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
        <ScrollView horizontal style={styles.scrollContainer}>
          {days.map((day, index) => (
              <CalendarButton key={index} day={day} />
          ))}
        </ScrollView>
      </View>
      

      {selectedTab === 'classes' ?
      <ScrollView style={styles.scheduleContainer}>
        {times.map((time, index) => (
          <View key={index} style={styles.timeSlotContainer}>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>{time}</Text>
            </View>
            <View style={styles.separator} />
          </View>
        ))}
      </ScrollView>
      :
      <ScrollView style={styles.scheduleContainer}>
        {times.map((time, index) => (
          <View key={index} style={styles.timeSlotContainer}>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>{time}</Text>
            </View>
            <View style={styles.separator} />
          </View>
        ))}
      </ScrollView>
      }
        <TouchableOpacity onPress={() => {selectedTab === 'classes' 
          ? navigation.navigate('Add Schedule') 
          : navigation.navigate('Add Deadline')}}>
          <Image source={addIcon} style={styles.fabClass} />
        </TouchableOpacity>
      <NavBar navigation={navigation} />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2B2B2B',
    borderRadius: 12,
    width: '55%',
  },
  tabButton: {
    paddingVertical: 3,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    backgroundColor: 'white',
    borderRadius: 12
  },
  tabText: {
    fontSize: 16,
    color: 'white',
  },
  activeTabText: {
    color: '#52796F',
    fontWeight: 'bold',
  },
  monthPickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
  },
  monthButton: {
    backgroundColor: '#52796F',
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeMonth: {
    backgroundColor: '#ff6f61',
  },
  monthText: {
    marginTop: 20,
    fontSize: 25,
    color: '#52796F',
  },
  scrollContainer: {
    marginTop: 10,
    paddingHorizontal: 5,
    height: 100,
    width: '100%',

  },
  
  dayText: {
    color: '#fff',
    fontSize: 16,
  },
  contentContainer: {
    padding: 15,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  eventBlock: {
    backgroundColor: '#ff6f61',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
  },
  eventTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  eventDetails: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  eventTime: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  fabClass: {
    position: 'absolute',
    bottom: 120,
    right: 30,
    width: 60,
    height: 60,
  },
  fabAssignment: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    width: 60,
    height: 60,
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 200,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1,
    marginTop: 90
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  scheduleContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  timeSlotContainer: {
    marginBottom: 20,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  timeText: {
    width: 60, // Fixed width for the time label
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginTop: 5,
  },
});
