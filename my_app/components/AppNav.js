import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";

import LoginScreen from "./LoginScreen";
import HomePage from "./HomePage";
import LocationPage from "./MapsScreen";
import GrainDetailsPage from "./GrainDetails";
import AnalysisReportPage from "./Analysis";
import CustomDrawer from "./CustomDrawer";
import { AuthContext, AuthProvider } from "../context/AuthContext";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNav() {
  const { isLoading, userToken } = React.useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  useEffect(() => {
    console.log("User Token:", userToken);
  }, [userToken]);

  return (
    <>
      <NavigationContainer>
        {userToken !== null ? (
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            initialRouteName="HomePage" // Ensures HomePage is the first screen in the drawer
          >
            <Drawer.Screen name="HomePage" component={HomePage} />
            <Drawer.Screen name="MapsScreen" component={LocationPage} />
            <Drawer.Screen name="GrainDetails" component={GrainDetailsPage} />
            <Drawer.Screen name="Analysis" component={AnalysisReportPage} />
          </Drawer.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
      <Toast topOffset={90} />
    </>
  );
}
