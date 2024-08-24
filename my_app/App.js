import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./components/LoginScreen";
import DrawerNavigator from "./components/DrawerNavigator"; // Import DrawerNavigator
import Toast from "react-native-toast-message";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { View, ActivityIndicator } from "react-native";

const Stack = createStackNavigator();

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AuthContext.Consumer>
          {({ isLoading, userToken }) => {
            if (isLoading) {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size={"large"} />
                </View>
              );
            }

            return userToken !== null ? (
              <DrawerNavigator />
            ) : (
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            );
          }}
        </AuthContext.Consumer>
        <Toast topOffset={90} />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
