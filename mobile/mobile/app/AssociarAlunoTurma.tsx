import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import axios from "axios";
import { authStyles } from "../assets/styles/auth.styles";

const API_URL = "http://192.168.15.12:5001/api/alunos-turmas";

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
    <View style={authStyles.container}>
      <TextInput style={authStyles.input} placeholder="ID do aluno" value={aluno_id} onChangeText={setAlunoId} keyboardType="numeric" />
      <TextInput style={authStyles.input} placeholder="ID da turma" value={turma_id} onChangeText={setTurmaId} keyboardType="numeric" />
      <Button title="Associar" onPress={handleSubmit} />
      <Text>{msg}</Text>
    </View>
  );
}