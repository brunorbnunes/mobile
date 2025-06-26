import React, { useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import CadastrarTurma from '../CadastrarTurma';
import AssociarAlunoTurma from '../AssociarAlunoTurma';
import LancarFrequencia from '../LancarFrequencia';
import { useAuth } from '../../AuthContext';

// --- TELA INICIAL DO DOCENTE ---
const DocenteHome = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bem-vindo, Docente</Text>
      <Button title="Cadastrar Turma" onPress={() => navigation.navigate('CadastrarTurma')} />
      <View style={styles.spacer} />
      <Button title="Associar Aluno à Turma" onPress={() => navigation.navigate('AssociarAlunoTurma')} />
      <View style={styles.spacer} />
      <Button title="Lançar Frequência" onPress={() => navigation.navigate('LancarFrequencia')} />
    </ScrollView>
  );
};

// --- STACK DO DOCENTE ---
const Stack = createNativeStackNavigator();

const DocenteStack = () => {
  const { logout } = useAuth();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DocenteHome"
        component={DocenteHome}
        options={{
          title: 'Docente',
          headerRight: () => <Button title="Sair" onPress={logout} />
        }}
      />
      <Stack.Screen name="CadastrarTurma" component={CadastrarTurma} />
      <Stack.Screen name="AssociarAlunoTurma" component={AssociarAlunoTurma} />
      <Stack.Screen name="LancarFrequencia" component={LancarFrequencia} />
    </Stack.Navigator>
  );
};

export default DocenteStack;

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  scrollContent: { paddingBottom: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  spacer: { height: 15 }
});