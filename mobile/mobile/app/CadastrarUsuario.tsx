import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from "react-native";
import axios from "axios";

const API_URL = "http://192.168.179.173:5001/api/users"; // Troque pelo IP do seu PC

export default function CadastrarUsuario() {
  const [form, setForm] = useState({
    cpf: "",
    name: "",
    email: "",
    password: "",
    role: "",
    polo: ""
  });
  const [msg, setMsg] = useState("");

  const handleChange = (field: string, value: string) => setForm({ ...form, [field]: value });

  const handleSubmit = async () => {
    setMsg("");
    try {
      await axios.post(API_URL, form);
      setMsg("Usuário cadastrado!");
    } catch (e) {
      setMsg("Erro ao cadastrar usuário.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput style={styles.input} placeholder="CPF" onChangeText={v => handleChange("cpf", v)} value={form.cpf} />
      <TextInput style={styles.input} placeholder="Nome" onChangeText={v => handleChange("name", v)} value={form.name} />
      <TextInput style={styles.input} placeholder="Email" onChangeText={v => handleChange("email", v)} value={form.email} />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry onChangeText={v => handleChange("password", v)} value={form.password} />
      <TextInput style={styles.input} placeholder="Função (admin, docente, monitor, aluno)" onChangeText={v => handleChange("role", v)} value={form.role} />
      <TextInput style={styles.input} placeholder="Polo" onChangeText={v => handleChange("polo", v)} value={form.polo} />
      <Button title="Cadastrar" onPress={handleSubmit} />
      <Text>{msg}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 }
});