import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Location from "expo-location";
import axios from "axios";

export default function App({ navigation }) {
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [reportTime, setReportTime] = useState("");

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access Location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    const { latitude, longitude } = location.coords;
    setMapRegion({
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setLocation(location);

    // Fetch address using reverse geocoding
    fetchAddress(latitude, longitude);
  };

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      setAddress(response.data.display_name);
    } catch (error) {
      console.error(error);
      setAddress("Address not found");
    }
  };

  useEffect(() => {
    userLocation();
    const updateTime = () => {
      const now = new Date();
      setReportTime(now.toLocaleTimeString());
    };
    updateTime();
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Lat: ${location.coords.latitude}, Long: ${location.coords.longitude}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.reportTimeContainer}>
        <Text style={styles.reportTime}>Report Time: {reportTime}</Text>
      </View>
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker" />
      </MapView>
      <View style={styles.controls}>
        <Text style={styles.paragraph}>{text}</Text>
        <Text style={styles.address}>{address}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Proceed"
            onPress={() => navigation.navigate("GrainDetails")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reportTimeContainer: {
    padding: 30,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  reportTime: {
    fontSize: 16,
    textAlign: "center",
  },
  map: {
    width: "100%",
    height: "60%", // Adjust height as needed
  },
  controls: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  address: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 50, // Add padding above the Proceed button
    // alignItems: "center",
  },
});
