import React from "react";

import { Image, StyleSheet, ScrollView, Text } from "react-native";
import FlatListBasics from "./src/FlatListBasics";
import SectionListBasics from "./src/SectionListBasics";

const logo = {
  uri: "https://reactnative.dev/img/tiny_logo.png",

  width: 64,

  height: 64
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20
  }
});

const App = () => (
  <ScrollView style={styles.container}>
    <FlatListBasics />

    <SectionListBasics />
  </ScrollView>
);

export default App;
