import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import axios from "axios";

const API_URL = "http://192.168.0.20:5001/api/unidades";

export default function CadastrarUnidade() {
  const [nome, setNome] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    setMsg("");
    try {
      await axios.post(API_URL, { nome });
      setMsg("Unidade cadastrada!");
    } catch (e) {
      setMsg("Erro ao cadastrar unidade.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nome da unidade" value={nome} onChangeText={setNome} />
      <Button title="Cadastrar" onPress={handleSubmit} />
      <Text>{msg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 }
});