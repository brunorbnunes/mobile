import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import CadastrarUsuario from '../CadastrarUsuario';
import CadastrarUnidade from '../CadastrarUnidade';

// --- TELA INICIAL DO ADMIN ---
const AdminHome = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bem-vindo, Admin</Text>
      <Button title="Cadastrar Usuário" onPress={() => navigation.navigate('CadastrarUsuario')} />
      <View style={styles.spacer} />
      <Button title="Cadastrar Unidade" onPress={() => navigation.navigate('CadastrarUnidade')} />
    </ScrollView>
  );
};

// --- STACK DO ADMIN ---
const Stack = createNativeStackNavigator();

const AdminStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AdminHome" component={AdminHome} options={{ title: 'Admin' }} />
    <Stack.Screen name="CadastrarUsuario" component={CadastrarUsuario} />
    <Stack.Screen name="CadastrarUnidade" component={CadastrarUnidade} />
  </Stack.Navigator>
);

export default AdminStack;

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  scrollContent: { paddingBottom: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  spacer: { height: 15 }
});