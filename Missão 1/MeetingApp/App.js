import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import CatApp from "./src/components/CatApp";
import Cafe from "./src/components/Cafe";
import Cat from "./src/components/Cat";

export default function App() {
  return (
    <View style={styles.container}>
      <Cafe />
      <CatApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
