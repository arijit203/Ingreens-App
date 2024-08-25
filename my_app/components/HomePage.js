import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { encode } from "base64-arraybuffer";

const HomePage = ({ navigation }) => {
  const [deviceID, setDeviceID] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [scale, setScale] = useState(1.1); // State to manage the image scale

  const fetchImage = async (deviceID) => {
    try {
      setImageLoading(true);
      const response = await axios.get(
        `http://192.168.1.2:3000/imageByDeviceId/${deviceID}`,
        {
          responseType: "arraybuffer", // To handle binary data
        }
      );

      const base64 = encode(response.data);
      setImageUri(`data:image/jpeg;base64,${base64}`);
    } catch (error) {
      Alert.alert("Error", "No Image found with this DeviceID"); // Show alert message
    } finally {
      setImageLoading(false);
    }
  };

  const handleStartPress = () => {
    if (!deviceID) {
      setFocused(true); // Show error border if input is null
    } else {
      setFocused(false); // Reset focus state if input is valid
      fetchImage(deviceID); // Fetch image if input is valid
    }
  };

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 3)); // Limit zoom-in to 3x
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 1)); // Limit zoom-out to 1x (original size)
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.title}>Analyze your Grain with FarmEye</Text>
            <Text style={styles.subTitle}>Live Capture Feed</Text>

            <View style={styles.imageContainer}>
              {imageLoading ? (
                <ActivityIndicator size="large" color="#0000ff" /> // Show a revolving indicator
              ) : imageUri ? (
                <ScrollView
                  style={styles.scrollContainer}
                  contentContainerStyle={styles.scrollContent}
                  maximumZoomScale={3}
                  minimumZoomScale={1}
                  horizontal // Enable horizontal scrolling
                  vertical // Enable vertical scrolling
                >
                  <Image
                    source={{ uri: imageUri }}
                    style={[
                      styles.image,
                      { transform: [{ scale: scale }] }, // Apply the scale transformation
                    ]}
                    resizeMode="contain"
                  />
                </ScrollView>
              ) : (
                <ScrollView
                  style={styles.scrollContainer}
                  contentContainerStyle={styles.scrollContent}
                  maximumZoomScale={3}
                  minimumZoomScale={1}
                  horizontal // Enable horizontal scrolling
                  vertical // Enable vertical scrolling
                >
                  <Image
                    source={{ uri: "https://via.placeholder.com/400x300" }} // Placeholder image
                    style={[
                      styles.image,
                      { transform: [{ scale: scale }] }, // Apply the scale transformation
                    ]}
                    resizeMode="contain"
                  />
                </ScrollView>
              )}
              <View style={styles.zoomControls}>
                <TouchableOpacity
                  style={styles.zoomButton}
                  onPress={handleZoomOut}
                >
                  <Icon name="search-minus" size={24} color="#000" />
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity
                  style={styles.zoomButton}
                  onPress={handleZoomIn}
                >
                  <Icon name="search-plus" size={24} color="#000" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  focused && !deviceID
                    ? styles.inputError
                    : styles.inputBlurred, // Apply the red border only if the input is null and the button is clicked
                ]}
                placeholder="Enter Device ID"
                value={deviceID}
                onChangeText={(text) => {
                  setDeviceID(text);
                  setFocused(false); // Reset focus state on change
                }}
              />
              <TouchableOpacity
                style={styles.startButton}
                onPress={handleStartPress}
              >
                <Text style={styles.buttonText}>Start</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.proceedButton,
                !imageUri && styles.proceedButtonDisabled, // Apply disabled styles if imageUri is empty
              ]}
              onPress={() => {
                if (imageUri) {
                  navigation.navigate("MapsScreen");
                }
              }}
              disabled={!imageUri} // Disable the button if imageUri is empty
            >
              <Text style={styles.buttonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputError: {
    borderColor: "#D10000", // Red border color for error
  },
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
    maxWidth: 400, // Limit the maximum width
    maxHeight: 400, // Limit the maximum height
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "relative", // Important for positioning the zoom controls
    overflow: "hidden", // Ensure the image doesn't overflow the container
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  scrollContent: {
    flexGrow: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  zoomControls: {
    position: "absolute",
    top: 15,
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
    marginTop: 20, // Add top margin to separate from input
  },
  proceedButtonDisabled: {
    backgroundColor: "#90EE90", // Light green color when the button is disabled
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default HomePage;
