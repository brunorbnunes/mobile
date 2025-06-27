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
import CadastrarUsuario from '../CadastrarUsuario';
import CadastrarUnidade from '../CadastrarUnidade';
import { useAuth } from '../../AuthContext';
import { authStyles } from '../../assets/styles/auth.styles';

/**
 * 🏠 TELA INICIAL DO ADMIN - DESIGN MODERNO
 */
const AdminHome = () => {
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
      title: 'Cadastrar Usuário',
      subtitle: 'Adicionar novos usuários ao sistema',
      icon: 'person-add-outline',
      color: '#667eea',
      screen: 'CadastrarUsuario'
    },
    {
      title: 'Cadastrar Unidade',
      subtitle: 'Gerenciar unidades educacionais',
      icon: 'business-outline',
      color: '#764ba2',
      screen: 'CadastrarUnidade'
    },
    {
      title: 'Relatórios',
      subtitle: 'Visualizar relatórios do sistema',
      icon: 'bar-chart-outline',
      color: '#6B73FF',
      screen: null // Implementar depois
    },
    {
      title: 'Configurações',
      subtitle: 'Configurações gerais do sistema',
      icon: 'settings-outline',
      color: '#50c878',
      screen: null // Implementar depois
    }
  ];

  return (
    <SafeAreaView style={authStyles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header com informações do usuário */}
      <View style={authStyles.headerContainer}>
        <View style={authStyles.userInfo}>
          <View style={authStyles.avatarContainer}>
            <Ionicons name="person" size={24} color="#fff" />
          </View>
          <View>
            <Text style={authStyles.welcomeText}>Bem-vindo!</Text>
            <Text style={authStyles.userNameText}>{user?.nome || 'Administrador'}</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={authStyles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Menu de opções */}
      <ScrollView 
        style={authStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={authStyles.sectionTitle}>Painel Administrativo</Text>
        
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

        {/* Card de estatísticas */}
        <View style={authStyles.statsContainer}>
          <Text style={authStyles.sectionTitle}>Estatísticas Rápidas</Text>
          
          <View style={authStyles.statsRow}>
            <View style={[authStyles.statCard, { backgroundColor: '#667eea' }]}>
              <Ionicons name="people" size={28} color="#fff" />
              <Text style={authStyles.statNumber}>0</Text>
              <Text style={authStyles.statLabel}>Usuários</Text>
            </View>
            
            <View style={[authStyles.statCard, { backgroundColor: '#764ba2' }]}>
              <Ionicons name="business" size={28} color="#fff" />
              <Text style={authStyles.statNumber}>0</Text>
              <Text style={authStyles.statLabel}>Unidades</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- STACK DO ADMIN ---
const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#667eea',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '700',
        },
      }}
    >
      <Stack.Screen
        name="AdminHome"
        component={AdminHome}
        options={{
          headerShown: false // Removemos o header padrão para usar o customizado
        }}
      />
      <Stack.Screen 
        name="CadastrarUsuario" 
        component={CadastrarUsuario}
        options={{
          title: 'Cadastrar Usuário',
          headerBackTitle: 'Voltar'
        }}
      />
      <Stack.Screen 
        name="CadastrarUnidade" 
        component={CadastrarUnidade}
        options={{
          title: 'Cadastrar Unidade',
          headerBackTitle: 'Voltar'
        }}
      />
    </Stack.Navigator>
  );
}