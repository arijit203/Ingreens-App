import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Button,
  ScrollView,
} from "react-native";

// Adjust the path to where the image is stored
const backgroundImage = require("./Grain.jpg");

export default function GrainDetailsPage({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <Text style={styles.heading}>Please enter Grain Details</Text>

          <View style={styles.varietiesContainer}>
            <View style={styles.varietyBox}>
              <Text style={styles.varietyText}>Tulaipanji</Text>
            </View>
            <View style={styles.varietyBox}>
              <Text style={styles.varietyText}>Gobindobhog</Text>
            </View>
          </View>

          <View style={styles.fieldsContainer}>
            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Grain Source Location</Text>
              <TextInput style={styles.inputField} />
            </View>
            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Owner Name</Text>
              <TextInput style={styles.inputField} />
            </View>
            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Owner Contact</Text>
              <TextInput style={styles.inputField} />
            </View>
          </View>

          <Button
            title="Proceed"
            onPress={() => navigation.navigate("Analysis")} // Corrected screen name
            color="#007BFF"
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    // backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly less transparent for better readability
  },
  heading: {
    fontSize: 28,
    fontFamily: "sans-serif", // Default system font
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333", // Darker color for better contrast
  },
  varietiesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  varietyBox: {
    backgroundColor: "#f8f8f8", // Light background for boxes
    padding: 20,
    borderRadius: 12,
    width: "45%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  varietyText: {
    fontSize: 18,
    fontFamily: "sans-serif", // Default system font
    color: "#555", // Slightly lighter color
  },
  fieldsContainer: {
    marginBottom: 30, // Added space before the button
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  fieldLabel: {
    flex: 1,
    fontSize: 16,
    fontFamily: "sans-serif", // Default system font
    color: "#555", // Consistent color
  },
  inputField: {
    flex: 2,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 10,
    fontFamily: "sans-serif", // Default system font
  },
});
