import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "react-native";
import { useFornecedores } from "../hooks/FornecedoresProvider";

const CadastroFornecedores = () => {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [contato, setContato] = useState("");
  const [categorias, setCategorias] = useState("");
  const [imagem, setImagem] = useState(null);
  const [image, setImage] = useState(null);

  const { adicionarFornecedor } = useFornecedores();

  const handleCadastro = () => {
    // Lógica para salvar os detalhes do fornecedor
    const detalhesFornecedor = {
      nome,
      endereco,
      contato,
      categorias,
      imagem
    };

    // Exibir os detalhes do fornecedor no console como JSON
    console.log("Detalhes do fornecedor:", JSON.stringify(detalhesFornecedor));

    // Salva o novo fornecedor no AsyncStorage
    adicionarFornecedor(detalhesFornecedor);
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
      setImagem(result.uri);
      setImage(result.uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={(text) => setNome(text)}
        />

        <Text style={styles.label}>Endereço:</Text>
        <TextInput
          style={styles.input}
          value={endereco}
          onChangeText={(text) => setEndereco(text)}
        />

        <Text style={styles.label}>Contato:</Text>
        <TextInput
          style={styles.input}
          value={contato}
          onChangeText={(text) => setContato(text)}
        />

        <Text style={styles.label}>Categorias de Produtos Fornecidos:</Text>
        <TextInput
          style={styles.input}
          value={categorias}
          onChangeText={(text) => setCategorias(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
          <Text style={styles.buttonText}>Abrir Galeria</Text>
        </TouchableOpacity>

        {image && (
          <Image source={{ uri: image }} style={styles.imagemPreScrollView} />
        )}

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar Fornecedor</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  label: {
    fontSize: 16,
    marginBottom: 8
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8
  },
  imagemPreScrollView: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginTop: 8,
    marginBottom: 16
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16
  }
});

export default CadastroFornecedores;
