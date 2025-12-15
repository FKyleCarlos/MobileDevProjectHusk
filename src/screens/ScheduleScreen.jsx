import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MainLayout from '../layouts/MainLayout';
import NavBar from '../components/NavBar';
import CalendarButton from '../components/CalendarContainers'; 
import addIcon from '../assets/miscIcons/add.png';
// Import Deadline functions
import { getClasses, getDeadlines } from '../utils/storage'; 

// Mock Data for class display (Now only used for fixed colors)
const CLASS_DETAILS = {
  // Use unique colors for different class names
  'Web Development': { color: '#ff6f61' },
  'Database Programming': { color: '#8a2be2' },
  'Mobile Development': { color: '#1e90ff' },
  'Object Oriented Programming': { color: '#FFD700' }, // Added OOP color for assignments
  // Add more default colors here as needed
};

// Helper to convert 'HH:MM' time string to a comparable integer (e.g., '08:00' -> 8, '13:00' -> 13)
const getHourFromTime = (time) => parseInt(time.split(':')[0]);

// Component to display a single class block in the schedule
const ClassBlock = ({ classData }) => {
  // Get the color based on the class name, default to a gray if not found
  const colorDetail = CLASS_DETAILS[classData.className] || { color: '#777' };

  // Use the saved location and instructor, with fallbacks
  const instructorDisplay = classData.instructor || 'Instructor Not Set';
  const locationDisplay = classData.location || 'Location Not Set';

  return (
    <TouchableOpacity 
      style={[
        styles.classBlock, 
        { backgroundColor: colorDetail.color } 
      ]}
      onPress={() => Alert.alert(
        classData.className, 
        `Code: ${classData.classCode}\nInstructor: ${instructorDisplay}\nLocation: ${locationDisplay}\nTime: ${classData.startTime} - ${classData.endTime}\nDays: ${classData.classDays.join(', ')}`
      )}
    >
      <Text style={styles.classTitle}>{classData.className}</Text>
      <Text style={styles.classLocation}>{instructorDisplay} - {locationDisplay}</Text>
      <Text style={styles.classTime}>{`${classData.startTime} - ${classData.endTime}`}</Text>
    </TouchableOpacity>
  );
};

// --- NEW Deadline Block Component ---
const DeadlineBlock = ({ deadlineData }) => {
    const colorDetail = CLASS_DETAILS[deadlineData.className] || { color: '#777' };

    return (
        <TouchableOpacity 
            style={[
                styles.deadlineBlock, 
                { backgroundColor: colorDetail.color } 
            ]}
            onPress={() => Alert.alert(
                `${deadlineData.assignmentName} (${deadlineData.className})`, 
                `Due: ${deadlineData.deadlineDate} at ${deadlineData.deadlineTime}`
            )}
        >
            <Text style={styles.deadlineClassTitle}>{deadlineData.className}</Text>
            <Text style={styles.deadlineAssignmentName}>{deadlineData.assignmentName}</Text>
            <Text style={styles.deadlineTime}>{deadlineData.deadlineTime}</Text>
        </TouchableOpacity>
    );
};
// ------------------------------------


export default function ScheduleScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('classes');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [days, setDays] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(new Date().getDate() - 1); 
  const [classes, setClasses] = useState([]); // State for all saved classes
  const [deadlines, setDeadlines] = useState([]); // NEW state for deadlines

  const times = [
    '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM',
    '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'
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

  // ---------------------------
  // Data Fetching Logic (Updated)
  // ---------------------------
  const fetchData = useCallback(async () => {
    try {
        const savedClasses = await getClasses();
        setClasses(savedClasses);
        
        const savedDeadlines = await getDeadlines();
        setDeadlines(savedDeadlines);

    } catch (e) {
        console.error('Failed to fetch data:', e);
    }
  }, []);

  // Use `useFocusEffect` to refetch classes whenever the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchData();
      // Only set initial selected day/month on mount if they haven't been set
      if (days.length === 0) {
        setSelectedMonth(new Date().getMonth());
        setSelectedDayIndex(new Date().getDate() - 1);
      }
    }, [fetchData])
  );

  // ---------------------------
  // Handlers (Unchanged)
  // ---------------------------
  const handleTabSwitch = (tab) => {
    setSelectedTab(tab);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectMonth = (month) => {
    setSelectedMonth(month.id - 1);
    setIsDropdownOpen(false);
  };

  const handleSelectDay = (index) => {
    setSelectedDayIndex(index);
  };

  // ---------------------------
  // Date Generation Effect (Unchanged)
  // ---------------------------
  useEffect(() => {
    const selectedMonthData = months[selectedMonth];
    const daysArray = [];
    
    // FIX: Get the year from the current selected month for accurate date construction
    const dateContext = new Date();
    // If the selected month is past the current month in the current year, assume next year
    const currentYear = dateContext.getFullYear();
    const yearToUse = selectedMonth < dateContext.getMonth() ? currentYear + 1 : currentYear;


    for (let i = 1; i <= selectedMonthData.days; i++) {
      // Use yearToUse here for accurate day of the week (e.g., February 29th)
      const date = new Date(yearToUse, selectedMonth, i); 
      const weekday = date.toLocaleString('en-us', { weekday: 'short' });
      daysArray.push({ number: i, word: weekday });
    }

    setDays(daysArray);
    // If the new month doesn't have the previously selected day, default to the last day of the new month
    if (selectedDayIndex >= selectedMonthData.days) {
        setSelectedDayIndex(selectedMonthData.days - 1);
    }
  }, [selectedMonth, selectedDayIndex]);


  // ---------------------------
  // Schedule Rendering Logic (Unchanged)
  // ---------------------------
  const renderSchedule = () => {
    // Get the abbreviated weekday name for the selected day (e.g., 'Tue')
    // NOTE: The saved days are 'Mon', 'Tue', etc.
    const dayWord = days[selectedDayIndex]?.word || ''; 

    // Filter classes that occur on the selected day
    const filteredClasses = classes
      .filter(cls => cls.classDays.includes(dayWord))
      .sort((a, b) => getHourFromTime(a.startTime) - getHourFromTime(b.startTime));

    return times.map((time, index) => {
      // Convert time slot string (e.g., '8 AM') to 24-hour format integer (e.g., 8, 13)
      const hourString = time.replace(/ (AM|PM)/, '');
      let hour24 = parseInt(hourString);
      if (time.includes('PM') && hour24 !== 12) hour24 += 12;
      if (time.includes('AM') && hour24 === 12) hour24 = 0; // Midnight case if supported

      // Find classes that start in this time slot
      const classesInSlot = filteredClasses.filter(
        (cls) => getHourFromTime(cls.startTime) === hour24
      );

      const isCurrentTimeSlot = new Date().getHours() === hour24 
          && selectedDayIndex === new Date().getDate() - 1 
          && selectedMonth === new Date().getMonth();

      return (
        <View key={index} style={styles.timeSlotContainer}>
          <View style={styles.timeRow}>
            <Text style={[styles.timeText, isCurrentTimeSlot && styles.currentTimeText]}>{time}</Text>
            <View style={styles.classContent}>
              {classesInSlot.length > 0 ? (
                classesInSlot.map((cls) => (
                  <ClassBlock key={cls.id} classData={cls} />
                ))
              ) : (
                <View style={styles.emptySlot} />
              )}
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      );
    });
  };


// --- NEW Assignment Rendering Logic (FIXED) ---
  const renderAssignments = () => {
    // Get the selected day's number
    const day = days[selectedDayIndex]?.number;
    const month = selectedMonth + 1; // Month is 0-indexed (+1 for display)
    
    // FIX: Reconstruct the date object to correctly determine the year being viewed
    // This ensures the year matches the one used when generating the `days` array.
    const dateContext = new Date();
    const currentYear = dateContext.getFullYear();
    // If the selected month is past the current month, assume next year (matches useEffect logic)
    const yearToUse = selectedMonth < dateContext.getMonth() ? currentYear + 1 : currentYear; 

    // Format target date as MM/DD/YYYY to match saved date format
    const targetDate = `${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}/${yearToUse}`;
    console.log("Target Date for filtering:", targetDate); // Check this in your logs

    const filteredDeadlines = deadlines
        .filter(dl => dl.deadlineDate === targetDate)
        .sort((a, b) => {
            // Sort by time first
            const timeA = a.deadlineTime;
            const timeB = b.deadlineTime;
            if (timeA < timeB) return -1;
            if (timeA > timeB) return 1;
            // If times are equal, sort by class name
            if (a.className < b.className) return -1;
            if (a.className > b.className) return 1;
            return 0;
        });

    if (filteredDeadlines.length === 0) {
        return (
            <Text style={styles.assignmentPlaceholder}>No deadlines scheduled for this day.</Text>
        );
    }

    // Render the DeadlineBlocks
    return (
        <View style={styles.assignmentListContainer}>
            {filteredDeadlines.map((dl) => (
                <DeadlineBlock key={dl.id} deadlineData={dl} />
            ))}
        </View>
    );
  };
// ----------------------------------------


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
        
        {/* Month Dropdown */}
        <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
          <Text style={styles.monthText}>{months[selectedMonth].month} </Text>
          <Text style={styles.monthDropdownIcon}>⌵</Text>
        </TouchableOpacity>
        {isDropdownOpen && (
        <View style={styles.dropdown}>
          {months.map((month) => (
            <TouchableOpacity
              key={month.id}
              style={styles.option}
              onPress={() => handleSelectMonth(month)}
            >
              <Text style={styles.optionText}>{month.month}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

        <Text style={styles.selectedDayLabel}>
            {days[selectedDayIndex]?.word} {days[selectedDayIndex]?.number}
        </Text>

        <ScrollView horizontal style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          {days.map((day, index) => (
              <CalendarButton 
                key={index} 
                day={day} 
                index={index}
                isSelected={index === selectedDayIndex}
                onPress={() => handleSelectDay(index)}
              />
          ))}
        </ScrollView>
      </View>
      

      <ScrollView style={styles.scheduleContainer}>
        {selectedTab === 'classes' ? renderSchedule() : 
          renderAssignments()
        }
      </ScrollView>

        <TouchableOpacity 
          style={styles.fabContainer}
          onPress={() => {
            selectedTab === 'classes' 
              ? navigation.navigate('Add Schedule') 
              : navigation.navigate('Add Deadline')
          }}
        >
          <Image source={addIcon} style={styles.fabImage} />
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
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  monthText: {
    fontSize: 25,
    color: '#52796F',
  },
  monthDropdownIcon: {
    fontSize: 25,
    color: '#52796F',
    marginLeft: 5,
  },
  dropdown: {
    position: 'absolute',
    top: 150, // Adjusted position to be below the month text
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 200,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 10, // Ensure dropdown is on top
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
  // Selected Day Label
  selectedDayLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2B2B2B',
    marginTop: 15,
    marginBottom: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
  },
  // Calendar Scroll View
  scrollContainer: {
    paddingHorizontal: 5,
    height: 90, 
    width: '100%',
    marginVertical: 10,
  },
  scrollContent: {
    alignItems: 'center',
  },
  // Schedule Grid Styles
  scheduleContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  timeSlotContainer: {
    marginBottom: 5,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align time and class block at the top
    justifyContent: 'flex-start',
    minHeight: 75, // Enough height for the class block
  },
  timeText: {
    width: 60, // Fixed width for the time label
    fontSize: 16,
    color: '#333',
    paddingTop: 5, // Align time to the top of the row
  },
  currentTimeText: {
    color: '#ff6f61', 
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginTop: 5,
    marginLeft: 60, // Align separator with content
  },
  // Class Block Styles
  classContent: {
    flex: 1, 
    flexDirection: 'column', 
    marginLeft: 10,
    minHeight: 70,
    zIndex: 0,
  },
  classBlock: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 2, 
    minHeight: 70, 
    width: '95%', 
    elevation: 3, 
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  classTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  classLocation: {
    color: '#fff',
    fontSize: 14,
  },
  classTime: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  emptySlot: {
    minHeight: 1,
  },
  // Assignment Styles
  assignmentListContainer: {
      paddingHorizontal: 10,
      paddingVertical: 10,
  },
  deadlineBlock: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 5, 
    width: '100%', 
    elevation: 3, 
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  deadlineClassTitle: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 2,
  },
  deadlineAssignmentName: {
      color: '#fff',
      fontSize: 16,
      marginBottom: 5,
  },
  deadlineTime: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
  },
  assignmentPlaceholder: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#999',
  },
  // Floating Action Button
  fabContainer: {
    position: 'absolute',
    bottom: 100, // Adjusted to be above the NavBar
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#52796F',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabImage: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
});