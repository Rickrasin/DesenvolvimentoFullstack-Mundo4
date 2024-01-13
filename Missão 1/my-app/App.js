import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PizzaTranslator from "./src/PizzaTranslator";
import DisplayImage from "./src/DisplayImage";
import DisplayImageStyled from "./src/DisplayImageStyled";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <PizzaTranslator /> */}
      {/* <DisplayImage /> */}
      <DisplayImageStyled />
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
