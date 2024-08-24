import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import ImageZoom from "react-native-image-zoom-viewer";
import Icon from "react-native-vector-icons/FontAwesome";

const HomePage = ({ navigation }) => {
  const [deviceID, setDeviceID] = useState("");
  const [zoomVisible, setZoomVisible] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleZoomIn = () => {
    setZoomVisible(true);
  };

  const handleZoomOut = () => {
    setZoomVisible(false);
  };

  // Listen for interactions outside of the TextInput
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setFocused(false); // Reset focus state when keyboard hides
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Analyze your Grain with FarmEye</Text>
        <Text style={styles.subTitle}>Live Capture Feed </Text>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/400x300" }} // Replace with your image URI
            style={styles.image}
            resizeMode="cover"
          />
          {zoomVisible && (
            <ImageZoom
              imageUrls={[{ url: "https://via.placeholder.com/400x300" }]} // Replace with your image URI
              enableImageZoom={true}
            />
          )}
          <View style={styles.zoomControls}>
            <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
              <Icon name="search-minus" size={24} color="#000" />
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
              <Icon name="search-plus" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              focused ? styles.inputFocused : styles.inputBlurred,
            ]}
            placeholder="Enter Device ID"
            value={deviceID}
            onChangeText={setDeviceID}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoFocus={false} // Ensure it does not automatically focus
          />
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => console.log("Start button pressed")}
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => navigation.navigate("MapsScreen")} // Corrected screen name
        >
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputBlurred: {
    borderColor: "#D3D3D3", // Light grey color when not focused
    borderWidth: 2,
  },
  inputFocused: {
    borderColor: "#000", // Black color when focused
    borderWidth: 2,
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: "#BEBEBE", // Light gray color
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%", // Full width to allow the input and button to fit side-by-side
    alignItems: "center",
    justifyContent: "space-between", // Distribute space between the input and button
    marginBottom: 16,
    marginTop: 20,
  },
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "#F1F4F8",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#101213",
    marginBottom: 12,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    color: "#57636C",
    marginBottom: 24,
    textAlign: "center",
  },
  imageContainer: {
    width: "100%",
    height: 300,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "relative", // Important for positioning the zoom controls
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  zoomControls: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    backgroundColor: "#E8E8E8", // Light color background
    borderRadius: 8,
    padding: 4,
  },
  zoomButton: {
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    padding: 12,
    borderColor: "#000", // Default light grey border color
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "#FFF",
    marginRight: 10, // Add spacing between the input and button
  },
  startButton: {
    backgroundColor: "#000", // Black color
    width: 100, // Adjust the width as needed
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
  },
  proceedButton: {
    backgroundColor: "#4CAF50",
    width: "100%",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default HomePage;
