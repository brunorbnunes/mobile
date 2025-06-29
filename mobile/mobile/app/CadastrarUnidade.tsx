import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import axios from "axios";
import { authStyles } from "../assets/styles/auth.styles";
import { API_ENDPOINTS } from "../config/api";

const API_URL = API_ENDPOINTS.UNIDADES;

export default function CadastrarUnidade() {
  const [nome, setNome] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    console.log('INICIO CADASTRO UNIDADE');
    setMsg("");
    try {
      console.log('Tentando cadastrar unidade:', nome);
      await axios.post(API_URL, { nome });
      setMsg("Unidade cadastrada!");
    } catch (e) {
      setMsg("Erro ao cadastrar unidade.");
      console.error("Erro ao cadastrar unidade:", e);
    }
  };

  return (
    <View style={authStyles.container}>
      <TextInput style={authStyles.input} placeholder="Nome da unidade" value={nome} onChangeText={setNome} />
      <Button title="Cadastrar" onPress={handleSubmit} />
      <Text>{msg}</Text>
    </View>
  );
}