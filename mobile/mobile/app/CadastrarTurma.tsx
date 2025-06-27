import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import axios from "axios";
import { authStyles } from "../assets/styles/auth.styles";
import { API_ENDPOINTS } from "../config/api";

const API_URL = API_ENDPOINTS.TURMAS;

export default function CadastrarTurma() {
  const [form, setForm] = useState({
    nome: "",
    unidade_id: "",
    docente_id: "",
    monitor_id: ""
  });
  const [msg, setMsg] = useState("");

  const handleChange = (field: string, value: string) => setForm({ ...form, [field]: value });

  const handleSubmit = async () => {
    setMsg("");
    try {
      await axios.post(API_URL, {
        nome: form.nome,
        unidade_id: Number(form.unidade_id),
        docente_id: Number(form.docente_id),
        monitor_id: form.monitor_id ? Number(form.monitor_id) : null
      });
      setMsg("Turma cadastrada!");
    } catch (e) {
      setMsg("Erro ao cadastrar turma.");
    }
  };

  return (
    <View style={authStyles.container}>
      <TextInput style={authStyles.input} placeholder="Nome da turma" value={form.nome} onChangeText={v => handleChange("nome", v)} />
      <TextInput style={authStyles.input} placeholder="ID da unidade" value={form.unidade_id} onChangeText={v => handleChange("unidade_id", v)} keyboardType="numeric" />
      <TextInput style={authStyles.input} placeholder="ID do docente" value={form.docente_id} onChangeText={v => handleChange("docente_id", v)} keyboardType="numeric" />
      <TextInput style={authStyles.input} placeholder="ID do monitor (opcional)" value={form.monitor_id} onChangeText={v => handleChange("monitor_id", v)} keyboardType="numeric" />
      <Button title="Cadastrar" onPress={handleSubmit} />
      <Text>{msg}</Text>
    </View>
  );
}