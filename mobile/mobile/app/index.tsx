import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Switch } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import axios from "axios";

const API = "http://192.168.0.20:5001"; // Troque pelo IP do seu backend

// Cadastro de Usuário
function CadastrarUsuario() {
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
      await axios.post(`${API}/api/users`, form);
      setMsg("Usuário cadastrado!");
    } catch (e) {
      setMsg("Erro ao cadastrar usuário.");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Cadastro de Usuário</Text>
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

// Cadastro de Unidade
function CadastrarUnidade() {
  const [nome, setNome] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    setMsg("");
    try {
      await axios.post(`${API}/api/unidades`, { nome });
      setMsg("Unidade cadastrada!");
      setNome("");
    } catch (e) {
      setMsg("Erro ao cadastrar unidade.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Unidade</Text>
      <TextInput style={styles.input} placeholder="Nome da unidade" value={nome} onChangeText={setNome} />
      <Button title="Cadastrar" onPress={handleSubmit} />
      <Text>{msg}</Text>
    </View>
  );
}

// Cadastro de Turma
function CadastrarTurma() {
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
      await axios.post(`${API}/api/turmas`, {
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
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Cadastro de Turma</Text>
      <TextInput style={styles.input} placeholder="Nome da turma" value={form.nome} onChangeText={v => handleChange("nome", v)} />
      <TextInput style={styles.input} placeholder="ID da unidade" value={form.unidade_id} onChangeText={v => handleChange("unidade_id", v)} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="ID do docente" value={form.docente_id} onChangeText={v => handleChange("docente_id", v)} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="ID do monitor (opcional)" value={form.monitor_id} onChangeText={v => handleChange("monitor_id", v)} keyboardType="numeric" />
      <Button title="Cadastrar" onPress={handleSubmit} />
      <Text>{msg}</Text>
    </ScrollView>
  );
}

// Associação de Aluno à Turma
function AssociarAlunoTurma() {
  const [aluno_id, setAlunoId] = useState("");
  const [turma_id, setTurmaId] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    setMsg("");
    try {
      await axios.post(`${API}/api/alunos-turmas`, { aluno_id: Number(aluno_id), turma_id: Number(turma_id) });
      setMsg("Aluno associado à turma!");
    } catch (e) {
      setMsg("Erro ao associar aluno.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Associar Aluno à Turma</Text>
      <TextInput style={styles.input} placeholder="ID do aluno" value={aluno_id} onChangeText={setAlunoId} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="ID da turma" value={turma_id} onChangeText={setTurmaId} keyboardType="numeric" />
      <Button title="Associar" onPress={handleSubmit} />
      <Text>{msg}</Text>
    </View>
  );
}

// Lançamento de Frequência
function LancarFrequencia() {
  const [calendario_id, setCalendarioId] = useState("");
  const [aluno_id, setAlunoId] = useState("");
  const [presente, setPresente] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    setMsg("");
    try {
      await axios.post(`${API}/api/frequencias`, { calendario_id: Number(calendario_id), aluno_id: Number(aluno_id), presente });
      setMsg("Frequência lançada!");
    } catch (e) {
      setMsg("Erro ao lançar frequência.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lançar Frequência</Text>
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

// Navegação por abas
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Usuário" component={CadastrarUsuario} />
      <Tab.Screen name="Unidade" component={CadastrarUnidade} />
      <Tab.Screen name="Turma" component={CadastrarTurma} />
      <Tab.Screen name="Associação" component={AssociarAlunoTurma} />
      <Tab.Screen name="Frequência" component={LancarFrequencia} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 },
  title: { fontWeight: "bold", fontSize: 18, marginBottom: 10 }
});