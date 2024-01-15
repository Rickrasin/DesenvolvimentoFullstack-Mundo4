import React, { useState, useEffect } from "react";
import {
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
import { useFornecedores } from "../hooks/FornecedoresProvider";
import { StatusBar } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ListaFornecedores = () => {
  const [filteredFornecedores, setFilteredFornecedores] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFornecedor, setSelectedFornecedor] = useState(null);
  const {
    fornecedores,
    adicionarFornecedor,
    editarFornecedor,
    deletarFornecedor
  } = useFornecedores();

  useEffect(() => {
    handleSearch("");
  }, [fornecedores]);

  const handleSearch = (text) => {
    const filtered = fornecedores.filter((fornecedor) => {
      const categoria = fornecedor.categoria
        ? fornecedor.categoria.toLowerCase()
        : "";
      const endereco = fornecedor.endereco
        ? fornecedor.endereco.toLowerCase()
        : "";

      const categoriaMatch = categoria.includes(text.toLowerCase());
      const enderecoMatch = endereco.includes(text.toLowerCase());

      return categoriaMatch || enderecoMatch;
    });

    setFilteredFornecedores(text === "" ? fornecedores : filtered);
  };

  const handleEdit = (fornecedor) => {
    setSelectedFornecedor(fornecedor);
    setModalVisible(true);
  };

  const handleModalSave = () => {
    if (selectedFornecedor) {
      editarFornecedor(selectedFornecedor);
      setModalVisible(false);
      setSelectedFornecedor(null);
    } else {
      adicionarFornecedor({
        nome: selectedFornecedor?.nome || "",
        contato: selectedFornecedor?.endereco || "",
        endereco: selectedFornecedor?.contato || "",
        categoria: selectedFornecedor?.categoria || "",
        imagem: selectedFornecedor?.imagem || ""
      });

      setModalVisible(false);
    }
  };

  const handleChoosePhoto = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    };

    let result = await ImagePicker.launchImageLibraryAsync(options);

    console.log(result);

    if (!result.cancelled) {
      setSelectedFornecedor((prev) => ({ ...prev, imagem: result.uri }));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar por nome ou categoria"
        onChangeText={(text) => handleSearch(text)}
      />

      <FlatList
        data={filteredFornecedores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.fornecedorItem}>
            <Text style={styles.fornecedorNome}>{item.nome}</Text>
            <Text style={styles.fornecedorDetalhes}>{item.endereco}</Text>
            <Text style={styles.fornecedorDetalhes}>{item.contato}</Text>
            <Text style={styles.fornecedorDetalhes}>{item.categoria}</Text>
            <Image
              source={{ uri: item.imagem }}
              style={styles.fornecedorImagem}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEdit(item)}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deletarFornecedor(item.id)}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
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
            placeholder="Contato"
            value={selectedFornecedor?.contato || ""}
            onChangeText={(text) =>
              setSelectedFornecedor((prev) => ({ ...prev, contato: text }))
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
          <TouchableOpacity
            style={styles.selectImageButton}
            onPress={handleChoosePhoto}
          >
            <Text style={styles.buttonText}>Selecionar Imagem</Text>
          </TouchableOpacity>
          {selectedFornecedor?.imagem && (
            <Image
              source={{ uri: selectedFornecedor?.imagem }}
              style={styles.selectedImage}
            />
          )}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
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
  },
  selectImageButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginTop: 10
  },
  selectedImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginTop: 10
  }
});

export default ListaFornecedores;
