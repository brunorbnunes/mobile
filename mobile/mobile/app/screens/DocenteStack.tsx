import React, { useEffect } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import CadastrarTurma from '../CadastrarTurma';
import AssociarAlunoTurma from '../AssociarAlunoTurma';
import LancarFrequencia from '../LancarFrequencia';
import { useAuth } from '../../AuthContext';
import { authStyles } from '../../assets/styles/auth.styles';

// --- TELA INICIAL DO DOCENTE ---
const DocenteHome = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView contentContainerStyle={authStyles.container}>
      <Text style={authStyles.title}>Bem-vindo, Docente</Text>
      <Button title="Cadastrar Turma" onPress={() => navigation.navigate('CadastrarTurma')} />
      <View style={authStyles.spacer} />
      <Button title="Associar Aluno à Turma" onPress={() => navigation.navigate('AssociarAlunoTurma')} />
      <View style={authStyles.spacer} />
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