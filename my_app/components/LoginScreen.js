import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import Toast from "react-native-toast-message";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.1.2:3000/login", {
        email,
        password,
      });
      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: "Login Successful",
          text2: "Welcome back!",
        });
        login(response.data.token); // Store the token using AuthContext
      } else {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: "Invalid credentials",
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "Invalid credentials. Please try again.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1380&q=80",
        }}
        style={styles.imageBackground}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subTitle}>
            Let's get started by filling out the form below.
          </Text>
          <TextInput
            style={[styles.input, isEmailFocused && styles.inputFocused]}
            placeholder="Email"
            value={email}
            autoCapitalize="none"
            onChangeText={setEmail}
            keyboardType="email-address"
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
          />
          <View
            style={[
              styles.passwordContainer,
              isPasswordFocused && styles.inputFocused,
            ]}
          >
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              secureTextEntry={passwordVisibility}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            <TouchableOpacity
              onPress={() => {
                setPasswordVisibility(!passwordVisibility);
              }}
              style={{ padding: 10 }}
            >
              <Icon
                name={passwordVisibility ? "eye-slash" : "eye"}
                size={24}
                color="#57636C"
                style={styles.passwordIcon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "600",
    color: "#101213",
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#57636C",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    height: 50,
    padding: 12,
    borderColor: "#F1F4F8",
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#F1F4F8",
  },
  inputFocused: {
    borderColor: "#000",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderColor: "#F1F4F8",
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "#F1F4F8",
    marginBottom: 16,
  },
  passwordInput: {
    padding: 10,
    flex: 1,
    height: "100%",
  },
  button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#4B39EF",
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default LoginScreen;
