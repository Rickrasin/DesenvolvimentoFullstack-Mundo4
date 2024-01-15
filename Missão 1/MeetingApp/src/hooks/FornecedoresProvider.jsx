import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Criando o contexto
const FornecedoresContext = createContext();

// Componente provedor que irá envolver o restante da sua aplicação
export const FornecedoresProvider = ({ children }) => {
  const [fornecedores, setFornecedores] = useState([]);
  const [idCounter, setIdCounter] = useState(1); // Inicia o contador em 1

  const loadFornecedores = async () => {
    try {
      const storedFornecedores = await AsyncStorage.getItem("fornecedores");
      if (storedFornecedores) {
        setFornecedores(JSON.parse(storedFornecedores));
      }

      const storedIdCounter = await AsyncStorage.getItem("idCounter");
      if (storedIdCounter) {
        setIdCounter(Number(storedIdCounter));
      }
    } catch (error) {
      console.log("Erro ao carregar fornecedores:", error);
    }
  };

  useEffect(() => {
    loadFornecedores();
  }, []);

  const saveFornecedoresToStorage = async (updatedFornecedores) => {
    try {
      await AsyncStorage.setItem(
        "fornecedores",
        JSON.stringify(updatedFornecedores)
      );
      setFornecedores(updatedFornecedores);
    } catch (error) {
      console.log("Erro ao salvar fornecedores:", error);
    }
  };

  const adicionarFornecedor = (novoFornecedor) => {
    const fornecedorComId = { id: idCounter, ...novoFornecedor };

    setIdCounter(idCounter + 1);

    const updatedFornecedores = [...fornecedores, fornecedorComId];

    saveFornecedoresToStorage(updatedFornecedores);

    AsyncStorage.setItem("idCounter", String(idCounter));
  };

  const editarFornecedor = (fornecedorEditado) => {
    const updatedFornecedores = fornecedores.map((fornecedor) =>
      fornecedor.id === fornecedorEditado.id ? fornecedorEditado : fornecedor
    );
    saveFornecedoresToStorage(updatedFornecedores);

    console.log(fornecedorEditado);
  };

  const deletarFornecedor = async (id) => {
    try {
      const updatedFornecedores = fornecedores.filter(
        (fornecedor) => fornecedor.id !== id
      );
      setFornecedores(updatedFornecedores);

      await saveFornecedoresToStorage(updatedFornecedores);
    } catch (error) {
      console.log("Erro ao excluir fornecedor:", error);
    }
  };

  return (
    <FornecedoresContext.Provider
      value={{
        fornecedores,
        adicionarFornecedor,
        editarFornecedor,
        deletarFornecedor
      }}
    >
      {children}
    </FornecedoresContext.Provider>
  );
};

export const useFornecedores = () => {
  const context = useContext(FornecedoresContext);
  if (!context) {
    throw new Error(
      "useFornecedores deve ser usado dentro de um FornecedoresProvider"
    );
  }
  return context;
};
