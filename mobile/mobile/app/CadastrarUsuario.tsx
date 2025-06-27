import React, { useState, useEffect } from "react";
import { TextInput, Button, Text, ScrollView, Modal, View, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import axios from "axios";
import { authStyles } from "../assets/styles/auth.styles";
import { API_ENDPOINTS } from "../config/api";

const API_URL = API_ENDPOINTS.USERS; 

type Usuario = {
  user_id: number;
  cpf: string;
  name: string;
  role: string;
  polo: string;
};

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
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingUsuarios, setLoadingUsuarios] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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

  const fetchUsuarios = async () => {
    setLoadingUsuarios(true);
    try {
      const res = await axios.get(API_URL);
      setUsuarios(res.data);
    } catch (e) {
      setMsg("Erro ao buscar usuários.");
    } finally {
      setLoadingUsuarios(false);
    }
  };

  const handleOpenModal = () => {
    fetchUsuarios();
    setModalVisible(true);
  };

  const handleCloseModal = () => setModalVisible(false);

  // Excluir usuário (exceto aluno)
  const handleExcluirUsuario = async (cpf: string) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir este usuário?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            setActionLoading(true);
            try {
              await axios.delete(`${API_URL}/${cpf}`);
              setUsuarios(usuarios => usuarios.filter(u => u.cpf !== cpf));
              setSuccessMsg("Usuário excluído!");
            } catch (e) {
              setErrorMsg("Erro ao excluir usuário.");
            } finally {
              setActionLoading(false);
            }
          }
        }
      ]
    );
  };

  // Desativar aluno (desvincular de todas as turmas)
  const handleDesativarAluno = async (user_id: number) => {
    Alert.alert(
      "Confirmar desativação",
      "Tem certeza que deseja desativar este aluno?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Desativar",
          style: "destructive",
          onPress: async () => {
            setActionLoading(true);
            try {
              const res = await axios.get(`${API_ENDPOINTS.ALUNOS_TURMAS}?aluno_id=${user_id}`);
              const associacoes = res.data;
              for (const assoc of associacoes) {
                await axios.patch(`${API_ENDPOINTS.ALUNOS_TURMAS}/${assoc.id}/desativar`);
              }
              setUsuarios(usuarios => usuarios.map(u => u.user_id === user_id ? { ...u, role: 'aluno', polo: u.polo } : u));
              setSuccessMsg("Aluno desativado!");
            } catch (e) {
              setErrorMsg("Erro ao desativar aluno.");
            } finally {
              setActionLoading(false);
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    if (successMsg || errorMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg("");
        setErrorMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg, errorMsg]);

  return (
    <ScrollView contentContainerStyle={authStyles.container}>
      <TextInput style={authStyles.input} placeholder="CPF" onChangeText={v => handleChange("cpf", v)} value={form.cpf} />
      <TextInput style={authStyles.input} placeholder="Nome" onChangeText={v => handleChange("name", v)} value={form.name} />
      <TextInput style={authStyles.input} placeholder="Email" onChangeText={v => handleChange("email", v)} value={form.email} />
      <TextInput style={authStyles.input} placeholder="Senha" secureTextEntry onChangeText={v => handleChange("password", v)} value={form.password} />
      <TextInput style={authStyles.input} placeholder="Função (admin, docente, monitor, aluno)" onChangeText={v => handleChange("role", v)} value={form.role} />
      <TextInput style={authStyles.input} placeholder="Polo" onChangeText={v => handleChange("polo", v)} value={form.polo} />
      <Button title="Cadastrar" onPress={handleSubmit} color={authStyles.button.backgroundColor} />
      <Button title="Gerenciar Usuários" onPress={handleOpenModal} color={authStyles.button.backgroundColor} />
      <Text style={authStyles.errorText}>{errorMsg}</Text>
      <Text style={{ color: 'green', textAlign: 'center' }}>{successMsg}</Text>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={authStyles.modalOverlay}>
          <View style={authStyles.modalContent}>
            <Text style={[authStyles.title, { marginBottom: 10 }]}>Usuários</Text>
            {loadingUsuarios || actionLoading ? (
              <ActivityIndicator size="large" color="#007bff" />
            ) : (
              <FlatList
                data={usuarios}
                keyExtractor={item => item.cpf}
                renderItem={({ item }) => (
                  <View style={authStyles.userItem}>
                    <Text>{item.name} ({item.role}) - {item.polo}</Text>
                    {item.role === 'aluno' ? (
                      <TouchableOpacity style={authStyles.actionBtn} onPress={() => handleDesativarAluno(item.user_id)}>
                        <Text style={{color: 'red'}}>Desativar</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity style={authStyles.actionBtn} onPress={() => handleExcluirUsuario(item.cpf)}>
                        <Text style={{color: 'red'}}>Excluir</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
                style={{ maxHeight: 300, width: '100%' }}
              />
            )}
            <Button title="Fechar" onPress={handleCloseModal} color={authStyles.button.backgroundColor} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}