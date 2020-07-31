import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";

import AddEntry from "./components/AddEntry";

export default function App() {
  return (
    <View>
      <StatusBar style="auto" />
      <AddEntry />
    </View>
  );
}
