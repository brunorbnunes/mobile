import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import axios from "axios";

const API_URL = "http://192.168.179.173:5001/api/alunos-turmas";

export default function AssociarAlunoTurma() {
  const [aluno_id, setAlunoId] = useState("");
  const [turma_id, setTurmaId] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    setMsg("");
    try {
      await axios.post(API_URL, { aluno_id: Number(aluno_id), turma_id: Number(turma_id) });
      setMsg("Aluno associado à turma!");
    } catch (e) {
      setMsg("Erro ao associar aluno.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="ID do aluno" value={aluno_id} onChangeText={setAlunoId} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="ID da turma" value={turma_id} onChangeText={setTurmaId} keyboardType="numeric" />
      <Button title="Associar" onPress={handleSubmit} />
      <Text>{msg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 }
});