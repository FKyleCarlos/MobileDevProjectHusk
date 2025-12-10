import React from "react";
import {View,Text,TouchableOpacity,Image,StyleSheet,SafeAreaView,StatusBar,Platform,} from "react-native";
import backIcon from "../assets/navIcons/back.png";

export default function JournalHeader({ navigation, titleOverride, forceBackTo }) {
  const title = titleOverride || "Journal";

  const handleBack = () => {
  if (forceBackTo === "RESET_TO_JOURNAL") {
    // Remove ONLY this AddJournalScreen from history
    navigation.goBack();  
    return;
  }

  // Normal back behavior
  if (navigation.canGoBack()) {
    navigation.goBack();
  }
};


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>

        {/* Centered Title */}
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#89A88E",
  },

  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },

  backButton: {
    position: "absolute",
    left: 15,
    padding: 6,
  },

  backIcon: {
    width: 22,
    height: 22,
    tintColor: "white",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
