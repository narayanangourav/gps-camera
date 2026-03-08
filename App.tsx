import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";

import Home from "./src/screens/Home";
import CameraScreen from "./src/screens/CameraScreen";

import Overview from "./src/screens/Overview";
import SettingsScreen from "./src/screens/SettingsScreen";
import { useWebViewportLock, webDomProps } from "./src/logics/webDom.logic";

// Define the StackParamList
export type RootStackParamList = {
  Home: undefined;
  Overview: undefined;
  Settings: undefined;
  Camera: { mode: "picture" | "video" };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    minHeight: 0,
    overflow: "hidden",
  },
});

export default function App() {
  useWebViewportLock();

  return (
    <View style={styles.root} {...webDomProps("app-root", "app-root")}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false, animation: "fade" }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Overview" component={Overview} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
