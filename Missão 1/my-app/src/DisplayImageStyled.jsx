import React from "react";

import { View, Image, StyleSheet } from "react-native";
import image from "@expo/snack-static/react-native-logo.png";

const styles = StyleSheet.create({
  container: {
    paddingTop: 50
  },

  stretch: {
    width: 50,

    height: 200,

    resizeMode: "stretch"
  }
});

const DisplayImageStyled = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.stretch} source={image} />
    </View>
  );
};

export default DisplayImageStyled;
