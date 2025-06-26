// MonitorStack.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import LancarFrequencia from '../LancarFrequencia';

const MonitorHome = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, Monitor</Text>
      <Button title="Lançar Frequência" onPress={() => navigation.navigate('LancarFrequencia')} />
    </View>
  );
};

const Stack = createNativeStackNavigator();

const MonitorStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MonitorHome" component={MonitorHome} options={{ title: 'Monitor' }} />
    <Stack.Screen name="LancarFrequencia" component={LancarFrequencia} />
  </Stack.Navigator>
);

export default MonitorStack;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
});
