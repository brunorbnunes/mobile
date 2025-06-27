// MonitorStack.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import LancarFrequencia from '../LancarFrequencia';
import { useAuth } from '../../AuthContext';
import { authStyles } from '../../assets/styles/auth.styles';

const MonitorHome = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Bem-vindo, Monitor</Text>
      <Button title="Lançar Frequência" onPress={() => navigation.navigate('LancarFrequencia')} />
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function MonitorStack() {
  const { logout } = useAuth();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MonitorHome"
        component={MonitorHome}
        options={{
          title: 'Monitor',
          headerRight: () => <Button title="Sair" onPress={logout} />
        }}
      />
      <Stack.Screen name="LancarFrequencia" component={LancarFrequencia} />
    </Stack.Navigator>
  );
}
