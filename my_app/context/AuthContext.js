import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (token) => {
    setIsLoading(true);
    try {
      await AsyncStorage.setItem("userToken", token);
      setUserToken(token);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem("userToken");
      setUserToken(null);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const checkLoginState = async () => {
    try {
      let token = await AsyncStorage.getItem("userToken");
      setUserToken(token);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLoginState();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, userToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
