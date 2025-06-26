import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// --- TELA INICIAL DO ALUNO ---
const AlunoHome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, Aluno</Text>
      <Text style={styles.subtitle}>Em breve, você poderá visualizar suas matérias aqui.</Text>
    </View>
  );
};

// --- STACK DO ALUNO ---
const Stack = createNativeStackNavigator();

const AlunoStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AlunoHome" component={AlunoHome} options={{ title: 'Aluno' }} />
  </Stack.Navigator>
);

export default AlunoStack;

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: 'center', color: '#555' }
});
