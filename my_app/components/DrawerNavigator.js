import React, { useContext } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import HomePage from "./HomePage";
import MapsScreen from "./MapsScreen"; // Import your MapsScreen component
import GrainDetails from "./GrainDetails"; // Import your GrainDetails component
import Analysis from "./Analysis"; // Import your Analysis component
import { AuthContext } from "../context/AuthContext";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { logout } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={logout}
        icon={({ color, size }) => (
          <Ionicons name="log-out-outline" color={color} size={size} />
        )}
      />
    </DrawerContentScrollView>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="HomePage"
        component={HomePage}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="MapsScreen"
        component={MapsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="map-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="GrainDetails"
        component={GrainDetails}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Analysis"
        component={Analysis}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="analytics-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
