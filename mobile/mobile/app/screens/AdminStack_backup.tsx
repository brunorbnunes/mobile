import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import CadastrarUsuario from '../CadastrarUsuario';
import CadastrarUnidade from '../CadastrarUnidade';
import { useAuth } from '../../AuthContext';

const AdminHome = () => {
  const navigation = useNavigation<any>();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: logout }
      ]
    );
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Admin Dashboard
      </Text>
      <Text style={{ marginBottom: 20 }}>
        Bem-vindo, {user?.name}!
      </Text>
      
      <Button 
        title="Cadastrar Usuário" 
        onPress={() => navigation.navigate('CadastrarUsuario')} 
      />
      <View style={{ marginVertical: 10 }} />
      <Button 
        title="Cadastrar Unidade" 
        onPress={() => navigation.navigate('CadastrarUnidade')} 
      />
      <View style={{ marginVertical: 10 }} />
      <Button 
        title="Sair" 
        onPress={handleLogout} 
        color="red"
      />
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="AdminHome" 
        component={AdminHome} 
        options={{ title: 'Administração' }}
      />
      <Stack.Screen 
        name="CadastrarUsuario" 
        component={CadastrarUsuario}
        options={{ title: 'Cadastrar Usuário' }}
      />
      <Stack.Screen 
        name="CadastrarUnidade" 
        component={CadastrarUnidade}
        options={{ title: 'Cadastrar Unidade' }}
      />
    </Stack.Navigator>
  );
}
