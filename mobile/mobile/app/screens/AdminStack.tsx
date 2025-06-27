import React, { useEffect } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import CadastrarUsuario from '../CadastrarUsuario';
import CadastrarUnidade from '../CadastrarUnidade';
import { useAuth } from '../../AuthContext';
import { authStyles } from '../../assets/styles/auth.styles';

// --- TELA INICIAL DO ADMIN ---
const AdminHome = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView contentContainerStyle={authStyles.container}>
      <Text style={authStyles.title}>Bem-vindo, Admin</Text>
      <Button title="Cadastrar Usuário" onPress={() => navigation.navigate('CadastrarUsuario')} />
      <View style={authStyles.spacer} />
      <Button title="Cadastrar Unidade" onPress={() => navigation.navigate('CadastrarUnidade')} />
    </ScrollView>
  );
};

// --- STACK DO ADMIN ---
const Stack = createNativeStackNavigator();

export default function AdminStack() {
  const { logout } = useAuth();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminHome"
        component={AdminHome}
        options={{
          title: 'Admin',
          headerRight: () => <Button title="Sair" onPress={logout} />
        }}
      />
      <Stack.Screen name="CadastrarUsuario" component={CadastrarUsuario} />
      <Stack.Screen name="CadastrarUnidade" component={CadastrarUnidade} />
    </Stack.Navigator>
  );
}