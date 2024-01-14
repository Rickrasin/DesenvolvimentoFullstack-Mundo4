import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListaFornecedores = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFornecedores, setFilteredFornecedores] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFornecedor, setSelectedFornecedor] = useState(null);
  const [fornecedores, setFornecedores] = useState([]);

  const loadFornecedores = async () => {
    try {
      const storedFornecedores = await AsyncStorage.getItem("fornecedores");
      if (storedFornecedores) {
        setFornecedores(JSON.parse(storedFornecedores));
      }
    } catch (error) {
      console.log("Erro ao carregar fornecedores:", error);
    }
  };
  
  useEffect(() => {
    loadFornecedores();
  }, []);

  const salvarFornecedor = async (novoFornecedor) => {
    try {
      // Obtém fornecedores existentes do AsyncStorage
      const fornecedores = await AsyncStorage.getItem("fornecedores");

      // Se existirem fornecedores, converte para array
      const fornecedoresArray = fornecedores ? JSON.parse(fornecedores) : [];

      // Adiciona o novo fornecedor ao array
      fornecedoresArray.push(novoFornecedor);

      // Salva o array atualizado no AsyncStorage
      await AsyncStorage.setItem(
        "fornecedores",
        JSON.stringify(fornecedoresArray)
      );

      console.log("Fornecedor salvo com sucesso!");
    } catch (error) {
      console.log("Erro ao salvar fornecedor:", error);
    }
  };

  const handleSearch = () => {
    const filtered = fornecedores.filter(
      (fornecedor) =>
        fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fornecedor.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFornecedores(filtered);
  };

  const handleDelete = (id) => {
    const updatedFornecedores = fornecedores.filter(
      (fornecedor) => fornecedor.id !== id
    );
    setFornecedores(updatedFornecedores);
    saveFornecedoresToStorage(updatedFornecedores);
  };

  const handleEdit = (fornecedor) => {
    setSelectedFornecedor(fornecedor);
    setModalVisible(true);
  };

  const handleModalSave = () => {
    // Lógica para salvar as alterações do fornecedor
    const updatedFornecedores = fornecedores.map((item) =>
      item.id === selectedFornecedor.id ? selectedFornecedor : item
    );
    setFornecedores(updatedFornecedores);
    saveFornecedoresToStorage(updatedFornecedores);
    setModalVisible(false);
    setSelectedFornecedor(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar por nome ou categoria"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <Button title="Buscar" onPress={handleSearch} />

      <FlatList
        data={
          filteredFornecedores.length > 0 ? filteredFornecedores : fornecedores
        }
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.fornecedorItem}>
            <Text style={styles.fornecedorNome}>{item.nome}</Text>
            <Text style={styles.fornecedorDetalhes}>{item.endereco}</Text>
            <Text style={styles.fornecedorDetalhes}>{item.categoria}</Text>
            {/* Remova ou ajuste conforme necessário */}
            <Image source={item.imagem} style={styles.fornecedorImagem} />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEdit(item)}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal de Edição */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Editar Fornecedor</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Nome"
            value={selectedFornecedor?.nome || ""}
            onChangeText={(text) =>
              setSelectedFornecedor((prev) => ({ ...prev, nome: text }))
            }
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Endereço"
            value={selectedFornecedor?.endereco || ""}
            onChangeText={(text) =>
              setSelectedFornecedor((prev) => ({ ...prev, endereco: text }))
            }
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Categoria"
            value={selectedFornecedor?.categoria || ""}
            onChangeText={(text) =>
              setSelectedFornecedor((prev) => ({ ...prev, categoria: text }))
            }
          />
          {/* Adicione mais campos conforme necessário */}
          <Button title="Salvar" onPress={handleModalSave} />
          <Button
            title="Cancelar"
            onPress={() => {
              setModalVisible(false);
              setSelectedFornecedor(null);
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8
  },
  fornecedorItem: {
    marginBottom: 20
  },
  fornecedorNome: {
    fontSize: 18,
    fontWeight: "bold"
  },
  fornecedorDetalhes: {
    fontSize: 16,
    marginBottom: 4
  },
  fornecedorImagem: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginTop: 8
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  editButton: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 5,
    width: "45%"
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
    width: "45%"
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16
  },
  modalContainer: {
    padding: 16,
    flex: 1,
    justifyContent: "center"
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16
  },
  modalInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8
  }
});

export default ListaFornecedores;
