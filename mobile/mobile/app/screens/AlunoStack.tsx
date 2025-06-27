import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../../AuthContext';
import { authStyles } from '../../assets/styles/auth.styles';

// --- TELA INICIAL DO ALUNO ---
const AlunoHome = () => {
  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Bem-vindo, Aluno</Text>
      <Text style={authStyles.subtitle}>Em breve, você poderá visualizar suas matérias aqui.</Text>
    </View>
  );
};

// --- STACK DO ALUNO ---
const Stack = createNativeStackNavigator();

export default function AlunoStack() {
  const { logout } = useAuth();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AlunoHome"
        component={AlunoHome}
        options={{
          title: 'Aluno',
          headerRight: () => <Button title="Sair" onPress={logout} />
        }}
      />
    </Stack.Navigator>
  );
}
