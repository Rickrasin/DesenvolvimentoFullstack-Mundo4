import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CadastroFornecedores from "./src/Pages/CadastroFornecedores";
import ListaFornecedores from "./src/Pages/ListaFornecedores";

import { FornecedoresProvider } from "./src/hooks/FornecedoresProvider";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <FornecedoresProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Cadastro" component={CadastroFornecedores} />
          <Tab.Screen name="Lista" component={ListaFornecedores} />
        </Tab.Navigator>
      </NavigationContainer>
    </FornecedoresProvider>
  );
}
