import React, { useState } from "react";
import { View, TextInput, Button, Text, Switch } from "react-native";
import axios from "axios";
import { authStyles } from "../assets/styles/auth.styles";

const API_URL = "http://192.168.0.20:5001/api/frequencias";

export default function LancarFrequencia() {
  const [turmaId, setTurmaId] = useState("");
  const [data, setData] = useState(""); // data da aula
  const [aluno_id, setAlunoId] = useState("");
  const [presente, setPresente] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setMsg("");
    setLoading(true);
    try {
      // 1. Cria (ou busca) o calendário para a turma e data
      const calendarioRes = await axios.post(`${API_URL}/calendario`, {
        turma_id: Number(turmaId),
        data: data
      });
      const calendario_id = calendarioRes.data.calendario_id;
      // 2. Lança a frequência
      await axios.post(`${API_URL}/frequencias`, {
        calendario_id,
        aluno_id: Number(aluno_id),
        presente
      });
      setMsg("Frequência lançada!");
    } catch (e) {
      setMsg("Erro ao lançar frequência.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={authStyles.container}>
      <TextInput style={authStyles.input} placeholder="ID da turma" value={turmaId} onChangeText={setTurmaId} keyboardType="numeric" />
      <TextInput style={authStyles.input} placeholder="Data da aula (YYYY-MM-DD)" value={data} onChangeText={setData} />
      <TextInput style={authStyles.input} placeholder="ID do aluno" value={aluno_id} onChangeText={setAlunoId} keyboardType="numeric" />
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <Text>Presente?</Text>
        <Switch value={presente} onValueChange={setPresente} />
      </View>
      <Button title={loading ? "Salvando..." : "Lançar"} onPress={handleSubmit} disabled={loading || !turmaId || !data || !aluno_id} />
      <Text>{msg}</Text>
    </View>
  );
}