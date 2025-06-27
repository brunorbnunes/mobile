import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CadastrarTurma from '../CadastrarTurma';
import AssociarAlunoTurma from '../AssociarAlunoTurma';
import LancarFrequencia from '../LancarFrequencia';
import { useAuth } from '../../AuthContext';
import { authStyles } from '../../assets/styles/auth.styles';

/**
 * 👨‍🏫 TELA INICIAL DO DOCENTE - DESIGN MODERNO
 */
const DocenteHome = () => {
  const navigation = useNavigation<any>();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: logout }
      ]
    );
  };

  const menuItems = [
    {
      title: 'Cadastrar Turma',
      subtitle: 'Criar e gerenciar novas turmas',
      icon: 'add-circle-outline',
      color: '#667eea',
      screen: 'CadastrarTurma'
    },
    {
      title: 'Associar Alunos',
      subtitle: 'Vincular alunos às turmas',
      icon: 'people-outline',
      color: '#764ba2',
      screen: 'AssociarAlunoTurma'
    },
    {
      title: 'Lançar Frequência',
      subtitle: 'Registrar presença dos alunos',
      icon: 'checkmark-circle-outline',
      color: '#6B73FF',
      screen: 'LancarFrequencia'
    },
    {
      title: 'Minhas Turmas',
      subtitle: 'Visualizar turmas cadastradas',
      icon: 'library-outline',
      color: '#50c878',
      screen: null // Implementar depois
    }
  ];

  return (
    <SafeAreaView style={authStyles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header com informações do docente */}
      <View style={authStyles.headerContainer}>
        <View style={authStyles.userInfo}>
          <View style={[authStyles.avatarContainer, { backgroundColor: '#764ba2' }]}>
            <Ionicons name="school" size={24} color="#fff" />
          </View>
          <View>
            <Text style={authStyles.welcomeText}>Olá, Professor(a)!</Text>
            <Text style={authStyles.userNameText}>{user?.nome || 'Docente'}</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={authStyles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Menu de opções do docente */}
      <ScrollView 
        style={authStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={authStyles.sectionTitle}>Painel do Professor</Text>
        
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[authStyles.menuCard, { borderLeftColor: item.color }]}
            onPress={() => {
              if (item.screen) {
                navigation.navigate(item.screen);
              } else {
                Alert.alert('Em breve', 'Esta funcionalidade será implementada em breve!');
              }
            }}
            activeOpacity={0.7}
          >
            <View style={[authStyles.menuIcon, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon as any} size={24} color="#fff" />
            </View>
            
            <View style={authStyles.menuContent}>
              <Text style={authStyles.menuTitle}>{item.title}</Text>
              <Text style={authStyles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        ))}

        {/* Card de ações rápidas */}
        <View style={authStyles.statsContainer}>
          <Text style={authStyles.sectionTitle}>Ações Rápidas</Text>
          
          <View style={authStyles.statsRow}>
            <View style={[authStyles.statCard, { backgroundColor: '#764ba2' }]}>
              <Ionicons name="time" size={28} color="#fff" />
              <Text style={authStyles.statNumber}>Hoje</Text>
              <Text style={authStyles.statLabel}>Frequência</Text>
            </View>
            
            <View style={[authStyles.statCard, { backgroundColor: '#6B73FF' }]}>
              <Ionicons name="calendar" size={28} color="#fff" />
              <Text style={authStyles.statNumber}>0</Text>
              <Text style={authStyles.statLabel}>Turmas</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- STACK DO DOCENTE ---
const Stack = createNativeStackNavigator();

const DocenteStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#764ba2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '700',
        },
      }}
    >
      <Stack.Screen
        name="DocenteHome"
        component={DocenteHome}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="CadastrarTurma" 
        component={CadastrarTurma}
        options={{
          title: 'Cadastrar Turma',
          headerBackTitle: 'Voltar'
        }}
      />
      <Stack.Screen 
        name="AssociarAlunoTurma" 
        component={AssociarAlunoTurma}
        options={{
          title: 'Associar Alunos',
          headerBackTitle: 'Voltar'
        }}
      />
      <Stack.Screen 
        name="LancarFrequencia" 
        component={LancarFrequencia}
        options={{
          title: 'Lançar Frequência',
          headerBackTitle: 'Voltar'
        }}
      />
    </Stack.Navigator>
  );
};

export default DocenteStack;