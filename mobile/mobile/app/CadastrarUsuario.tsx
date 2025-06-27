import React, { useState } from "react";
import { TextInput, Button, Text, ScrollView } from "react-native";
import axios from "axios";
import { authStyles } from "../assets/styles/auth.styles";

const API_URL = "http://192.168.0.20:5001/api/users"; 

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
    <ScrollView contentContainerStyle={authStyles.container}>
      <TextInput style={authStyles.input} placeholder="CPF" onChangeText={v => handleChange("cpf", v)} value={form.cpf} />
      <TextInput style={authStyles.input} placeholder="Nome" onChangeText={v => handleChange("name", v)} value={form.name} />
      <TextInput style={authStyles.input} placeholder="Email" onChangeText={v => handleChange("email", v)} value={form.email} />
      <TextInput style={authStyles.input} placeholder="Senha" secureTextEntry onChangeText={v => handleChange("password", v)} value={form.password} />
      <TextInput style={authStyles.input} placeholder="Função (admin, docente, monitor, aluno)" onChangeText={v => handleChange("role", v)} value={form.role} />
      <TextInput style={authStyles.input} placeholder="Polo" onChangeText={v => handleChange("polo", v)} value={form.polo} />
      <Button title="Cadastrar" onPress={handleSubmit} />
      <Text>{msg}</Text>
    </ScrollView>
  );
}