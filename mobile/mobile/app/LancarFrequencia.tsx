import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Switch } from "react-native";
import axios from "axios";

const API_URL = "http://SEU_IP_LOCAL:5001/api/frequencias";

export default function LancarFrequencia() {
  const [calendario_id, setCalendarioId] = useState("");
  const [aluno_id, setAlunoId] = useState("");
  const [presente, setPresente] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    setMsg("");
    try {
      await axios.post(API_URL, { calendario_id: Number(calendario_id), aluno_id: Number(aluno_id), presente });
      setMsg("Frequência lançada!");
    } catch (e) {
      setMsg("Erro ao lançar frequência.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="ID do calendário" value={calendario_id} onChangeText={setCalendarioId} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="ID do aluno" value={aluno_id} onChangeText={setAlunoId} keyboardType="numeric" />
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <Text>Presente?</Text>
        <Switch value={presente} onValueChange={setPresente} />
      </View>
      <Button title="Lançar" onPress={handleSubmit} />
      <Text>{msg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 }
});