import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useAuth } from '../../AuthContext';
import { authStyles } from '../../assets/styles/auth.styles';

// Observe o IP e a porta do servidor de autenticação
const API_URL = "http://192.168.15.12:5001/api/login";

export default function LoginScreen() {
  const { login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  // Removido logout automático para evitar loop de login

  const handleLogin = async () => {
    setErro('');
    if (!email || !senha) {
      setErro('Preencha email e senha');
      return;
    }
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        let msg = 'Erro ao fazer login';
        try {
          const data = await response.json();
          msg = data.message || msg;
        } catch {}
        setErro(msg);
        return;
      }

      const user = await response.json();
      login(user);
    } catch (err) {
      setErro('Erro de conexão com o servidor');
      console.log('Erro ao fazer login:', err);
    }
  };

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Login</Text>
      <TextInput
        style={authStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={authStyles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      {erro ? <Text style={authStyles.errorText}>{erro}</Text> : null}
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}