import React, { useState, useEffect } from "react";
import { 
  TextInput, 
  Text, 
  ScrollView, 
  Modal, 
  View, 
  FlatList, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
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
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Estados para controle de foco dos inputs
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const roles = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Docente', value: 'docente' },
    { label: 'Monitor', value: 'monitor' },
    { label: 'Aluno', value: 'aluno' },
  ];

  const handleChange = (field: string, value: string) => setForm({ ...form, [field]: value });

  const handleSubmit = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    
    // Validações
    if (!form.cpf || !form.name || !form.email || !form.password || !form.role || !form.polo) {
      setErrorMsg("Todos os campos são obrigatórios");
      return;
    }

    setLoading(true);
    try {
      await axios.post(API_URL, form);
      setSuccessMsg("Usuário cadastrado com sucesso!");
      // Limpar formulário
      setForm({
        cpf: "",
        name: "",
        email: "",
        password: "",
        role: "",
        polo: ""
      });
    } catch (e: any) {
      setErrorMsg(e.response?.data?.message || "Erro ao cadastrar usuário");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsuarios = async () => {
    setLoadingUsuarios(true);
    try {
      const res = await axios.get(API_URL);
      setUsuarios(res.data);
    } catch (e) {
      Alert.alert("Erro", "Não foi possível carregar os usuários");
    } finally {
      setLoadingUsuarios(false);
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
    fetchUsuarios();
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleExcluirUsuario = async (cpf: string) => {
    Alert.alert(
      "Confirmar Exclusão",
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
              fetchUsuarios();
              Alert.alert("Sucesso", "Usuário excluído com sucesso");
            } catch (e) {
              Alert.alert("Erro", "Não foi possível excluir o usuário");
            } finally {
              setActionLoading(false);
            }
          }
        }
      ]
    );
  };

  const handleDesativarAluno = async (userId: number) => {
    Alert.alert(
      "Confirmar Desativação",
      "Tem certeza que deseja desativar este aluno?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Desativar", 
          style: "destructive",
          onPress: async () => {
            setActionLoading(true);
            try {
              await axios.patch(`${API_URL}/${userId}/deactivate`);
              fetchUsuarios();
              Alert.alert("Sucesso", "Aluno desativado com sucesso");
            } catch (e) {
              Alert.alert("Erro", "Não foi possível desativar o aluno");
            } finally {
              setActionLoading(false);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={authStyles.loginCard}>
            <View style={{ alignItems: 'center', marginBottom: 24 }}>
              <View style={[authStyles.logoIcon, { backgroundColor: '#667eea' }]}>
                <Ionicons name="person-add" size={32} color="#fff" />
              </View>
              <Text style={authStyles.title}>Cadastrar Usuário</Text>
              <Text style={authStyles.subtitle}>
                Adicione um novo usuário ao sistema
              </Text>
            </View>

            {/* Formulário */}
            <View style={authStyles.inputGroup}>
              <Text style={authStyles.inputLabel}>CPF</Text>
              <TextInput
                style={[
                  authStyles.input,
                  focusedField === 'cpf' && authStyles.inputFocused
                ]}
                placeholder="000.000.000-00"
                placeholderTextColor="#9ca3af"
                value={form.cpf}
                onChangeText={v => handleChange("cpf", v)}
                onFocus={() => setFocusedField('cpf')}
                onBlur={() => setFocusedField(null)}
                keyboardType="numeric"
              />
            </View>

            <View style={authStyles.inputGroup}>
              <Text style={authStyles.inputLabel}>Nome Completo</Text>
              <TextInput
                style={[
                  authStyles.input,
                  focusedField === 'name' && authStyles.inputFocused
                ]}
                placeholder="Digite o nome completo"
                placeholderTextColor="#9ca3af"
                value={form.name}
                onChangeText={v => handleChange("name", v)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            <View style={authStyles.inputGroup}>
              <Text style={authStyles.inputLabel}>Email</Text>
              <TextInput
                style={[
                  authStyles.input,
                  focusedField === 'email' && authStyles.inputFocused
                ]}
                placeholder="email@exemplo.com"
                placeholderTextColor="#9ca3af"
                value={form.email}
                onChangeText={v => handleChange("email", v)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={authStyles.inputGroup}>
              <Text style={authStyles.inputLabel}>Senha</Text>
              <TextInput
                style={[
                  authStyles.input,
                  focusedField === 'password' && authStyles.inputFocused
                ]}
                placeholder="Digite uma senha segura"
                placeholderTextColor="#9ca3af"
                value={form.password}
                onChangeText={v => handleChange("password", v)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                secureTextEntry
              />
            </View>

            <View style={authStyles.inputGroup}>
              <Text style={authStyles.inputLabel}>Função</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {roles.map((role) => (
                  <TouchableOpacity
                    key={role.value}
                    style={[
                      authStyles.roleChip,
                      form.role === role.value && authStyles.roleChipSelected
                    ]}
                    onPress={() => handleChange("role", role.value)}
                  >
                    <Text style={[
                      authStyles.roleChipText,
                      form.role === role.value && authStyles.roleChipTextSelected
                    ]}>
                      {role.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={authStyles.inputGroup}>
              <Text style={authStyles.inputLabel}>Polo</Text>
              <TextInput
                style={[
                  authStyles.input,
                  focusedField === 'polo' && authStyles.inputFocused
                ]}
                placeholder="Digite o polo"
                placeholderTextColor="#9ca3af"
                value={form.polo}
                onChangeText={v => handleChange("polo", v)}
                onFocus={() => setFocusedField('polo')}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            {/* Mensagens */}
            {errorMsg ? (
              <View style={authStyles.errorContainer}>
                <Text style={authStyles.errorText}>{errorMsg}</Text>
              </View>
            ) : null}

            {successMsg ? (
              <View style={[authStyles.errorContainer, { backgroundColor: '#f0f9ff', borderLeftColor: '#10b981' }]}>
                <Text style={[authStyles.errorText, { color: '#059669' }]}>{successMsg}</Text>
              </View>
            ) : null}

            {/* Botões */}
            <TouchableOpacity
              style={[authStyles.button, authStyles.primaryButton]}
              onPress={handleSubmit}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={authStyles.buttonText}>Cadastrar Usuário</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[authStyles.button, authStyles.secondaryButton]}
              onPress={handleOpenModal}
              activeOpacity={0.8}
            >
              <Text style={authStyles.secondaryButtonText}>Gerenciar Usuários</Text>
            </TouchableOpacity>
          </View>

          {/* Modal de usuários */}
          <Modal
            visible={modalVisible}
            transparent
            animationType="slide"
            onRequestClose={handleCloseModal}
          >
            <View style={authStyles.modalOverlay}>
              <View style={[authStyles.modalContent, { maxHeight: '80%' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <Text style={authStyles.modalTitle}>Usuários Cadastrados</Text>
                  <TouchableOpacity
                    onPress={handleCloseModal}
                    style={{ padding: 8 }}
                  >
                    <Ionicons name="close" size={24} color="#6b7280" />
                  </TouchableOpacity>
                </View>

                {loadingUsuarios || actionLoading ? (
                  <View style={authStyles.loadingContainer}>
                    <ActivityIndicator size="large" color="#667eea" />
                    <Text style={authStyles.loadingText}>Carregando usuários...</Text>
                  </View>
                ) : (
                  <FlatList
                    data={usuarios}
                    keyExtractor={item => item.cpf}
                    renderItem={({ item }) => (
                      <View style={authStyles.userItem}>
                        <View style={{ flex: 1 }}>
                          <Text style={authStyles.userItemText}>{item.name}</Text>
                          <Text style={[authStyles.menuSubtitle, { marginTop: 4 }]}>
                            {item.role} • {item.polo}
                          </Text>
                        </View>
                        
                        <TouchableOpacity 
                          style={[authStyles.actionBtn, { backgroundColor: '#ef4444' }]}
                          onPress={() => {
                            if (item.role === 'aluno') {
                              handleDesativarAluno(item.user_id);
                            } else {
                              handleExcluirUsuario(item.cpf);
                            }
                          }}
                        >
                          <Text style={authStyles.actionBtnText}>
                            {item.role === 'aluno' ? 'Desativar' : 'Excluir'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                  />
                )}
              </View>
            </View>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}