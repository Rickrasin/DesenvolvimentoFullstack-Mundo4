import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CadastroFornecedores from "./src/Pages/CadastroFornecedores";
import ListaFornecedores from "./src/Pages/ListaFornecedores";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Cadastro" component={CadastroFornecedores} />
        <Tab.Screen name="Lista" component={ListaFornecedores} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
