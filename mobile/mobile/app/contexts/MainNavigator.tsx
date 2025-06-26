import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../../AuthContext';
import LoginScreen from '../screens/LoginScreen';
import AdminStack from '../screens/AdminStack';
import DocenteStack from '../screens/DocenteStack';
import MonitorStack from '../screens/MonitorStack';
import AlunoStack from '../screens/AlunoStack';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const { user } = useAuth();

  return !user ? (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  ) : user.role === 'admin' ? (
    <AdminStack />
  ) : user.role === 'docente' ? (
    <DocenteStack />
  ) : user.role === 'monitor' ? (
    <MonitorStack />
  ) : (
    <AlunoStack />
  );
};

export default MainNavigator;
