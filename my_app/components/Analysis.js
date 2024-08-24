import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
} from "react-native";

const placeholderImage = "https://via.placeholder.com/800x400"; // Replace with your image URL

export default function AnalysisReportPage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.mainHeading}>Analysis Report</Text>
      <Text style={styles.subHeading}>Result of Grain Quality Analysis</Text>

      <Image source={{ uri: placeholderImage }} style={styles.image} />

      <View style={styles.fields}>
        <Text style={styles.fieldText}>
          <Text style={styles.fieldLabel}>Grain Count:</Text> 500
        </Text>
        <Text style={styles.fieldText}>
          <Text style={styles.fieldLabel}>Broken Rice Percentage:</Text> 12%
        </Text>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Parameter</Text>
          <Text style={styles.tableHeader}>Sample</Text>
          <Text style={styles.tableHeader}>Gobindobhog</Text>
          <Text style={styles.tableHeader}>Tulaipanji</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Kernel Length</Text>
          <Text style={styles.tableCell}>Sample 1</Text>
          <Text style={styles.tableCell}>6.5 mm</Text>
          <Text style={styles.tableCell}>6.8 mm</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Kernel Breadth</Text>
          <Text style={styles.tableCell}>Sample 1</Text>
          <Text style={styles.tableCell}>2.5 mm</Text>
          <Text style={styles.tableCell}>2.6 mm</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>L/B Ratio</Text>
          <Text style={styles.tableCell}>Sample 1</Text>
          <Text style={styles.tableCell}>2.6</Text>
          <Text style={styles.tableCell}>2.6</Text>
        </View>
      </View>

      <View style={styles.observation}>
        <Text style={styles.observationText}>
          <Text style={styles.observationLabel}>Observation:</Text> The grain
          quality is satisfactory with minor variations between the samples.
        </Text>
      </View>

      <Button
        title="Proceed"
        onPress={() => {
          /* Handle Proceed action */
        }}
        color="#007BFF"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  mainHeading: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  fields: {
    marginBottom: 20,
  },
  fieldText: {
    fontSize: 18,
    marginBottom: 10,
  },
  fieldLabel: {
    fontWeight: "bold",
  },
  tableContainer: {
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  observation: {
    marginBottom: 20,
  },
  observationText: {
    fontSize: 18,
  },
  observationLabel: {
    fontWeight: "bold",
  },
});
