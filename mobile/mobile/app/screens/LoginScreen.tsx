import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useAuth } from '../../AuthContext';
import { authStyles } from '../../assets/styles/auth.styles';
import { API_ENDPOINTS } from '../../config/api';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErro('');
    setLoading(true);
    
    if (!email || !senha) {
      setErro('Preencha email e senha');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        let msg = 'Credenciais inválidas';
        try {
          const data = await response.json();
          msg = data.message || msg;
        } catch {}
        setErro(msg);
        setLoading(false);
        return;
      }

      const user = await response.json();
      login(user);
    } catch (err) {
      setErro('Erro de conexão com o servidor');
      console.log('Erro ao fazer login:', err);
    }
    
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={authStyles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={authStyles.loginCard}>
          {/* Título */}
          <View style={authStyles.logoContainer}>
            <Text style={authStyles.title}>Bem-vindo</Text>
            <Text style={authStyles.subtitle}>
              Acesse sua conta para continuar
            </Text>
          </View>

          {/* Campo de Email */}
          <View style={authStyles.inputGroup}>
            <Text style={authStyles.inputLabel}>Email</Text>
            <TextInput
              style={authStyles.input}
              placeholder="Digite seu email"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
            />
          </View>

          {/* Campo de Senha */}
          <View style={authStyles.inputGroup}>
            <Text style={authStyles.inputLabel}>Senha</Text>
            <TextInput
              style={authStyles.input}
              placeholder="Digite sua senha"
              placeholderTextColor="#9ca3af"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={true}
              autoCorrect={false}
            />
          </View>

          {/* Mensagem de erro */}
          {erro ? (
            <View style={authStyles.errorContainer}>
              <Text style={authStyles.errorText}>{erro}</Text>
            </View>
          ) : null}

          {/* Botão de Login */}
          <TouchableOpacity
            style={[authStyles.button, authStyles.primaryButton]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={authStyles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>

          {/* Link de esqueceu senha */}
          <TouchableOpacity>
            <Text style={authStyles.link}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}