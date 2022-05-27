/* eslint-disable prettier/prettier */
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import About from "../screens/About";

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};

export { MainStackNavigator };