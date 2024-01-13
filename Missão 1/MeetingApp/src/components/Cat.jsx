import React from "react";

import { Text, View, TextInput } from "react-native";

const Cat = (props) => {
  return (
    <View>
      <Text>Hello, I am {props.name}!</Text>
    </View>
  );
};

export default Cat;
