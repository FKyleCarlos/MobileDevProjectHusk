import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import MainLayout from "../layouts/MainLayout";
import NavBar from "../components/NavBar";
import { dummySchedules, dummyAssignments } from "../data/dummyData";
import { getUser } from "../utils/auth";
import { useState, useEffect } from 'react';

import InstagramIcon from "../assets/socialIcons/instagram.png";
import FacebookIcon from "../assets/socialIcons/facebook.png";
import TwitterIcon from "../assets/socialIcons/twitter.png";


export default function HomeScreen({ navigation, route }) {
  const [user, setUser] = useState({ name: "User" });
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.28;

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getUser();
      if (storedUser) {
        setUser(storedUser);
      }
    };

    loadUser();
  }, []);


  // --- TODAY LOGIC ---
  const today = new Date();

  // Convert weekday → "Mon", "Tue", etc.
  const weekdayMap = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun",
  };

  const weekdayFull = today.toLocaleDateString("en-US", { weekday: "long" });
 const todayShort = "Tue"; // force test day


  // "Tuesday, February 11"
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // "2025-02-11"
  const todayISO = today.toISOString().split("T")[0];

  // Filter classes happening today
  const todaysClasses = dummySchedules; // TEMP: show all while building UI


  // Filter assignments due today
  const todaysAssignments = dummyAssignments.filter(
    (a) => a.dueDate === todayISO
  );

  // Merge into Today’s Plan list
  const todaysPlan = [
    ...todaysClasses.map((cls) => ({
      type: "class",
      title: cls.className,
      time: `${cls.startTime} - ${cls.endTime}`,
    })),
    ...todaysAssignments.map((a) => ({
      type: "assignment",
      title: `${a.title} (${a.course})`,
      time: "Due Today",
    })),
  ];

  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingSmall}>Good morning,</Text>
            <Text style={styles.greetingName}>{user.name}!</Text>
          </View>
        </View>

        {/* TOP CARDS */}
        <View style={styles.cardContainer}>
          <View style={[styles.card, styles.cardAssignments, { width: cardWidth }]}>
            <TouchableOpacity onPress={() => navigation.navigate('Classes & Assignments')}>
              <Text style={styles.cardText}>Assignments{"\n"}Due Today</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.card, styles.cardClasses, { width: cardWidth }]}>
            <TouchableOpacity onPress={() => navigation.navigate('Classes & Assignments')}>
              <Text style={styles.cardText}>
                Classes For{"\n"}{formattedDate}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.card, styles.cardJournal, { width: cardWidth }]}>
            <TouchableOpacity onPress={() => navigation.navigate('AddJournal')}>
              <Text style={styles.cardText}>Enter{"\n"}Journal{"\n"}Entry</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* TODAY'S PLAN */}
        <Text style={styles.sectionTitle}>Today’s Plan</Text>

        <View style={styles.planCard}>
          <Text style={styles.planDate}>{formattedDate}</Text>

          {todaysPlan.length === 0 ? (
            <Text style={{ color: "#2F473B" }}>No tasks for today 🎉</Text>
          ) : (
            todaysPlan.map((item, index) => (
              <View key={index} style={styles.planRow}>
                <View style={styles.checkboxOuter}>
                  <View style={styles.checkboxInner} />
                </View>
                <View>
                  <Text style={styles.planText}>{item.title}</Text>
                  <Text style={styles.planTime}>{item.time}</Text>
                </View>
              </View>
            ))
          )}

        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <View style={styles.footerCol}>
            <Text style={styles.footerTitle}>CONTACT US</Text>
            <Text style={styles.footerLine}>#1234 Lorem Ipsum Rd</Text>
            <Text style={styles.footerLine}>Calgary, Canada</Text>
            <Text style={styles.footerLine}>Phone: +1 123 123 1234</Text>
            <Text style={styles.footerLine}>Email: contact@day2day.ca</Text>
          </View>

          <View style={styles.footerCol}>
            <Text style={styles.footerTitle}>NAVIGATE TO</Text>
            <Text style={styles.footerLine}>Home</Text>
            <Text style={styles.footerLine}>Calendar</Text>
            <Text style={styles.footerLine}>Journal</Text>
            <Text style={styles.footerLine}>Profile</Text>
          </View>

          <View style={styles.footerCol}>
            <Text style={styles.footerTitle}>FOLLOW US</Text>

            <View style={styles.iconRow}>
              <Image source={InstagramIcon} style={styles.socialIcon} />
              <Image source={FacebookIcon} style={styles.socialIcon} />
              <Image source={TwitterIcon} style={styles.socialIcon} />
            </View>
          </View>
        </View>
      </ScrollView>

      <NavBar navigation={navigation} />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    backgroundColor: "#F3F7EF",
    paddingBottom: 30,
    paddingTop:20
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  greetingSmall: {
    fontSize: 14,
    color: "#567064",
  },
  greetingName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1D5B4F",
  },

  /* CARDS */
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  card: {
    borderRadius: 22,
    padding: 12,
    marginBottom: 10,
    aspectRatio: 0.85,
    justifyContent: "flex-end",
  },
  cardAssignments: { backgroundColor: "#E5DED4" },
  cardClasses: { backgroundColor: "#F2C94C" },
  cardJournal: { backgroundColor: "#4F6367" },

  cardText: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 18,
  },

  /* TODAY’S PLAN */
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1D5B4F",
    marginTop: 10,
    marginBottom: 10,
  },

  planCard: {
    backgroundColor: "#CFE2C8",
    borderRadius: 22,
    padding: 16,
    position: "relative",
  },
  planDate: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#2F473B",
  },
  planRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  checkboxOuter: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#2F473B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: "#2F473B",
    borderRadius: 2,
  },
  planText: {
    fontSize: 14,
    color: "#2F473B",
  },
  planTime: {
    fontSize: 12,
    color: "#52685C",
  },

  /* FAB */
  fab: {
    position: "absolute",
    bottom: 15,
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#6C757D",
    justifyContent: "center",
    alignItems: "center",
  },
  fabPlus: {
    fontSize: 30,
    fontWeight: "700",
    color: "white",
  },

  /* FOOTER */
  footer: {
    backgroundColor: "#1F2324",
    marginTop: 120,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerCol: {
    width: "30%",
  },
  footerTitle: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
  },
  footerLine: {
    color: "#D0D0D0",
    fontSize: 11,
    marginBottom: 5,
  },

  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  socialIcon: {
    width: 22,
    height: 22,
    marginRight: 12,
    tintColor: "white",
  },
});
